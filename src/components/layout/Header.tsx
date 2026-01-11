import { HelpCircle, BarChart2, Trophy, User } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface HeaderProps {
    isDaily: boolean;
    toggleMode: () => void;
    onOpenModal: (modal: 'help' | 'stats' | 'leaderboard' | 'profile') => void;
}

export const Header = ({ isDaily, toggleMode, onOpenModal }: HeaderProps) => {
    return (
        <header className="w-full flex flex-col items-center py-2 px-4 relative z-20">
            {/* Top Row: Icons & Title */}
            <div className="w-full flex items-center justify-between max-w-6xl mx-auto">
                {/* Left */}
                <button onClick={() => onOpenModal('help')} className="p-2 text-gray-400 hover:text-white transition-colors" aria-label="How to play">
                    <HelpCircle size={20} />
                </button>

                {/* Center Title */}
                <div className="flex items-baseline space-x-2 select-none absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 font-sans">
                        WORDLE
                    </h1>
                    <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-gray-400 hidden sm:inline-block">
                        SPACE
                    </span>
                </div>

                {/* Right */}
                <div className="flex items-center space-x-1 sm:space-x-2">
                    <button onClick={() => onOpenModal('stats')} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <BarChart2 size={20} />
                    </button>
                    <button onClick={() => onOpenModal('leaderboard')} className="p-2 text-gray-400 hover:text-white transition-colors hidden sm:block">
                        <Trophy size={20} />
                    </button>
                    <button onClick={() => onOpenModal('profile')} className="p-2 text-gray-400 hover:text-white transition-colors">
                        <User size={20} />
                    </button>
                </div>
            </div>

            {/* Bottom Row: Toggle */}
            <div className="mt-2 bg-space-light/50 p-1 rounded-full flex items-center relative backdrop-blur-sm border border-white/10 scale-90 origin-top">
                {/* Daily Button */}
                <button
                    onClick={() => !isDaily && toggleMode()}
                    className={clsx(
                        "px-6 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 w-24",
                        isDaily ? "text-white" : "text-gray-400 hover:text-white"
                    )}
                >
                    Daily
                </button>

                {/* Unlimited Button */}
                <button
                    onClick={() => isDaily && toggleMode()}
                    className={clsx(
                        "px-6 py-1.5 rounded-full text-sm font-bold transition-colors duration-300 relative z-10 w-32 flex items-center justify-center space-x-1",
                        !isDaily ? "text-white" : "text-gray-400 hover:text-white"
                    )}
                >
                    <span className="text-lg">∞</span> <span>Unlimited</span>
                </button>

                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className={clsx(
                        "absolute top-1 bottom-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] z-0",
                        isDaily ? "left-1 w-24" : "left-[100px] w-32"
                    )}
                />
            </div>
        </header>
    );
};
