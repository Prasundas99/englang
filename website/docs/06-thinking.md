# Thinking

This section is for anyone who wants to understand how a programming language can be built from scratch.

It is not only about Englang.  
The same thinking can be used if someone wants to build a small language using JavaScript, Python, Java, C#, Go, or any other language.

The goal here is simple:

Understand what happens between writing code and getting output.

A programming language does not magically understand what we write.  
It follows a few clear steps.

```txt
source code
-> tokens
-> parsed meaning
-> runtime
-> output
```

That is the base idea.

---

## 1. First Decide Why the Language Exists

Before writing lexer, parser, or runtime, first decide why the language should exist.

A language should solve a problem.

For example:

```txt
Python makes programming readable.
SQL makes database queries easier.
HTML describes web page structure.
JavaScript makes websites interactive.
```

For Englang, the problem is different.

Many beginners understand logic, but they get stuck because of syntax.

So Englang tries to make the first step easier.

Instead of starting with symbols, brackets, and semicolons, it starts with English-like instructions.

Example:

```txt
set age to 20
print age
```

This is easier for a beginner to read than:

```txt
let age = 20;
console.log(age);
```

So the first decision is not technical.

The first decision is:

```txt
Who is this language for?
```

For Englang, the answer is:

```txt
Beginners who are learning programming logic.
```

Once this is clear, many other decisions become easier.

---

## 2. Decide What the User Should Be Able to Write

After deciding the audience, decide what kind of programs users should be able to write.

Do not start with every feature.

Start with small programs.

A beginner language should first allow:

```txt
printing something
storing a value
doing simple math
making decisions
repeating work
taking input
using small functions
```

That is enough to write many basic programs.

Examples:

```txt
Hello World
Even or odd
Greatest of three numbers
FizzBuzz
Simple calculator
Prime number check
```

If the language can express these programs clearly, the basic design is going in the right direction.

A good rule is:

```txt
Do not design the whole language first.
Design enough language to write useful small programs.
```

---

## 3. Design the Syntax

Syntax is what the user writes.

This is the most visible part of a language.

For example, assignment can be written in many ways:

```txt
set x to 10
let x = 10
x := 10
x = 10
```

All of them can mean the same thing.

The choice depends on the audience.

For Englang V1, the syntax is English-like:

```txt
set x to 10
print x
if x is greater than 5 then begin
```

This is not the shortest syntax.

But it is easy to read.

That is the tradeoff.

For beginners, readability is more important than compactness.

Later, symbolic syntax can be introduced.

That is why Englang has versions:

```txt
V1 - English-like syntax
V2 - Pseudocode-style syntax
V3 - Curly-brace syntax
```

This lets the learner move slowly from English-like code to normal programming syntax.

---

## 4. Think of a Program as a Story

A program is just a sequence of steps.

For a beginner, this is the easiest way to understand it.

Example:

```txt
start
ask for a number
check if the number is even
print the result
end
```

This is a story.

Most beginner programs follow this pattern:

```txt
take input
store values
process values
make decisions
repeat if needed
show output
```

A programming language gives structure to this story.

Englang keeps this story visible.

Example:

```txt
set number to 10
if number is even then begin
  print "Even"
end
```

A beginner can read this and understand what is happening.

That is the main reason behind the language design.

---

## 5. Values and Variables

Every language needs values.

Start with simple values:

```txt
numbers
strings
booleans
```

Examples:

```txt
10
"Hello"
true
false
```

Then introduce variables.

A variable can be explained as a named box.

Example:

```txt
set age to 20
```

This means:

```txt
Create a box called age and store 20 inside it.
```

Later, when the program says:

```txt
print age
```

the runtime checks the box named `age` and prints the stored value.

Do not start with complex data types too early.

Things like arrays, objects, classes, and custom types can come later.

At the beginning, the learner should first understand how one value is stored and reused.

---

## 6. Expressions and Statements

This is an important concept.

An expression gives a value.

Examples:

```txt
10
age
age plus 5
age is greater than 18
```

A statement does something.

Examples:

```txt
print age
set age to 20
repeat 3 times
if age is greater than 18
```

Example:

```txt
set total to price plus tax
```

Here:

```txt
price plus tax
```

is an expression.

It produces a value.

The full line:

```txt
set total to price plus tax
```

is a statement.

It stores that value into `total`.

This difference matters because languages are usually made from expressions and statements.

Expressions calculate.

Statements act.

---

## 7. Convert Source Code into Tokens

When a user writes code, it starts as plain text.

Example:

```txt
print "Hello".
```

The computer sees characters.

It does not automatically know that `print` is a command or `"Hello"` is a string.

So the first technical step is to break the text into meaningful pieces.

These pieces are called tokens.

Example:

```txt
print "Hello".
```

can become:

```txt
PRINT
STRING
DOT
```

This step is usually called lexing or tokenizing.

A lexer reads the source code and creates tokens.

Common token types are:

```txt
keyword
identifier
number
string
operator
punctuation
```

Example:

```txt
print       -> keyword
name        -> identifier
10          -> number
"Hello"     -> string
.           -> punctuation
```

This makes the next step easier.

The parser does not need to read raw text.

It can read tokens.

---

## 8. Define the Grammar

Grammar means the valid shape of the language.

It tells us what is allowed.

Example rules:

```txt
print <value>
set <name> to <value>
if <condition> then begin <body> end
repeat <number> times <body> end
```

So this is valid:

```txt
set x to 10
```

But this is not valid:

```txt
x set 10 to
```

Both lines have similar words, but only one follows the language grammar.

This is why grammar is needed.

Without grammar, the language cannot know what the user meant.

For a small language, keep grammar small.

Start with:

```txt
print
set
if
loop
function
```

Do not add too many shapes at the beginning.

---

## 9. Parse the Tokens

After tokenizing, we have tokens.

But tokens alone are not enough.

Example:

```txt
SET IDENTIFIER TO NUMBER
```

The parser reads this and understands:

```txt
This is a variable assignment.
```

So the parser gives meaning to the tokens.

It checks whether the tokens follow grammar rules.

Then it creates a structure that the runtime can execute.

For example:

```txt
print "Hello"
```

becomes the idea:

```txt
PrintStatement with value "Hello"
```

And:

```txt
set x to 10
```

becomes:

```txt
SetStatement with name x and value 10
```

For a first version, this structure does not need to be complex.

Simple objects or simple statement records are enough.

The goal is not to impress with compiler theory.

The goal is to understand the program clearly.

---

## 10. Run the Program

After parsing, the language needs to execute the program.

This part is called the runtime or interpreter.

The runtime is responsible for:

```txt
storing variables
checking conditions
running loops
calling functions
printing output
```

Example:

```txt
set x to 10
print x
```

The runtime does this:

```txt
store 10 in x
read x
print 10
```

The runtime needs some memory.

At a simple level, it may remember:

```txt
variables
functions
output
```

That is enough for a small interpreter.

This is where the code written by the user finally becomes behavior.

---

## 11. Handle Errors Properly

Errors are part of the language experience.

For beginners, error messages matter a lot.

A bad error message is:

```txt
Unexpected token IDENTIFIER
```

A better error message is:

```txt
I expected a value after "print".
```

Or:

```txt
You started an if block, but forgot to close it with end.
```

A good error should answer:

```txt
What went wrong?
Where did it happen?
How can I fix it?
```

In a teaching language, errors should not only stop the program.

They should help the learner understand the mistake.

Error design should be planned early, not added at the end.

---

## 12. Decide What to Build Later

A common mistake is trying to build everything at once.

Do not start with:

```txt
classes
modules
packages
async
advanced types
optimization
inheritance
generics
```

These are useful, but not at the beginning.

Start with the smallest useful language.

For Englang, the first useful set is:

```txt
print
set
numbers
strings
conditions
loops
input
functions
```

This is enough to teach core programming.

More advanced features can be added later.

A language grows better when each feature has a reason.

---

## 13. Test with Real Examples

A language should be tested using real programs.

Not only small syntax checks.

Good examples are:

```txt
Hello World
Add two numbers
Even or odd
Greatest of three numbers
FizzBuzz
Prime number
Simple calculator
```

These examples are useful because they test multiple parts together.

FizzBuzz checks:

```txt
loops
conditions
divisibility
multiple branches
output
```

Prime number logic checks:

```txt
nested loops
conditions
boolean values
break
```

If these programs are hard to write, the language design may need improvement.

Examples are not only demos.

They are design tests.

---

## 14. Keep Testing as the Language Grows

Every new feature can break an old feature.

For example:

```txt
Adding symbolic operators can break English operators.
Adding functions can break expression parsing.
Adding curly braces can break end-based blocks.
```

So every feature should have a small test program.

A feature is complete only when:

```txt
the syntax is clear
the parser understands it
the runtime executes it
the output is correct
old examples still work
```

Testing is how the language grows safely.

---

## 15. Let the Language Evolve in Stages

A language does not need to become complete in one version.

Englang uses stages:

```txt
V1 - English-like mode
V2 - Pseudocode mode
V3 - Curly-brace mode
```

This is useful for teaching.

V1 helps the learner understand logic.

V2 introduces symbols:

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

V3 introduces syntax closer to mainstream programming:

```txt
if (x > 5) {
  print("big");
}
```

This gradual movement helps learners transition from simple readable logic to real-world code.

The important point is:

```txt
A language can teach in layers.
```

---

## 16. Lecture Flow

If this topic is being explained in a class, workshop, or presentation, this order works well:

```txt
1. What problem are we solving?
2. Who is the language for?
3. What should users be able to write?
4. What should the syntax look like?
5. What are values and variables?
6. What are expressions and statements?
7. What are tokens?
8. What is grammar?
9. What does the parser do?
10. What does the runtime do?
11. How should errors work?
12. How do we test the language?
13. How can the language grow later?
```

This order starts from the user and slowly moves toward implementation.

That is easier to understand than starting directly with compiler theory.

---

## 17. The Simple Mental Model

The whole process can be remembered like this:

```txt
Decide what users write.
Break the text into tokens.
Check the structure.
Understand the meaning.
Run the meaning.
Show the result.
Explain mistakes clearly.
```

This is the foundation of a small programming language.

The implementation language can be anything.

The thinking stays almost the same.
