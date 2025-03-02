import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED = new Set<string>();

type Edge = {
	position: Position,
	direction: string // will be the index of the direction
}

const posToId = (position: Position): string => `${position.x},${position.y}`;

const calculateRegionCost = (map: string[][], char: string, position: Position): number => {
	const candidates: Position[] = [position]; // candidates for the region (the 1st one will always be)
	const region = new Set<string>();
	const edges: Edge[] = [];

	region.add(posToId(position));

	while (candidates.length > 0) {
		const candidate = candidates.shift(); // get the 1st one

		for (const increment of DIRECTIONS) {
			// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
			const next = { x: candidate!.x + increment.x, y: candidate!.y + increment.y };
			const nextCoordinate = posToId(next);

			if (region.has(nextCoordinate)) {
				continue;
			}

			if (map[next.x]?.[next.y] === char) {
				region.add(nextCoordinate);
				VISITED.add(nextCoordinate);
				candidates.push(next);
			} else if (!region.has(nextCoordinate)) {
				edges.push({
					// biome-ignore lint/style/noNonNullAssertion: the while condition prevents candidate from being undefined
					position: candidate!,
					direction: posToId(increment)
				});
			}
		}
	}

	console.log('region', { region });

	// to do: calculate the actual sides
	/*
		foreach direction -> findall --> sort by x/y --> check them all and +1 for every non continous

		alt: for each one -> find contigous --> remove themf from the edges list
	*/


	return region.size;
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
	const input = readInputByLines('./inputs/test.txt').map((s) => s.split(''));
	const totalCost = calculateTotalCost(input);

	console.log('result day 12, part 1:', totalCost); // 1456082
};

main();
