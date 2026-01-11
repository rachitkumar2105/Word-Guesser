import clsx from 'clsx';
import { Delete } from 'lucide-react';
import { useEffect } from 'react';
import type { TileStatus } from '../../types/game';

interface KeyboardProps {
    onChar: (value: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    usedKeys: { [key: string]: TileStatus };
}

export const Keyboard = ({ onChar, onDelete, onEnter, usedKeys }: KeyboardProps) => {
    const keys = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BSP']
    ];

    const getKeyStyles = (key: string) => {
        const status = usedKeys[key];
        const base = "font-bold rounded text-sm sm:text-base flex items-center justify-center transition-all duration-150 active:scale-95 select-none";

        // Special Keys (Enter, Backspace)
        if (key === 'ENTER' || key === 'BSP') {
            return clsx(base, "bg-space-light hover:bg-space-light/80 text-white w-14 sm:w-16 h-10 sm:h-12 text-[10px] sm:text-xs");
        }

        // Status Colors
        switch (status) {
            case 'correct':
                return clsx(base, "bg-space-success border-space-success text-space-deep h-10 sm:h-12 w-8 sm:w-10");
            case 'present':
                return clsx(base, "bg-space-warning border-space-warning text-space-deep h-10 sm:h-12 w-8 sm:w-10");
            case 'absent':
                return clsx(base, "bg-space-deep/50 border border-white/20 text-gray-500 h-10 sm:h-12 w-8 sm:w-10");
            default:
                return clsx(base, "bg-space-light hover:bg-space-light/80 text-white h-10 sm:h-12 w-8 sm:w-10");
        }
    };

    // Handle physical keyboard input
    useEffect(() => {
        const handleResize = () => {
            // Maybe specific mobile adjustments
        };
        return () => window.addEventListener('resize', handleResize);
    }, []);

    return (
        <div className="w-full max-w-5xl mx-auto p-1 pb-2">
            {keys.map((row, i) => (
                <div key={i} className="flex justify-center space-x-1.5 sm:space-x-2 mb-2">
                    {row.map((key) => {
                        return (
                            <button
                                key={key}
                                onClick={() => {
                                    if (key === 'ENTER') onEnter();
                                    else if (key === 'BSP') onDelete();
                                    else onChar(key);
                                }}
                                className={getKeyStyles(key)}
                            >
                                {key === 'BSP' ? <Delete size={20} /> : key}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
