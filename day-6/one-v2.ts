import { readInputByLines } from '../utils/index.ts';

const BLOCKER = '#';
const GUARD = '^';

const DIRECTIONS = [[-1, 0], [0, 1], [1, 0], [0, -1]];

const findGuard = (map: string[][]): [number, number] => {
	for (let row = 0; row < map.length; row++) {
		for (let cell = 0; cell < map[row].length; cell++) {
			if (map[row][cell] === GUARD) {
				return [row, cell];
			}
		}
	}

	return [0, 0];
};

const isOutOfMap = (row: number, col: number, map: string[][]): boolean => {
	return row < 0 || row >= map.length || col < 0 || col >= map[row].length;
};

const isBlocker = (row: number, col: number, map: string[][]): boolean => {
	return map[row][col] === BLOCKER;
};

const countPositions = (map: string[][]): number => {
	const visitedPositions = new Set<string>(); // will save positions as strings: "1,2"
	
	let [row, col] = findGuard(map); // starting position
	let direction = DIRECTIONS[0];

	while (true) {
		visitedPositions.add(`${ row },${ col }`);
		const [nextRow, nextCol] = [row + direction[0], col + direction[1]];

		if (isOutOfMap(nextRow, nextCol, map)) {
			break;
		}

		if (isBlocker(nextRow, nextCol, map)) {
			direction = DIRECTIONS[(DIRECTIONS.indexOf(direction) + 1) % DIRECTIONS.length];
		} else {
			[row, col] = [nextRow, nextCol];
		}
	}

	return visitedPositions.size;
};

const main = (): void => {
	const map = readInputByLines('./inputs/input-one.txt').map((line) => line.split(''));

	console.log('result day 6, part 1:', countPositions(map)); // 4789
};

main();
