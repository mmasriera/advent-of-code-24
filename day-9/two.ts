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
			// for (let idx = disk.length; idx < disk.length + blocks.length; idx += 1) {
			// 	freeIndexes.push(idx);
			// }
			freeIndexes.push({ idx: disk.length, size: blocks.length });
			disk.push(...blocks.fill(-1)); // free space
		}
	}

	return { disk, freeIndexes };
};

// const compact = (disk: number[], freeIndexes: number[]): number[] => {
// 	for (const freeIndex of freeIndexes) {
// 		while (disk[disk.length - 1] === -1) {
// 			disk.pop();
// 		}

// 		if (disk.length > freeIndex) {
// 			// biome-ignore lint/style/noNonNullAssertion: pop will always return a value
// 			disk[freeIndex] = disk.pop()!;
// 		}
// 	}

// 	return disk;
// };

const compact = (disk: number[], freeIndexes: freeBlock[]): number[] => {
	let i = 0;
	let z = disk.length - 1;

	while (z > i) {
		// get last number and update z
		const value = disk[z];
		const lastBlock = [];

		if (value === -1) {
			break;
		}

		while (disk[z] === value && (z > i)) { // no need for the z > i condition ??
			lastBlock.push(disk[z]);
			z -= 1;
		}

		// fit lastblock in freeIndexes
		for (const freeIndex of freeIndexes) {
			if (freeIndex.size >= lastBlock.length) {
				freeIndex.size -= lastBlock.length;

				for (let idx = 0; idx < lastBlock.length; idx += 1) {
					disk[freeIndex.idx + idx] = lastBlock[idx];
					disk[z + idx + 1] = -1;
				}

				break;
			}
		}
	}
	

	return disk;
}

const main = (): void => {
	const line = readInputByLines('./inputs/test.txt')[0];
	const { disk, freeIndexes } = makeDisk(line);
	const compacted = compact(disk, freeIndexes);
	// // const compacted = compact(disk, freeIndexes);
	// // const checksum = compacted.reduce((acc, curr, idx) => acc + curr * (idx), 0);

	console.log('result day 9, part 2:', disk, freeIndexes); // 6283170117911
};

main();