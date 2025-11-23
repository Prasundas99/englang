# Expression Thinking

## What this part does

Expression handling converts value tokens into evaluatable nodes.
It supports literals, identifiers, English arithmetic, precedence, and parentheses:
`plus`, `minus`, `times`, `divided by`.

## Why this is needed

Without expressions, `set` can only assign fixed literals.
Expressions allow computed values like `set y to x plus 5.`

## Decision taken

Current parser builds:

- `StringLiteral`
- `NumberLiteral`
- `BooleanLiteral`
- `Identifier`
- `BinaryExpression`

Parser now uses simple recursive-descent levels:

- primary values and `( ... )`
- multiply/divide
- add/subtract

## Other options considered

1. Keep left-to-right expression parsing only.
2. Direct string-eval style math handling.
3. Restrict set values to only literals for longer.

## Why we did not choose those options

1. Left-to-right gives wrong math for many normal expressions.
2. String eval is unsafe and less readable.
3. Literal-only assignment blocks useful beginner examples.

## Theory required

Minimal theory:

- expression tree nodes represent computation
- runtime recursively evaluates left/right values

## Simple example

Source:

```englang
set x to 10.
set y to x plus 5.
```

Parsed idea:

```js
{
  type: "SetStatement",
  name: "y",
  value: {
    type: "BinaryExpression",
    operator: "PLUS",
    left: { type: "Identifier", name: "x" },
    right: { type: "NumberLiteral", value: 5 }
  }
}
```

## Future improvement

Next step is to extend this same structure for:

- comparison expressions
- boolean connectors (`and`, `or`)
- cleaner handling of multi-word operators
