
export const readInputFile = (path: string): string => {
    return Deno.readTextFileSync(path);
};

export const readInputByLines = (path: string): string[] => {
    return readInputFile(path).split('\n');
};