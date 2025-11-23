# Loop Thinking

## What this part does

Loop support allows repeated execution using:

- `while ... : ... end`
- `for each <name> from <start> to <end> : ... end`
- `repeat <count> times : ... end`
- `break.`

## Why this is needed

Loops are required for counting, iteration, and common beginner algorithms.
Without loops, learners cannot write practical practice programs.

## Decision taken

Parser creates loop statement objects:

- `WhileStatement`
- `ForEachStatement`
- `RepeatStatement`
- `BreakStatement`

Runtime executes loop bodies and propagates a simple break control signal.

## Other options considered

1. Implement only one loop type first.
2. Use hidden JavaScript eval for loop logic.
3. Delay `break` until much later.

## Why we did not choose those options

1. Plan explicitly requires while/for each/repeat.
2. Eval makes behavior less explicit and harder to teach.
3. Break is needed for common patterns (like early exit).

## Theory required

Minimal theory:

- a loop repeats a statement block
- condition loops stop when condition is false
- range loops increment until end value
- break exits the current loop

## Simple example

```englang
set n to 1.
while n is less than or equal to 3:
  print n.
  set n to n plus 1.
end
```

Expected output:

```txt
1
2
3
```

## Future improvement

Next loop improvements can include:

- nested loop test coverage expansion
- better runtime guardrails for accidental infinite loops
