# Englang

Englang is a beginner-first programming language built in JavaScript.

It is designed to help learners understand programming logic using readable, English-like syntax before moving to symbol-heavy mainstream syntax.

---

## What Is Englang

Englang focuses on core programming ideas:

- values and variables
- expressions
- conditions
- loops
- functions
- input and output

You can write programs in a simple style such as:

```englang
start
set name to "Alice".
print "Hello", name.
```

---

## Language Stages

Englang is structured in learning stages:

- `V1`: English-like syntax (primary beginner mode)
- `V2`: Symbol-based pseudocode style
- `V3`: Curly-brace style closer to mainstream languages

---

## Features

- `start` program entry
- `set` assignments
- `print` output
- arithmetic expressions with precedence and parentheses
- `if / else if / else`
- comparisons and logical operators
- `while`, `for each`, and `repeat` loops
- `break` inside loops
- function declaration and function calls
- input using `ask(...)` with injected handler

---

## Project Structure

```txt
englang/
  src/
    index.js                 # Public runtime entry
    lexer.js                 # Tokenizer (source text -> tokens)
    parser.js                # Parser (tokens -> executable statements)
    constants/
      tokens.js              # Token type constants and keyword maps
    utils/
      syntax.js              # Shared syntax utilities
  tests/
    tests.js                 # Test suite
  examples/
    *.eng                    # Sample Englang programs
    README.md                # Example index
  docs/
    *.md                     # Thinking/design notes
  scripts/
    build-cdn.mjs            # Browser bundle build script
  website/                   # Docusaurus docs website
  run.js                     # Quick local run script
  index.js                   # Root re-export from src/index.js
  package.json
```

---

## Getting Started (Local)

### 1. Prerequisites

- Node.js (LTS recommended)
- npm

### 2. Install

```bash
npm install
```

### 3. Run Tests

```bash
npm test
```

### 4. Run Demo Program

```bash
npm start
```

`npm start` runs `run.js`.

---

## Quick Usage in Node.js

Create a file like `playground.mjs`:

```js
import { runEnglang } from "./src/index.js";

const sourceCode = `
start
set x to 10.
print "Value of x is", x.
`;

const result = runEnglang(sourceCode, console);
console.log(result.output);
```

Run:

```bash
node playground.mjs
```

---

## `runEnglang` API

```js
runEnglang(sourceCode, logger = console, options = {})
```

### Parameters

- `sourceCode` (`string`): Englang program text
- `logger` (`{ log: (...args) => void }`): output logger (defaults to `console`)
- `options` (`object`): runtime options

### Supported `options`

- `ask(questionText)` (`function`): returns input string/value for `ask(...)` expressions

Example:

```js
const result = runEnglang(sourceCode, console, {
  ask(questionText) {
    if (questionText === "What is your name?") return "Learner";
    return "";
  },
});
```

### Return Value

`runEnglang` returns a runtime snapshot object:

```js
{
  variables: { ... },
  functions: { ... },
  output: [ ... ]
}
```

---

## Browser / CDN Usage

Build browser bundle:

```bash
npm run build:cdn
```

Generated files:

- `cdn/englang.min.js`
- `website/static/cdn/englang.min.js`

In browser:

```html
<script src="https://your-host/englang.min.js"></script>
<script>
  const result = Englang.runEnglang(`
start
print "Hello from browser".
`);
  console.log(result.output);
</script>
```

---

## Website Documentation

The project includes a Docusaurus website under `website/`.

Run docs site locally:

```bash
npm --prefix website install
npm --prefix website start
```

Build docs site:

```bash
npm --prefix website run build
```

---

## NPM Scripts (Root)

- `npm start` -> run sample program (`run.js`)
- `npm test` -> run test suite (`tests/tests.js`)
- `npm run build:cdn` -> build browser bundle
- `npm run prepare` -> initialize Husky hooks

---

## Learning Path

If you are new to Englang:

1. Read docs website `Introduction`
2. Complete `Tutorial (V1)`
3. Follow `How To Use`
4. Try `CDN Usage`
5. Read `Thinking` for language design perspective

---

## Notes

- `Agent.md` and `Plan.md` are local workflow files and intentionally excluded from commits.
- The repository uses ES modules (`"type": "module"` in `package.json`).

