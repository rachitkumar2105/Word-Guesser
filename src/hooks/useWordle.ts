import { useState, useEffect } from 'react';
import { isValidWord } from '../data/words';
import type { TileStatus, FormattedGuess } from '../types/game';

export const useWordle = (solution: string) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState<FormattedGuess[][]>([]); // History of formatted guesses
    const [history, setHistory] = useState<string[]>([]); // History of string guesses
    const [isCorrect, setIsCorrect] = useState(false);
    const [usedKeys, setUsedKeys] = useState<{ [key: string]: TileStatus }>({});

    // Reset game state when solution changes (e.g. mode switch)
    useEffect(() => {
        setTurn(0);
        setCurrentGuess('');
        setGuesses([]);
        setHistory([]);
        setIsCorrect(false);
        setUsedKeys({});
    }, [solution]);

    // Format a guess into an array of letter objects with colors
    const formatGuess = () => {
        let solutionArray: (string | null)[] = [...solution.toUpperCase()];
        let formattedGuess: FormattedGuess[] = [...currentGuess].map((l) => ({ key: l, color: 'absent' }));

        // First pass: Find Green matches
        formattedGuess.forEach((l, i) => {
            if (solutionArray[i] === l.key) {
                formattedGuess[i].color = 'correct';
                solutionArray[i] = null;
            }
        });

        // Second pass: Find Yellow matches
        formattedGuess.forEach((l, i) => {
            if (l.color !== 'correct' && solutionArray.includes(l.key)) {
                formattedGuess[i].color = 'present';
                solutionArray[solutionArray.indexOf(l.key)] = null;
            }
        });

        return formattedGuess;
    };

    // Add a new guess to the state
    const addNewGuess = (formattedGuess: FormattedGuess[]) => {
        if (currentGuess === solution) {
            setIsCorrect(true);
        }

        setGuesses((prevGuesses) => {
            return [...prevGuesses, formattedGuess];
        });

        setHistory((prevHistory) => [...prevHistory, currentGuess]);

        setTurn((prevTurn) => prevTurn + 1);

        setUsedKeys((prevUsedKeys) => {
            let newKeys = { ...prevUsedKeys };

            formattedGuess.forEach((l) => {
                const currentColor = newKeys[l.key];

                if (l.color === 'correct') {
                    newKeys[l.key] = 'correct';
                    return;
                }
                if (l.color === 'present' && currentColor !== 'correct') {
                    newKeys[l.key] = 'present';
                    return;
                }
                if (l.color === 'absent' && currentColor !== 'correct' && currentColor !== 'present') {
                    newKeys[l.key] = 'absent';
                    return;
                }
            });

            return newKeys;
        });

        setCurrentGuess('');
    };

    // Handle keyup events & virtual keyboard input
    const handleKeyup = ({ key }: { key: string }) => {
        if (isCorrect || turn > 5) {
            return;
        }

        if (key === 'Enter') {
            if (turn > 5) {
                console.log('used all guesses');
                return;
            }
            if (history.includes(currentGuess)) {
                // Implement Shake Animation Trigger Here (Future Polish)
                console.log('already guessed');
                return;
            }
            if (currentGuess.length !== 5) {
                console.log('word must be 5 chars long');
                return;
            }

            if (!isValidWord(currentGuess)) {
                console.log('word not found');
                // You could add a toast or shake state here
                return;
            }

            const formatted = formatGuess();
            addNewGuess(formatted);
        }

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1));
            return;
        }

        if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => (prev + key).toUpperCase());
            }
        }
    };

    return { turn, currentGuess, guesses, isCorrect, usedKeys, handleKeyup };
};
