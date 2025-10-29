import { readFileSync } from "node:fs";
import { runEnglang } from "../src/index.js";

function assertEqual(actual, expected, message) {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nActual: ${actual}`);
  }
}

function testV1Core() {
  const source = `
start
set x to 10.
set y to (x plus 2) times 3.
print y.
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "36", "V1 expression should work.");
}

function testElseIf() {
  const source = `
start
set x to 7.
if x is greater than 10 then begin
  print "large".
else if x is greater than 5 then begin
  print "medium".
else begin
  print "small".
end
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "medium", "Else-if branch should execute.");
}

function testFunctionsAndAsk() {
  const source = `
start
function greet(name):
  print "Hello", name.
end
set name to ask("What is your name?").
greet(name).
`;
  const result = runEnglang(
    source,
    { log() {} },
    {
      ask(promptText) {
        return promptText === "What is your name?" ? "Alice" : "";
      },
    }
  );
  assertEqual(result.output[0], "Hello Alice", "Function call and ask should work.");
}

function testLoopsAndBreak() {
  const source = `
start
set n to 1.
while n is less than or equal to 5:
  print n.
  set n to n plus 1.
end
for each i from 1 to 10:
  if i is equal to 5 then begin
    break.
  end
  print i.
end
repeat 2 times:
  print "R".
end
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "1", "While loop should start at 1.");
  assertEqual(result.output[4], "5", "While loop should include 5.");
  assertEqual(result.output[8], "4", "Break should stop for loop at 4.");
  assertEqual(result.output[9], "R", "Repeat should run.");
}

function testExtendedConditions() {
  const source = `
start
set a to 6.
if a is divisible by 3 and a is even then begin
  print "ok".
else begin
  print "bad".
end
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "ok", "Extended condition operators should work.");
}

function testV2Symbols() {
  const source = `
start
set x = 10;
set y = x + 5;
if y > 10 then
  print "big";
else
  print "small";
end
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "big", "V2 symbol mode should work.");
}

function testV3Braces() {
  const source = `
start
set x = 10;
if x > 5 {
  print("big");
} else {
  print("small");
}
`;
  const result = runEnglang(source, { log() {} });
  assertEqual(result.output[0], "big", "V3 braces mode should work.");
}

function testExamples() {
  const fizzBuzzExampleSource = readFileSync("examples/09-fizzbuzz.eng", "utf-8");
  const result = runEnglang(fizzBuzzExampleSource, { log() {} });
  assertEqual(result.output[2], "Fizz", "Example fizzbuzz should run.");
}

function runAllTests() {
  testV1Core();
  testElseIf();
  testFunctionsAndAsk();
  testLoopsAndBreak();
  testExtendedConditions();
  testV2Symbols();
  testV3Braces();
  testExamples();
  console.log("All tests passed.");
}

runAllTests();
