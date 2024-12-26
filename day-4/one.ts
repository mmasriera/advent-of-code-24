
import { readInputByLines } from '../utils/index.ts';

const XMAS = 'XMAS';

const hasAdjacentMatch = (
    puzzle: string[], startRow: number, startCol: number, increaseRow: number, increaseCol: number
): boolean => (
    puzzle[startRow + increaseRow]?.[startCol + increaseCol] === XMAS[1]
    && puzzle[startRow + increaseRow * 2]?.[startCol + increaseCol * 2] === XMAS[2]
    && puzzle[startRow + increaseRow * 3]?.[startCol + increaseCol * 3] === XMAS[3]
);

const positionCount = (puzzle: string[], rowIdx: number, colIdx: number): number => {
    let count = 0; // it could be more than a match for this position

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, 0, 1)) { // right
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, 0, -1)) { // left
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, 1, 0)) { // down
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, -1, 0)) { // up
        count += 1;
    }

    // check diagonals
    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, 1, 1)) { // up-right
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, 1, -1)) { // up-left
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, -1, 1)) { // down-right
        count += 1;
    }

    if (hasAdjacentMatch(puzzle, rowIdx, colIdx, -1, -1)) { // down-left
        count += 1;
    }

    return count;
}

const getOccurrences = (puzzle: string[]): number => {
    let count = 0;

    puzzle.forEach((row, rowIdx) => {
        Array.from(row).forEach((cell, colIdx) => {
            if (cell === XMAS[0]) {
                count += positionCount(puzzle, rowIdx, colIdx);
            }
        });
    });

    return count;
};


const main = (): number => {
    const puzzle = readInputByLines('./inputs/input-one.txt');

    return getOccurrences(puzzle);
}

console.log('result day 4, part 1:', main()); // 2562
