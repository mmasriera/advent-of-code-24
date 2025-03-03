import {
	readInputByLines, MAP_DIRECTIONS, type MapPosition, getCoordinate, sumPositions, isEqPosition
} from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED = new Set<string>();

type Edge = {
	position: MapPosition,
	direction: string
}

const getContigousIncrement = (direction: string): MapPosition[] => {
	const [row] = direction.split(',');

	if (row === '0') {
		return [{ row: -1, col: 0 }, { row: 1, col: 0 }];
	}

	return [{ row: 0, col: -1 }, { row: 0, col: 1 }];
}

const hasContigous = (edge: Edge, visitedEdges: Edge[]): boolean => {
	return !!visitedEdges.find(e => {
		if (edge.direction === e.direction) {
			for (const increment of getContigousIncrement(edge.direction)) {
				if (isEqPosition(sumPositions(e.position, increment), edge.position)) {
					return true;
				}
			}
		}

		return false;
	});
}

const calculateRegionCost = (map: string[][], char: string, position: MapPosition): number => {
	const candidates: MapPosition[] = [position]; // candidates for the region (the 1st one will always be)
	const region = new Set<string>();
	const edges: Edge[] = [];

	region.add(getCoordinate(position));

	let sides = 0;

	while (candidates.length > 0) {
		const candidate = candidates.shift(); // get the 1st one

		for (const increment of MAP_DIRECTIONS) {
			// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
			const next = sumPositions(candidate!, increment);
			const nextCoordinate = getCoordinate(next);

			if (region.has(nextCoordinate)) {
				continue;
			}

			if (map[next.row]?.[next.col] === char) {
				region.add(nextCoordinate);
				VISITED.add(nextCoordinate);
				candidates.push(next);
			} else if (!region.has(nextCoordinate)) {
				const edge = {
					// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
					position: candidate!,
					direction: getCoordinate(increment)
				}

				if (!hasContigous(edge, edges)) {
					sides += 1;
				}

				edges.push(edge);
			}
		}
	}

	return region.size * sides;
};

const calculateTotalCost = (map: string[][]): number => {
	let result = 0;

	for (let row = 0; row < map.length; row += 1) {
		for (let col = 0; col < map[row].length; col += 1) {
			const coordinate = `${row},${col}`;
			const char = map[row][col];

			if (VISITED.has(coordinate)) {
				continue;
			}

			VISITED.add(coordinate);

			result += calculateRegionCost(map, char, { row, col });
		}
	}

	return result;
};

const main = (): void => {
	const input = readInputByLines('./inputs/main.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 2:', totalCost); // 872483
};

main();
