
type Lists = [number[], number[]];
type Counter = Record<number, number>

const getListsFromInput = (): Lists => {
    const lists: Lists = [[], []];

    Deno.readTextFileSync('./inputs/input-1.txt')  // same as in part 1
        .split('\n')
        .map(line => line.split('   ').map(Number))
        .forEach(([first, second]) => {
            lists[0].push(first);
            lists[1].push(second);
        });

    return lists;
};

const buildCounter = (list: number[]): Counter => {
    return list.reduce((counter, id) => {
        counter[id] = (counter[id] || 0) + 1;

        return counter;
    }, {} as Counter);
}

const calculateSimilarityScore = (list: number[], counter: Counter): number => {
    let similarityScore = 0;

    list.forEach(id => {
        const repetitions = counter[id] || 0;

        similarityScore += id * repetitions;
    })

    return similarityScore;
};

const main = (): number => {
    const [list1, list2] = getListsFromInput();
    const counter = buildCounter(list2);
    
    return calculateSimilarityScore(list1, counter);
};

console.log('result part 2:', main()); // success: 23387399
