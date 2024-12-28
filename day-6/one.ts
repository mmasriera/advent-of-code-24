import { readInputByLines } from '../utils/index.ts';

const UP = '^';
const RIGHT = '>';
const DOWN = 'v';
const LEFT = '<';

const BLOKCER = '#';
const MARK = 'x'

const DIRECTIONS = [UP, RIGHT, DOWN, LEFT];

const findGuard = (map: string[][]): [number, number] => {
    for (let row = 0; row < map.length; row++) {
        for (let cell = 0; cell < map[row].length; cell++) {
            if (DIRECTIONS.includes(map[row][cell])) {
                return [row, cell];
            }
        }
    }

    return [0, 0];
};

const getNextPosition = (row: number, col: number, direction: string): [number, number] => {
    if (direction === UP) {
        return [row - 1, col];
    } else if (direction === RIGHT) {
        return [row, col + 1];
    } else if (direction === DOWN) {
        return [row + 1, col];
    } 

    return [row, col - 1]; 
};

const rotateDirection = (direction: string): string => {
    const index = DIRECTIONS.indexOf(direction);
    
    return DIRECTIONS[(index + 1) % DIRECTIONS.length];
};

const markMap = (map: string[][]): string[][] => {
    let [row, col] = findGuard(map); // starting position
    let direction = map[row][col];

    while ( map[row]?.[col]) { 

        map[row][col] = MARK;

        const [nextRow, nextCol] = getNextPosition(row, col, direction);
        const nextCell = map[nextRow]?.[nextCol];
        
        if (!nextCell) {
            break; // out of map
        }

        if (nextCell === BLOKCER) {
            direction = rotateDirection(direction);
        } else {
            row = nextRow;
            col = nextCol;
        }
    }

    return map;
};

const countMarks = (map: string[][]): number => {
    return map.reduce((acc, line) => acc + line.filter(cell => cell === MARK).length, 0);
};


// TO DO: use a structure of visited positions & cehck performance
const main = (): number => {
    const map = readInputByLines('./inputs/input-one.txt').map(line => line.split(''));
    // need to mark them because we count DEFFERENT positions, this or have a structure of visited positions
    const markedMap = markMap(map);

    return countMarks(markedMap);
}

console.log('result day 6, part 1:', main()); // 4789
