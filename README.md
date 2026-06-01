# Englang

**Full name:** English, but it accidentally became a programming language.  
**Short description:** Pseudocode that actually runs.  
**One-line pitch:** Write it like English. Run it like code.

Englang is a tiny English-like programming language made for beginners who understand logic but do not want to fight syntax on day one.

It starts with readable instructions and then gradually moves learners toward symbolic and curly-brace syntax.

Englang is what happens when pseudocode gets tired of being theoretical.

Also known as:

```txt
English that runs
Pseudocode with commitment
JavaScript's polite younger cousin
A no-semicolon zone for beginners
The language your school notebook wanted
```

---

## Project Links

- Live docs website: `https://englang.pephub.tech/`
- GitHub repository: `https://github.com/Prasundas99/englang`

---

## What Englang Teaches

- values and variables
- expressions
- decisions (`if / else`)
- loops
- functions
- input/output flow

Example:

```englang
start
set name to "Alice".
print "Hello", name.
```

---

## Language Progression

- `V1`: English-like syntax (beginner-first)
- `V2`: Symbol-based pseudocode style
- `V3`: Curly-brace style closer to mainstream languages

---

## Features

- `start` program entry
- `set` assignments
- `print` output
- arithmetic expressions with precedence
- `if / else if / else`
- comparisons and logical conditions
- loops: `while`, `for each`, `repeat`
- `break`
- functions
- `ask(...)` input through runtime handler

---

## Folder Structure

```txt
englang/
  src/
    index.js
    lexer.js
    parser.js
    constants/
      tokens.js
    utils/
      syntax.js
  tests/
    tests.js
  examples/
    *.eng
    README.md
  docs/
    *.md
  scripts/
    build-cdn.mjs
  website/
    docusaurus.config.js
    docs/
    src/
    static/
  cdn/
    englang.min.js
  run.js
  index.js
  package.json
  Backlog.md
```

---

## Getting Started

### 1. Prerequisites

- Node.js (LTS recommended)
- npm

### 2. Install

```bash
npm install
```

### 3. Test

```bash
npm test
```

### 4. Run Sample

```bash
npm start
```

---

## Run Englang in Node.js

Create `playground.mjs`:

```js
import { runEnglang } from './src/index.js';

const sourceCode = `
start
set learner to "Prasun".
print "Hello", learner.
`;

const result = runEnglang(sourceCode, console);
console.log(result.output);
```

Run:

```bash
node playground.mjs
```

---

## Runtime API

```js
runEnglang(sourceCode, (logger = console), (options = {}));
```

- `sourceCode`: Englang program text
- `logger`: output logger (`console` by default)
- `options.ask(questionText)`: input provider for `ask(...)`

Return shape:

```js
{
  variables: {},
  functions: {},
  output: []
}
```

---

## Browser / CDN Usage

Build bundle:

```bash
npm run build:cdn
```

Outputs:

- `cdn/englang.min.js`
- `website/static/cdn/englang.min.js`

Browser usage:

```html
<script src="https://github.com/Prasundas99/englang/blob/main/cdn/englang.min.js"></script>
<script>
  const result = Englang.runEnglang(`
start
print "Hello from browser".
`);
  console.log(result.output);
</script>
```

---

## Docs Website (Local)

```bash
npm --prefix website install
npm --prefix website start
```

Build:

```bash
npm --prefix website run build
```

---

## Root Scripts

- `npm start` -> run sample (`run.js`)
- `npm test` -> run test suite (`tests/tests.js`)
- `npm run build:cdn` -> build browser bundle
- `npm run prepare` -> set up husky hooks

---

## Suggested Learning Path

1. Introduction
2. Tutorial (V1)
3. How To Use
4. CDN Usage
5. Thinking

Website: `https://englang.pephub.tech/`
