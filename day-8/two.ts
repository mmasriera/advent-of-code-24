import { readInputByLines } from '../utils/index.ts';

type Position = {
	row: number;
	col: number;
};

const DOT = '.';

const getAntennaPositions = (map: string[]): Map<string, Position[]> => {
	const sameFreqAntennas = new Map<string, Position[]>();

	for (let row = 0; row < map.length; row += 1) {
		for (let col = 0; col < map[row].length; col += 1) {
			if (map[row][col] !== DOT) {
				const freq = map[row][col];

				if (sameFreqAntennas.has(freq)) {
					sameFreqAntennas.get(freq)?.push({ row, col });
				} else {
					sameFreqAntennas.set(freq, [{ row, col }]);
				}
			}
		}
	}

	return sameFreqAntennas;
};

const isInMap = (row: number, col: number, numRows: number, numCols: number): boolean => {
	return row >= 0 && col >= 0 && row < numRows && col < numCols;
};

const getAntinodes = (positions: Position[], numRows: number, numCols: number): Set<string> => {
	const antinodes = new Set<string>();

	for (let i = 0; i < positions.length; i += 1) {
		for (let j = i + 1; j < positions.length; j += 1) {
			// vector between two antennas
			const [v1, v2] = [positions[j].row - positions[i].row, positions[j].col - positions[i].col];

			// first antinode (in one direction)
			const topLeft = { row: positions[i].row, col: positions[i].col };

			while (isInMap(topLeft.row, topLeft.col, numRows, numCols)) {
				antinodes.add(`${topLeft.row},${topLeft.col}`);

				topLeft.row -= v1;
				topLeft.col -= v2;
			}

			// second antinode (in the opposite direction)
			const bottomRight = { row: positions[j].row, col: positions[j].col };

			while (isInMap(bottomRight.row, bottomRight.col, numRows, numCols)) {
				antinodes.add(`${bottomRight.row},${bottomRight.col}`);

				bottomRight.row += v1;
				bottomRight.col += v2;
			}
		}
	}

	return antinodes;
};

const countTotalAntinodes = (map: string[]): number => {
	const sameFreqAntennas = getAntennaPositions(map);

	const antinodes = Array.from(sameFreqAntennas.values())
		.map((positions) => getAntinodes(positions, map.length, map[0].length))
		// biome-ignore lint/performance/noAccumulatingSpread: concatenate sets
		.reduce((acc, antinodes) => new Set([...acc, ...antinodes]), new Set());

	return antinodes.size;
};

const main = (): void => {
	const map = readInputByLines('./inputs/input.txt');

	console.log('result day 8, part 2:', countTotalAntinodes(map)); // 1259
};

main();
