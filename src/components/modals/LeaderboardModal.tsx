import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Target, X } from 'lucide-react';
import clsx from 'clsx';

interface LeaderboardModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LeaderboardModal = ({ isOpen, onClose }: LeaderboardModalProps) => {
    const [tab, setTab] = useState<'streaks' | 'wins'>('streaks');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-lg bg-[#0a0a16] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative min-h-[500px]"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <div className="flex items-center space-x-2 text-yellow-500">
                        <Trophy size={20} />
                        <span className="font-bold text-white">Leaderboard</span>
                    </div>
                    <button onClick={onClose}>
                        <X className="text-gray-400 hover:text-white" />
                    </button>
                </div>

                <div className="p-6">
                    {/* Tabs */}
                    <div className="flex bg-space-light/50 p-1 rounded-lg mb-8">
                        <button
                            onClick={() => setTab('streaks')}
                            className={clsx(
                                "flex-1 flex items-center justify-center space-x-2 py-2 rounded-md font-bold text-sm transition-all",
                                tab === 'streaks' ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <Flame size={16} /> <span>Streaks</span>
                        </button>
                        <button
                            onClick={() => setTab('wins')}
                            className={clsx(
                                "flex-1 flex items-center justify-center space-x-2 py-2 rounded-md font-bold text-sm transition-all",
                                tab === 'wins' ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" : "text-gray-400 hover:text-white"
                            )}
                        >
                            <Target size={16} /> <span>Total Wins</span>
                        </button>
                    </div>

                    {/* Content - Placeholder for now as we don't have backend */}
                    <div className="flex flex-col items-center justify-center h-48 space-y-4 text-center">
                        <div className="w-full p-8 bg-space-light/20 rounded-lg border border-white/5">
                            <p className="text-gray-400 text-sm">No data yet. Be the first to play!</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
