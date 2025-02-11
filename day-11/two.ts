import { readInputByLines } from '../utils/index.ts';

/*
	alt: 
		pass "stones" array to updateStones and update it on each iteration
*/

const removeLeadingZero = (n: string): string => Number(n).toString();

const CACHE_SPLITS: Record<string, string[]> = {};
const CACHE_2048: Record<string, string> = {};

const updateStones = (stones: string[]): string[] => {
	const result: string[] = [];

	for (const stone of stones) {
		if (stone === '0') {
			result.push('1');
		} else if (stone.length % 2 === 0) {
			if (CACHE_SPLITS[stone]) {
				result.push(...CACHE_SPLITS[stone]);
			} else {
				const values = [removeLeadingZero(stone.slice(0, stone.length / 2)), removeLeadingZero(stone.slice(stone.length / 2))];

				CACHE_SPLITS[stone] = values;
				
				result.push(...values);
			}
		} else {
			if (CACHE_2048[stone]) {
				result.push(CACHE_2048[stone]);
			} else {
				const value = (Number(stone) * 2024).toString();

				CACHE_2048[stone] = value;
				
			}
		}
	}
	return result;
};

const BLINKS = 50;

const main = (): void => {
	const stones = readInputByLines('./inputs/input.txt')[0].split(' ');
	let result = 0;

	for (const stone of stones) {
		let stoneOutcome = [stone];

		console.log('stone', stone);

		for (let i = 1; i <= BLINKS; i += 1) {
			stoneOutcome = updateStones(stoneOutcome);

			console.log('iteration', i);
		}

		result += stoneOutcome.length;
	}
	
	console.log('result day 11, part 2:', result); // 
};

main();
