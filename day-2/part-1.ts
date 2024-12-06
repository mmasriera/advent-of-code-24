
type Data = number[][];

const getListsFromInput = (): Data => {
    const lists: Data = [];

    Deno.readTextFileSync('./inputs/input-2.txt')
        .split('\n')
        .filter(line => line.length > 0)
        .forEach(line => {
            lists.push(line.split(' ').map(Number));
        });

    return lists;
};


const main = (): number => {
    return 0;
}

console.log('result:', main());
