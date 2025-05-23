import { readInputByLines } from '../utils/index.ts';
import { MAP_DIRECTIONS, type MapPosition, findInMap, sumPositions } from '../utils/index.ts';

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
			if (map[row][col] === W_BOX_LEFT) {
				result += row * 100 + col;
			}
		}
	}

	return result;
};

type PushMove = {
	next: MapPosition;
	char: string;
};

const pushBox = (map: string[][], start: MapPosition, direction: MapPosition): PushMove[] => {
	const next = sumPositions(start, direction);
	const nextChar = map[next.row][next.col];

	if (nextChar === EMPTY) {
		return [{ next, char: map[start.row][start.col] }];
	}

	if (nextChar === WALL) {
		return [];
	}

	const nextMoves = pushBox(map, next, direction);

	if (nextMoves.length === 0) {
		return [];
	}

	if (direction.col === 0) {
		// vertical movement
		const complementary =
			map[next.row][next.col] === W_BOX_LEFT
				? { row: next.row, col: next.col + 1 }
				: { row: next.row, col: next.col - 1 };

		const complementaryMoves = pushBox(map, complementary, direction);

		if (complementaryMoves.length === 0) {
			return [];
		}

		nextMoves.push(
			{ next: complementary, char: EMPTY }, // empty space where the complementary was
			...complementaryMoves,
		);
	}

	return [{ next, char: map[start.row][start.col] }, ...nextMoves];
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

	for (const movement of movements) {
		map[robot.row][robot.col] = EMPTY;
		robot = doMovement(map, robot, movement);
		map[robot.row][robot.col] = ROBOT;
	}
};

const main = (): void => {
	console.log(Deno.cwd());
	const { map, movements } = parseInput(readInputByLines('./inputs/test-2.txt'));

	moveBoxes(map, movements);

	const result = sumGpsCoordinates(map);

	console.log('result day 15, part 2:', result); // 9021
};

main();
