import { readInputByLines } from '../utils/index.ts';

type Position = { x: number; y: number };

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

const calculateScores = (map: number[][], { x, y }: Position, results: Set<string>): void => {
	for (const { x: updateX, y: updateY } of DIRECTIONS) {
		const value = map[x]?.[y];
		const nextValue = map[x + updateX]?.[y + updateY];

		if (nextValue !== value + 1) {
			continue;
		}

		if (nextValue === 9) {
			results.add(`${x + updateX},${y + updateY}`);
		}

		calculateScores(map, { x: x + updateX, y: y + updateY }, results);
	}
};

const findScore = (zeroPosition: Position, map: number[][]): number => {
	// TO DO: too side-effected, use return value instead of updating endPositions
	const endPositions = new Set<string>(); // easier to compare

	calculateScores(map, zeroPosition, endPositions);

	return endPositions.size;
};

const main = (): void => {
	const map = readInputByLines('./inputs/input.txt').map((line) => line.split('').map(Number));
	const zeroPositions = findZeroPositions(map);
	const scores = zeroPositions.map((position) => findScore(position, map));
	const sum = scores.reduce((acc, curr) => acc + curr, 0);

	console.log('result day 10, part 1:', sum); // 629
};

main();
