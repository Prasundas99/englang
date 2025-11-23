# Testing Thinking

## What this part does

Testing verifies lexer, parser, runtime, and example programs with runnable integration checks.

## Why this is needed

Language features interact heavily; regressions are easy without tests.

## Decision taken

Use one lightweight `tests.js` runner with:

- direct feature tests (set, print, expressions, conditions, loops)
- function/input tests
- V2/V3 syntax tests
- example-file execution checks

## Other options considered

1. Add a full external test framework now.
2. Test only parser nodes without runtime execution.
3. Manual-only testing with `run.js`.

## Why we did not choose those options

1. Extra framework setup is unnecessary at this stage.
2. Runtime behavior is critical and must be tested.
3. Manual-only testing is too fragile as features grow.

## Theory required

Minimal theory:

- unit-style checks for parser/runtime parts
- integration checks for full programs

## Simple example

Run:

```bash
npm test
```

Expected:

```txt
All tests passed.
```

## Future improvement

- split tests into separate files when project grows
- add negative tests for syntax errors
- add browser demo smoke tests
