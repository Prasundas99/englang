# Function Thinking

## What this part does

Function support allows reusable named blocks:

- define: `function greet(name): ... end`
- call: `greet("Alice").`

## Why this is needed

Without functions, learners repeat the same statements many times.
Functions introduce reuse and basic parameter passing.

## Decision taken

Parser creates:

- `FunctionDefinition` (name, params, body)
- `FunctionCallStatement`
- `FunctionCallExpression`

Runtime stores definitions in `runtime.functions` and runs calls with a local scope chained to outer variables.

## Other options considered

1. No local scope, write directly into global variables.
2. Full closure and return-value system now.
3. Separate function-only parser path.

## Why we did not choose those options

1. Global-only calls easily cause variable conflicts.
2. Full closure support is too advanced for this stage.
3. One parser path keeps the code easier to follow.

## Theory required

Minimal theory:

- function definition stores code
- function call binds arguments to parameters
- body executes with a local variable scope

## Simple example

```englang
function greet(name):
  print "Hello", name.
end

greet("Alice").
```

## Future improvement

- explicit `return` support
- nested function behavior
- clearer scope/debug tools
