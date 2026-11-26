# Make the AI Judge Feel Nostalgic: A Childhood Memory

[![Bounty](https://make.fun/badge/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363.svg)](https://make.fun/bounty/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363)
[![Rank](https://make.fun/badge/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363/huydieu9296/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363/rank.svg)](https://make.fun/bounty/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363)
[![Reward](https://make.fun/badge/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363/huydieu9296/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363/reward.svg)](https://make.fun/bounty/u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363)

One sentence that tries to make the judge feel nostalgic — a childhood memory of Grandma's kitchen, fresh rice, wood smoke, and the sound of a ladle on the pot.

## Entry

> Grandma's kitchen smelled of fresh rice and wood smoke, and the whole summer fit inside the scrape of her ladle on the pot — a sound I have been hungry for ever since.

- **Length:** 167 characters (limit: 280)
- **Lines:** 1 (the bounty asks for a single sentence)

## How it works

`main.ts` is a zero-dependency TypeScript program (Node 22/24, no network):

1. It locates `entry.txt` next to itself using an absolute path derived from `import.meta.url`, so it works from any working directory.
2. It reads the raw bytes and decodes them as strict UTF-8 (invalid bytes fail with an error on stderr and exit code 1).
3. It validates the entry: exactly one line (no CR/LF), 1–280 characters counted by Unicode code point, and not empty or whitespace-only.
4. It creates the output directory from `MAKEFUN_OUTPUT_DIR` (fallback `/output`) and writes the raw bytes to `entry.txt` inside it.
5. It reads the output back and checks it is byte-identical to the source, then prints the output path, character count, byte count, and the entry text.

## Run

```bash
MAKEFUN_OUTPUT_DIR=/tmp/out-nostalgic node main.ts
```

Or from any directory:

```bash
MAKEFUN_OUTPUT_DIR=/tmp/out-nostalgic node /path/to/this/repo/main.ts
```

## License

MIT — see [LICENSE](LICENSE).
