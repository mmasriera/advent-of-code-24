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

const compact = (blocks: Block[]): number[] => {
	let i = 0;
	let j = blocks.length - 1;

	while (i < j) {
		if (blocks[i].space > 0) {
			const last = blocks[j].file.slice(-1);
	
			if (last) {
				blocks[i].file += last;
				blocks[i].space -= 1;
	
				blocks[j].file = blocks[j].file.slice(0, -1);
				blocks[j].space += 1;
			} else {
				j -= 1;
			}
		} else {
			i += 1;
		}
	}

	return blocks.reduce((acc, block) => {
		const numbers = Array.from(block.file).map(Number);

		return acc.concat(numbers);
	}, [] as number[]);
};

const main = (): void => {
	const diskMap = readInputByLines('./inputs/input.txt')[0]; // may need to read as stream (1 line of 19999 chars)
	const blocks = getBlocks(diskMap);
	const compacted = compact(blocks);

	const checkSum = compacted.reduce((acc, id, idx) => acc + id * idx, 0);

	console.log('result day 9, part 1:', checkSum); // 89312744865 is too low
};

main();
