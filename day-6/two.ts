import { readInputByLines } from '../utils/index.ts';

type Position = {
	row: number,
	col: number
}

const BLOCKER = '#';
const GUARD = '^';

const DIRECTIONS = [
	[-1, 0], // up
	[0, 1], // right
	[1, 0], // down
	[0, -1], // left
];

const findGuard = (map: string[][]): Position => {
	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === GUARD) {
				return { row, col };
			}
		}
	}

	return { row: 0, col: 0 };
};

const isOutOfMap = (row: number, col: number, map: string[][]): boolean => {
	return row < 0 || row >= map.length || col < 0 || col >= map[row].length;
};

const isBlocker = (row: number, col: number, map: string[][]): boolean => {
	return map[row][col] === BLOCKER;
};

const rotate90degrees = (direction: number[]): number[] => {
	return DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length];
};

const hasLoop = (map: string[][], startDirection: number[], start: Position, obstacle: Position): boolean => {
	let direction = rotate90degrees(startDirection);
	let rotations = 0;
	let position = { ...start };

	while (true) {
		const [nextRow, nextCol] = [position.row + direction[0], position.col + direction[1]];

		if (isOutOfMap(nextRow, nextCol, map)) {
			return false;
		}

		if (rotations === 1000) {
			return true;
		}

		if (nextRow === obstacle.row && nextCol === obstacle.col) {
			return true;
		}

		if (isBlocker(nextRow, nextCol, map)) {
			direction = rotate90degrees(direction);
			rotations += 1;
		} else {
			position = { row: nextRow, col: nextCol };
		}
	}
};

const countLoops = (map: string[][]): number => {
	let loops = 0;
	let position = findGuard(map); // starting position
	let direction = DIRECTIONS[0];

	while (true) {
		const [nextRow, nextCol] = [position.row + direction[0], position.col + direction[1]];

		if (isOutOfMap(nextRow, nextCol, map)) {
			return loops; // END
		}

		if (isBlocker(nextRow, nextCol, map)) {
			direction = rotate90degrees(direction);
		} else {
			if (hasLoop(map, direction, position, { row: nextRow, col: nextCol })) {
				loops += 1;
				console.log('loop found', { row: nextRow, col: nextCol }, loops);
			}

			position = { row: nextRow, col: nextCol };
		}
	}
};

const main = (): void => {
	const map = readInputByLines('./inputs/input-one.txt').map((line) => line.split(''));

	console.log('result day 6, part 2:', countLoops(map)); // 1373 is too high

};

main();
