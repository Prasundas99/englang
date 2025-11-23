# Token Thinking

## What this part does

`tokens.js` defines the language token names and token maps in one place.
It exports token types, keyword mapping, punctuation mapping, and symbol-operator mapping.

## Why this is needed

Without one shared token file, token strings get duplicated in multiple files.
That usually causes mismatches between lexer and parser later.

## Decision taken

We use plain objects:

- `TOKEN_TYPES` for all token names
- `KEYWORDS` for English words like `set`, `print`, `if`
- `PUNCTUATION` for `. , : ( )`
- `SYMBOL_OPERATORS` for `+ - * / = == != > < >= <=`

This keeps token logic centralized and beginner-readable.

## Other options considered

1. Hardcode token strings inside lexer and parser.
2. Use classes or enums with extra metadata.
3. Split tokens into multiple files.

## Why we did not choose those options

1. Hardcoding spreads logic and creates bugs when names change.
2. Classes/enums add complexity too early for this project stage.
3. Multiple token files are unnecessary while the project is still small.

## Theory required

Minimum theory:

`source code -> lexer tokens -> parser statements -> runtime execution`

Tokens are small pieces that let parser logic stay simple.

## Simple example

Source:

```englang
print "Hello".
```

Token idea:

```js
[
  { type: "PRINT", value: "print" },
  { type: "STRING", value: "Hello" },
  { type: "DOT", value: "." }
]
```

## Future improvement

Later we can add:

- multi-word token helpers (`divided by`, `is greater than`)
- source location data (`line`, `column`) for better errors
- V2/V3 token aliases while keeping V1 behavior stable
