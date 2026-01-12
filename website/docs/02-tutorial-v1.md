# Tutorial (V1)

This tutorial is for someone opening Englang for the first time.

By the end of this page, you should understand how to write small Englang programs using:

- `start`
- `print`
- `set`
- math expressions
- `if / else`
- loops
- functions
- `ask`

Englang V1 is intentionally written in an English-like style. The goal is to understand programming logic first, before moving into symbol-heavy syntax.

---

## 1. Program Start

Every Englang program starts with:

```englang
start
```

This tells the reader that the program begins from here.

A very small Englang program looks like this:

```englang
start
print "Hello from Englang".
```

The `start` keyword makes the program feel clear for beginners.

In many programming languages, the starting point is hidden inside functions, files, or runtime rules.  
In Englang, the starting point is visible.

---

## 2. Show Output with `print`

Use `print` when you want to show something on the screen.

Example:

```englang
start
print "Hello from Englang".
```

Output:

```txt
Hello from Englang
```

Text should be written inside double quotes:

```englang
print "This is text".
```

You can also print more than one value by separating them with commas:

```englang
start
set name to "Alice".
print "Hello", name.
```

Output:

```txt
Hello Alice
```

Think of `print` as the way your program speaks to the user.

---

## 3. Store Values with `set`

Use `set` to store a value in a variable.

Example:

```englang
start
set x to 10.
print x.
```

Output:

```txt
10
```

Here, `x` is a variable.

A simple way to understand a variable is:

```txt
A variable is a named box that stores a value.
```

So this line:

```englang
set x to 10.
```

means:

```txt
Create a box called x and store 10 inside it.
```

Later, when you write:

```englang
print x.
```

Englang reads the value stored inside `x` and prints it.

You can store text too:

```englang
start
set name to "Alice".
print "Name is", name.
```

Output:

```txt
Name is Alice
```

---

## 4. Basic Math Expressions

Englang V1 uses English words for math.

Example:

```englang
start
set x to 10.
set y to x plus 5.
print y.
```

Output:

```txt
15
```

Supported arithmetic words:

```txt
plus
minus
times
divided by
```

Examples:

```englang
start
set a to 10.
set b to 5.

print a plus b.
print a minus b.
print a times b.
print a divided by b.
```

Output:

```txt
15
5
50
2
```

You can also use parentheses when you want some calculation to happen first:

```englang
start
set x to 10.
set y to (x plus 2) times 3.
print y.
```

Output:

```txt
36
```

Without parentheses, expressions may be harder to read.  
For beginners, using parentheses is a good habit when the calculation has multiple parts.

---

## 5. Decision Making with `if / else`

Programs become useful when they can make decisions.

Use `if` when your program should do something only when a condition is true.

Example:

```englang
start
set age to 20.

if age is greater than 18 then begin
  print "Adult".
else begin
  print "Not adult".
end
```

Output:

```txt
Adult
```

The condition is:

```englang
age is greater than 18
```

If this condition is true, the first block runs.

If it is false, the `else` block runs.

---

## 6. Multiple Decisions with `else if`

Use `else if` when there are more than two possible results.

Example:

```englang
start
set score to 7.

if score is greater than 10 then begin
  print "large".
else if score is greater than 5 then begin
  print "medium".
else begin
  print "small".
end
```

Output:

```txt
medium
```

Englang checks the conditions from top to bottom.

In this example:

```txt
score is greater than 10 -> false
score is greater than 5  -> true
```

So it prints:

```txt
medium
```

The `else` block only runs when none of the previous conditions are true.

---

## 7. Comparison Words

Englang V1 uses English comparison phrases.

Common comparisons:

```txt
is equal to
is not equal to
is greater than
is less than
is greater than or equal to
is less than or equal to
```

Example:

```englang
start
set marks to 80.

if marks is greater than or equal to 40 then begin
  print "Passed".
else begin
  print "Failed".
end
```

Output:

```txt
Passed
```

These phrases are longer than symbols like `>=`, but they are easier to understand when learning for the first time.

---

## 8. Repeat Work with Loops

Loops are used when you want to repeat something.

Without loops, you may write:

```englang
print "Hello".
print "Hello".
print "Hello".
```

With a loop, you can write the idea once.

Englang V1 supports three beginner-friendly loops:

```txt
while
for each
repeat
```

---

## 9. `while` Loop

A `while` loop runs as long as a condition is true.

Example:

```englang
start
set n to 1.

while n is less than or equal to 5:
  print n.
  set n to n plus 1.
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

How this works:

```txt
n starts at 1
print n
increase n by 1
repeat while n is less than or equal to 5
stop when n becomes 6
```

Important point:

The value must change inside the loop.

This line is important:

```englang
set n to n plus 1.
```

Without it, `n` would stay `1`, and the loop may never stop.

---

## 10. `for each` Loop

Use `for each` when you want to loop through a number range.

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

This means:

```txt
Start number from 1
Run the body
Increase number
Stop after 5
```

The loop variable is available inside the loop body.

In this example, the loop variable is:

```txt
number
```

You can choose another name:

```englang
start
for each n from 1 to 3:
  print n.
end
```

Output:

```txt
1
2
3
```

---

## 11. `repeat` Loop

Use `repeat` when you know exactly how many times something should run.

Example:

```englang
start
repeat 3 times:
  print "Hello".
end
```

Output:

```txt
Hello
Hello
Hello
```

This is the simplest loop for beginners.

Use `repeat` when the count is fixed.

Use `while` when the loop depends on a condition.

Use `for each` when looping through a range of numbers.

---

## 12. Stop a Loop Early with `break`

Sometimes you want to stop a loop before it naturally ends.

Use `break`.

Example:

```englang
start
for each n from 1 to 10:
  if n is equal to 5 then begin
    break.
  end

  print n.
end
```

Output:

```txt
1
2
3
4
```

The loop starts from `1`.

When `n` becomes `5`, the condition becomes true:

```englang
n is equal to 5
```

Then `break` stops the loop.

That is why `5` is not printed.

---

## 13. Even and Odd Numbers

Englang V1 supports beginner-friendly number checks.

Example:

```englang
start
for each n from 1 to 5:
  if n is even then begin
    print n, "is even".
  else if n is odd then begin
    print n, "is odd".
  end
end
```

Output:

```txt
1 is odd
2 is even
3 is odd
4 is even
5 is odd
```

This is easier for beginners than writing remainder logic directly.

You can also check divisibility:

```englang
start
set n to 10.

if n is divisible by 5 then begin
  print "Divisible by 5".
end
```

Output:

```txt
Divisible by 5
```

---

## 14. Reuse Logic with Functions

A function is a reusable block of logic.

Example:

```englang
start
function greet(name):
  print "Hello", name.
end

greet("Alice").
```

Output:

```txt
Hello Alice
```

This function is named:

```txt
greet
```

It takes one value:

```txt
name
```

When this line runs:

```englang
greet("Alice").
```

Englang puts `"Alice"` into `name` and runs the function body.

Functions are useful when you do not want to repeat the same logic again and again.

Example:

```englang
start
function greet(name):
  print "Hello", name.
end

greet("Alice").
greet("Bob").
greet("Charlie").
```

Output:

```txt
Hello Alice
Hello Bob
Hello Charlie
```

Without a function, you would need to write separate print lines manually.

---

## 15. Take User Input with `ask`

Use `ask` when you want the user to enter something.

Example:

```englang
start
set name to ask("What is your name?").
print "Hello", name.
```

If the user enters:

```txt
Alice
```

Output:

```txt
Hello Alice
```

This line:

```englang
set name to ask("What is your name?").
```

does two things:

```txt
shows a question to the user
stores the answer in name
```

Input makes programs feel interactive.

Without input, the program always uses fixed values.  
With input, the program can react to the user.

---

## 16. Complete Beginner Program

This program uses variables, input, condition, and output together.

```englang
start
set userName to ask("What is your name?").
set score to 8.

if score is greater than 5 then begin
  print "Welcome", userName.
  print "You passed the level.".
else begin
  print "Welcome", userName.
  print "Try again.".
end
```

If the user enters:

```txt
Alice
```

Output:

```txt
Welcome Alice
You passed the level.
```

What this program does:

```txt
asks for the user's name
stores it in userName
stores 8 in score
checks if score is greater than 5
prints a success message
```

This is a good first complete program because it has the basic parts of many real programs:

```txt
input
stored data
decision
output
```

---

## 17. Practice Program: Greatest of Two Numbers

Try this program:

```englang
start
set a to 10.
set b to 20.

if a is greater than b then begin
  print a, "is greater".
else begin
  print b, "is greater".
end
```

Output:

```txt
20 is greater
```

This program checks two values and prints the bigger one.

---

## 18. Practice Program: FizzBuzz

FizzBuzz is a common beginner programming problem.

Rules:

```txt
If number is divisible by 3 and 5, print FizzBuzz
If number is divisible by 3, print Fizz
If number is divisible by 5, print Buzz
Otherwise print the number
```

Program:

```englang
start
for each n from 1 to 20:
  if n is divisible by 3 and n is divisible by 5 then begin
    print "FizzBuzz".
  else if n is divisible by 3 then begin
    print "Fizz".
  else if n is divisible by 5 then begin
    print "Buzz".
  else begin
    print n.
  end
end
```

This program is useful because it combines:

```txt
loop
condition
else if
divisibility
printing
```

---

## 19. Common Beginner Mistakes

### Forgetting the dot at the end of a statement

Incorrect:

```englang
print "Hello"
```

Correct:

```englang
print "Hello".
```

The dot tells Englang that the statement has ended.

---

### Forgetting `end`

Incorrect:

```englang
start
if x is greater than 5 then begin
  print "big".
```

Correct:

```englang
start
if x is greater than 5 then begin
  print "big".
end
```

Every block should be closed.

---

### Not updating a `while` loop variable

Incorrect:

```englang
start
set n to 1.

while n is less than or equal to 5:
  print n.
end
```

Here, `n` never changes.

Correct:

```englang
start
set n to 1.

while n is less than or equal to 5:
  print n.
  set n to n plus 1.
end
```

---

### Using a variable before setting it

Incorrect:

```englang
start
print name.
```

Correct:

```englang
start
set name to "Alice".
print name.
```

Set the value before using it.

---

## 20. What You Learned

You now know the basic parts of Englang V1:

```txt
start       begins the program
print       shows output
set         stores values
if/else     makes decisions
while       repeats while a condition is true
for each    repeats through a number range
repeat      repeats a fixed number of times
break       stops a loop early
function    creates reusable logic
ask         takes user input
```

These are enough to write small beginner programs.

---

## 21. What Next

After this tutorial:

```txt
Go to How To Use to run Englang on your system.
Go to CDN Usage to run Englang inside browser pages.
Go to Thinking to understand how Englang is designed.
```

Once you are comfortable with V1, you can move to V2 and V3 later.

V1 focuses on readability.  
V2 introduces more symbols.  
V3 moves closer to mainstream programming syntax.
