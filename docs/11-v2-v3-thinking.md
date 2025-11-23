# V2 and V3 Thinking

## What this part does

V2 and V3 support provide a bridge from English syntax to mainstream symbolic syntax.

Current additions:

- V2 style symbols in expressions/conditions (`+ - * / > < == != >= <= =`)
- V3 style braces and semicolons in key blocks/statements

## Why this is needed

Englang is designed as staged learning:

- V1: English-first
- V2: symbolic transition
- V3: brace-based transition

## Decision taken

We keep one lexer/parser/runtime path and add syntax aliases, so V1 still works while V2/V3 are accepted.

Examples supported:

- `set x = 10;`
- `if x > 5 then ... end`
- `if x > 5 { ... } else { ... }`
- `print("text");`

## Other options considered

1. Separate parser for each language stage.
2. Delay V2/V3 until every V1 feature is perfect.
3. Convert V2/V3 source back into V1 text first.

## Why we did not choose those options

1. Multiple parsers add duplicate logic.
2. Plan asks for staged support now.
3. Text-rewrite layer adds complexity and debugging cost.

## Theory required

Minimal theory:

- multiple surface syntaxes can map to one internal AST shape

## Simple example

```englang
if x > 5 {
  print("big");
} else {
  print("small");
}
```

## Future improvement

- broader V3 forms (more C-style loop patterns)
- clearer syntax-mode examples in README
