export type TileStatus = 'correct' | 'present' | 'absent' | 'empty' | 'tbd';

export interface FormattedGuess {
    key: string;
    color: TileStatus;
}
