import { readInputByLines } from '../utils/index.ts';

type Input = {
	map: string[];
	movements: string;
}

const WALL = '#';
const ROBOT = '@';
const BOX = 'O';

const parseInput = (lines: string[]): Input => {
	const map: string[] = [];
	let movements = '';

	for (const line of lines) {
		if (line.startsWith(WALL)) {
			map.push(line);
		} else {
			movements = movements.concat(line);
		}
	}

	return { map, movements };
};

const main = (): void => {
	const { map, movements } = parseInput(readInputByLines('./inputs/test.txt'));

	console.log('result day 15, part 1:', map, movements); // 
};

main();
