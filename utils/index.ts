
export const readInputByLines = (path: string): string[] => {
    return Deno.readTextFileSync(path).split('\n')
};