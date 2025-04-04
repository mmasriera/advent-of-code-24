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

const WIDER_CHARS = {
	[WALL]: [WALL, WALL],
	[ROBOT]: [ROBOT, '.'],
	[BOX]: ['[', ']'],
	[EMPTY]: ['.', '.'],
};

const MOVEMENT_DIRECTIONS = {
	'<': MAP_DIRECTIONS[3],
	'>': MAP_DIRECTIONS[1],
	'^': MAP_DIRECTIONS[0],
	v: MAP_DIRECTIONS[2],
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

	return { map, movements };
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

const pushBox = (map: string[][], initialBoxPosition: MapPosition, direction: MapPosition): boolean => {
	const next = sumPositions(initialBoxPosition, direction);

	if (map[next.row][next.col] === BOX) {
		return pushBox(map, next, direction);
	}

	if (map[next.row][next.col] === EMPTY) {
		map[next.row][next.col] = BOX;

		return true;
	}

	return false;
};

const doMovement = (map: string[][], current: MapPosition, movement: string): MapPosition => {
	const direction = MOVEMENT_DIRECTIONS[movement as keyof typeof MOVEMENT_DIRECTIONS];
	const next = sumPositions(current, direction);

	if (map[next.row][next.col] === EMPTY) {
		return next;
	}

	if (map[next.row][next.col] === BOX) {
		const canPush = pushBox(map, next, direction);

		if (canPush) {
			map[next.row][next.col] = EMPTY;

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
		robot = doMovement(map, robot, movement);
	}
};

const widenMap = (map: string[][]): string[][] => {
	return map.map(row => row.flatMap(char => WIDER_CHARS[char as keyof typeof WIDER_CHARS]));
};

const main = (): void => {
	const { map, movements } = parseInput(readInputByLines('./inputs/test-2.txt'));

	const widerMap = widenMap(map);
	
	console.log(widerMap);

	// moveBoxes(map, movements); // updates map

	// const result = sumGpsCoordinates(map);

	// console.log('result day 15, part 2:', result); // 
};

main();
