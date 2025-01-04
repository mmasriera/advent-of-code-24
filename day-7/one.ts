import { readInputByLines } from '../utils/index.ts';

const OPERATIONS = {
	sum: (a: number, b: number): number => a + b,
	mult: (a: number, b: number): number => a * b,
}

const buildCandidates = (input: string): [number, number[]] => {
	const [left, right] = input.split(': ');
	const numbers = right.split(' ').map(Number);

	return [Number(left), numbers];
};

const hasValidEquation = ([value, [first, second, ...rest]]: [number, number[]]): boolean => {
	console.log('iteration', value, '=', first, second, rest);

	const results = [
		OPERATIONS.sum(first, second),
		OPERATIONS.mult(first, second)
	];

	if (rest.length === 0) {
		return results.includes(value);
	}

	return hasValidEquation([value, [results[0], ...rest]])
		|| hasValidEquation([value, [results[1], ...rest]])
};

const calibrationResult = (input: string[]): number => {
	const candidates = input.map(buildCandidates);

	return candidates
		.filter(hasValidEquation)
		.reduce((acc, [value, _]) => acc + value, 0);
};

const main = (): void => {
	const input = readInputByLines('./inputs/input-one.txt');

	console.log('result day 7, part 1:', calibrationResult(input)); // 66343330034722
};

main();
