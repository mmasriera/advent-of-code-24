import { readInputByLines, type Position } from '../utils/index.ts';

type Machine = {
	A: Position;
	B: Position;
	prize: Position;
};

const NUMBERS = /\d+/g;

const getClosestUpper = (target: number, candidate: number): number => {
	const times = target / candidate;

	if (times >= 1 && times < 100 ) {
		return Math.ceil(times);
	}

	return -1;
}

const minTokensToWin = ({ A, B, prize }: Machine): number => {
	let tokens = 0;

	console.log('machine', A, B, prize);

	const startBx = getClosestUpper(prize.x, B.x);

	if (startBx > 0) {
		// start
		console.log('start b x', startBx);
		
		return tokens;
	}

	const startBy = getClosestUpper(prize.y, B.y);

	if (startBy > 0) {
		// start
		console.log('start b y', startBy);
		
		// for (let i = 0; i <= startBy; i += 1) {
		// 	const result = (B.y * (startBy - i)) + (A.y * i);

		// 	console.log({ i, result });
		// }

		return tokens;
	}

	const startAx = getClosestUpper(prize.x, A.x);

	if (startAx > 0) {
		// start
		console.log('start a x', startAx);
		return tokens;
	}

	const startAy = getClosestUpper(prize.y, A.y);

	if (startAy > 0) {
		// start
		console.log('start a y', startAy);
		return tokens;
	}

	return tokens;
}

const parseInput = (lines: string[]): Machine[] => {
	const result: Machine[] = [];

	for (let i = 0; i <= lines.length; i += 4) {
		// biome-ignore lint/style/noNonNullAssertion: it will always exist
		const a = lines[i].match(NUMBERS)!.map(Number);
		// biome-ignore lint/style/noNonNullAssertion: it will always exist
		const b = lines[i + 1].match(NUMBERS)!.map(Number);
		// biome-ignore lint/style/noNonNullAssertion: it will always exist
		const prize = lines[i + 2].match(NUMBERS)!.map(Number);

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

	console.log('result day 13, part 1:', result); //
};

main();
