import { readInputByLines } from '../utils/index.ts';

type OrderingRules = Record<number, number[]>;
type Updates = number[][];

const getInputData = (): { orderingRules: OrderingRules; updates: Updates } => {
	const orderingRules: OrderingRules = {};
	const updates: Updates = [];
	const input = readInputByLines('./inputs/input-one.txt');

	input.forEach((line) => {
		if (line.includes('|')) {
			const [pageX, pageY] = line.split('|').map(Number);

			if (!orderingRules[pageX]) {
				orderingRules[pageX] = [];
			}

			orderingRules[pageX].push(pageY);
		} else if (line.includes(',')) {
			const update = line.split(',').map(Number);

			updates.push(update);
		}
	});

	return { orderingRules, updates };
};

const getMiddleElement = (update: number[]): number => {
	return update[Math.floor(update.length / 2)];
};

// TO DO: check performance of recursive VS iterative
// orderingRules -> any difference if it's a global (apparently no bc it's passed by reference but it's an extra param for the recursive one)
const isCorrectUpdate = ([page, ...rest]: number[], orderingRules: OrderingRules): boolean => {
	if (!rest.length) {
		return true;
	}

	for (const elem of rest) {
		if (!orderingRules[page]?.includes(elem)) {
			// not included or no page
			return false;
		}
	}

	return isCorrectUpdate(rest, orderingRules);
};

const main = (): number => {
	const { orderingRules, updates } = getInputData();

	return updates
		.filter((update) => isCorrectUpdate(update, orderingRules))
		.map(getMiddleElement)
		.reduce((acc, curr) => acc + curr, 0);
};

console.log('result day 5, part 1:', main()); // 4957
