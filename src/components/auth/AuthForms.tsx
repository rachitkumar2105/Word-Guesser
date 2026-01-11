import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { SpaceInput } from '../ui/SpaceInput';
import { useAuth } from '../../context/AuthContext';

interface AuthFormsProps {
    onSuccess: () => void;
}

export const LoginForm = ({ onSuccess }: AuthFormsProps) => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password) {
            login(email);
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SpaceInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <SpaceInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-cyan-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] text-white py-3 rounded-lg font-bold shadow-lg shadow-purple-500/20 transition-all">
                Sign In
            </button>
        </form>
    );
};

export const SignupForm = ({ onSuccess }: AuthFormsProps) => {
    const { signup } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && password && username) {
            signup(email, username);
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
            <SpaceInput
                label="Username"
                placeholder="spaceplayer"
                icon={User}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <SpaceInput
                label="Email"
                type="email"
                placeholder="your@email.com"
                icon={Mail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <SpaceInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <button type="submit" className="w-full mt-6 bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-[1.02] active:scale-[0.98] text-white py-3 rounded-lg font-bold shadow-lg shadow-pink-500/20 transition-all">
                Create Account
            </button>
        </form>
    );
};
