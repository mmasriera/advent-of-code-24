import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED = new Set<string>();

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

			const region = new Set<string>();
			const candidates: Position[] = [{ x: row, y: column }]; // candidates for the region (the 1st one will always be)
			region.add(coordinate);

			let perimeter = 0;

			while (candidates.length > 0) {
				const candidate = candidates.shift(); // ???

				for (const increment of DIRECTIONS) {
					const next = { x: candidate.x + increment.x, y: candidate?.y + increment.y };
					const nextCoordinate = `${next.x},${next.y}`;

					if (map[next.x]?.[next.y] === char && !region.has(nextCoordinate)) {
						region.add(nextCoordinate);
						candidates.push(next);
					} else if (!region.has(nextCoordinate)) {
						perimeter += 1;
					}
				}
			}

			region.forEach(item => VISITED.add(item))
			result += region.size * perimeter
		}
	}

	return result;
};

const main = (): void => {
	const input = readInputByLines('./inputs/main.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost);
};

main();
