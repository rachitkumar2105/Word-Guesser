import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Star {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
}

const generateStars = (count: number): Star[] => {
    return Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage vw
        size: Math.random() * 2 + 1, // 1-3px
        duration: Math.random() * 20 + 10, // 10-30s duration (slow fall)
        delay: Math.random() * 20,
    }));
};

export const SpaceBackground = () => {
    const [stars, setStars] = useState<Star[]>([]);

    useEffect(() => {
        setStars(generateStars(50));
    }, []);

    return (
        <div className="fixed inset-0 z-0 bg-space-deep overflow-hidden pointer-events-none">
            {/* Subtle Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-space-light/10 via-space-deep to-space-deep" />

            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    initial={{ y: -20, x: `${star.x}vw`, opacity: 0 }}
                    animate={{
                        y: '120vh',
                        opacity: [0, 0.8, 0.8, 0]
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                        ease: "linear"
                    }}
                    style={{
                        width: star.size,
                        height: star.size,
                    }}
                    className="absolute bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]"
                />
            ))}
        </div>
    );
};
