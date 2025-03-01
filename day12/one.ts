
import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED_MARK = '.'; 

const calculateRegionCost = (map: string[][], id: string, { x, y }: Position): [number, number] => {
	console.log('calculate', id, { x, y });
	
	let area = 0;
	let perimeter = 0;

	// if same region, iterate
	if (!!id && map[x]?.[y] === id) {

		console.log('HIT');

		area += 1;

		map[x][y] = VISITED_MARK;

		for (const increment of DIRECTIONS) {
			const next = { x: x + increment.x, y: y + increment.y };

			console.log('-->', next, map[next.x]?.[next.y] === id);

			if (map[next.x]?.[next.y] === id) {
				const [newArea, newPerimeter] = calculateRegionCost(map, id, next);

				area += newArea;
				perimeter += newPerimeter;
			} else {
				perimeter += 1;
			}


			console.log('----> return', area, perimeter, 'for:', next);
		}
	}

	return [area, perimeter];
};

const calculateTotalCost = (map: string[][]): number => {
	let result = 0;

	for (let row = 0; row < map.length; row += 1) {
		for (let column = 0; column < map[row].length; column += 1) {
			const id = map[row][column];

			console.log('map iteration', { id, row, column });

			if (id === VISITED_MARK) {
				continue;
			}

			// new region
			const [area, perimeter] = calculateRegionCost(map, id, { x: row, y: column });

			result += (area * perimeter);

			console.log({ area, perimeter, result, id });
		}
	}

	return result;
};

const main = (): void => {
	const input = readInputByLines('./inputs/test.txt').map(s => s.split(''));

	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost);
};

main();
