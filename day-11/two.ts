/*
	DFS + memoization
*/

import { readInputByLines } from '../utils/index.ts';

const BLINKS = 75;
const CACHE: Record<string, number> = {}; // key: "stone,blinks" -> we need the stone and the blink/step to know the count

const getKey = (stone: string, blinks: number): string => `${stone},${blinks}`;

const removeLeadingZero = (n: string): string => Number(n).toString();

const getCount = (stone: string, blinks: number): number => {
	if (blinks === 0) {
		return 1; // base case
	}

	const key = getKey(stone, blinks);

	if (CACHE[key]) {
		return CACHE[key];
	}

	let result = 0;

	if (stone === '0') {
		result = getCount('1', blinks - 1);
	} else if (stone.length % 2 === 0) {
		const left = removeLeadingZero(stone.slice(0, stone.length / 2));
		const right = removeLeadingZero(stone.slice(stone.length / 2));

		result = getCount(left, blinks - 1) + getCount(right, blinks - 1);
	} else {
		result = getCount((Number(stone) * 2024).toString(), blinks - 1);
	}

	CACHE[key] = result;

	return result;
};

const main = (): void => {
	const stones = readInputByLines('./inputs/input.txt')[0].split(' ');
	let result = 0;

	for (const stone of stones) {
		const count = getCount(stone, BLINKS);

		result += count;
	}
	
	console.log('result day 11, part 2:', result); // 218811774248729
};

main();
