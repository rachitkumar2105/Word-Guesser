import { Tile } from '../game/Tile';

export const HowToPlay = () => {
    return (
        <div className="space-y-4 text-gray-300">
            <p>Guess the <span className="font-bold text-white">WORDLE</span> in 6 tries.</p>

            <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Each guess must be a valid 5-letter word.</li>
                <li>The color of the tiles will change to show how close your guess was to the word.</li>
            </ul>

            <div className="space-y-3 mt-4">
                <h3 className="font-bold text-white">Examples</h3>

                {/* Correct Example */}
                <div className="flex items-center space-x-1">
                    <Tile letter="W" status="correct" small />
                    <Tile letter="E" status="empty" small />
                    <Tile letter="A" status="empty" small />
                    <Tile letter="R" status="empty" small />
                    <Tile letter="Y" status="empty" small />
                </div>
                <p className="text-sm"><span className="font-bold text-space-success">W</span> is in the word and in the correct spot.</p>

                {/* Present Example */}
                <div className="flex items-center space-x-1">
                    <Tile letter="P" status="empty" small />
                    <Tile letter="I" status="present" small />
                    <Tile letter="L" status="empty" small />
                    <Tile letter="L" status="empty" small />
                    <Tile letter="S" status="empty" small />
                </div>
                <p className="text-sm"><span className="font-bold text-space-warning">I</span> is in the word but in the wrong spot.</p>

                {/* Absent Example */}
                <div className="flex items-center space-x-1">
                    <Tile letter="V" status="empty" small />
                    <Tile letter="A" status="empty" small />
                    <Tile letter="G" status="empty" small />
                    <Tile letter="U" status="absent" small />
                    <Tile letter="E" status="empty" small />
                </div>
                <p className="text-sm"><span className="text-gray-400 font-bold">U</span> is not in the word in any spot.</p>
            </div>

            <div className="border-t border-white/10 pt-4 mt-4">
                <h3 className="font-bold text-white mb-2">Game Modes</h3>
                <p className="text-sm mb-2">
                    <span className="text-cyan-400 font-bold">Daily:</span> A new puzzle every day. Everyone gets the same word!
                </p>
                <p className="text-sm">
                    <span className="text-purple-400 font-bold">Unlimited:</span> Play as many games as you want with random words.
                </p>
            </div>
        </div>
    );
};
