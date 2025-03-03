import { readInputByLines, MAP_DIRECTIONS, type MapPosition, getCoordinate } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED = new Set<string>();

type Edge = {
	position: MapPosition,
	direction: string // will be the index of the direction
}

const calculateRegionCost = (map: string[][], char: string, position: MapPosition): number => {
	const candidates: MapPosition[] = [position]; // candidates for the region (the 1st one will always be)
	const region = new Set<string>();
	const edges: Edge[] = [];

	region.add(getCoordinate(position));

	while (candidates.length > 0) {
		const candidate = candidates.shift(); // get the 1st one

		for (const increment of MAP_DIRECTIONS) {
			// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
			const next = { row: candidate!.row + increment.row, col: candidate!.col + increment.col };
			const nextCoordinate = getCoordinate(next);

			if (region.has(nextCoordinate)) {
				continue;
			}

			if (map[next.row]?.[next.col] === char) {
				region.add(nextCoordinate);
				VISITED.add(nextCoordinate);
				candidates.push(next);
			} else if (!region.has(nextCoordinate)) {
				edges.push({
					// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
					position: candidate!,
					direction: getCoordinate(increment)
				});
			}
		}
	}

	console.log('region', { region, edges });

	// to do: calculate the actual sides
	/*
		foreach direction -> findall --> sort by x/y --> check them all and +1 for every non continous

		alt: for each one -> find contigous --> remove them from the edges list

		altBetter: when saving edges --> instead of direction, save range, update range / add new
	*/


	return region.size;
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
	const input = readInputByLines('./inputs/test.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost); // 1456082
};

main();
