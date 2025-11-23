# Condition Thinking

## What this part does

Condition support lets Englang choose between branches using `if/else`.
Current syntax supported:

```englang
if x is greater than 5 then begin
  print "big".
else begin
  print "small".
end
```

## Why this is needed

Without conditions, programs cannot make decisions.
Decision logic is required for most beginner exercises.

## Decision taken

The parser now builds an `IfStatement` with:

- `condition` as `ComparisonExpression`
- `thenBody` as statement array
- `elseBody` as statement array

The runtime evaluates the condition and runs one body.

Current comparison phrases:

- `is equal to`
- `is not equal to`
- `is greater than`
- `is less than`
- `is greater than or equal to`
- `is less than or equal to`
- `is divisible by`
- `is even`
- `is odd`

Current logical connectors:

- `and`
- `or`

## Other options considered

1. Evaluate condition text directly with string checks at runtime.
2. Add all advanced comparisons and boolean connectors in one step.
3. Skip explicit `begin/end` block parsing.

## Why we did not choose those options

1. Direct string checks mix parsing and execution too much.
2. Doing everything at once increases bug risk and complexity.
3. `begin/end` keeps block boundaries explicit and beginner-friendly.

## Theory required

Minimal theory:

- parse control-flow into structured nodes
- evaluate condition to true/false
- execute one block based on result

## Simple example

Source:

```englang
if x is equal to 10 then begin
  print "ok".
else begin
  print "no".
end
```

Parsed idea:

```js
{
  type: "IfStatement",
  condition: {
    type: "ComparisonExpression",
    operator: "EQUAL_TO"
  },
  thenBody: [...],
  elseBody: [...]
}
```

## Future improvement

Next condition stories can add:

- cleaner phrase normalization for synonyms
- richer boolean grouping examples
