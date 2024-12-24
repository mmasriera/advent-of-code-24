
import { readInputByLines } from '../utils/index.ts';

type Reports = string[][];

const XMAS = 'XMAS';

// const hasAdjacentMatch = (puzzle: string[][], startRow: number, startCol: number, increaseRow: number, increaseCol: number): boolean => {
//     const row = startRow + increaseRow;
//     const col = startCol + increaseCol;

//     if (puzzle[row]?.[col] === XMAS[0]) {
//         return true;
//     }

//     return false;
// }

const positionCount = (puzzle: string[], rowIdx: number, colIdx: number): number => {
    let count = 0; // there could be more than a match for this position

    if (puzzle[rowIdx].slice(colIdx, colIdx + 4) === XMAS) { // right
        count += 1; // 3
    } 

    if (puzzle[rowIdx].slice(colIdx - 3, colIdx + 1) === XMAS.split('').reverse().join('')) { // left
        count += 1; // 5
    }

    if (puzzle[rowIdx]?.[colIdx] === XMAS[0] // down
        && puzzle[rowIdx + 1]?.[colIdx] === XMAS[1]
        && puzzle[rowIdx + 2]?.[colIdx] === XMAS[2]
        && puzzle[rowIdx + 3]?.[colIdx] === XMAS[3]
    ) {
        count += 1; // 6
    }

    if (puzzle[rowIdx]?.[colIdx] === XMAS[0] // up
        && puzzle[rowIdx - 1]?.[colIdx] === XMAS[1]
        && puzzle[rowIdx - 2]?.[colIdx] === XMAS[2]
        && puzzle[rowIdx - 3]?.[colIdx] === XMAS[3]
    ) {
        count += 1; // 8
    }

    // TO DO: check diagonals

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

const getPuzzle = (): string[] => {
    return readInputByLines('./inputs/input-test.txt');
}

const main = (): number => {
    const puzzle = getPuzzle();

    return getOccurrences(puzzle);
}

console.log('result day 4, part 1:', main()); // 
