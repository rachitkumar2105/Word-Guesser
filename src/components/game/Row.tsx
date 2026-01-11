import { Tile } from './Tile';
import type { TileStatus } from '../../types/game';



export const CompletedRow = ({ guess }: { guess: { key: string; color: TileStatus }[] }) => {
    return (
        <div className="grid grid-cols-5 gap-1.5">
            {guess.map((l, i) => (
                <Tile key={i} letter={l.key} status={l.color} delay={i * 0.2} />
            ))}
        </div>
    );
};

export const CurrentRow = ({ currentGuess }: { currentGuess: string }) => {
    const splitGuess = currentGuess.split('');
    const emptyCells = Array.from({ length: 5 - splitGuess.length });

    return (
        <div className="grid grid-cols-5 gap-1.5">
            {splitGuess.map((letter, i) => (
                <Tile key={i} letter={letter} status="tbd" />
            ))}
            {emptyCells.map((_, i) => (
                <Tile key={i} status="empty" />
            ))}
        </div>
    );
};

export const EmptyRow = () => {
    return (
        <div className="grid grid-cols-5 gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Tile key={i} status="empty" />
            ))}
        </div>
    );
};
