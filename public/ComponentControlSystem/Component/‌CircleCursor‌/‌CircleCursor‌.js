class CircleCursor {
    constructor(options = {}) {
        // 默认配置
        const defaultOptions = {
            size: 50,
            animationSpeed: 0.05,
            color: '#ffffff',
            mixBlendMode: 'difference'
        };

        // 合并配置
        this.config = { ...defaultOptions, ...options };

        // 创建圆圈元素
        this.circle = document.createElement('div');
        this.circle.className = 'circle-cursor';
        this.circle.style.cssText = `
            width: ${this.config.size}px;
            height: ${this.config.size}px;
            background-color: ${this.config.color};
            border-radius: 100%;
            position: fixed;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
            mix-blend-mode: ${this.config.mixBlendMode};
        `;
        document.body.appendChild(this.circle);

        // 鼠标位置和圆圈位置变量
        this.mouseX = 0;
        this.mouseY = 0;
        this.circleX = 0;
        this.circleY = 0;

        // 绑定事件
        this.handleMouseMove = (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        };

        // 监听鼠标移动
        document.addEventListener('mousemove', this.handleMouseMove);

        // 启动动画
        this.animate();
    }

    // 动画函数
    animate() {
        const dx = this.mouseX - this.circleX;
        const dy = this.mouseY - this.circleY;

        this.circleX += dx * this.config.animationSpeed;
        this.circleY += dy * this.config.animationSpeed;

        this.circle.style.left = this.circleX + 'px';
        this.circle.style.top = this.circleY + 'px';

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // 更新配置
    updateConfig(newOptions) {
        Object.assign(this.config, newOptions);
        this.circle.style.width = `${this.config.size}px`;
        this.circle.style.height = `${this.config.size}px`;
        this.circle.style.backgroundColor = this.config.color;
        this.circle.style.mixBlendMode = this.config.mixBlendMode;
    }

    // 销毁实例
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        document.removeEventListener('mousemove', this.handleMouseMove);
        if (this.circle && this.circle.parentNode) {
            this.circle.remove();
        }
    }
}

// 导出和全局注册
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircleCursor;
}
window.CircleCursor = CircleCursor;
