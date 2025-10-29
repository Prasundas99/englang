# Englang

Englang is a beginner-friendly teaching language written in vanilla JavaScript ES modules.

It supports:

- V1 English-style syntax
- V2 symbolic syntax (basic)
- V3 brace/semicolon syntax (basic)

## Run in Terminal (Node.js)

Prerequisite: Node.js installed.

```bash
npm test
npm start
```

## Run in Browser (JS module)

`runEnglang` is exported from `index.js` and can be imported in browser modules.

```html
<script type="module">
  import { runEnglang } from "./index.js";

  runEnglang(`
start
set x to 10.
print "Hello from browser", x.
`);
</script>
```

Use a local server for module loading.

## Public API

```js
import { runEnglang } from "./index.js";

const result = runEnglang(sourceCode, console, {
  ask(promptText) {
    return "Alice";
  },
});
```

Return shape:

```js
{
  variables: {},
  functions: {},
  output: []
}
```

## Supported Features

- `start`
- `set` assignments (`set x to 10.` and `set x = 10;`)
- `print` statements (`print "Hi".` and `print("Hi");`)
- expressions with precedence and parentheses
- if / else / else if
- comparisons and logical `and` / `or`
- while loop
- for each loop
- repeat loop
- break
- function definition and call
- ask input expression via injected runtime provider

## Example Programs

See [examples/README.md](examples/README.md) and `.eng` programs in `examples/`.

## Project Layout

- `index.js` runtime entry and execution
- `lexer.js` tokenization
- `tokens.js` token constants/maps
- `parser.js` statement and expression parsing
- `tests.js` test runner
- `run.js` quick sample run
- `docs/` decision notes
- `examples/` runnable Englang examples
