
import { readInputByLines } from '../utils/index.ts';

type freeBlock = {
	idx: number,
	size: number
}

const makeDisk = (line: string): { disk: number[]; freeIndexes: freeBlock[] } => {
	const disk = [];
	const freeIndexes = [];
	let id = 0;

	for (let i = 0; i < line.length; i += 1) {
		const blocks = new Array(Number(line[i]));

		if (i % 2 === 0) {
			disk.push(...blocks.fill(id));
			id += 1;
		} else {
			freeIndexes.push({ idx: disk.length, size: blocks.length });
			disk.push(...blocks.fill(-1)); // free space
		}
	}

	return { disk, freeIndexes };
};

const compact = (disk: number[], freeIndexes: freeBlock[]): number[] => {
	let z = disk.length - 1; // start iterating from the end

	while (z > 0) {
		const value = disk[z];
		const block = [];

		if (value === -1) {
			z -= 1;
			continue;
		}

		while (disk[z] === value) {
			block.push(disk[z]);
			z -= 1;
		}

		// fit lastblock in freeIndexes
		for (const freeIndex of freeIndexes) {
			if (freeIndex.size >= block.length && (freeIndex.idx < z)) {
				for (let idx = 0; idx < block.length; idx += 1) {
					disk[freeIndex.idx + idx] = block[idx]; // place element of block in a free space
					disk[z + idx + 1] = -1; // free from the block at the end
				}

				freeIndex.size -= block.length;
				freeIndex.idx += block.length;

				break;
			}
		}
	}
	

	return disk;
}

const main = (): void => {
	const line = readInputByLines('./inputs/input.txt')[0];
	const { disk, freeIndexes } = makeDisk(line);
	const compacted = compact(disk, freeIndexes);
	const checksum = compacted
		.map(value => value === -1 ? 0 : value)
		.reduce((acc, curr, idx) => acc + curr * (idx), 0);

	console.log('result day 9, part 2:', checksum); // 6307653242596
};

main();
