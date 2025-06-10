function createStarsTrail({
    maxStars = 60,
    colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'],
    baseSizeRange = [8, 15],
    maxDistance = 100,
    spawnFrequency = 15,
    frequencyVariation = 0.6,
    rotationRange = [-45, 45],
    fadeSpeed = 0.95
} = {}) {
    // 创建canvas元素
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 999999;';
    document.body.appendChild(canvas);

    // 获取canvas上下文
    const ctx = canvas.getContext('2d');

    // 设置canvas尺寸为窗口大小
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 初始化尺寸
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 星星类
    class Star {
        constructor(x, y, size, color, angle, speed) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.color = color;
            this.angle = angle;
            this.speed = speed;
            this.alpha = 1;
            this.rotation = Math.random() * (rotationRange[1] - rotationRange[0]) + rotationRange[0];
        }

        update() {
            // 更新位置
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            // 更新透明度
            this.alpha *= fadeSpeed;

            // 更新旋转
            this.rotation += 2;

            return this.alpha > 0.1;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);

            // 设置透明度
            ctx.globalAlpha = this.alpha;

            // 绘制五角星
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                const x = Math.cos(angle) * this.size;
                const y = Math.sin(angle) * this.size;
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();

            // 填充颜色
            ctx.fillStyle = this.color;
            ctx.fill();

            ctx.restore();
        }
    }

    let stars = [];
    let lastX = 0;
    let lastY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let accumulatedDistance = 0;
    let isMouseMoving = false;

    // 计算星星大小
    function calculateStarSize() {
        return Math.random() * (baseSizeRange[1] - baseSizeRange[0]) + baseSizeRange[0];
    }

    // 计算扩散向量
    function calculateSpreadVector(dx, dy) {
        const angle = Math.atan2(dy, dx);
        const direction = Math.random() < 0.5 ? -1 : 1;
        const spreadAngle = (Math.random() * Math.PI / 3) * direction;
        const finalAngle = angle + spreadAngle;
        const speed = Math.sqrt(dx * dx + dy * dy) * 0.05;

        return {
            angle: finalAngle,
            speed: speed
        };
    }

    // 判断是否应该生成新星星
    function shouldSpawnStar(distance) {
        accumulatedDistance += distance;
        const maxVariation = spawnFrequency * frequencyVariation;
        const currentThreshold = spawnFrequency + Math.random() * maxVariation;

        if (accumulatedDistance >= currentThreshold) {
            accumulatedDistance = 0;
            return true;
        }
        return false;
    }

    // 动画循环
    function animate() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新和绘制所有星星
        stars = stars.filter(star => {
            const isAlive = star.update();
            if (isAlive) {
                star.draw();
            }
            return isAlive;
        });

        // 如果鼠标在移动，生成新星星
        if (isMouseMoving) {
            const dx = mouseX - lastX;
            const dy = mouseY - lastY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (shouldSpawnStar(distance)) {
                const size = calculateStarSize();
                const { angle, speed } = calculateSpreadVector(dx, dy);
                const color = colors[Math.floor(Math.random() * colors.length)];

                stars.push(new Star(mouseX, mouseY, size, color, angle, speed));

                // 限制最大星星数量
                if (stars.length > maxStars) {
                    stars.shift();
                }
            }

            lastX = mouseX;
            lastY = mouseY;
        }

        requestAnimationFrame(animate);
    }

    // 启动动画
    animate();

    // 处理鼠标移动
    const handleMouseMove = (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
        isMouseMoving = true;

        clearTimeout(window.mouseMoveTimeout);
        window.mouseMoveTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);

    // 返回清理函数
    return {
        destroy: () => {
            document.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            clearTimeout(window.mouseMoveTimeout);
            if (canvas && canvas.parentNode) {
                canvas.remove();
            }
            stars = [];
        }
    };
}

// 初始化星星效果
const starsTrail = createStarsTrail({
    maxStars: 50,
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'],
    baseSizeRange: [5, 12],
    maxDistance: 100,
    spawnFrequency: 10,
    frequencyVariation: 0.5,
    rotationRange: [-35, 35],
    fadeSpeed: 0.98
});