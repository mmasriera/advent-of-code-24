import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited + mark map
*/

const VISITED_MARK = '.';
const REGIONS: Record<string, string[]> = {};

const calculateRegionCost = (map: string[][], id: string, { x, y }: Position): [number, number] => {
	let area = 0;
	let perimeter = 0;

	if (!!id && map[x]?.[y] === id) {
		// in "id" region
		area += 1;
		map[x][y] = VISITED_MARK;
		REGIONS[id].push(`${x},${y}`);

		for (const increment of DIRECTIONS) {
			const next = { x: x + increment.x, y: y + increment.y };

			if (map[next.x]?.[next.y] === id) {
				const [newArea, newPerimeter] = calculateRegionCost(map, id, next);

				area += newArea;
				perimeter += newPerimeter;
			} else if (!REGIONS[id].includes(`${next.x},${next.y}`)) {
				perimeter += 1;
			}
		}
	}

	return [area, perimeter];
};

const calculateTotalCost = (map: string[][]): number => {
	let result = 0;

	for (let row = 0; row < map.length; row += 1) {
		for (let column = 0; column < map[row].length; column += 1) {
			const id = map[row][column];

			if (id === VISITED_MARK) {
				// visited cells will be marked with "."
				continue;
			}

			REGIONS[id] = []; // reset this region (they can be repeated)

			const [area, perimeter] = calculateRegionCost(map, id, { x: row, y: column });

			result += area * perimeter;
		}
	}

	return result;
};

const main = (): void => {
	const input = readInputByLines('./inputs/test2.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost);
};

main();
