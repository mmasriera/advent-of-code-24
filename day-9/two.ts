import { readInputByLines } from '../utils/index.ts';

type freeBlock = {
	idx: number,
	size: number
}

const makeDisk = (line: string): { disk: number[]; freeIndexes: number[] } => {
	const disk = [];
	const freeIndexes = [];
	let id = 0;

	for (let i = 0; i < line.length; i += 1) {
		const blocks = new Array(Number(line[i]));

		if (i % 2 === 0) {
			disk.push(...blocks.fill(id));
			id += 1;
		} else {
			for (let idx = disk.length; idx < disk.length + blocks.length; idx += 1) {
				freeIndexes.push(idx);
			}
			disk.push(...blocks.fill(-1)); // free space
		}
	}

	return { disk, freeIndexes };
};

// const compact = (disk: number[], freeIndexes: number[]): number[] => {
// 	// for (const freeIndex of freeIndexes) {
// 	// 	while (disk[disk.length - 1] === -1) {
// 	// 		disk.pop();
// 	// 	}

// 	// 	if (disk.length > freeIndex) {
// 	// 		// biome-ignore lint/style/noNonNullAssertion: pop will always return a value
// 	// 		disk[freeIndex] = disk.pop()!;
// 	// 	}
// 	// }

// 	// return disk;

// 	for (let lastIdx = disk.length; lastIdx >= 0; --lastIdx) {

// 		let block = '';

// 		// while (lastIdx !== -1) {
// 		// 	block += 
// 		// }
// 	}


// 	return disk;
// };

const main = (): void => {
	const line = readInputByLines('./inputs/test.txt')[0];
	const { disk, freeIndexes } = makeDisk(line);
	// const compacted = compact(disk, freeIndexes);
	// const checksum = compacted.reduce((acc, curr, idx) => acc + curr * (idx), 0);

	console.log('result day 9, part 1:', disk, freeIndexes); // 6283170117911
};

main();
