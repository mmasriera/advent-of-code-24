import { readInputByLines } from '../utils/index.ts';

/*
	alt: 
		pass "stones" array to updateStones and update it on each iteration
*/

const removeLeadingZero = (n: string): string => Number(n).toString();

const updateStones = (stones: string[]): string[] => {
	const result: string[] = [];

	for (const stone of stones) {
		if (stone === '0') {
			result.push('1');
		} else if (stone.length % 2 === 0) {
			result.push(removeLeadingZero(stone.slice(0, stone.length / 2)));
			result.push(removeLeadingZero(stone.slice(stone.length / 2)));
		} else {
			result.push((Number(stone) * 2024).toString());
		}
	}

	return result;
};

const BLINKS = 25;

const main = (): void => {
	let stones = readInputByLines('./inputs/input.txt')[0].split(' ');

	for (let i = 0; i < BLINKS; i += 1) {
		stones = updateStones(stones);
	}

	console.log('result day 11, part 1:', stones.length); // 183248
};

main();
