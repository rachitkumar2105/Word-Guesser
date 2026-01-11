import { motion } from 'framer-motion';
import { User as UserIcon, LogOut, Flame, Trophy, Target, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ProfileModal = ({ isOpen, onClose }: ProfileModalProps) => {
    const { user, logout } = useAuth();

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full max-w-sm bg-[#0a0a16] border border-white/10 rounded-xl shadow-2xl overflow-hidden relative"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-space-light/20">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                            <UserIcon className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg leading-tight">{user.name}</h3>
                            <p className="text-xs text-gray-400">{user.isGuest ? 'Sign in to save your progress' : user.email}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                        <X size={20} className="text-gray-400 hover:text-white" />
                    </button>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-2 gap-4 p-6">
                    <div className="bg-space-light/10 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                        <Target className="text-cyan-400 mb-2" size={24} />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-400">Games Played</span>
                    </div>
                    <div className="bg-space-light/10 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                        <Trophy className="text-green-400 mb-2" size={24} />
                        <span className="text-2xl font-bold">0%</span>
                        <span className="text-xs text-gray-400">Win Rate</span>
                    </div>
                    <div className="bg-space-light/10 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                        <Flame className="text-orange-400 mb-2" size={24} />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-400">Current Streak</span>
                    </div>
                    <div className="bg-space-light/10 p-4 rounded-xl border border-white/5 flex flex-col items-center">
                        <BarChartIcon className="text-purple-400 mb-2" size={24} />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-400">Best Streak</span>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 border-t border-white/10 space-y-3">
                    {user.isGuest ? (
                        <button
                            onClick={() => { logout(); onClose(); }}
                            className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-bold hover:scale-[1.02] transition-transform"
                        >
                            <span>Sign In to Save Progress</span>
                        </button>
                    ) : (
                        <button
                            onClick={logout}
                            className="w-full flex items-center justify-center space-x-2 py-3 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg font-bold hover:bg-red-500/20 transition-colors"
                        >
                            <LogOut size={18} />
                            <span>Sign Out</span>
                        </button>
                    )}
                </div>

            </motion.div>
        </div>
    );
};

// Helper icon component since BarChart2 is named BarChartIcon in some contexts or manual svg
const BarChartIcon = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
    </svg>
)
