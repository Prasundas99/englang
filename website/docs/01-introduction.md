# Introduction

Englang is a beginner-friendly programming language for learning programming logic through simple, readable instructions.

It is made for people who are new to programming and want to understand how programs work before dealing with complex syntax, symbols, brackets, and semicolons.

The main idea is simple:

```txt
Write logic in a way that feels close to English.
Run it like a real program.
```

Example:

```englang
start
set name to "Alice".
print "Hello", name.
```

Output:

```txt
Hello Alice
```

Englang is not trying to replace JavaScript, Python, or any mainstream language.

It is a learning bridge.

It helps beginners understand the basic ideas of programming first:

```txt
values
variables
conditions
loops
functions
input
output
```

Once these ideas are clear, moving to other programming languages becomes easier.

---

## Why Englang Exists

Many beginners do not struggle with logic at first.

They struggle with syntax.

For example, a learner may understand this idea:

```txt
If the score is greater than 5, print "Passed".
Otherwise, print "Try again".
```

But they may get confused when they see syntax like:

```js
if (score > 5) {
  console.log("Passed");
} else {
  console.log("Try again");
}
```

Englang keeps the same idea readable:

```englang
start
set score to 8.

if score is greater than 5 then begin
  print "Passed".
else begin
  print "Try again".
end
```

This helps the learner focus on the actual programming concept first.

The syntax can become more advanced later.

---

## What You Can Do with Englang

With Englang, you can write small beginner programs such as:

```txt
Hello World
Even or odd checker
Greatest of two numbers
Greatest of three numbers
FizzBuzz
Simple calculator
Name greeting program
Prime number checker
```

Englang supports the basic building blocks needed for these programs:

```txt
print output
store values
perform simple math
make decisions
repeat work
take input
reuse logic with functions
```

Example:

```englang
start
for each number from 1 to 5:
  print number.
end
```

Output:

```txt
1
2
3
4
5
```

---

## Learning Stages

Englang is designed in stages.

The goal is to move learners from readable English-like instructions toward more common programming syntax step by step.

```txt
V1: English-like syntax
V2: Symbol-based pseudocode syntax
V3: Curly-brace style syntax
```

### V1: English-like Syntax

V1 is the beginner stage.

It uses readable phrases:

```englang
set age to 20.
if age is greater than 18 then begin
  print "Adult".
end
```

The focus is on understanding logic.

---

### V2: Pseudocode Syntax

V2 introduces more symbols.

Example style:

```txt
if age > 18 then
  print "Adult"
end
```

This helps learners become comfortable with operators like:

```txt
+
-
*
/
>
<
==
!=
```

---

### V3: Curly-Brace Syntax

V3 moves closer to mainstream programming syntax.

Example style:

```txt
if (age > 18) {
  print("Adult");
}
```

This helps learners transition toward languages like JavaScript, Java, C, and C#.

---

## Who This Is For

Englang is useful for:

```txt
beginners learning programming for the first time
students practicing logic and flow control
teachers explaining programming basics
workshop trainers teaching algorithms
developers experimenting with language design
```

It is especially useful when the goal is to teach programming concepts without immediately introducing heavy syntax.

---

## What This Documentation Covers

This documentation is written for users and learners.

It explains how to write and run Englang programs.

The main sections are:

```txt
Tutorial (V1)
How To Use
CDN Usage
Thinking
```

---

## Tutorial (V1)

Start here if you are new to Englang.

This section teaches the basic syntax step by step:

```txt
start
print
set
math expressions
if / else
loops
functions
ask
```

Use this when you want to write your first Englang programs.

---

## How To Use

This section explains how to run Englang on your local machine using Node.js.

It covers:

```txt
installing dependencies
running tests
creating a playground file
using runEnglang
handling input with ask
basic troubleshooting
```

Use this when you want to run Englang locally.

---

## CDN Usage

This section explains how to run Englang inside browser pages.

It covers:

```txt
using englang.min.js
adding Englang to an HTML page
running programs from a button
showing output on the page
using ask with window.prompt
creating a small browser playground
```

Use this when you want to embed Englang in a website or documentation page.

---

## Thinking

This section explains the practical thought process behind building a programming language from scratch.

It covers ideas like:

```txt
why a language exists
how syntax is designed
what tokens are
what grammar means
what a parser does
what a runtime does
how errors should work
how a language grows in stages
```

Use this section if you want to understand how someone can design and build a small language using any programming language.

---

## A Small First Example

Here is a complete Englang program:

```englang
start
set learner to "Prasun".
print "Hello", learner.
```

Output:

```txt
Hello Prasun
```

This program does three things:

```txt
starts the program
stores a value in learner
prints a message using that value
```

That is the basic style of Englang.

Readable first.
Runnable next.
Advanced syntax later.

---

## Next Step

Go to:

```txt
Tutorial (V1)
```

Start there if you want to write your first Englang program.
