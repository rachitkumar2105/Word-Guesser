import { motion } from 'framer-motion';
import clsx from 'clsx';
import type { TileStatus } from '../../types/game';

interface TileProps {
    letter?: string;
    status?: TileStatus;
    delay?: number;
    small?: boolean; // For modal examples
}

export const Tile = ({ letter, status = 'empty', delay = 0, small = false }: TileProps) => {

    // Style configurations based on status
    const getStatusStyles = (s: TileStatus) => {
        switch (s) {
            case 'correct':
                return 'bg-space-success border-space-success text-space-deep'; // Green
            case 'present':
                return 'bg-space-warning border-space-warning text-space-deep'; // Yellow
            case 'absent':
                return 'bg-space-light/50 border-transparent text-gray-400'; // Grayish
            case 'tbd':
                return 'bg-space-light/20 border-white/40 text-white'; // Typed active state
            case 'empty':
            default:
                return 'bg-transparent border-space-light/30 text-white'; // Empty state
        }
    };

    return (
        <motion.div
            initial={status !== 'empty' && status !== 'tbd' ? { rotateX: 0 } : false}
            animate={status !== 'empty' && status !== 'tbd' ? { rotateX: 360 } : false}
            transition={{ duration: 0.6, delay: delay }}
            className={clsx(
                "flex items-center justify-center font-bold border-2 rounded-md select-none",
                getStatusStyles(status),
                small ? "w-8 h-8 text-sm" : "w-12 h-12 sm:w-14 sm:h-14 text-2xl sm:text-3xl"
            )}
        >
            {letter}
        </motion.div>
    );
};
