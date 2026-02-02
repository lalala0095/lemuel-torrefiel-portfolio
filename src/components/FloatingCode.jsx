import { useEffect, useRef } from 'react';

const FloatingCode = ({ density = 15, speed = 1, opacity = 0.15 }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const codeSymbols = ['{', '}', '<', '>', '/', ';', '()', '[]', '=>', '&&', '||', '!=', '==', '++', '--', '/*', '*/', '$ ', '# ', 'if', 'for', 'let', 'const', 'def', 'class', 'import', 'return', 'async', 'await'];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const count = Math.floor((canvas.width * canvas.height) / (20000 / density));

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    symbol: codeSymbols[Math.floor(Math.random() * codeSymbols.length)],
                    size: Math.random() * 12 + 10,
                    speedX: (Math.random() - 0.5) * speed * 0.5,
                    speedY: (Math.random() * 0.5 + 0.1) * speed,
                    opacity: Math.random() * opacity + 0.05,
                    rotation: Math.random() * 360,
                    rotationSpeed: (Math.random() - 0.5) * 2
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rotation * Math.PI) / 180);
                ctx.font = `${p.size}px 'Fira Code', 'Monaco', 'Consolas', monospace`;
                ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity})`;
                ctx.textAlign = 'center';
                ctx.fillText(p.symbol, 0, 0);
                ctx.restore();

                // Update position
                p.x += p.speedX;
                p.y += p.speedY;
                p.rotation += p.rotationSpeed;

                // Wrap around
                if (p.y > canvas.height + 20) {
                    p.y = -20;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x > canvas.width + 20) p.x = -20;
                if (p.x < -20) p.x = canvas.width + 20;
            });

            animationId = requestAnimationFrame(animate);
        };

        resize();
        animate();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [density, speed, opacity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default FloatingCode;
