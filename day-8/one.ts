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

const getAntinodes = (positions: Position[], limitRows: number, limitCols: number): Set<string> => {
	const antinodes = new Set<string>();

	for (let i = 0; i < positions.length; i += 1) {
		for (let j = i + 1; j < positions.length; j += 1) {
			const diffRows = positions[j].row - positions[i].row;
			const diffCols = positions[j].col - positions[i].col;

			// first antinode (top left)
			const topLeftRow = positions[i].row - diffRows;
			const topLeftCol = positions[i].col - diffCols;

			if (topLeftCol >= 0 && topLeftRow >= 0 && topLeftCol < limitCols && topLeftRow < limitRows) {
				antinodes.add(`${topLeftRow},${topLeftCol}`);
			}

			// second antinode (bottom right)
			const bottomRightRow = positions[j].row + diffRows;
			const bottomRightCol = positions[j].col + diffCols;

			if (bottomRightCol >= 0 && bottomRightRow >= 0 && bottomRightCol < limitCols && bottomRightRow < limitRows) {
				antinodes.add(`${bottomRightRow},${bottomRightCol}`);
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

	console.log('result day 8, part 1:', countTotalAntinodes(map)); // 351
};

main();
