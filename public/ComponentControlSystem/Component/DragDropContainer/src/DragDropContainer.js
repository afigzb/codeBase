import { LitElement, html, css } from '../../../Dependency/lit-core.min.js';

export class DraggableContainer extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
            position: fixed;
            top: 0;
            left: 0;
            cursor: move;
            user-select: none;
            z-index: 1000;
        }
        
        .position-container {
            position: relative;
            transition: transform 0.1s ease-out;
        }
        
        .position-container.dragging {
            transition: none;
        }
        
        .content-wrapper {
            position: absolute;
            top: 0;
            left: 0;
        }
        
        /* 为交互元素设置指针样式 */
        .content-wrapper ::slotted(button),
        .content-wrapper ::slotted(input),
        .content-wrapper ::slotted(select),
        .content-wrapper ::slotted(a),
        .content-wrapper ::slotted([draggable-ignore]) {
            cursor: pointer !important;
        }
    `;

    static properties = {
        isDragging: { type: Boolean, state: true },
        isInertia: { type: Boolean, state: true },
        x: { type: Number, state: true },
        y: { type: Number, state: true },
        initialX: { type: Number, attribute: 'initial-x' },
        initialY: { type: Number, attribute: 'initial-y' },
        initialXPercent: { type: Number, attribute: 'initial-x-percent' },
        initialYPercent: { type: Number, attribute: 'initial-y-percent' }
    };

    constructor() {
        super();
        this.isDragging = false;
        this.isInertia = false;
        this.x = 0;
        this.y = 0;
        this.initialX = 0;
        this.initialY = 0;
        this.initialXPercent = 0;
        this.initialYPercent = 0;
        
        // 拖拽状态
        this.startPos = { x: 0, y: 0 };
        this.initialPos = { x: 0, y: 0 };
        this.velocity = { x: 0, y: 0 };
        this.lastPos = { x: 0, y: 0 };
        this.lastTime = 0;
        this.hasDragged = false;
        this.preventClickTimeout = null;
        
        // 简化的参数
        this.DECELERATION = 0.95;
        this.MIN_VELOCITY = 0.5;
        this.VELOCITY_SCALE = 0.15;

        this.bindEvents();
    }

    bindEvents() {
        this.handlePointerDown = this.handlePointerDown.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.handlePointerUp = this.handlePointerUp.bind(this);
        this.handleSelectStart = this.handleSelectStart.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    firstUpdated() {
        // 统一的指针事件处理
        this.addEventListener('mousedown', this.handlePointerDown);
        this.addEventListener('touchstart', this.handlePointerDown, { passive: false });
        
        this.addEventListener('selectstart', this.handleSelectStart);
        this.addEventListener('click', this.handleClick, true);
        
        document.addEventListener('mousemove', this.handlePointerMove);
        document.addEventListener('touchmove', this.handlePointerMove, { passive: false });
        document.addEventListener('mouseup', this.handlePointerUp);
        document.addEventListener('touchend', this.handlePointerUp);
        
        // 设置初始位置
        this.setInitialPosition();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        document.removeEventListener('mousemove', this.handlePointerMove);
        document.removeEventListener('touchmove', this.handlePointerMove);
        document.removeEventListener('mouseup', this.handlePointerUp);
        document.removeEventListener('touchend', this.handlePointerUp);
        
        if (this.preventClickTimeout) {
            clearTimeout(this.preventClickTimeout);
        }
    }

    getContentDimensions() {
        const contentWrapper = this.shadowRoot.querySelector('.content-wrapper');
        if (contentWrapper) {
            const rect = contentWrapper.getBoundingClientRect();
            return { width: rect.width, height: rect.height };
        }
        const hostRect = this.getBoundingClientRect();
        return { width: hostRect.width, height: hostRect.height };
    }

    getBoundaryLimits() {
        const { width, height } = this.getContentDimensions();
        return {
            maxX: Math.max(0, window.innerWidth - width),
            maxY: Math.max(0, window.innerHeight - height)
        };
    }

    updatePosition() {
        const container = this.shadowRoot.querySelector('.position-container');
        if (container) {
            container.style.transform = `translate(${this.x}px, ${this.y}px)`;
        }
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.updatePosition();
    }

    constrainPosition(x, y) {
        const { maxX, maxY } = this.getBoundaryLimits();
        return {
            x: Math.max(0, Math.min(x, maxX)),
            y: Math.max(0, Math.min(y, maxY))
        };
    }

    updateVelocity(clientX, clientY) {
        const currentTime = Date.now();
        const timeDelta = currentTime - this.lastTime;
        
        if (timeDelta > 0) {
            this.velocity.x = (clientX - this.lastPos.x) / timeDelta * 16;
            this.velocity.y = (clientY - this.lastPos.y) / timeDelta * 16;
        }
        
        this.lastPos.x = clientX;
        this.lastPos.y = clientY;
        this.lastTime = currentTime;
    }

    toggleDraggingClass(add) {
        const container = this.shadowRoot.querySelector('.position-container');
        if (container) {
            container.classList.toggle('dragging', add);
        }
    }

    // 简化的交互元素检测
    isInteractiveElement(element) {
        if (!element) return false;
        
        // 基本交互元素
        const interactiveTags = ['BUTTON', 'INPUT', 'SELECT', 'A', 'TEXTAREA'];
        if (interactiveTags.includes(element.tagName)) {
            return true;
        }
        
        // 拖拽忽略属性
        if (element.hasAttribute?.('draggable-ignore')) {
            return true;
        }
        
        // 检查父元素（最多2层）
        let parent = element.parentElement;
        for (let i = 0; i < 2 && parent; i++) {
            if (interactiveTags.includes(parent.tagName) || 
                parent.hasAttribute?.('draggable-ignore')) {
                return true;
            }
            parent = parent.parentElement;
        }
        
        return false;
    }

    // 统一的指针事件处理
    getEventCoords(e) {
        if (e.touches && e.touches[0]) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }

    handlePointerDown(e) {
        // 检查是否为交互元素
        const target = e.composedPath?.()?.[0] || e.target;
        if (this.isInteractiveElement(target)) {
            return;
        }
        
        const coords = this.getEventCoords(e);
        this.startDrag(coords.x, coords.y, e);
    }

    handlePointerMove(e) {
        if (!this.isDragging) return;
        
        const coords = this.getEventCoords(e);
        this.updateDrag(coords.x, coords.y);
        
        // 触摸事件且已拖拽时阻止默认行为
        if (e.touches && this.hasDragged) {
            e.preventDefault();
        }
    }

    handlePointerUp() {
        if (!this.isDragging) return;
        this.endDrag();
    }

    // 简化的拖拽开始逻辑
    startDrag(clientX, clientY, e) {
        this.isDragging = true;
        this.isInertia = false;
        this.hasDragged = false;
        
        this.startPos = { x: clientX, y: clientY };
        this.initialPos = { x: this.x, y: this.y };
        this.lastPos = { x: clientX, y: clientY };
        this.lastTime = Date.now();
        this.velocity = { x: 0, y: 0 };
        
        this.toggleDraggingClass(true);
        
        // 鼠标事件需要阻止默认行为
        if (!e.touches) {
            e.preventDefault();
        }
    }

    // 简化的拖拽更新逻辑
    updateDrag(clientX, clientY) {
        const deltaX = clientX - this.startPos.x;
        const deltaY = clientY - this.startPos.y;
        
        // 简化拖拽检测
        if (!this.hasDragged && (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5)) {
            this.hasDragged = true;
        }
        
        // 更新位置
        const newPos = this.constrainPosition(
            this.initialPos.x + deltaX,
            this.initialPos.y + deltaY
        );
        
        this.setPosition(newPos.x, newPos.y);
        this.updateVelocity(clientX, clientY);
    }

    // 统一的拖拽结束逻辑
    endDrag() {
        this.isDragging = false;
        this.toggleDraggingClass(false);
        
        if (this.hasDragged) {
            this.preventClickEvents();
            
            // 应用速度缩放并开始惯性
            this.velocity.x *= this.VELOCITY_SCALE;
            this.velocity.y *= this.VELOCITY_SCALE;
            
            if (Math.abs(this.velocity.x) > this.MIN_VELOCITY || 
                Math.abs(this.velocity.y) > this.MIN_VELOCITY) {
                this.isInertia = true;
                this.inertiaAnimation();
            }
        }
    }

    preventClickEvents() {
        if (this.preventClickTimeout) {
            clearTimeout(this.preventClickTimeout);
        }
        this.preventClickTimeout = setTimeout(() => {
            this.hasDragged = false;
        }, 100);
    }

    handleClick(e) {
        if (this.hasDragged) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            return false;
        }
    }

    inertiaAnimation() {
        if (!this.isInertia) return;
        
        const newPos = this.constrainPosition(
            this.x + this.velocity.x,
            this.y + this.velocity.y
        );
        
        // 碰到边界时停止对应方向的速度
        if (newPos.x !== this.x + this.velocity.x) this.velocity.x = 0;
        if (newPos.y !== this.y + this.velocity.y) this.velocity.y = 0;
        
        this.x = newPos.x;
        this.y = newPos.y;
        this.updatePosition();
        
        // 应用减速
        this.velocity.x *= this.DECELERATION;
        this.velocity.y *= this.DECELERATION;
        
        // 检查是否停止
        if (Math.abs(this.velocity.x) < this.MIN_VELOCITY && 
            Math.abs(this.velocity.y) < this.MIN_VELOCITY) {
            this.isInertia = false;
            this.velocity.x = 0;
            this.velocity.y = 0;
            return;
        }
        
        requestAnimationFrame(() => this.inertiaAnimation());
    }

    handleSelectStart(e) {
        e.preventDefault();
    }

    setInitialPosition() {
        let x = 0;
        let y = 0;
        
        // 优先使用百分比设置
        if (this.initialXPercent !== 0 || this.initialYPercent !== 0) {
            // 计算百分比对应的像素值
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const { width, height } = this.getContentDimensions();
            
            // 百分比是基于可用空间计算的（屏幕尺寸 - 组件尺寸）
            const availableWidth = Math.max(0, screenWidth - width);
            const availableHeight = Math.max(0, screenHeight - height);
            
            x = (this.initialXPercent / 100) * availableWidth;
            y = (this.initialYPercent / 100) * availableHeight;
        }
        // 如果没有百分比设置，使用像素值设置
        else if (this.initialX !== 0 || this.initialY !== 0) {
            x = this.initialX;
            y = this.initialY;
        }
        
        // 应用位置约束并设置位置
        const constrainedPos = this.constrainPosition(x, y);
        this.setPosition(constrainedPos.x, constrainedPos.y);
    }

    render() {
        return html`
            <div class="position-container">
                <div class="content-wrapper">
                    <slot></slot>
                </div>
            </div>
        `;
    }
}

customElements.define('draggable-container', DraggableContainer);