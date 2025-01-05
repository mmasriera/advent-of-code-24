import { readInputByLines } from '../utils/index.ts';

type Block = {
	file: string;
	space: number;
};

const getBlocks = (diskMap: string): Block[] => {
	const blocks: Block[] = [];

	for (let i = 0; i < diskMap.length; i += 2) {
		blocks.push({
			file: new Array(Number(diskMap[i])).fill(String(i / 2)).join(''),
			space: Number(diskMap[i + 1]),
		});
	}

	return blocks;
};

// opt 1: build a representation and move 2 pointers
// opt 2: use a structure to keep track of the free space and the blocks

const main = (): void => {
	const diskMap = readInputByLines('./inputs/test.txt')[0]; // may need to read as stream (1 line of 19999 chars)
	const blocks = getBlocks(diskMap);

	console.log('result day 9, part 1:', blocks); //
};

main();
