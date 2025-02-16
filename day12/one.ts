
import { readInputByLines, DIRECTIONS, type Position } from '../utils/index.ts';

/*
	BFS + visited
*/

const VISITED: Record<string, Position[]> = {};

const isVisited = (char: string, position: Position): boolean => {
	return !!VISITED[char]?.find((p) => p.x === position.x && p.y === position.y);
};

const visitRegion = (map: string[], char: string, { x, y }: Position): void => {
	VISITED[char].push({ x, y });

	for (const direction of DIRECTIONS) {
		const newPosition = { x: x + direction.x, y: y + direction.y };

		if ((map[newPosition.x]?.[newPosition.y] === char) && !isVisited(char, newPosition)) {
			visitRegion(map, char, newPosition);
		}
	}
}

const getRegions = (map: string[]): string[] => {
	const regions: string[] = [];

	for (let row = 0; row < map.length; row += 1) {
		for (let column = 0; column < map[row].length; column += 1) {
			const char = map[row][column];

			if (!isVisited(char, { x: row, y: column })) {
				VISITED[char] = VISITED[char] ?? [];

				visitRegion(map, char, { x: row, y: column });
			}
		}
	}

	return regions;
};

const main = (): void => {
	const input = readInputByLines('./inputs/test.txt');

	const regions = getRegions(input);

	console.log('result day 12, part 1:', VISITED);
};

main();
