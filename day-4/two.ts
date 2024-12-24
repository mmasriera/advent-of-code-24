
import { readInputByLines } from '../utils/index.ts';

type Reports = string[][];

const MAS = 'MAS';

const hasAdjacentMatch = (
    puzzle: string[], startRow: number, startCol: number, increaseRow: number, increaseCol: number
): boolean => {

    const M = puzzle[startRow]?.[startCol];
    const S = puzzle[startRow + increaseRow * 2]?.[startCol + increaseCol * 2];

    // console.log('- - > hasAdjacentMatch', { startCol, startRow, increaseCol, increaseRow, M, S });

    return ( M === MAS[0]) && (S === MAS[2]);
}

const isXmas = (puzzle: string[], rowIdx: number, colIdx: number): boolean => { 

    // console.log('A', rowIdx, colIdx);
    
    const firstMatch = (
        hasAdjacentMatch(puzzle, rowIdx - 1, colIdx - 1, 1, 1) // up-left -> down-right
        || hasAdjacentMatch(puzzle, rowIdx + 1, colIdx + 1, -1, -1) // down-right -> up-left
    );

    if (!firstMatch) {
        return false;
    }
    
    // console.log('- first match', firstMatch);

    const secondMatch = (
        hasAdjacentMatch(puzzle, rowIdx - 1, colIdx + 1, 1, -1) // up-right -> down-left
        || hasAdjacentMatch(puzzle, rowIdx + 1, colIdx - 1, -1, 1) // down-left -> up-right
    ); 

    // console.log('- second match', secondMatch);

    return firstMatch && secondMatch;
}

const getOccurrences = (puzzle: string[]): number => {
    let count = 0;

    puzzle.forEach((row, rowIdx) => {
        Array.from(row).forEach((cell, colIdx) => {
            if ((cell === MAS[1]) && isXmas(puzzle, rowIdx, colIdx)) { // look for A
                count += 1;
            }
        });
    });

    return count;
};


const main = (): number => {
    const puzzle = readInputByLines('./inputs/input-test.txt');

    return getOccurrences(puzzle);
}

console.log('result day 4, part 2:', main()); // 
