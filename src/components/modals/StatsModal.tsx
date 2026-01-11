import { motion } from 'framer-motion';
import clsx from 'clsx';
import { X } from 'lucide-react';

interface StatsModalProps {
    isOpen: boolean;
    onClose: () => void;
    solution: string;
    isCorrect: boolean;
    turn: number;
    // Mock data for distribution
    gamesPlayed?: number;
    winRate?: number;
    currentStreak?: number;
    maxStreak?: number;

    distribution?: number[];
    isDaily?: boolean;
    onNewGame?: () => void;
}

export const StatsModal = ({
    isOpen,
    onClose,
    solution,
    isCorrect,
    turn,
    gamesPlayed = 0,
    winRate = 0,
    currentStreak = 0,
    maxStreak = 0,
    distribution = [0, 0, 0, 0, 0, 0], // 6 rows
    isDaily = true,
    onNewGame
}: StatsModalProps) => {
    if (!isOpen) return null;

    const maxDistVal = Math.max(...distribution, 1); // Avoid div by zero

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-sm bg-space-light/95 border border-white/10 rounded-xl shadow-2xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 ml-auto mr-auto pl-6">
                        Statistics
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-cyan-400" />
                    </button>
                </div>

                <div className="p-6 space-y-8">
                    {/* Stat Grid */}
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{gamesPlayed}</span>
                            <span className="text-xs text-gray-400">Played</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{winRate}</span>
                            <span className="text-xs text-gray-400">Win %</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{currentStreak}</span>
                            <span className="text-xs text-gray-400">Current Streak</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{maxStreak}</span>
                            <span className="text-xs text-gray-400">Max Streak</span>
                        </div>
                    </div>

                    {/* Guess Distribution */}
                    <div>
                        <h3 className="font-bold text-sm mb-3">Guess Distribution</h3>
                        <div className="space-y-2">
                            {distribution.map((val, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                    <span className="w-2 font-mono text-sm">{i + 1}</span>
                                    <div className="flex-1 h-5 bg-space-deep/50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(val / maxDistVal) * 100}%` }}
                                            transition={{ duration: 0.5, delay: i * 0.1 }}
                                            className={clsx(
                                                "h-full flex items-center justify-end px-2 text-xs font-bold",
                                                // Highlight the current turn if game won
                                                (isCorrect && turn === i + 1)
                                                    ? "bg-gradient-to-r from-green-400 to-green-600 text-black"
                                                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                                            )}
                                        >
                                            {val > 0 && val}
                                        </motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer / Next Game */}
                    {(isCorrect || turn > 6) && (
                        <div className="pt-4 border-t border-white/10 text-center">
                            <div className="mb-4">
                                <span className="text-gray-400 text-sm uppercase tracking-widest block mb-1">
                                    {isCorrect ? 'Correct!' : 'The word was'}
                                </span>
                                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 tracking-wider">
                                    {solution}
                                </span>
                            </div>
                            <button
                                onClick={(!isDaily && onNewGame) ? onNewGame : onClose}
                                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-bold shadow-lg shadow-purple-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                {!isDaily ? 'Play Again' : 'Close'}
                            </button>
                        </div>
                    )}
                </div>
            </motion.div >
        </div >
    );
};
