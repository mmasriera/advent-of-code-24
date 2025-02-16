
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

export const readInputFile = (path: string): string => {
	return Deno.readTextFileSync(path);
};

export const readInputByLines = (path: string): string[] => {
	return readInputFile(path).split('\n');
};
