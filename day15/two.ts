import { readInputByLines } from '../utils/index.ts';
import {
	MAP_DIRECTIONS, type MapPosition, findInMap, sumPositions, printMap, getCoordinate,
} from '../utils/index.ts';

type Input = {
	map: string[][];
	movements: string;
};

const WALL = '#';
const ROBOT = '@';
const BOX = 'O';
const EMPTY = '.';
const W_BOX_LEFT = '[';
const W_BOX_RIGHT = ']';

const WIDER_CHARS = {
	[WALL]: [WALL, WALL],
	[ROBOT]: [ROBOT, '.'],
	[BOX]: [W_BOX_LEFT, W_BOX_RIGHT],
	[EMPTY]: ['.', '.'],
};

const MOVEMENT_DIRECTIONS = {
	'<': MAP_DIRECTIONS[3],
	'>': MAP_DIRECTIONS[1],
	'^': MAP_DIRECTIONS[0],
	v: MAP_DIRECTIONS[2],
};

const widenMap = (map: string[][]): string[][] => {
	return map.map((row) => row.flatMap((char) => WIDER_CHARS[char as keyof typeof WIDER_CHARS]));
};

const parseInput = (lines: string[]): Input => {
	const map: string[][] = [];
	let movements = '';

	for (const line of lines) {
		if (line.startsWith(WALL)) {
			map.push(line.split(''));
		} else {
			movements = movements.concat(line);
		}
	}

	return { map: widenMap(map), movements };
};

const sumGpsCoordinates = (map: string[][]): number => {
	let result = 0;

	for (let row = 0; row < map.length; row++) {
		for (let col = 0; col < map[row].length; col++) {
			if (map[row][col] === BOX) {
				result += row * 100 + col;
			}
		}
	}

	return result;
};

// const pushRow = (map: string[][], start: MapPosition, direction: MapPosition): boolean => {
// 	const row = map[start.row];
// 	let currentChar = row[start.col];
// 	let next = sumPositions(start, direction);

// 	while (row[next.col] !== WALL) {
// 		if (row[next.col] === EMPTY) {
// 			row[next.col] = currentChar;

// 			return true;
// 		}

// 		const nextChar = row[next.col];

// 		row[next.col] = currentChar;
// 		next = sumPositions(next, direction);
// 		currentChar = nextChar;
// 	}

// 	return false;
// };

type PushMove = {
	next: MapPosition;
	char: string;
};

const USED_MOVES = new Set<string>();

const pushBox = (
	map: string[][], start: MapPosition, direction: MapPosition
): PushMove[] => {
	const next = sumPositions(start, direction);
	const nextChar = map[next.row][next.col];

	if (nextChar === EMPTY) {
		return [{ next, char: map[start.row][start.col] }];
	}

	if (nextChar === WALL) {
		return [];
	}

	return [{ next, char: map[start.row][start.col] }, ...pushBox(map, next, direction)];
};

const doMovement = (map: string[][], current: MapPosition, movement: string): MapPosition => {
	const direction = MOVEMENT_DIRECTIONS[movement as keyof typeof MOVEMENT_DIRECTIONS];
	const next = sumPositions(current, direction);
	const nextChar = map[next.row][next.col];

	if (nextChar === EMPTY) {
		return next;
	}

	if (nextChar === W_BOX_LEFT || nextChar === W_BOX_RIGHT) {
		const moves = pushBox(map, current, direction);

		if (moves.length > 0) {
			for (const move of moves) {
				map[move.next.row][move.next.col] = move.char;
			}

			return next;
		}
	}

	return current; // wall or can not push
};

const moveBoxes = (map: string[][], movements: string): void => {
	let robot = findInMap(map, ROBOT);

	if (!robot) {
		return;
	}

	map[robot.row][robot.col] = EMPTY;
	printMap(map);

	for (const movement of movements) {
		map[robot.row][robot.col] = EMPTY;
		console.log(' MOVEMENT', { movement, robot });
		robot = doMovement(map, robot, movement);
		map[robot.row][robot.col] = ROBOT;

		printMap(map);
	}
};

const main = (): void => {
	console.log(Deno.cwd());
	const { map, movements } = parseInput(readInputByLines('./inputs/test-3.1.txt'));

	moveBoxes(map, movements);

	const result = sumGpsCoordinates(map);

	console.log('result day 15, part 2:', result); //
};

main();
