import { readInputByLines } from '../utils/index.ts';

const getRegions = (input: string[]): string[] => {
	const regions: string[] = [];

	for (const line of input) {
		for (let i = 0; i < line.length; i += 1) {
			const char = line[i];

			regions.push(`${i},${char}`);
		}
	}

	return regions;
};

const main = (): void => {
	const input = readInputByLines('./inputs/test.txt');

	const regions = getRegions(input);

	console.log('result day 12, part 1:', regions);
};

main();
