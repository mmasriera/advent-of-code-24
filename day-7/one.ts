import { readInputByLines } from '../utils/index.ts';

const OPERATIONS = [
	// (a: number, b: number): number => a + b,
	// (a: number, b: number): number => a * b,
	// (a: number, b: number): number => a / b,
	// (a: number, b: number): number => a - b,
	'+',
	'*',
	'/',
	'-',
];

const buildCandidates = (input: string): [number, number[]] => {
	const [left, right] = input.split(': ');
	const numbers = right.split(' ').map(Number);

	return [Number(left), numbers];
};

const hasValidEquation = ([value, operands]: [number, number[]]): boolean => {

	console.log('-->', value);

	for (let i = 0; i < operands.length - 1; i += 1) {
		for (let j = 0; j < Object.keys(OPERATIONS).length; j += 1) {
			const operandsCopy = [...operands];
			
			let combination = '';

			const last = operandsCopy.pop();
			for (const operand of operandsCopy) {
				combination += `${ operand } ${ OPERATIONS[(j + i) % 4] } `;
			}

			console.log(`${ value } = ${ combination }${ last }`);
		}
	}

	return false;
};

const calibrationResult = (input: string[]): number => {
	const candidates = input.map(buildCandidates);

	return candidates
		.filter(hasValidEquation)
		.reduce((acc, [value, _]) => acc + value, 0);
};

const main = (): void => {
	const input = readInputByLines('./inputs/input-test.txt');

	console.log('result day 7, part 1:', calibrationResult(input)); //
};

main();
