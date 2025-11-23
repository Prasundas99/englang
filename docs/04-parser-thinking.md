# Parser Thinking

## What this part does

`parser.js` reads lexer tokens and converts them into program statements.
Right now it supports `PrintStatement` and `SetStatement` parsing.

## Why this is needed

Tokens show small pieces of code, but not full statement meaning.
The parser groups tokens into clear statement objects that runtime can execute.

## Decision taken

We use a simple loop-based parser:

- skip optional `START`
- detect statement type by token (`PRINT`, `SET`)
- parse values until `DOT`
- return a `Program` object with `body` array

Parsed print values are mapped to readable node types:

- `StringLiteral`
- `NumberLiteral`
- `BooleanLiteral`
- `Identifier`

Set statements use:

- variable name token after `set`
- required `to` token
- one value expression token
- required ending dot

## Other options considered

1. Execute directly from token stream without statement objects.
2. Build a full AST class hierarchy.
3. Use parser generators or external parsing libraries.

## Why we did not choose those options

1. Direct token execution becomes messy for loops/functions.
2. Class-heavy AST is too complex for current project stage.
3. Parser generators add dependency and learning overhead.

## Theory required

Minimal theory:

`tokens -> statements -> runtime execution`

Parser responsibility is structure, not side effects.

## Simple example

Source:

```englang
print "The value is", x, 10.
```

Parsed statement:

```js
{
  type: "PrintStatement",
  values: [
    { type: "StringLiteral", value: "The value is" },
    { type: "Identifier", name: "x" },
    { type: "NumberLiteral", value: 10 }
  ]
}
```

## Future improvement

Next parser stories will add:

- expression parsing
- `if/else`
- loops and functions
