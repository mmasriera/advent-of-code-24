
import { readInputByLines } from '../utils/index.ts';

type Reports = string[][];

const XMAS = 'XMAS';

const checkPattern = (puzzle: string[], rowIdx: number, colIdx: number): boolean => {
    const following = puzzle[rowIdx].slice(colIdx, colIdx + 4);

    return following === XMAS;
}

const getOccurrences = (puzzle: string[]): number => {
    let count = 0;

    puzzle.forEach((row, rowIdx) => {
        Array.from(row).forEach((cell, colIdx) => {
            if (cell === XMAS[0]) { // matches "X" then check the next 4 chars in every direction
                // const following = puzzle[rowIdx].slice(colIdx, colIdx + 4);

                if (checkPattern(puzzle, rowIdx, colIdx)) {
                    count += 1;
                }
            }
        });
    });

    return count;
};

const getPuzzle = (): string[] => {
    return readInputByLines('./inputs/input-test.txt');
}

const main = (): number => {
    const puzzle = getPuzzle();

    return getOccurrences(puzzle);
}

console.log('result day 4, part 1:', main()); // 
