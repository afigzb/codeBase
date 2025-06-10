class FluidCursor {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.mouse = { x: 0, y: 0 };
        this.time = 0;
        this.trail = []; // 鼠标轨迹点
        this.animationId = null;
        this.isDestroyed = false;
        
        // ==================== 配置项说明 ====================
        this.config = {
            // 【线条配置】
            layerCount: 6,              // 流体线条数量 
            maxLineWidth: 2,            // 最大线条宽度 
            minLineWidth: 1,            // 最小线条宽度 
            
            maxTrailLength: 30,         // 轨迹最大长度
            trailLifetime: 0.8,         // 线条收束时间/秒
            
            // 【平滑配置】
            smoothness: 0.5,            // 曲线平滑度 (0-1)
            
            // 【颜色配置】
            color: {
                hueSpeed: 30,           // 色相变化速度
                hueLayerOffset: 40,     // 层间色相偏移
                saturation: 60,         // 饱和度
                baseLightness: 60,      // 基础亮度
                lightnessStep: 2,       // 层间亮度递增 
                maxAlpha: 0.9,          // 最大透明度
                minAlpha: 0.6,          // 最小透明度
            },
            
            // 【光标配置】
            cursor: {
                size: 4,                // 光标基础尺寸
                pulseAmplitude: 1,      // 脉动振幅
                pulseSpeed: 6,          // 脉动速度
                glowMultiplier: 2,      // 光晕倍数
                coreSize: 2,            // 核心尺寸
                coreAlpha: 0.95,        // 核心透明度
                glowAlpha: 0.7          // 光晕透明度
            },
            
            // 【动画配置】
            timeStep: 0.03              // 时间步长 
        };
    }
    
    // 初始化方法
    init() {
        this.createCanvas();
        this.setupCanvas();
        this.bindEvents();
        this.animate();
        return this;
    }
    
    // 创建Canvas元素
    createCanvas() {
        // 移除已存在的canvas
        const existingCanvas = document.getElementById('fluid-cursor-canvas');
        if (existingCanvas) {
            existingCanvas.remove();
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'fluid-cursor-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999999;
            background: transparent;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
    }
    
    setupCanvas() {
        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = window.innerWidth * dpr;
        this.canvas.height = window.innerHeight * dpr;
        this.ctx.scale(dpr, dpr);
        this.canvas.style.width = window.innerWidth + 'px';
        this.canvas.style.height = window.innerHeight + 'px';
    }
    
    bindEvents() {
        this.handleResize = () => this.setupCanvas();
        this.handleMouseMove = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            // 添加轨迹点
            this.trail.push({
                x: this.mouse.x,
                y: this.mouse.y,
                time: this.time
            });
            
            // 限制轨迹点数量
            if (this.trail.length > this.config.maxTrailLength) {
                this.trail.shift();
            }
        };
        
        window.addEventListener('resize', this.handleResize);
        window.addEventListener('mousemove', this.handleMouseMove);
    }
    
    // 销毁方法
    destroy() {
        this.isDestroyed = true;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('mousemove', this.handleMouseMove);
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.canvas = null;
        this.ctx = null;
    }
    
    // 生成平滑曲线路径
    generateSmoothPath(points) {
        if (points.length < 3) {
            // 点数不足，直接连线
            this.ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
                this.ctx.lineTo(points[i].x, points[i].y);
            }
            return;
        }
        
        const smoothness = this.config.smoothness;
        this.ctx.moveTo(points[0].x, points[0].y);
        
        // 使用二次贝塞尔曲线连接点
        for (let i = 1; i < points.length - 1; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            const next = points[i + 1];
            
            // 计算控制点
            const cpx = curr.x + (next.x - prev.x) * smoothness * 0.5;
            const cpy = curr.y + (next.y - prev.y) * smoothness * 0.5;
            
            this.ctx.quadraticCurveTo(cpx, cpy, curr.x, curr.y);
        }
        
        // 连接最后一个点
        this.ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
    }
    
    drawSmoothTrail() {
        if (this.trail.length < 2) return;
        
        const { color } = this.config;
        
        for (let layer = 0; layer < this.config.layerCount; layer++) {
            this.ctx.beginPath();
            
            // 生成平滑路径
            this.generateSmoothPath(this.trail);
            
            // 计算样式参数
            const hue = (this.time * color.hueSpeed + layer * color.hueLayerOffset) % 360;
            const alpha = Math.max(color.minAlpha, color.maxAlpha - layer * 0.12);
            const lineWidth = Math.max(this.config.minLineWidth, this.config.maxLineWidth - layer * 0.15);
            
            this.ctx.strokeStyle = `hsla(${hue}, ${color.saturation}%, ${color.baseLightness + layer * color.lightnessStep}%, ${alpha})`;
            this.ctx.lineWidth = lineWidth;
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.stroke();
        }
    }
    
    drawCursor() {
        const { cursor } = this.config;
        const pulseSize = Math.sin(this.time * cursor.pulseSpeed) * cursor.pulseAmplitude + cursor.size;
        
        // 外圈光晕
        const gradient = this.ctx.createRadialGradient(
            this.mouse.x, this.mouse.y, 0,
            this.mouse.x, this.mouse.y, pulseSize * cursor.glowMultiplier
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${cursor.glowAlpha})`);
        gradient.addColorStop(0.5, 'rgba(100, 200, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, pulseSize * cursor.glowMultiplier, 0, Math.PI * 2);
        this.ctx.fillStyle = gradient;
        this.ctx.fill();
        
        // 内圈核心
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, cursor.coreSize, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${cursor.coreAlpha})`;
        this.ctx.fill();
    }
    
    animate() {
        if (this.isDestroyed) return;
        
        this.time += this.config.timeStep;
        
        // 清除画布
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        
        // 绘制效果
        this.drawSmoothTrail();
        this.drawCursor();
        
        // 清理过期轨迹点
        this.trail = this.trail.filter(point => this.time - point.time < this.config.trailLifetime);
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    // 深度合并配置
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                    result[key] = this.deepMerge(target[key] || {}, source[key]);
                } else {
                    result[key] = source[key];
                }
            }
        }
        
        return result;
    }
    
    // 更新配置
    updateConfig(newConfig) {
        this.config = this.deepMerge(this.config, newConfig);
        
        // 调整轨迹长度
        if (newConfig.maxTrailLength && this.trail.length > newConfig.maxTrailLength) {
            this.trail = this.trail.slice(-newConfig.maxTrailLength);
        }
        
        // 验证平滑度范围
        if (this.config.smoothness !== undefined) {
            this.config.smoothness = Math.max(0, Math.min(1, this.config.smoothness));
        }
        
        return this;
    }
    
    // 获取当前配置
    getConfig() {
        return JSON.parse(JSON.stringify(this.config));
    }
    
    // 重置为默认配置
    resetConfig() {
        this.config = new FluidCursor().config;
        return this;
    }
    
    // 应用预设配置
    applyPreset(presetName) {
        const presets = {
            subtle: {
                layerCount: 4,
                maxTrailLength: 10,
                trailLifetime: 0.3,
                smoothness: 0.7,
                color: { saturation: 60, maxAlpha: 0.7 }
            },
            intense: {
                layerCount: 8,
                maxLineWidth: 3.0,
                maxTrailLength: 25,
                trailLifetime: 0.6,
                smoothness: 0.4,
                color: { saturation: 90, maxAlpha: 0.95 }
            },
            neon: {
                maxTrailLength: 20,
                trailLifetime: 0.5,
                smoothness: 0.6,
                color: { 
                    saturation: 100, 
                    baseLightness: 80,
                    hueSpeed: 80
                }
            },
            minimal: {
                layerCount: 3,
                maxLineWidth: 1.0,
                maxTrailLength: 8,
                trailLifetime: 0.25,
                smoothness: 0.8
            }
        };
        
        if (presets[presetName]) {
            this.updateConfig(presets[presetName]);
        }
        
        return this;
    }
}

// 导出和全局注册
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FluidCursor;
}
window.FluidCursor = FluidCursor;
