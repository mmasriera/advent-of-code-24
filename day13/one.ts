import { readInputByLines, type Position } from '../utils/index.ts';

type Machine = {
	A: Position;
	B: Position;
	prize: Position;
};

const NUMBERS = /\d+/g;

const calculateCost = (a: number, b: number) => a * 3 + b;
// biome-ignore lint/style/noNonNullAssertion: it will always exist
const getLineNumbers = (line: string) => line.match(NUMBERS)!.map(Number);

const minTokensToWin = ({ A, B, prize }: Machine): number => {
	let b = 100;
	let solution = Number.MAX_VALUE;

	while (b >= 0) {
		let a = 0;

		let result = (B.x * b) + (A.x * a);

		if ((result === prize.x) && (B.y * b + A.y * a === prize.y)) {
			solution = Math.min(solution, calculateCost(a, b));
		} else {
			while (a < 100) {
				a++;
				result = (B.x * b) + (A.x * a);

				if (result > prize.x) {
					break;
				}

				if ((result === prize.x) && (B.y * b + A.y * a === prize.y)) {
					solution = Math.min(solution, calculateCost(a, b));
				}
			}
		}
		b--;
	}

	console.log('solution', solution);

	return solution === Number.MAX_VALUE ? 0 : solution;
}

const parseInput = (lines: string[]): Machine[] => {
	const result: Machine[] = [];

	for (let i = 0; i <= lines.length; i += 4) {
		const a = getLineNumbers(lines[i]);
		const b = getLineNumbers(lines[i + 1]);
		const prize = getLineNumbers(lines[i + 2]);

		result.push({
			A: { x: a[0], y: a[1] },
			B: { x: b[0], y: b[1] },
			prize: { x: prize[0], y: prize[1] },
		});
	}

	return result;
};

const main = (): void => {
	const machines = parseInput(readInputByLines('./inputs/test.txt'));
	const result = machines.reduce((acc, machine) => acc + minTokensToWin(machine), 0)

	console.log('result day 13, part 1:', result); // 480
};

main();
