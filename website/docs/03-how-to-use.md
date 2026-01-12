# How To Use

This guide explains how to run Englang on your local machine.

Use this page when you want to test Englang from Node.js, create your own `.mjs` file, or run programs that use `ask`.

---

## 1. Prerequisites

Before running Englang, make sure these are installed:

```txt
Node.js
Git
```

Use the **LTS version** of Node.js.

Git is optional, but recommended because it makes downloading and updating the project easier.

To check if Node.js is installed, run:

```bash
node -v
```

To check if npm is installed, run:

```bash
npm -v
```

If both commands show version numbers, your system is ready.

---

## 2. Download Englang

Clone the project from GitHub:

```bash
git clone https://github.com/Prasundas99/englang.git
cd englang
```

Install the project dependencies:

```bash
npm install
```

If you do not want to use Git, you can also download the project as a ZIP file from GitHub.

After downloading the ZIP:

```txt
Extract the ZIP
Open the extracted folder
Run npm install inside that folder
```

---

## 3. Verify the Installation

Run the test command:

```bash
npm test
```

This checks whether the basic Englang setup is working.

If the tests run without errors, the project is installed correctly.

You can also run the default project command:

```bash
npm start
```

This should run the sample program configured inside the project.

---

## 4. Run Your First Englang Program

Create a new file in the project root:

```txt
playground.mjs
```

Add this code:

```js
import { runEnglang } from "./src/index.js";

const sourceCode = `
start
set learner to "Prasun".
print "Hello", learner.
`;

const result = runEnglang(sourceCode, console);

console.log(result.output);
```

Now run the file:

```bash
node playground.mjs
```

Expected output:

```txt
Hello Prasun
[ 'Hello Prasun' ]
```

The first line is printed by the Englang program.

The second line is the `output` array returned by `runEnglang`.

---

## 5. Understand `runEnglang`

The main function is:

```js
runEnglang(sourceCode, console);
```

The first argument is the Englang program as a string.

The second argument is the output handler. In most local examples, you can pass `console`.

Example:

```js
const result = runEnglang(sourceCode, console);
```

The returned result contains the program output.

Example:

```js
console.log(result.output);
```

This is useful when you want to test the output or show it inside another application.

---

## 6. Run a Program with Variables

Try this program:

```js
import { runEnglang } from "./src/index.js";

const sourceCode = `
start
set x to 10.
set y to x plus 5.
print "Result is", y.
`;

const result = runEnglang(sourceCode, console);

console.log(result.output);
```

Run it:

```bash
node playground.mjs
```

Expected output:

```txt
Result is 15
[ 'Result is 15' ]
```

This confirms that variables and basic expressions are working.

---

## 7. Run a Program with Conditions

Replace the code inside `sourceCode` with this:

```js
const sourceCode = `
start
set score to 8.

if score is greater than 5 then begin
  print "Passed".
else begin
  print "Try again".
end
`;
```

Run:

```bash
node playground.mjs
```

Expected output:

```txt
Passed
[ 'Passed' ]
```

This confirms that `if / else` is working.

---

## 8. Run a Program with Loops

Try a `for each` loop:

```js
import { runEnglang } from "./src/index.js";

const sourceCode = `
start
for each n from 1 to 5:
  print n.
end
`;

const result = runEnglang(sourceCode, console);

console.log(result.output);
```

Expected output:

```txt
1
2
3
4
5
[ '1', '2', '3', '4', '5' ]
```

Loops are useful when you want to repeat work without writing the same line again and again.

---

## 9. Use Input Programs with `ask`

Some Englang programs ask the user for input.

Example Englang code:

```englang
start
set name to ask("What is your name?").
print "Hello", name.
```

When running from Node.js in this setup, provide an `ask` handler.

Create or update `playground.mjs`:

```js
import { runEnglang } from "./src/index.js";

const sourceCode = `
start
set name to ask("What is your name?").
print "Hello", name.
`;

const result = runEnglang(sourceCode, console, {
  ask(questionText) {
    if (questionText === "What is your name?") {
      return "Learner";
    }

    return "";
  },
});

console.log(result.output);
```

Run:

```bash
node playground.mjs
```

Expected output:

```txt
Hello Learner
[ 'Hello Learner' ]
```

Here, `ask` works like a controlled input provider.

When Englang asks:

```txt
What is your name?
```

the handler returns:

```txt
Learner
```

This is useful for testing input-based programs without manually typing answers every time.

---

## 10. Why `ask` Uses a Handler

In real applications, input can come from different places:

```txt
browser prompt
HTML input field
terminal input
test data
custom UI
```

Instead of forcing one input style, Englang allows you to provide an `ask` handler.

This keeps the language simple for the learner while giving developers control over where input comes from.

---

## 11. Common Project Structure

A basic local setup may look like this:

```txt
englang/
  src/
    index.js
    lexer.js
    parser.js
    tokens.js
  tests.js
  run.js
  playground.mjs
  package.json
```

Your import path depends on where `index.js` is located.

If `index.js` is inside `src`, use:

```js
import { runEnglang } from "./src/index.js";
```

If `index.js` is in the project root, use:

```js
import { runEnglang } from "./index.js";
```

Use the path that matches your actual project structure.

---

## 12. Troubleshooting

### `npm install` fails

Update Node.js to the latest LTS version and try again:

```bash
npm install
```

Also make sure you are running the command inside the project folder.

---

### `npm test` fails

Run this first:

```bash
npm install
```

Then try again:

```bash
npm test
```

If it still fails, check whether the project files are complete.

---

### `node playground.mjs` fails

Make sure you are running the command from the repository root.

Example:

```bash
cd englang
node playground.mjs
```

Also check the import path:

```js
import { runEnglang } from "./src/index.js";
```

If your `index.js` is not inside `src`, adjust the path.

---

### The program does not print what you expected

Start with the smallest program:

```englang
start
print "Hello".
```

Then slowly add variables, conditions, and loops.

This makes it easier to find which part caused the issue.

---

### `ask` returns empty output

Check that your `ask` handler returns a value.

Example:

```js
ask(questionText) {
  return "Learner";
}
```

If the handler returns an empty string, the program will print an empty value.

---

## 13. Recommended Learning Order

After setup, try programs in this order:

```txt
1. print text
2. store and print variables
3. basic math
4. if / else
5. loops
6. functions
7. ask input
8. FizzBuzz
```

This order is easier because each step builds on the previous one.

---

## 14. Next Step

After running Englang locally, you can try running it in browser pages.

Go to:

```txt
CDN Usage
```

Use the CDN guide if you want to add Englang to a simple HTML page without setting up a full Node.js project.
