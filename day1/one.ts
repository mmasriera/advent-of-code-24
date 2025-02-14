import { readInputByLines } from '../utils/index.ts';

type Lists = [number[], number[]];

const getListsFromInput = (): Lists => {
	const lists: Lists = [[], []];

	readInputByLines('../inputs/input-one.txt')
		.map((line) => line.split('   ').map(Number))
		.forEach(([first, second]) => {
			lists[0].push(first);
			lists[1].push(second);
		});

	return lists;
};

const sumDistances = (list1: number[], list2: number[]): number => {
	return list1.reduce((sum, item, idx) => sum + Math.abs(item - list2[idx]), 0);
};

const main = (): number => {
	const [list1, list2] = getListsFromInput();

	list1.sort();
	list2.sort();

	return sumDistances(list1, list2);
};

console.log('result:', main()); // success: 1197984
