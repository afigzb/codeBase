class WaterRippleCursor {
    constructor() {
        // 简化的配置 - 更慢更柔和的波纹效果
        this.config = {
            maxRipples: 15,
            rippleColors: ['rgba(64, 164, 255, 0.6)', 'rgba(100, 180, 255, 0.5)', 'rgba(135, 200, 255, 0.55)'], // 提高透明度使颜色更显眼
            maxRadius: 120,
            expandSpeed: 1.5, // 降低扩散速度
            fadeSpeed: 0.01, // 降低衰减速度，让波纹持续更久
            spawnDelay: 90, // 增加生成延迟，减少频率
            lineWidth: 2, // 降低线宽
            speedMultiplier: 0.1,
            maxSpeedBoost: 0.1,
            trailLength: 10,
            minSpawnDistance: 50 // 最小生成距离
        };

        // 创建canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
        `;
        document.body.appendChild(this.canvas);

        // 获取上下文
        this.ctx = this.canvas.getContext('2d');

        // 设置canvas尺寸
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // 波纹数组
        this.ripples = [];

        // 鼠标位置和速度
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.lastSpawnX = 0; // 上次生成波纹的X位置
        this.lastSpawnY = 0; // 上次生成波纹的Y位置
        this.mouseSpeed = 0;
        this.lastSpawnTime = 0;
        
        // 运动轨迹
        this.trail = [];

        // 绑定事件
        this.bindEvents();

        // 开始动画
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        this.handleMouseMove = (e) => {
            // 更新鼠标位置
            this.lastMouseX = this.mouseX;
            this.lastMouseY = this.mouseY;
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            // 计算鼠标移动速度
            const dx = this.mouseX - this.lastMouseX;
            const dy = this.mouseY - this.lastMouseY;
            this.mouseSpeed = Math.sqrt(dx * dx + dy * dy);

            // 计算距离上次生成波纹的距离
            const spawnDx = this.mouseX - this.lastSpawnX;
            const spawnDy = this.mouseY - this.lastSpawnY;
            const spawnDistance = Math.sqrt(spawnDx * spawnDx + spawnDy * spawnDy);

            // 更新轨迹
            this.updateTrail();

            // 控制波纹生成频率，增加距离限制
            const now = Date.now();
            const speedFactor = Math.min(this.mouseSpeed * this.config.speedMultiplier, this.config.maxSpeedBoost);
            const adjustedDelay = Math.max(this.config.spawnDelay - speedFactor * 20, 30);
            
            if (now - this.lastSpawnTime > adjustedDelay && spawnDistance > this.config.minSpawnDistance) {
                this.createRipple(this.mouseX, this.mouseY, false, speedFactor);
                this.lastSpawnTime = now;
                this.lastSpawnX = this.mouseX;
                this.lastSpawnY = this.mouseY;
            }
        };

        this.handleMouseClick = (e) => {
            // 点击时创建更大的波纹
            const speedFactor = Math.min(this.mouseSpeed * this.config.speedMultiplier, this.config.maxSpeedBoost);
            this.createRipple(e.clientX, e.clientY, true, speedFactor);
            this.lastSpawnX = e.clientX;
            this.lastSpawnY = e.clientY;
        };

        document.addEventListener('mousemove', this.handleMouseMove);
        document.addEventListener('click', this.handleMouseClick);
    }

    updateTrail() {
        // 添加当前位置到轨迹
        this.trail.push({
            x: this.mouseX,
            y: this.mouseY,
            alpha: 1,
            size: Math.min(2 + this.mouseSpeed * 0.1, 6)
        });

        // 限制轨迹长度
        if (this.trail.length > this.config.trailLength) {
            this.trail.shift();
        }

        // 更新轨迹透明度
        this.trail.forEach((point, index) => {
            point.alpha = (index + 1) / this.trail.length * 0.3;
        });
    }

    createRipple(x, y, isClick = false, speedFactor = 1) {
        const color = this.config.rippleColors[Math.floor(Math.random() * this.config.rippleColors.length)];
        
        // 根据速度调整波纹属性
        const sizeMultiplier = 1 + speedFactor * 0.3;
        const speedMultiplier = 1 + speedFactor * 0.2;
        const alphaBoost = Math.min(0.1 + speedFactor * 0.05, 0.2); // 降低透明度增益
        
        const ripple = {
            x: x,
            y: y,
            radius: 0,
            maxRadius: (isClick ? this.config.maxRadius * 1.5 : this.config.maxRadius) * sizeMultiplier,
            alpha: (isClick ? 0.5 : 0.3) + alphaBoost, // 降低基础透明度
            color: color,
            expandSpeed: (isClick ? this.config.expandSpeed * 1.2 : this.config.expandSpeed) * speedMultiplier,
            lineWidth: (isClick ? this.config.lineWidth * 1.5 : this.config.lineWidth) + speedFactor * 0.3,
            speedFactor: speedFactor
        };

        this.ripples.push(ripple);

        // 限制波纹数量
        if (this.ripples.length > this.config.maxRipples) {
            this.ripples.shift();
        }
    }

    updateRipples() {
        this.ripples = this.ripples.filter(ripple => {
            // 更新半径
            ripple.radius += ripple.expandSpeed;
            
            // 更新透明度
            const fadeSpeed = this.config.fadeSpeed / (1 + ripple.speedFactor * 0.2);
            ripple.alpha -= fadeSpeed;
            
            // 移除完全透明或超出最大半径的波纹
            return ripple.alpha > 0 && ripple.radius < ripple.maxRadius;
        });
    }

    drawTrail() {
        // 绘制运动轨迹 - 移除混合模式
        this.trail.forEach(point => {
            this.ctx.save();
            this.ctx.fillStyle = `rgba(100, 150, 255, ${point.alpha * 0.5})`; // 降低轨迹透明度
            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, point.size * 0.8, 0, Math.PI * 2); // 缩小轨迹点
            this.ctx.fill();
            this.ctx.restore();
        });
    }

    drawRipples() {
        this.ripples.forEach(ripple => {
            this.ctx.save();
            
            // 设置样式
            this.ctx.strokeStyle = ripple.color.replace(/[\d\.]+\)$/g, `${ripple.alpha})`);
            this.ctx.lineWidth = ripple.lineWidth;
            this.ctx.lineCap = 'round';
            
            // 绘制主波纹
            this.ctx.beginPath();
            this.ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
            this.ctx.stroke();
            
            // 绘制内部小波纹（增加层次感）- 降低透明度
            if (ripple.radius > 10) {
                this.ctx.strokeStyle = ripple.color.replace(/[\d\.]+\)$/g, `${ripple.alpha * 0.3})`);
                this.ctx.lineWidth = ripple.lineWidth * 0.5;
                this.ctx.beginPath();
                this.ctx.arc(ripple.x, ripple.y, ripple.radius * 0.6, 0, Math.PI * 2);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        });
    }

    animate() {
        // 清除画布
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制运动轨迹
        this.drawTrail();

        // 更新波纹
        this.updateRipples();

        // 绘制波纹
        this.drawRipples();

        // 继续动画
        requestAnimationFrame(() => this.animate());
    }

    // 销毁实例
    destroy() {
        document.removeEventListener('mousemove', this.handleMouseMove);
        document.removeEventListener('click', this.handleMouseClick);
        window.removeEventListener('resize', this.resizeCanvas);
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.remove();
        }
        
        this.ripples = [];
        this.trail = [];
    }
}
