# advent-of-code-24

[advent of code 24](https://adventofcode.com/)

## using Deno 2.1.3

```sh
cd day-1
deno run --allow-read ./one.ts
```

## lint & format -> [biomejs 1.9.4](https://biomejs.dev/)

```sh
deno task check
deno task format
```

debug (vscode) --> launch.json 
```json
{
    "type": "node",
    "program": "${workspaceFolder}/dayX/one.ts",
    "cwd": "${workspaceFolder}/dayX",
    "runtimeArgs": [
        "run",
        "--unstable",
        "--inspect-wait",
        "--allow-all"
    ]
}
```