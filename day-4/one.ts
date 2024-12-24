
import { readInputByLines } from '../utils/index.ts';

type Reports = string[][];

const getPuzzle = (): string[][] => {
    return readInputByLines('./inputs/input-test.txt');
}

const main = (): number => {
    const puzzle = getPuzzle();

    console.log('puzzle:', puzzle);

    return 3;
}

console.log('result day 4, part 1:', main()); // 
