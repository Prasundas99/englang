import { runEnglang } from "./src/index.js";

const source = `
start
set x to 10.
set name to "Alice".
print "The value of x is", x.
print "The value of name is", name.
`;

runEnglang(source);
