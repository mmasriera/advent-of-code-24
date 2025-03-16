import { readInputByLines, type Position } from '../utils/index.ts';

/*
	assumning that the vectors of the button movements are not parellel between them,
	we can solve the equation (there are just 1 solution, it makes no sense to try all the possible values)
*/

type Machine = {
	A: Position;
	B: Position;
	prize: Position;
};

const NUMBERS = /\d+/g;
const INCREMENT = 10000000000000;

const calculateCost = (a: number, b: number): number => a * 3 + b;
// biome-ignore lint/style/noNonNullAssertion: it will always exist
const getLineNumbers = (line: string): number[] => line.match(NUMBERS)!.map(Number);

const minTokensToWin = ({ A, B, prize }: Machine): number => {
	const timesB = (prize.x * A.y - prize.y * A.x) / (B.x * A.y - B.y * A.x);
	const timesA = (prize.y - timesB * B.y) / A.y;

	if (!Number.isInteger(timesA) || !Number.isInteger(timesB)) {
		// not a valid solution
		return 0;
	}

	return calculateCost(timesA, timesB);
};

const parseInput = (lines: string[]): Machine[] => {
	const result: Machine[] = [];

	for (let i = 0; i <= lines.length; i += 4) {
		const a = getLineNumbers(lines[i]);
		const b = getLineNumbers(lines[i + 1]);
		const prize = getLineNumbers(lines[i + 2]);

		result.push({
			A: { x: a[0], y: a[1] },
			B: { x: b[0], y: b[1] },
			prize: { x: INCREMENT + prize[0], y: INCREMENT + prize[1] },
		});
	}

	return result;
};

const main = (): void => {
	const machines = parseInput(readInputByLines('./inputs/main.txt'));
	const result = machines.reduce((acc, machine) => acc + minTokensToWin(machine), 0);

	console.log('result day 13, part 2:', result); // 83029436920891
};

main();
