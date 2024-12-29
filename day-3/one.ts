import { readInputFile } from '../utils/index.ts';

// TO DO: regex-less version using .split('') -> check performance
const sumMultiplications = (input: string): number => {
	const matches = input.matchAll(/mul\((\d+),(\d+)\)/g);

	return matches.reduce(
		(acc, match) => acc + Number(match[1]) * Number(match[2]),
		0,
	);
};

const main = (): number => {
	const input = readInputFile('./inputs/input-one.txt');

	return sumMultiplications(input);
};

console.log('result day 3, part 1:', main()); // 166630675
