
type Lists = [number[], number[]];

const getListsFromInput = (): Lists => {
    const lists: Lists = [[], []];

    Deno.readTextFileSync('./inputs/input-test.txt')
        .split('\n')
        .map(line => line.split('   ').map(Number))
        .forEach(([first, second]) => {
            lists[0].push(first);
            lists[1].push(second);
        });

    return lists;
};

const sumDistances = (list1: number[], list2: number[]): number => {
    let sum = 0;

    list1.forEach((item, idx) => {
        sum += Math.abs(item - list2[idx]);
    });

    return sum;
}

const main = (): number => {
    const [list1, list2] = getListsFromInput();

    return sumDistances(list1, list2);
};

console.log('result:', main()); // success: 1197984
