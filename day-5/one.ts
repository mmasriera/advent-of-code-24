
import { readInputByLines } from '../utils/index.ts';

type OrderingRules = Record<number, number[]>;
type Updates = number[][];

const getInputData = (): { orderingRules: OrderingRules; updates: Updates } => {
    const orderingRules: OrderingRules = {};
    const updates: Updates = [];

    const input = readInputByLines('./inputs/input-test.txt');

    input.forEach((line) => {
        if (line.includes('|')) {   
            const [pageX, pageY] = line.split('|').map(Number);

            if (!orderingRules[pageX]) {    
                orderingRules[pageX] = [];
            }

            orderingRules[pageX].push(pageY);
        } else if (line.includes(',')) {
            const update = line.split(',').map(Number);

            updates.push(update);
        }
    });

    return { orderingRules, updates };
}

const getMiddleElement = (update: number[]): number => {
    return update[Math.floor(update.length / 2)];
}

const isCorrectUpdate = (update: number[], orderingRules: OrderingRules): boolean => {
    return true;
}

const main = (): number => {
    const { orderingRules, updates } = getInputData();

    return updates
        .filter(update => isCorrectUpdate(update, orderingRules))
        .map(getMiddleElement)
        .reduce((acc, curr) => acc + curr, 0);
}

console.log('result day 5, part 1:', main()); //