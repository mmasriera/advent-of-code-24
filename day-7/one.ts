import { readInputByLines } from '../utils/index.ts';

const buildCandidates = (input: string): [number, number[]] => {
	const [left, right] = input.split(': ');
	const numbers = right.split(' ').map(Number);

	return [Number(left), numbers];
};

const hasValidEquation = ([value, [first, second, ...rest]]: [number, number[]]): boolean => {
	const sum = first + second;
	const mult = first * second;

	if (rest.length === 0) {
		return sum === value || mult === value;
	}

	// cut if the result is bigger than the value
	const isSumValid = sum <= value ? hasValidEquation([value, [sum, ...rest]]) : false;
	const isMultValid = mult <= value ? hasValidEquation([value, [mult, ...rest]]) : false;

	return isSumValid || isMultValid;
};

const calibrationResult = (input: string[]): number => {
	const candidates = input.map(buildCandidates);

	return candidates.filter(hasValidEquation).reduce((acc, [value, _]) => acc + value, 0);
};

const main = (): void => {
	const input = readInputByLines('./inputs/input-one.txt');

	console.log('result day 7, part 1:', calibrationResult(input)); // 66343330034722
};

main();
