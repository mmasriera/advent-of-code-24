import { readInputFile } from '../utils/index.ts';

const sumMultiplications = (candidate: string): number => {
	const matches = candidate.matchAll(/mul\((\d+),(\d+)\)/g);

	return matches.reduce((acc, match) => acc + Number(match[1]) * Number(match[2]), 0);
};

const main = (): number => {
	const input = readInputFile('./inputs/input-one.txt');
	const clearedInput = input.replace(/don't.*?do\(\)/gs, ''); // remove don't....do()

	return sumMultiplications(clearedInput);
};

console.log('result day 3, part 2:', main()); // 93465710
