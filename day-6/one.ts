
import { readInputByLines } from '../utils/index.ts';

const UP = '^';
const RIGHT = '>';
const DOWN = 'v';
const LEFT = '<';

const BLOKCER = '#';

const DIRECTIONS = [UP, RIGHT, DOWN, LEFT];

const findGuard = (map: string[]): [number, number] => {
    for (let row = 0; row < map.length; row++) {
        for (let cell = 0; cell < map[row].length; cell++) {
            if (DIRECTIONS.includes(map[row][cell])) {
                return [row, cell];
            }
        }
    }

    return [0, 0];
}

const getNextPosition = (row: number, col: number, direction: string): [number, number] => {
    switch (direction) {
        case UP:
            return [row - 1, col];
        case RIGHT:
            return [row, col + 1];
        case DOWN:
            return [row + 1, col];
        case LEFT:
            return [row, col - 1];
        default: // won't happen
            return [row, col];
    }
}

const rotateDirection = (direction: string): string => {
    const index = DIRECTIONS.indexOf(direction);
    
    return DIRECTIONS[(index + 1) % DIRECTIONS.length];
}

const countSteps = (map: string[]): number => {
    let steps = 0;
    let [row, col] = findGuard(map); // starting position
    let direction = map[row][col];

    const printMap = map.map(line => line.split(''));

    while ( // while in map limits
        (row >= 0)
        && (col >= 0)
        && (row < map.length - 1)
        && (col < map[0].length - 1)
    ) { 
        // console.log('--------------------------------');
        // console.log('row', row, 'col', col, 'cell', map[row][col]);

        const [nextRow, nextCol] = getNextPosition(row, col, direction);
        const nextCell = map[nextRow][nextCol];

        // console.log('nextRow', nextRow, 'nextCol', nextCol);
        // console.log('nextCell', nextCell);

        if (nextCell === BLOKCER) {
            // console.log('rotate', rotateDirection(direction));

            direction = rotateDirection(direction);
        } else {
            // console.log('update');
            // printMap[row][col] = 'X';
            row = nextRow;
            col = nextCol;

            if (nextCell === '.') {
                steps += 1;
            }
        }
    }

    // console.log(printMap.map(line => line.join('')).join('\n'));

    return steps - 2;
}

const main = (): number => {
    const map = readInputByLines('./inputs/input-one.txt');

    return countSteps(map);
}

console.log('result day 6, part 1:', main()); // 5190 too high
