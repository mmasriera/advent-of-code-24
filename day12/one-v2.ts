import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED = new Set<string>();

const calculateRegionCost = (map: string[][], char: string, position: Position): number => {
	const candidates: Position[] = [position]; // candidates for the region (the 1st one will always be)
	const region = new Set<string>();
	let perimeter = 0;

	region.add(`${position.x},${position.y}`);

	while (candidates.length > 0) {
		const candidate = candidates.shift(); // get the 1st one

		for (const increment of DIRECTIONS) {
			const next = { x: candidate.x + increment.x, y: candidate?.y + increment.y };
			const nextCoordinate = `${next.x},${next.y}`;

			if (map[next.x]?.[next.y] === char && !region.has(nextCoordinate)) {
				region.add(nextCoordinate);
				VISITED.add(nextCoordinate);
				candidates.push(next);
			} else if (!region.has(nextCoordinate)) {
				perimeter += 1;
			}
		}
	}

	return region.size * perimeter;
};

const calculateTotalCost = (map: string[][]): number => {
	let result = 0;

	for (let row = 0; row < map.length; row += 1) {
		for (let column = 0; column < map[row].length; column += 1) {
			const coordinate = `${row},${column}`;
			const char = map[row][column];

			if (VISITED.has(coordinate)) {
				continue;
			}

			VISITED.add(coordinate);

			result += calculateRegionCost(map, char, { x: row, y: column });
		}
	}

	return result;
};

const main = (): void => {
	const input = readInputByLines('./inputs/main.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost); // 1456082
};

main();
