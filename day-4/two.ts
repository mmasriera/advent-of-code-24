import { readInputByLines } from '../utils/index.ts';

const MAS = 'MAS';

const hasAdjacentMatch = (
	puzzle: string[],
	startRow: number,
	startCol: number,
	increaseRow: number,
	increaseCol: number,
): boolean =>
	puzzle[startRow]?.[startCol] === MAS[0] &&
	puzzle[startRow + increaseRow * 2]?.[startCol + increaseCol * 2] === MAS[2];

const isXmas = (puzzle: string[], rowIdx: number, colIdx: number): boolean => {
	// first line of the X in any direction
	const firstMatch =
		hasAdjacentMatch(puzzle, rowIdx - 1, colIdx - 1, 1, 1) || // up-left -> down-right
		hasAdjacentMatch(puzzle, rowIdx + 1, colIdx + 1, -1, -1); // down-right -> up-left

	if (!firstMatch) {
		return false;
	}

	// second line of the X in any direction
	const secondMatch =
		hasAdjacentMatch(puzzle, rowIdx - 1, colIdx + 1, 1, -1) || // up-right -> down-left
		hasAdjacentMatch(puzzle, rowIdx + 1, colIdx - 1, -1, 1); // down-left -> up-right

	return firstMatch && secondMatch;
};

const getOccurrences = (puzzle: string[]): number => {
	let count = 0;

	puzzle.forEach((row, rowIdx) => {
		Array.from(row).forEach((cell, colIdx) => {
			if (cell === MAS[1] && isXmas(puzzle, rowIdx, colIdx)) {
				// look for A & check the adjacent X
				count += 1;
			}
		});
	});

	return count;
};

const main = (): number => {
	const puzzle = readInputByLines('./inputs/input-one.txt');

	return getOccurrences(puzzle);
};

console.log('result day 4, part 2:', main()); // 1902
