export type Position = {
	x: number;
	y: number;
};

export const DIRECTIONS: Position[] = [
	{ x: 0, y: 1 }, // up
	{ x: 1, y: 0 }, // right
	{ x: 0, y: -1 }, // down
	{ x: -1, y: 0 }, // left
];

export type MapPosition = {
	row: number;
	col: number;
};

// positions for input maps
export const MAP_DIRECTIONS: MapPosition[] = [
	{ row: -1, col: 0 }, // up
	{ row: 0, col: 1 }, // right
	{ row: 1, col: 0 }, // down
	{ row: 0, col: -1 }, // left
];

export const getCoordinate = (position: MapPosition): string => `${position.row},${position.col}`;

export const sumPositions = (positionA: MapPosition, PositionB: MapPosition): MapPosition => ({
	row: positionA.row + PositionB.row,
	col: positionA.col + PositionB.col,
});

export const isEqPosition = (positionA: MapPosition, PositionB: MapPosition): boolean => {
	return positionA.row === PositionB.row && positionA.col === PositionB.col;
};

// I/O
export const readInputFile = (path: string): string => {
	return Deno.readTextFileSync(path);
};

export const readInputByLines = (path: string): string[] => {
	return readInputFile(path).split('\n');
};
