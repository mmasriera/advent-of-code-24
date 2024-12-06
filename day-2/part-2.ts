
import { readInputByLines } from '../utils/index.ts';

type Reports = number[][];

const getReportsFromInput = (): Reports => {
    const reports: Reports = [];

    readInputByLines('./inputs/input-1.txt')
        .forEach(line => {
            reports.push(line.split(' ').map(Number));
        });

    return reports;
};

const isIncreasing = (a: number, b: number): boolean => {
    return b > a;
};

const isSafeReport = (report: number[]): boolean => {
    const isIncreasingReport = isIncreasing(report[0], report[1]);

    for (let i = 1; i < report.length; i++) {
        const hasSameDirection = isIncreasingReport === isIncreasing(report[i - 1], report[i]);
        const diff = Math.abs(report[i] - report[i - 1]);

        if (!hasSameDirection || (diff < 1 || diff > 3)) {
            return false;
        }
    }

    return true;
};

const isSafeWithRetry = (report: number[]): boolean => {
    for (let i = 0; i < report.length; i++) {
        const copy = [...report];

        copy.splice(i, 1);

        if (isSafeReport(copy)) { // retry without the level i
            return true;
        }
    }

    return false;
}

const main = (): number => {
    return getReportsFromInput()
        .filter(report => isSafeReport(report) || isSafeWithRetry(report))
        .length;
}

console.log('result day 2, part 2:', main()); // 488
