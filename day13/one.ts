
import { readInputByLines, type Position } from '../utils/index.ts';

type Machine = {
	A: Position,
	B: Position,
	prize: Position
}

const NUMBERS = /\d+/g; 

const parseInput = (lines: string[]) => {
	const result = [];

	for (let i = 0; i <= lines.length; i += 4) {
		// biome-ignore lint/style/noNonNullAssertion: it will always exist 
		const a = lines[i].match(NUMBERS)!.map(Number);
		// biome-ignore lint/style/noNonNullAssertion: it will always exist 
		const b = lines[i + 1].match(NUMBERS)!.map(Number);
		// biome-ignore lint/style/noNonNullAssertion: it will always exist 
		const prize = lines[i + 2].match(NUMBERS)!.map(Number);

		result.push({
			a: { x: a[0], y: a[1] },
			b: { x: b[0], y: b[1] },
			prize: { x: prize[0], y: prize[1] }
		});
	}

	return result;
}

const main = (): void => {
	const machines = parseInput(readInputByLines('./inputs/test.txt'));

	console.log('result day 13, part 1:', machines); // 
};

main();
