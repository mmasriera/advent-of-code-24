import { readInputByLines } from '../utils/index.ts';

// DFS

type Position = { x: number; y: number };
type Ratings = Record<string, number>;

const findZeroPositions = (map: number[][]): Position[] => {
	const zeroPositions: Position[] = [];

	for (let x = 0; x < map.length; x += 1) {
		for (let y = 0; y < map[x].length; y += 1) {
			if (map[x][y] === 0) {
				zeroPositions.push({ x, y });
			}
		}
	}

	return zeroPositions;
};

const DIRECTIONS = [
	{ x: -1, y: 0 },
	{ x: 1, y: 0 },
	{ x: 0, y: -1 },
	{ x: 0, y: 1 },
];

const calculateRatings = (map: number[][], { x, y }: Position, ratings: Ratings): void => {
	for (const { x: updateX, y: updateY } of DIRECTIONS) {
		const value = map[x]?.[y];
		const nextValue = map[x + updateX]?.[y + updateY];

		if (nextValue !== value + 1) {
			continue;
		}

		if (nextValue === 9) {
			const key = `${x + updateX},${y + updateY}`;

			ratings[key] = (ratings[key] ?? 0) + 1; // count on the 9's
		}

		calculateRatings(map, { x: x + updateX, y: y + updateY }, ratings);
	}
};

const main = (): void => {
	const map = readInputByLines('./inputs/input.txt').map((line) => line.split('').map(Number));
	const ratings: Ratings = {};

	findZeroPositions(map).forEach(({ x, y }) => {
		calculateRatings(map, { x, y }, ratings);
	});

	const sum = Object.values(ratings).reduce((acc, curr) => acc + curr, 0);

	console.log('result day 10, part 2:', sum); // 1242
};

main();
