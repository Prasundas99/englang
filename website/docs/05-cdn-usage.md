# CDN Usage

This guide explains how to run Englang inside a browser-based website.

Use this page when you want to add Englang to a normal HTML page without setting up a full frontend project.

---

## 1. What CDN Usage Means

CDN usage means loading Englang through a browser script file.

Instead of importing Englang from Node.js like this:

```js
import { runEnglang } from "./src/index.js";
```

you load a browser-ready file like this:

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>
```

After this script is loaded, Englang is available in the browser as:

```js
Englang
```

Then you can run programs using:

```js
Englang.runEnglang(programText);
```

---

## 2. What You Need

To use Englang in a browser page, you need:

```txt
a browser bundle file
a place to host that file
an HTML page
```

The browser bundle file is usually:

```txt
englang.min.js
```

You can host this file using:

```txt
GitHub Pages
Netlify
Vercel
your own server
any static file hosting service
```

The file should be served over HTTPS when used in production.

---

## 3. Get the Browser File

There are two common ways to get the browser file.

### Option 1: Use a hosted release file

If the project has a hosted build, use the hosted URL directly:

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>
```

This is the easiest option for users.

---

### Option 2: Build it locally

If you are building from the repository, run this from the project root:

```bash
npm install
npm run build:cdn
```

After the build finishes, it should generate:

```txt
cdn/englang.min.js
```

This file can be uploaded to your static hosting provider.

Do not edit the minified file manually.

If you need changes, update the source code and build again.

---

## 4. Add Englang to an HTML Page

Create a file named:

```txt
index.html
```

Add this code:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Englang Browser Demo</title>
  </head>

  <body>
    <h1>Englang Browser Demo</h1>

    <button id="runProgramButton">Run Program</button>

    <pre id="outputArea"></pre>

    <script src="https://your-cdn-or-host/englang.min.js"></script>

    <script>
      const outputAreaElement = document.getElementById("outputArea");
      const runProgramButtonElement = document.getElementById("runProgramButton");

      runProgramButtonElement.addEventListener("click", function () {
        const programText = `
start
set userName to "Web Learner".
print "Hello", userName.
`;

        const result = Englang.runEnglang(programText);

        outputAreaElement.textContent = result.output.join("\n");
      });
    </script>
  </body>
</html>
```

Replace this URL:

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>
```

with the actual hosted file URL.

---

## 5. What This Page Does

The HTML page has three important parts.

### Button

```html
<button id="runProgramButton">Run Program</button>
```

This button runs the Englang program when clicked.

### Output area

```html
<pre id="outputArea"></pre>
```

This displays the Englang output.

`pre` is used because it keeps line breaks properly.

### Englang script

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>
```

This loads Englang into the browser.

After this file is loaded, you can call:

```js
Englang.runEnglang(programText);
```

---

## 6. Run a Simple Program in Browser

This is the Englang code inside the HTML page:

```englang
start
set userName to "Web Learner".
print "Hello", userName.
```

When the button is clicked, this line runs the program:

```js
const result = Englang.runEnglang(programText);
```

The result contains an output array.

Example:

```js
result.output
```

Expected output:

```txt
Hello Web Learner
```

This output is shown inside the page using:

```js
outputAreaElement.textContent = result.output.join("\n");
```

---

## 7. Browser Input with `ask`

Englang supports input using `ask`.

Example Englang program:

```englang
start
set name to ask("What is your name?").
print "Hello", name.
```

In a browser, you can connect `ask` to `window.prompt`.

Example:

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>

<script>
  const sourceCode = `
start
set name to ask("What is your name?").
print "Hello", name.
`;

  const result = Englang.runEnglang(sourceCode, console, {
    ask(questionText) {
      return window.prompt(questionText) || "";
    },
  });

  console.log(result.output);
</script>
```

When the program reaches:

```englang
ask("What is your name?")
```

the browser shows a prompt box.

Whatever the user enters is returned to Englang and stored in `name`.

---

## 8. Showing `ask` Output on the Page

Here is a full browser example with `ask` and visible output:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Englang Ask Demo</title>
  </head>

  <body>
    <h1>Englang Ask Demo</h1>

    <button id="runProgramButton">Run Program</button>

    <pre id="outputArea"></pre>

    <script src="https://your-cdn-or-host/englang.min.js"></script>

    <script>
      const outputAreaElement = document.getElementById("outputArea");
      const runProgramButtonElement = document.getElementById("runProgramButton");

      runProgramButtonElement.addEventListener("click", function () {
        const sourceCode = `
start
set name to ask("What is your name?").
print "Hello", name.
`;

        const result = Englang.runEnglang(sourceCode, console, {
          ask(questionText) {
            return window.prompt(questionText) || "";
          },
        });

        outputAreaElement.textContent = result.output.join("\n");
      });
    </script>
  </body>
</html>
```

Expected behavior:

```txt
User clicks Run Program
Browser asks: What is your name?
User enters a name
Page displays: Hello <name>
```

---

## 9. Using a Textarea as a Small Playground

You can also let users edit the Englang program in the browser.

Example:

```html
<!doctype html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Englang Playground</title>
  </head>

  <body>
    <h1>Englang Playground</h1>

    <textarea id="programInput" rows="10" cols="60">start
set name to "Browser Learner".
print "Hello", name.</textarea>

    <br />

    <button id="runProgramButton">Run Program</button>

    <pre id="outputArea"></pre>

    <script src="https://your-cdn-or-host/englang.min.js"></script>

    <script>
      const programInputElement = document.getElementById("programInput");
      const outputAreaElement = document.getElementById("outputArea");
      const runProgramButtonElement = document.getElementById("runProgramButton");

      runProgramButtonElement.addEventListener("click", function () {
        const programText = programInputElement.value;
        const result = Englang.runEnglang(programText);

        outputAreaElement.textContent = result.output.join("\n");
      });
    </script>
  </body>
</html>
```

This creates a very small browser playground.

The user can edit the Englang code and run it directly.

---

## 10. Basic Error Handling in Browser

When running user-written code, errors can happen.

Wrap the call in `try / catch`:

```js
try {
  const result = Englang.runEnglang(programText);
  outputAreaElement.textContent = result.output.join("\n");
} catch (error) {
  outputAreaElement.textContent = error.message;
}
```

In the playground example, the button handler can be written like this:

```js
runProgramButtonElement.addEventListener("click", function () {
  const programText = programInputElement.value;

  try {
    const result = Englang.runEnglang(programText);
    outputAreaElement.textContent = result.output.join("\n");
  } catch (error) {
    outputAreaElement.textContent = error.message;
  }
});
```

This prevents the browser page from silently failing.

Instead, the error message is shown inside the output area.

---

## 11. Production Tips

When using Englang in a real website, follow these rules:

```txt
Use a stable versioned file URL
Serve the file over HTTPS
Do not edit englang.min.js manually
Keep one simple test HTML page
Test after every new build
Avoid loading multiple Englang versions on the same page
```

A versioned URL is better than a changing URL.

Better:

```html
<script src="https://your-cdn-or-host/englang/1.0.0/englang.min.js"></script>
```

Riskier:

```html
<script src="https://your-cdn-or-host/englang/latest/englang.min.js"></script>
```

A stable version makes sure your website does not break unexpectedly after a new release.

---

## 12. Troubleshooting

### `Englang is not defined`

This usually means the script file did not load.

Check:

```txt
Is the script URL correct?
Is the file hosted properly?
Is the file served over HTTPS?
Is the script tag placed before your custom script?
```

Correct order:

```html
<script src="https://your-cdn-or-host/englang.min.js"></script>
<script>
  const result = Englang.runEnglang(programText);
</script>
```

---

### The output is empty

Check whether your Englang program actually prints something.

Try the smallest program:

```englang
start
print "Hello".
```

Also check that you are displaying:

```js
result.output.join("\n")
```

---

### `ask` does not work

Make sure you passed the third argument with an `ask` function:

```js
const result = Englang.runEnglang(sourceCode, console, {
  ask(questionText) {
    return window.prompt(questionText) || "";
  },
});
```

---

### The browser blocks the file

This can happen if the script is loaded from an unsafe or incorrect URL.

Use HTTPS.

Also make sure the file is served as a normal JavaScript file.

---

## 13. When to Use CDN

Use CDN/browser usage when:

```txt
you want a quick demo page
you want to embed Englang in documentation
you want a simple playground
you do not want a full frontend setup
you want users to try Englang from the browser
```

Use local Node.js setup when:

```txt
you are developing Englang itself
you are running tests
you are changing lexer, parser, or runtime code
you are debugging internals
```

---

## 14. Next Step

After trying CDN usage, go to:

```txt
Thinking
```

Use the Thinking section to understand how Englang is designed and how someone can build a small programming language from scratch.
