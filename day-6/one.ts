import { readInputByLines } from '../utils/index.ts';

type Position = {
	row: number;
	col: number;
};

const BLOCKER = '#';
const GUARD = '^';

const DIRECTIONS = [
	[-1, 0], // up
	[0, 1], // right
	[1, 0], // down
	[0, -1], // left
];

const findGuard = (map: string[]): Position => {
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === GUARD) {
				return { row, col };
			}
		}
	}

	return { row: 0, col: 0 };
};

const isOutOfMap = (row: number, col: number, map: string[]): boolean => {
	return row < 0 || row >= map.length || col < 0 || col >= map[row].length;
};

const isBlocker = (row: number, col: number, map: string[]): boolean => {
	return map[row][col] === BLOCKER;
};

const countPositions = (map: string[]): number => {
	const visitedPositions = new Map<string, Position>(); // will save positions as strings: "1,2"
	let position = findGuard(map); // starting position
	let direction = DIRECTIONS[0];

	while (true) {
		visitedPositions.set(`${position.row},${position.col}`, { ...position });
		const [nextRow, nextCol] = [position.row + direction[0], position.col + direction[1]];

		if (isOutOfMap(nextRow, nextCol, map)) {
			return visitedPositions.size; // end
		}

		if (isBlocker(nextRow, nextCol, map)) {
			direction = DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length];
		} else {
			position = { row: nextRow, col: nextCol };
		}
	}
};

const main = (): void => {
	const map = readInputByLines('./inputs/input-one.txt');

	console.log('result day 6, part 1:', countPositions(map)); // 4789
};

main();
