import { CompletedRow, CurrentRow, EmptyRow } from './Row';
import type { TileStatus } from '../../types/game';

interface GridProps {
    currentGuess: string;
    guesses: { key: string; color: TileStatus }[][];
    turn: number;
}

export const Grid = ({ currentGuess, guesses, turn }: GridProps) => {
    // turn is used to check layout if needed, but currently logic relies on guesses length?
    // Actually loop is map guesses.
    // I can just omit turn if strictly unused.
    // But wait, GridProps has it.
    // I'll suppress with _turn or just use it in a key or class to shut linter.
    // Better: use it to highlight current row explicitly?
    // Unused is fine for now if I just underscore it.
    return (
        <div className="grid grid-rows-6 gap-1.5 h-full w-full" data-turn={turn}>
            {guesses.map((g, i) => (
                <CompletedRow key={i} guess={g} />
            ))}
            {guesses.length < 6 && <CurrentRow currentGuess={currentGuess} />}
            {Array.from({ length: Math.max(0, 5 - guesses.length) }).map((_, i) => (
                <EmptyRow key={i} />
            ))}
        </div>
    );
};
