
import { readInputByLines } from '../utils/index.ts';

type Reports = number[][];

const getReportsFromInput = (): Reports => {
    const reports: Reports = [];

    readInputByLines('./inputs/input-one.txt')
        .forEach(line => {
            reports.push(line.split(' ').map(Number));
        });

    return reports;
};

const isIncreasing = (a: number, b: number): boolean => {
    return (a !== b) && (b > a);
};

const isSafe = (report: number[]): boolean => {
    const isIncreasingReport = isIncreasing(report[0], report[1]);

    for (let i = 1; i < report.length; i++) {
        if (isIncreasingReport === isIncreasing(report[i], report[i - 1])) {
            return false; // not in same direction (asc/desc)
        }
        const diff = Math.abs(report[i] - report[i - 1]);
        if ((diff < 1) || (diff > 3)) {
            return false;
        }
    }

    return true;
};


const main = (): number => {
    const reports = getReportsFromInput();

    return reports.filter(isSafe).length;
}

console.log('result day 2, part 1:', main()); // 432
