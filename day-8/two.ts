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

const isInMap = (row: number, col: number, limitRows: number, limitCols: number): boolean => {
	return row >= 0 && col >= 0 && row < limitRows && col < limitCols;
};

const getAntinodes = (positions: Position[], limitRows: number, limitCols: number): Set<string> => {
	const antinodes = new Set<string>();

	for (let i = 0; i < positions.length; i += 1) {
		for (let j = i + 1; j < positions.length; j += 1) {
			const diffRows = positions[j].row - positions[i].row;
			const diffCols = positions[j].col - positions[i].col;

			// first antinode (in one direction)
			const topLeft = { row: positions[i].row, col: positions[i].col };

			while (isInMap(topLeft.row, topLeft.col, limitRows, limitCols)) {
				antinodes.add(`${topLeft.row},${topLeft.col}`);

				topLeft.row -= diffRows;
				topLeft.col -= diffCols;
			}

			// second antinode (in the opposite direction)
			const bottomRight = { row: positions[j].row, col: positions[j].col };

			while (isInMap(bottomRight.row, bottomRight.col, limitRows, limitCols)) {
				antinodes.add(`${bottomRight.row},${bottomRight.col}`);

				bottomRight.row += diffRows;
				bottomRight.col += diffCols;
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

	console.log('result day 8, part 1:', countTotalAntinodes(map)); // 1259
};

main();
