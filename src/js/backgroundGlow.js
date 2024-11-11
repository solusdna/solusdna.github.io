class GlowEffect {
    constructor() {
        this.glowElement = document.querySelector('.influencer-content::before');
        this.positions = this.generatePositions();
        this.currentIndex = 0;
        this.animate();
    }

    generatePositions() {
        const positions = [];
        const points = 5;
        
        for (let i = 0; i < points; i++) {
            positions.push({
                x: 20 + Math.random() * 60,
                y: 20 + Math.random() * 60,
                opacity: 0.4 + Math.random() * 0.4
            });
        }
        return positions;
    }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    animate() {
        const current = this.positions[this.currentIndex];
        const next = this.positions[(this.currentIndex + 1) % this.positions.length];
        let progress = 0;
        
        const move = () => {
            progress += 0.002;
            
            if (progress >= 1) {
                this.currentIndex = (this.currentIndex + 1) % this.positions.length;
                progress = 0;
            }

            const x = this.lerp(current.x, next.x, progress);
            const y = this.lerp(current.y, next.y, progress);
            const opacity = this.lerp(current.opacity, next.opacity, progress);

            document.documentElement.style.setProperty('--glow-x', `${x}%`);
            document.documentElement.style.setProperty('--glow-y', `${y}%`);
            document.documentElement.style.setProperty('--glow-opacity', opacity);

            requestAnimationFrame(move);
        };

        requestAnimationFrame(move);
    }
}