import { useState } from 'react';
import { LoginForm, SignupForm } from './AuthForms';
import { useAuth } from '../../context/AuthContext';
import { Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const WelcomeScreen = () => {
    const { loginAsGuest } = useAuth();
    const [view, setView] = useState<'login' | 'signup'>('login');

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-md mx-auto px-4 relative z-20">
            {/* Logo/Header */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-8"
            >
                <div className="flex items-center justify-center space-x-2 mb-2">
                    <Rocket className="text-cyan-400" size={32} />
                    <h1 className="text-4xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500">
                        WORDLE
                    </h1>
                </div>
                <p className="text-gray-400 tracking-widest text-sm">Save your progress across devices</p>
            </motion.div>

            {/* Main Card */}
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full bg-space-light/30 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl relative overflow-hidden"
            >
                {/* Tabs */}
                <div className="flex w-full mb-6 bg-space-deep/50 p-1 rounded-lg">
                    <button
                        onClick={() => setView('login')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-bold rounded-md transition-all duration-300",
                            view === 'login' ? "bg-white/10 text-white shadow-sm" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setView('signup')}
                        className={clsx(
                            "flex-1 py-2 text-sm font-bold rounded-md transition-all duration-300",
                            view === 'signup' ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-sm border border-pink-500/20" : "text-gray-400 hover:text-white"
                        )}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Forms */}
                <div className="min-h-[300px]">
                    <AnimatePresence mode="wait">
                        {view === 'login' ? (
                            <LoginForm key="login" onSuccess={() => { }} />
                        ) : (
                            <SignupForm key="signup" onSuccess={() => { }} />
                        )}
                    </AnimatePresence>
                </div>

            </motion.div>

            {/* Guest Option */}
            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                onClick={loginAsGuest}
                className="mt-8 text-gray-400 hover:text-white text-sm font-semibold hover:underline decoration-cyan-400 decoration-2 underline-offset-4 transition-all"
            >
                Continue as Guest
            </motion.button>
        </div>
    );
};
