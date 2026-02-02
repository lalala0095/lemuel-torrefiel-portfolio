import { useEffect, useRef } from 'react';

const MatrixRain = ({ opacity = 0.08, speed = 1, color = '#00ff00' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>{}[]();:=/\\|';
        const charArray = chars.split('');

        let columns = [];
        const fontSize = 14;

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const columnCount = Math.floor(canvas.width / fontSize);
            columns = Array(columnCount).fill(0).map(() => ({
                y: Math.random() * canvas.height,
                speed: Math.random() * 0.5 + 0.5
            }));
        };

        const draw = () => {
            // Fade effect
            ctx.fillStyle = `rgba(15, 15, 35, ${0.05 * speed})`;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            columns.forEach((col, i) => {
                const char = charArray[Math.floor(Math.random() * charArray.length)];
                const x = i * fontSize;

                // Gradient from bright to dim
                const gradient = ctx.createLinearGradient(x, col.y - 100, x, col.y);
                gradient.addColorStop(0, `rgba(139, 92, 246, 0)`);
                gradient.addColorStop(0.8, `rgba(139, 92, 246, ${opacity * 0.5})`);
                gradient.addColorStop(1, `rgba(6, 182, 212, ${opacity})`);

                ctx.fillStyle = gradient;
                ctx.fillText(char, x, col.y);

                // Bright head
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 2})`;
                ctx.fillText(char, x, col.y);

                col.y += fontSize * col.speed * speed;

                if (col.y > canvas.height && Math.random() > 0.98) {
                    col.y = 0;
                    col.speed = Math.random() * 0.5 + 0.5;
                }
            });

            animationId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        window.addEventListener('resize', resize);

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, [opacity, speed, color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

export default MatrixRain;
