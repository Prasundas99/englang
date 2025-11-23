# Lexer Thinking

## What this part does

`lexer.js` reads raw Englang source code and converts it into tokens.
It detects words, numbers, strings, punctuation, and known keywords.

## Why this is needed

Raw text is hard to parse directly once language features grow.
Tokens create a clean intermediate step so parser logic stays simpler.

## Decision taken

We use a plain, beginner-readable lexer function:

- read source as text
- split and inspect parts in order
- map known words using `KEYWORDS`
- map punctuation using `PUNCTUATION`
- map numbers/strings using simple checks
- keep unknown words as `IDENTIFIER`

No classes, no advanced parser theory, no plugin system.

## Other options considered

1. Parse statements directly from raw lines without tokens.
2. Build a very advanced lexer with position metadata from day one.
3. Use regex-heavy one-liner pipelines.

## Why we did not choose those options

1. Direct parsing becomes messy when conditions and loops are added.
2. Full metadata is useful later, but adds noise now.
3. Dense regex pipelines are harder for beginners to follow.

## Theory required

Minimal theory:

`source -> lexer tokens -> parser statements -> runtime`

A lexer only identifies meaningful pieces. It does not decide full statement meaning.

## Simple example

Source:

```englang
start
print "Hello".
```

Token output idea:

```js
[
  { type: "START", value: "start" },
  { type: "PRINT", value: "print" },
  { type: "STRING", value: "Hello" },
  { type: "DOT", value: "." }
]
```

## Future improvement

Later we can improve lexer behavior by:

- handling multi-word operators (`divided by`, `is greater than`)
- handling strings with spaces more robustly
- adding `line` and `column` for better error messages
