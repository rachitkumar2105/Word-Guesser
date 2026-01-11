import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: LucideIcon;
    label: string;
}

export const SpaceInput = ({ icon: Icon, label, className, ...props }: InputProps) => {
    return (
        <div className={clsx("space-y-1.5", className)}>
            <label className="text-sm font-semibold text-gray-300 ml-1">
                {label}
            </label>
            <div className="relative group">
                {Icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    className={clsx(
                        "w-full bg-space-light/50 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-600 outline-none transition-all duration-300",
                        "focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:bg-space-light/80",
                        Icon && "pl-10"
                    )}
                    {...props}
                />
            </div>
        </div>
    );
};
