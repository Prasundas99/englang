# Input Thinking

## What this part does

Input support adds `ask("...")` as an expression so learners can read values into variables.

## Why this is needed

Many beginner programs need user-provided values.
`ask(...)` keeps syntax simple and readable.

## Decision taken

Runtime accepts an input provider through options:

- `runEnglang(source, logger, { ask })`

When `ask` is called in code, runtime invokes this provider synchronously.

## Other options considered

1. Hardcode browser prompt directly inside runtime.
2. Use async-only input and expose await in Englang.
3. Skip input until very late.

## Why we did not choose those options

1. Hardcoding prompt breaks Node and tests.
2. Async syntax is not beginner-friendly for this stage.
3. Input is required by major example programs.

## Theory required

Minimal theory:

- language syntax can stay simple
- host runtime can inject environment-specific behavior

## Simple example

```englang
set name to ask("What is your name?").
print "Hello", name.
```

## Future improvement

- browser helper using `window.prompt`
- Node helper using `readline`
- optional input validation helpers
