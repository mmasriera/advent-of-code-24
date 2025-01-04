import { readInputByLines } from '../utils/index.ts';

const buildCandidates = (input: string): [number, number[]] => {
	const [left, right] = input.split(': ');
	const numbers = right.split(' ').map(Number);

	return [Number(left), numbers];
};

const hasValidEquation = ([value, [first, second, ...rest]]: [number, number[]]): boolean => {
	const sum = first + second;
	const mult = first * second;
	const concat = Number(`${first}${second}`);

	if (rest.length === 0) {
		return sum === value || mult === value || concat === value;
	}

	// to do: cut if the result is bigger than the value
	const isSumValid = sum <= value ? hasValidEquation([value, [sum, ...rest]]) : false;
	const isMultValid = mult <= value ? hasValidEquation([value, [mult, ...rest]]) : false;
	const isConcatValid = concat <= value ? hasValidEquation([value, [concat, ...rest]]) : false;

	return isSumValid || isMultValid || isConcatValid;
};

const calibrationResult = (input: string[]): number => {
	const candidates = input.map(buildCandidates);

	return candidates.filter(hasValidEquation).reduce((acc, [value, _]) => acc + value, 0);
};

const main = (): void => {
	const input = readInputByLines('./inputs/input-one.txt');

	console.log('result day 7, part 2:', calibrationResult(input)); // 637696070419031
};

main();
