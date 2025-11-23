# Runtime Thinking

## What this part does

The runtime executes parsed statements from the program body.
It now executes `PrintStatement` and `SetStatement` nodes.

## Why this is needed

Lexer and parser only prepare structure.
The runtime is the step that actually runs program behavior.

## Decision taken

We use a small runtime object:

```js
{
  variables: {},
  functions: {},
  output: []
}
```

`runEnglang` now follows:

`source -> tokenize -> parse -> runProgram`

`runProgram` loops over statements and calls `runStatement`.

## Other options considered

1. Keep line-based regex execution only.
2. Use classes (`Runtime`, `ExecutionContext`) early.
3. Execute directly inside parser.

## Why we did not choose those options

1. Regex execution does not scale well for loops/functions.
2. Classes add complexity too early for this project stage.
3. Mixing parse and execute makes code harder to reason about.

## Theory required

Minimal theory:

- parser builds statement objects
- runtime executes those objects

This separation keeps each step focused and readable.

## Simple example

Source:

```englang
start
print "Hello".
```

Parsed statement:

```js
{
  type: "PrintStatement",
  values: [{ type: "StringLiteral", value: "Hello" }]
}
```

Runtime result:

```js
{
  variables: {},
  output: ["Hello"]
}
```

## Future improvement

Next stories will add:

- expression evaluation for arithmetic
- condition and loop execution
