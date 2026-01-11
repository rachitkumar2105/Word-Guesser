import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple user type
export interface User {
    id: string;
    name: string;
    email?: string;
    isGuest: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (email: string) => void;
    signup: (email: string, username: string) => void;
    loginAsGuest: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // Check for existing session on mount
    useEffect(() => {
        const stored = localStorage.getItem('wordle_user');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const login = (email: string) => {
        // Mock Login
        const newUser: User = {
            id: 'user-' + Date.now(),
            name: email.split('@')[0],
            email,
            isGuest: false
        };
        setUser(newUser);
        localStorage.setItem('wordle_user', JSON.stringify(newUser));
    };

    const signup = (email: string, username: string) => {
        // Mock Signup
        const newUser: User = {
            id: 'user-' + Date.now(),
            name: username,
            email,
            isGuest: false
        };
        setUser(newUser);
        localStorage.setItem('wordle_user', JSON.stringify(newUser));
    };

    const loginAsGuest = () => {
        const guestUser: User = {
            id: 'guest',
            name: 'Guest Player',
            isGuest: true
        };
        setUser(guestUser);
        // We don't save guest to local storage to persist session across reloads 
        // BUT usually user wants to stay logged in as guest until they close tab?
        // Let's safe it for convenience, but it's ephemeral data wise.
        localStorage.setItem('wordle_user', JSON.stringify(guestUser));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('wordle_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
};
