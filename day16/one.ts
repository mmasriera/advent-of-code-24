import { readInputByLines } from '../utils/index.ts';
import { type MapPosition, printMap, MAP_DIRECTIONS } from '../utils/index.ts';

const WALL = '#';
const START = 'S';
const END = 'E';
const EMPTY = '.';

const parseInput = (lines: string[]): { map: string[][]; start: MapPosition; end: MapPosition } => {
	const map: string[][] = [];
	let start: MapPosition = { row: -1, col: -1 };
	let end: MapPosition = { row: -1, col: -1 };

	for (const [index, line] of lines.entries()) {
		const startIdx = line.indexOf(START);
		const endIdx = line.indexOf(END);

		if (startIdx !== -1) {
			start = { row: index, col: startIdx };
		}

		if (endIdx !== -1) {
			end = { row: index, col: endIdx };
		}

		map.push(line.split(''));
	}

	return { map, start, end };
};

const findLowestScore = (map: string[][], start: MapPosition, end: MapPosition): number => {
	let score = 0;
	
	return score;
};

const main = (): void => {
	const { map, start, end } = parseInput(readInputByLines('./inputs/test.txt'));

	const lowestScore = findLowestScore(map, start, end);

	console.log('result day 16, part 1:', 'bhj'); 
};

main();
