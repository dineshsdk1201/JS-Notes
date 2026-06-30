/*
================================================================================
 JAVASCRIPT BASICS TO BOOLEANS - DEEP REFERENCE GUIDE
 Topics:
 1. JavaScript Basics
 2. Variables and Declarations
 3. Data Types
 4. Type Conversion and Coercion
 5. Operators
 6. Control Flow
 7. Loops and Iteration
 8. Strings
 9. Numbers and Math
 10. Booleans

 Notes:
 - JavaScript is the practical language used in browsers, Node.js, Deno, Bun, etc.
 - ECMAScript is the official language specification behind JavaScript.
 - Main references: ECMAScript/TC39 and MDN JavaScript documentation.
   Sources: [1](https://262.ecma-international.org/)[2](https://tc39.es/)[3](https://ecma-international.org/publications-and-standards/standards/ecma-262/)[4](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)[5](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators)
================================================================================
*/


/*
================================================================================
 1. JAVASCRIPT BASICS
================================================================================

1.1 What is JavaScript?
--------------------------------------------------------------------------------
JavaScript is a high-level, dynamic, interpreted/JIT-compiled programming language.

Main uses:
- Browser interactivity
- Server-side APIs with Node.js
- Full-stack apps
- Mobile/desktop apps
- CLI tools
- Build tools
- Automation

Example:
*/

console.log("Hello JavaScript");

/*
Why JavaScript exists:
- Initially created to make web pages interactive.
- HTML gives structure.
- CSS gives styling.
- JavaScript gives behavior.

Example browser behavior:

document.querySelector("button").addEventListener("click", function () {
  alert("Button clicked");
});

Important characteristics:
- Dynamically typed
- Single-threaded main execution
- Prototype-based object system
- Multi-paradigm:
  - procedural
  - object-oriented
  - functional
- Runs in many environments
*/


/*
1.2 JavaScript vs ECMAScript
--------------------------------------------------------------------------------

ECMAScript:
- Official specification/standard.
- Defines syntax, types, objects, operators, functions, modules, promises, etc.

JavaScript:
- Real-world implementation of ECMAScript.
- Includes extra environment APIs.

Examples:

ECMAScript feature:
*/

const languageName = "JavaScript";

/*
Browser-specific API:
document.querySelector("h1");

Node.js-specific API:
process.env.NODE_ENV;

Memory trick:
ECMAScript = Rules/specification
JavaScript = ECMAScript + host environment APIs
*/


/*
1.3 JavaScript Engines
--------------------------------------------------------------------------------

A JavaScript engine executes JS code.

Common engine work:
1. Parse source code
2. Create AST - Abstract Syntax Tree
3. Generate bytecode
4. Interpret bytecode
5. Optimize hot code using JIT compiler
6. Manage memory using garbage collection

Popular engines:

1. V8:
   - Used in Chrome, Edge, Node.js, Deno.
   - Components include interpreter and optimizing compiler.
   - Good performance for browser and server workloads.

2. SpiderMonkey:
   - Mozilla Firefox engine.
   - Historically the first JavaScript engine.

3. JavaScriptCore:
   - Apple Safari/WebKit engine.
   - Bun runtime uses JavaScriptCore.

Sources: [6](https://frontenddogma.com/posts/2025/javascript-engines-explained/)[7](https://dev.to/shruti_kumbhar/understanding-javascript-engine-internals-v8-spidermonkey-and-more-2f0m)[8](https://www.languagelineage.org/guides/v8-vs-spidermonkey-vs-javascriptcore)
*/


/*
1.4 JavaScript Environments
--------------------------------------------------------------------------------

Environment = place where JavaScript runs.

1. Browser:
   Provides:
   - window
   - document
   - localStorage
   - fetch
   - alert
   - setTimeout
   - DOM APIs

Example:
document.body.style.backgroundColor = "lightblue";

2. Node.js:
   JavaScript runtime outside browser.
   Provides:
   - fs
   - path
   - http
   - process
   - Buffer

Example Node.js:

const fs = require("fs");
fs.writeFileSync("hello.txt", "Hello Node");

3. Deno:
   - Modern runtime by Ryan Dahl.
   - Secure by default.
   - TypeScript support.
   - Uses V8.

Example command:
deno run --allow-read app.ts

4. Bun:
   - Modern runtime using JavaScriptCore.
   - Focuses on speed.
   - Includes runtime, bundler, test runner, package manager.

Example command:
bun run app.js

Sources: [9](https://betterstack.com/community/guides/scaling-nodejs/nodejs-vs-deno-vs-bun/)[10](https://www.devtoolreviews.com/reviews/bun-vs-node-vs-deno)[11](https://www.javacodegeeks.com/2026/02/deno-2-0-vs-node-js-vs-bun-the-complete-javascript-runtime-comparison.html)
*/


/*
1.5 Single-threaded Nature of JavaScript
--------------------------------------------------------------------------------

JavaScript runs one piece of synchronous code at a time on the main thread.

Example:
*/

console.log("A");
console.log("B");
console.log("C");

/*
Output:
A
B
C

Why single-threaded?
- Browser JS was designed to interact with DOM.
- Multiple threads changing DOM at same time could create inconsistent UI.

Problem:
Long-running synchronous code blocks execution.

Example dangerous code:
while (true) {
  // freezes browser or Node process
}

How JS handles asynchronous work:
- Event loop
- Callback queue
- Microtask queue
- Promises
- async/await
- Web Workers
- Worker Threads in Node.js

Example:
*/

console.log("Start");

setTimeout(function () {
  console.log("Timer");
}, 0);

Promise.resolve().then(function () {
  console.log("Promise");
});

console.log("End");

/*
Expected output:
Start
End
Promise
Timer

Reason:
1. Synchronous code runs first.
2. Promise callbacks are microtasks.
3. setTimeout callbacks are macrotasks.
*/


/*
1.6 Interpreted / JIT Compiled
--------------------------------------------------------------------------------

JavaScript is often called interpreted, but modern engines use JIT compilation.

Interpreter:
- Starts quickly.
- Runs bytecode without heavy optimization.

JIT compiler:
- Watches frequently executed code.
- Compiles hot code paths into optimized machine code.

Example:
*/

function multiply(a, b) {
  return a * b;
}

for (let i = 0; i < 1000; i++) {
  multiply(2, 3);
}

/*
Engine may optimize multiply because it is called repeatedly.

Limitation:
Changing input types can reduce optimization.

Example:
*/

function addFlexible(a, b) {
  return a + b;
}

addFlexible(1, 2);
addFlexible(3, 4);
addFlexible("hello", "world");

/*
Better:
Keep function input types predictable.
*/

function addNumbersOnly(a, b) {
  return Number(a) + Number(b);
}


/*
1.7 Strict Mode
--------------------------------------------------------------------------------

Strict mode makes JavaScript safer.

Use:
*/

"use strict";

/*
Benefits:
- Prevents accidental global variables.
- Disallows duplicate parameter names.
- Makes some silent errors throw errors.
- Makes `this` safer.
- Helps avoid deprecated behavior.

Example:

"use strict";
x = 10; // ReferenceError

Without strict mode, x may become accidental global variable.

ES modules are strict by default.
*/


/*
1.8 Case Sensitivity
--------------------------------------------------------------------------------

JavaScript is case-sensitive.
*/

let userName = "Dinesh";
let UserName = "Kumar";

console.log(userName);
console.log(UserName);

/*
userName and UserName are different identifiers.

Best practice:
- variables/functions: camelCase
- classes/components: PascalCase
- constants: UPPER_CASE
*/


/*
1.9 Statements
--------------------------------------------------------------------------------

A statement performs an action.

Examples:
*/

let statementExample = 10;

if (statementExample > 5) {
  console.log("Greater than 5");
}

/*
Other statement examples:
- variable declaration
- if statement
- loop
- return statement
- switch statement
*/


/*
1.10 Expressions
--------------------------------------------------------------------------------

An expression produces a value.

Examples:
*/

10 + 20;
"Hello";
statementExample > 5;

let expressionResult = 10 + 20;

/*
In:
let expressionResult = 10 + 20;

- 10 + 20 is expression
- whole line is statement
*/


/*
1.11 Comments
--------------------------------------------------------------------------------

Single-line comment:
*/

// This is a single-line comment

/*
Multi-line comment:
*/

/*
This is
a multi-line comment
*/

/*
Good comments explain WHY, not obvious WHAT.
*/


/*
1.12 Semicolons
--------------------------------------------------------------------------------

Semicolons end statements.

Recommended:
*/

let semiA = 10;
let semiB = 20;

/*
JavaScript can sometimes insert semicolons automatically using ASI.
But explicit semicolons reduce confusing bugs.
*/


/*
1.13 Automatic Semicolon Insertion - ASI
--------------------------------------------------------------------------------

JavaScript may automatically insert semicolons.

Dangerous example:

function getUserWrong() {
  return
  {
    name: "Dinesh"
  };
}

JavaScript treats it as:

function getUserWrong() {
  return;
  {
    name: "Dinesh"
  }
}

Correct:
*/

function getUserCorrect() {
  return {
    name: "Dinesh"
  };
}

console.log(getUserCorrect());


/*
================================================================================
 2. VARIABLES AND DECLARATIONS
================================================================================

JavaScript has:
- var
- let
- const
*/


/*
2.1 var
--------------------------------------------------------------------------------

Old declaration style.
*/

var oldVariable = "I am var";

/*
Characteristics:
- Function scoped
- Hoisted
- Can be redeclared
- Can be reassigned
- Avoid in modern JS

Example:
*/

var varExample = 10;
var varExample = 20;

console.log(varExample);

/*
Problem: var is not block-scoped.
*/

if (true) {
  var varInsideBlock = "visible outside";
}

console.log(varInsideBlock);

/*
Because var is function-scoped, not block-scoped.
*/


/*
2.2 let
--------------------------------------------------------------------------------

Modern variable declaration.
*/

let count = 1;
count = 2;

console.log(count);

/*
Characteristics:
- Block-scoped
- Can be reassigned
- Cannot be redeclared in same scope
- Hoisted but in Temporal Dead Zone

Example:

let x = 10;
let x = 20; // SyntaxError
*/

if (true) {
  let blockScoped = "inside block";
  console.log(blockScoped);
}

/*
console.log(blockScoped); // ReferenceError
*/


/*
2.3 const
--------------------------------------------------------------------------------

Declares constant binding.
*/

const PI = 3.14159;

/*
Characteristics:
- Block-scoped
- Must be initialized
- Cannot be reassigned
- Cannot be redeclared in same scope

Example:

const value; // SyntaxError
PI = 4;      // TypeError
*/

/*
Important:
const prevents reassignment, not object mutation.
*/

const userObject = {
  name: "Dinesh"
};

userObject.name = "Kumar";

console.log(userObject.name);

/*
But this is not allowed:

userObject = {}; // TypeError

To prevent object mutation:
*/

const frozenUser = Object.freeze({
  name: "Dinesh"
});

/*
Object.freeze is shallow.
Nested objects can still mutate unless deep frozen.
*/


/*
2.4 Variable Naming Rules
--------------------------------------------------------------------------------

Valid names:
*/

let firstName;
let _privateValue;
let $price;
let age2;

/*
Invalid:

let 2age;
let user-name;
let let;

Naming conventions:
*/

const MAX_USERS = 100;

class UserProfile {}


/*
2.5 Variable Assignment
--------------------------------------------------------------------------------
*/

let assignmentExample;
assignmentExample = 100;

let initializationExample = 200;

/*
Declaration:
let x;

Assignment:
x = 10;

Initialization:
let x = 10;
*/


/*
2.6 Reassignment
--------------------------------------------------------------------------------
*/

let reassignedValue = 10;
reassignedValue = 20;

var reassignedVar = 1;
reassignedVar = 2;

/*
const cannot be reassigned.

const fixed = 10;
fixed = 20; // TypeError
*/


/*
2.7 Redeclaration
--------------------------------------------------------------------------------
*/

var redeclareA = 1;
var redeclareA = 2;

/*
Allowed with var.

Not allowed:

let redeclareB = 1;
let redeclareB = 2;

const redeclareC = 1;
const redeclareC = 2;
*/


/*
2.8 Scope
--------------------------------------------------------------------------------

Scope = where a variable can be accessed.

Types:
1. Global scope
2. Function scope
3. Block scope
4. Module scope
*/


/*
Global scope:
*/

const globalAppName = "CMS";

function showGlobalAppName() {
  console.log(globalAppName);
}

showGlobalAppName();


/*
Function scope:
*/

function functionScopeExample() {
  const insideFunction = "only inside function";
  console.log(insideFunction);
}

functionScopeExample();

/*
console.log(insideFunction); // ReferenceError
*/


/*
Block scope:
*/

{
  const insideBlock = "only inside block";
  let anotherInsideBlock = "also only inside block";
  console.log(insideBlock, anotherInsideBlock);
}

/*
console.log(insideBlock); // ReferenceError
*/


/*
Module scope:
--------------------------------------------------------------------------------
In ES modules, variables are scoped to the file/module.

Example:

// user.js
const secret = "hidden";
export const userName = "Dinesh";

// app.js
import { userName } from "./user.js";

Module benefits:
- Avoids global pollution
- Better organization
- Reusable code
*/


/*
2.9 Hoisting
--------------------------------------------------------------------------------

Hoisting means declarations are processed before code execution.

var:
*/

console.log(hoistedVar);
var hoistedVar = "I am hoisted";

/*
Output:
undefined

Internally like:
var hoistedVar;
console.log(hoistedVar);
hoistedVar = "I am hoisted";
*/

/*
Function declarations are hoisted:
*/

sayHelloHoisted();

function sayHelloHoisted() {
  console.log("Hello from hoisted function");
}

/*
let and const are hoisted but not accessible before declaration due to TDZ.

console.log(tdzExample); // ReferenceError
let tdzExample = 10;
*/


/*
2.10 Temporal Dead Zone - TDZ
--------------------------------------------------------------------------------

TDZ = time between entering scope and declaration initialization.

Example:

{
  // TDZ starts
  console.log(name); // ReferenceError
  let name = "Dinesh"; // TDZ ends
}

Why TDZ exists:
- Prevents using variables before initialization.
- Makes code safer.
*/


/*
================================================================================
 3. DATA TYPES
================================================================================

JavaScript data types:

Primitive:
1. string
2. number
3. bigint
4. boolean
5. undefined
6. symbol
7. null

Non-primitive:
1. object
*/


/*
3.1 string
--------------------------------------------------------------------------------
*/

const stringDouble = "Hello";
const stringSingle = 'Hello';
const stringTemplate = `Hello ${userName}`;

console.log(stringDouble, stringSingle, stringTemplate);

/*
Strings are immutable.
*/

let immutableText = "hello";
immutableText[0] = "H";

console.log(immutableText);

/*
Output remains:
hello

To change:
*/

immutableText = "H" + immutableText.slice(1);
console.log(immutableText);


/*
3.2 number
--------------------------------------------------------------------------------

JavaScript has one main number type for integers and floats.
*/

const integerNumber = 25;
const floatNumber = 99.99;

console.log(typeof integerNumber);
console.log(typeof floatNumber);

/*
Special number values:
*/

console.log(Infinity);
console.log(-Infinity);
console.log(NaN);

/*
Floating point issue:
*/

console.log(0.1 + 0.2);

/*
Output:
0.30000000000000004

Solution:
*/

const accurateDecimal = Math.round((0.1 + 0.2) * 100) / 100;
console.log(accurateDecimal);


/*
3.3 bigint
--------------------------------------------------------------------------------

Used for very large integers.
*/

const hugeNumber = 123456789012345678901234567890n;
console.log(hugeNumber);

/*
Cannot mix BigInt and Number:

10n + 5; // TypeError

Correct:
*/

console.log(10n + 5n);


/*
3.4 boolean
--------------------------------------------------------------------------------
*/

const isLoggedIn = true;
const isAdmin = false;

console.log(isLoggedIn, isAdmin);


/*
3.5 undefined
--------------------------------------------------------------------------------

A variable declared but not assigned has undefined.
*/

let undefinedExample;
console.log(undefinedExample);

/*
Missing object property also gives undefined.
*/

const emptyUser = {};
console.log(emptyUser.name);


/*
3.6 null
--------------------------------------------------------------------------------

null means intentional absence of value.
*/

let selectedUser = null;
console.log(selectedUser);

/*
Important historical behavior:
*/

console.log(typeof null); // "object"


/*
3.7 symbol
--------------------------------------------------------------------------------

Symbol creates unique identifiers.
*/

const symbolA = Symbol("id");
const symbolB = Symbol("id");

console.log(symbolA === symbolB);

/*
Use case: unique object keys.
*/

const secretKey = Symbol("secret");

const userWithSecret = {
  name: "Dinesh",
  [secretKey]: "hidden value"
};

console.log(userWithSecret[secretKey]);


/*
3.8 object
--------------------------------------------------------------------------------

Objects store key-value pairs.
*/

const objectUser = {
  name: "Dinesh",
  age: 25
};

console.log(objectUser);

/*
Other object types:
- Array
- Function
- Date
- RegExp
- Map
- Set
- Promise
- Error
*/

const arrayObject = [1, 2, 3];

function functionObject() {
  return "functions are objects too";
}

const dateObject = new Date();

console.log(arrayObject, functionObject(), dateObject);


/*
3.9 typeof
--------------------------------------------------------------------------------
*/

console.log(typeof "hello");      // string
console.log(typeof 123);          // number
console.log(typeof 10n);          // bigint
console.log(typeof true);         // boolean
console.log(typeof undefined);    // undefined
console.log(typeof Symbol());     // symbol
console.log(typeof null);         // object
console.log(typeof {});           // object
console.log(typeof []);           // object
console.log(typeof function () {}); // function

/*
Array check:
*/

console.log(Array.isArray([]));


/*
3.10 Primitive vs Reference Types
--------------------------------------------------------------------------------

Primitive values are copied by value.
*/

let primitiveA = 10;
let primitiveB = primitiveA;

primitiveB = 20;

console.log(primitiveA);
console.log(primitiveB);

/*
Objects are copied by reference.
*/

const referenceA = {
  city: "Coimbatore"
};

const referenceB = referenceA;

referenceB.city = "Chennai";

console.log(referenceA.city);

/*
Shallow copy:
*/

const shallowCopy = {
  ...referenceA
};

/*
Deep copy:
*/

const deepCopy = structuredClone(referenceA);


/*
3.11 Dynamic Typing
--------------------------------------------------------------------------------

Variables can hold different types over time.
*/

let dynamicValue = 10;
dynamicValue = "ten";
dynamicValue = true;

console.log(dynamicValue);

/*
Limitation:
Can cause unexpected bugs.
*/

function unsafeAdd(a, b) {
  return a + b;
}

console.log(unsafeAdd(10, "20"));

/*
Safer:
*/

function safeAdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new TypeError("Expected numbers");
  }

  return a + b;
}


/*
3.12 Wrapper Objects
--------------------------------------------------------------------------------

Primitives can temporarily behave like objects.
*/

const primitiveString = "dinesh";
console.log(primitiveString.toUpperCase());

/*
Avoid wrapper constructors:
*/

const badStringObject = new String("Dinesh");
console.log(badStringObject === "Dinesh");

/*
Avoid:
new String()
new Number()
new Boolean()

Because wrapper objects can behave unexpectedly.
*/

const badBoolean = new Boolean(false);

if (badBoolean) {
  console.log("This runs because objects are truthy");
}


/*
================================================================================
 4. TYPE CONVERSION AND COERCION
================================================================================
*/


/*
4.1 Explicit Conversion
--------------------------------------------------------------------------------
*/

console.log(String(123));
console.log(String(true));
console.log(String(null));
console.log(String(undefined));

console.log(Number("123"));
console.log(Number("12.5"));
console.log(Number(""));
console.log(Number(" "));
console.log(Number(true));
console.log(Number(false));
console.log(Number(null));
console.log(Number(undefined));
console.log(Number("abc"));

console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean(""));
console.log(Boolean("hello"));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean([]));
console.log(Boolean({}));

console.log(parseInt("123px", 10));
console.log(parseInt("10.5", 10));
console.log(parseFloat("10.5px"));


/*
4.2 Implicit Coercion
--------------------------------------------------------------------------------
*/

console.log("5" + 2);       // "52"
console.log("5" - 2);       // 3
console.log(true + 1);      // 2
console.log(false + 1);     // 1
console.log(null + 1);      // 1
console.log(undefined + 1); // NaN

/*
Problem:
Implicit coercion can create confusing results.
*/


/*
4.3 Truthy Values
--------------------------------------------------------------------------------

Truthy examples:
- "hello"
- "0"
- "false"
- 1
- -1
- []
- {}
- function () {}
*/

if ("0") {
  console.log('"0" is truthy');
}

if ([]) {
  console.log("[] is truthy");
}


/*
4.4 Falsy Values
--------------------------------------------------------------------------------

Only these values are falsy:
- false
- 0
- -0
- 0n
- ""
- null
- undefined
- NaN
*/

console.log(Boolean(false));
console.log(Boolean(0));
console.log(Boolean(-0));
console.log(Boolean(0n));
console.log(Boolean(""));
console.log(Boolean(null));
console.log(Boolean(undefined));
console.log(Boolean(NaN));


/*
4.5 Loose Equality ==
--------------------------------------------------------------------------------

== compares after type coercion.
*/

console.log(5 == "5");
console.log(false == 0);
console.log(null == undefined);
console.log("" == 0);
console.log("0" == false);

/*
Best practice:
Avoid == except sometimes:
*/

const maybeMissing = null;

if (maybeMissing == null) {
  console.log("Value is null or undefined");
}


/*
4.6 Strict Equality ===
--------------------------------------------------------------------------------

=== compares type and value.
*/

console.log(5 === "5");
console.log(5 === 5);

/*
Recommended default.
*/


/*
4.7 != vs !==
--------------------------------------------------------------------------------
*/

console.log(5 != "5");   // false
console.log(5 !== "5");  // true

/*
Use !== by default.
*/


/*
4.8 NaN
--------------------------------------------------------------------------------
*/

console.log(Number("abc"));
console.log(0 / 0);

console.log(NaN === NaN);
console.log(Number.isNaN(NaN));
console.log(Number.isNaN("abc"));

/*
Number.isNaN is safer than global isNaN because it does not coerce.
*/


/*
4.9 Infinity and -Infinity
--------------------------------------------------------------------------------
*/

console.log(1 / 0);
console.log(-1 / 0);

let minimum = Infinity;

for (const number of [5, 3, 9]) {
  if (number < minimum) {
    minimum = number;
  }
}

console.log(minimum);


/*
4.10 Object.is()
--------------------------------------------------------------------------------
*/

console.log(Object.is(NaN, NaN));
console.log(Object.is(0, -0));
console.log(0 === -0);


/*
================================================================================
 5. OPERATORS
================================================================================
*/


/*
5.1 Arithmetic Operators
--------------------------------------------------------------------------------
*/

console.log(1 + 2);
console.log("Hello " + "JS");
console.log("5" + 2);

console.log(10 - 3);
console.log("10" - 3);

console.log(5 * 2);
console.log("5" * 2);

console.log(10 / 2);
console.log(5 / 0);

console.log(10 % 3);
console.log(2 ** 3);

let incrementExample = 1;
console.log(incrementExample++);
console.log(incrementExample);

let prefixIncrement = 1;
console.log(++prefixIncrement);

let decrementExample = 3;
decrementExample--;
console.log(decrementExample);


/*
5.2 Assignment Operators
--------------------------------------------------------------------------------
*/

let assignmentOperator = 10;

assignmentOperator += 5;
assignmentOperator -= 2;
assignmentOperator *= 3;
assignmentOperator /= 2;
assignmentOperator %= 4;

console.log(assignmentOperator);


/*
5.3 Comparison Operators
--------------------------------------------------------------------------------
*/

console.log(5 > 3);
console.log(5 < 3);
console.log(5 >= 5);
console.log(5 <= 4);
console.log(5 == "5");
console.log(5 === "5");
console.log(5 != "5");
console.log(5 !== "5");

console.log("apple" < "banana");


/*
5.4 Logical Operators
--------------------------------------------------------------------------------
*/

console.log(true && true);
console.log(true && false);
console.log("JS" && 100);
console.log(0 && "hello");

console.log(false || true);
console.log("" || "default");
console.log("JS" || "default");

console.log(!true);
console.log(!false);
console.log(!!"hello");
console.log(!!0);


/*
5.5 Ternary Operator
--------------------------------------------------------------------------------
*/

const personAge = 20;
const ageStatus = personAge >= 18 ? "Adult" : "Minor";

console.log(ageStatus);


/*
5.6 typeof Operator
--------------------------------------------------------------------------------
*/

const callback = function () {};

if (typeof callback === "function") {
  callback();
}


/*
5.7 delete Operator
--------------------------------------------------------------------------------
*/

const deleteUser = {
  name: "Dinesh",
  age: 25
};

delete deleteUser.age;

console.log(deleteUser);

/*
delete is mainly for object properties, not variables.
*/


/*
5.8 in Operator
--------------------------------------------------------------------------------
*/

const inUser = {
  name: "Dinesh"
};

console.log("name" in inUser);
console.log("age" in inUser);
console.log("toString" in inUser);

/*
For own properties:
*/

console.log(Object.hasOwn(inUser, "name"));


/*
5.9 instanceof Operator
--------------------------------------------------------------------------------
*/

const instanceArray = [];

console.log(instanceArray instanceof Array);
console.log(instanceArray instanceof Object);

const error = new TypeError("Wrong type");

console.log(error instanceof TypeError);


/*
5.10 Nullish Coalescing ??
--------------------------------------------------------------------------------

Returns right side only if left side is null or undefined.
*/

console.log(null ?? "default");
console.log(undefined ?? "default");
console.log(0 ?? 10);
console.log("" ?? "default");
console.log(false ?? true);


/*
5.11 Optional Chaining ?.
--------------------------------------------------------------------------------
*/

const optionalUser = {};

console.log(optionalUser.profile?.city);

/*
Without optional chaining:
optionalUser.profile.city; // TypeError
*/

const optionalCallUser = {
  sayHi() {
    console.log("Hi");
  }
};

optionalCallUser.sayHi?.();


/*
5.12 Spread ...
--------------------------------------------------------------------------------
*/

const spreadNumbers = [1, 2, 3];
const copiedNumbers = [...spreadNumbers];

console.log(copiedNumbers);

const spreadUser = {
  name: "Dinesh"
};

const updatedSpreadUser = {
  ...spreadUser,
  age: 25
};

console.log(updatedSpreadUser);

console.log(Math.max(...spreadNumbers));

/*
Spread is shallow copy.
*/


/*
5.13 Rest ...
--------------------------------------------------------------------------------
*/

function sumAll(...numbers) {
  return numbers.reduce(function (total, number) {
    return total + number;
  }, 0);
}

console.log(sumAll(1, 2, 3, 4));

const [firstNumber, ...remainingNumbers] = [10, 20, 30, 40];

console.log(firstNumber);
console.log(remainingNumbers);

const { name: restName, ...otherDetails } = {
  name: "Dinesh",
  age: 25,
  city: "Coimbatore"
};

console.log(restName);
console.log(otherDetails);


/*
5.14 Bitwise Operators
--------------------------------------------------------------------------------

Bitwise operators work on 32-bit integers.
*/

console.log(5 & 1);
console.log(5 | 1);
console.log(5 ^ 1);
console.log(~5);
console.log(5 << 1);
console.log(5 >> 1);
console.log(-5 >>> 1);

/*
Flags example:
*/

const READ = 1;    // 001
const WRITE = 2;   // 010
const EXECUTE = 4; // 100

let permission = READ | WRITE;

console.log((permission & READ) !== 0);
console.log((permission & EXECUTE) !== 0);


/*
5.15 Comma Operator
--------------------------------------------------------------------------------
*/

const commaResult = (1, 2, 3);
console.log(commaResult);

for (let i = 0, j = 3; i < j; i++, j--) {
  console.log(i, j);
}


/*
================================================================================
 6. CONTROL FLOW
================================================================================
*/


/*
6.1 if
--------------------------------------------------------------------------------
*/

const controlAge = 20;

if (controlAge >= 18) {
  console.log("Adult");
}


/*
6.2 else
--------------------------------------------------------------------------------
*/

if (controlAge >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}


/*
6.3 else if
--------------------------------------------------------------------------------
*/

const score = 85;

if (score >= 90) {
  console.log("A");
} else if (score >= 75) {
  console.log("B");
} else {
  console.log("C");
}


/*
6.4 switch
--------------------------------------------------------------------------------
*/

const role = "admin";

switch (role) {
  case "admin":
    console.log("Full access");
    break;

  case "editor":
    console.log("Edit access");
    break;

  case "viewer":
    console.log("Read access");
    break;

  default:
    console.log("No access");
}

/*
Without break, switch cases fall through.

Intentional fall-through:
*/

const day = "Saturday";

switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;

  default:
    console.log("Weekday");
}


/*
6.5 break
--------------------------------------------------------------------------------
*/

for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;
  }

  console.log(i);
}


/*
6.6 continue
--------------------------------------------------------------------------------
*/

for (let i = 0; i < 5; i++) {
  if (i === 2) {
    continue;
  }

  console.log(i);
}


/*
6.7 return
--------------------------------------------------------------------------------
*/

function getDiscount(user) {
  if (!user) {
    return 0;
  }

  if (!user.isActive) {
    return 0;
  }

  return 10;
}

console.log(getDiscount({ isActive: true }));


/*
================================================================================
 7. LOOPS AND ITERATION
================================================================================
*/


/*
7.1 for loop
--------------------------------------------------------------------------------
*/

for (let i = 0; i < 5; i++) {
  console.log(i);
}

const loopItems = ["a", "b", "c"];

for (let i = 0; i < loopItems.length; i++) {
  console.log(loopItems[i]);
}


/*
7.2 while loop
--------------------------------------------------------------------------------
*/

let whileIndex = 0;

while (whileIndex < 5) {
  console.log(whileIndex);
  whileIndex++;
}


/*
7.3 do...while loop
--------------------------------------------------------------------------------
*/

let doWhileIndex = 0;

do {
  console.log(doWhileIndex);
  doWhileIndex++;
} while (doWhileIndex < 5);


/*
7.4 for...in
--------------------------------------------------------------------------------

Iterates over object keys.
*/

const forInUser = {
  name: "Dinesh",
  age: 25
};

for (const key in forInUser) {
  console.log(key, forInUser[key]);
}

/*
Avoid for...in for arrays when you need values.
*/


/*
7.5 for...of
--------------------------------------------------------------------------------

Iterates over iterable values.
*/

const forOfArray = ["a", "b", "c"];

for (const value of forOfArray) {
  console.log(value);
}

for (const char of "JS") {
  console.log(char);
}

const mapExample = new Map([
  ["name", "Dinesh"],
  ["city", "Coimbatore"]
]);

for (const [key, value] of mapExample) {
  console.log(key, value);
}


/*
7.6 break and continue in loops
--------------------------------------------------------------------------------
*/

const loopUsers = [
  { name: "A", active: false, role: "viewer" },
  { name: "B", active: true, role: "editor" },
  { name: "C", active: true, role: "admin" }
];

for (const user of loopUsers) {
  if (!user.active) {
    continue;
  }

  console.log(user.name);

  if (user.role === "admin") {
    break;
  }
}


/*
7.7 Labeled Statements
--------------------------------------------------------------------------------

Used to break outer loop.
Use rarely because readability can suffer.
*/

outerLoop:
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop;
    }

    console.log(i, j);
  }
}


/*
================================================================================
 8. STRINGS
================================================================================
*/


/*
8.1 String Basics
--------------------------------------------------------------------------------
*/

const strA = "Hello";
const strB = 'Hello';
const strC = `Hello`;

console.log(strA, strB, strC);


/*
8.2 String Immutability
--------------------------------------------------------------------------------
*/

let stringImmutable = "hello";
stringImmutable[0] = "H";

console.log(stringImmutable);

stringImmutable = "H" + stringImmutable.slice(1);

console.log(stringImmutable);


/*
8.3 Template Literals and Interpolation
--------------------------------------------------------------------------------
*/

const templateName = "Dinesh";
const templateMessage = `Hello ${templateName}`;

console.log(templateMessage);

const templateTotal = `Total is ${10 + 20}`;

console.log(templateTotal);


/*
8.4 Multiline Strings
--------------------------------------------------------------------------------
*/

const htmlTemplate = `
<div>
  <h1>Hello</h1>
</div>
`;

console.log(htmlTemplate);


/*
8.5 Common String Methods
--------------------------------------------------------------------------------
*/

const sampleString = "  JavaScript Guide  ";

console.log(sampleString.length);
console.log(sampleString.toUpperCase());
console.log(sampleString.toLowerCase());
console.log(sampleString.trim());
console.log(sampleString.slice(2, 12));
console.log(sampleString.substring(2, 12));
console.log("hello world".replace("world", "JS"));
console.log("cat bat cat".replaceAll("cat", "dog"));
console.log("a,b,c".split(","));
console.log("JavaScript".includes("Script"));
console.log("JavaScript".startsWith("Java"));
console.log("JavaScript".endsWith("Script"));
console.log("JavaScript".indexOf("Script"));
console.log("5".padStart(3, "0"));
console.log("5".padEnd(3, "0"));
console.log("*".repeat(5));


/*
8.6 Unicode, UTF, Code Units vs Characters
--------------------------------------------------------------------------------

JavaScript strings use UTF-16 code units.
Some characters like emoji use more than one code unit.
*/

console.log("😊".length);
console.log([..."😊"].length);
console.log(Array.from("😊👍").length);

/*
For complex grapheme clusters:
*/

const segmenter = new Intl.Segmenter("en", {
  granularity: "grapheme"
});

const graphemes = [...segmenter.segment("👨‍👩‍👧‍👦")];

console.log(graphemes.length);


/*
8.7 Escape Sequences
--------------------------------------------------------------------------------
*/

console.log("Line 1\nLine 2");
console.log("Column1\tColumn2");
console.log("Backslash: \\");
console.log("Double quote: \"");
console.log("Single quote: \'");
console.log("\u0041");


/*
================================================================================
 9. NUMBERS AND MATH
================================================================================
*/


/*
9.1 Number Type
--------------------------------------------------------------------------------
*/

const numberA = 10;
const numberB = 3.14;
const numberC = Infinity;
const numberD = NaN;

console.log(numberA, numberB, numberC, numberD);


/*
9.2 Integers and Floats
--------------------------------------------------------------------------------
*/

console.log(typeof 10);
console.log(typeof 10.5);


/*
9.3 Floating-Point Precision
--------------------------------------------------------------------------------
*/

console.log(0.1 + 0.2);

const fixedPrecision = Number((0.1 + 0.2).toFixed(2));

console.log(fixedPrecision);

/*
For money, prefer smallest unit:

Rs 99.99 = 9999 paise
*/

const priceInPaise = 9999;
const taxInPaise = 1800;
const totalInPaise = priceInPaise + taxInPaise;

console.log(totalInPaise);


/*
9.4 Safe Integers
--------------------------------------------------------------------------------
*/

console.log(Number.MAX_SAFE_INTEGER);
console.log(Number.MIN_SAFE_INTEGER);
console.log(Number.isSafeInteger(123));

console.log(Number.MAX_SAFE_INTEGER + 1 === Number.MAX_SAFE_INTEGER + 2);

/*
Use BigInt for huge integers.
*/


/*
9.5 BigInt
--------------------------------------------------------------------------------
*/

const bigIntId = 90071992547409919999n;

console.log(bigIntId);

/*
Math object does not support BigInt.

Math.max(10n, 20n); // TypeError
*/


/*
9.6 Number Methods
--------------------------------------------------------------------------------
*/

console.log(Number.isNaN(NaN));
console.log(Number.isInteger(10));
console.log(Number.isInteger(10.5));
console.log(Number.parseInt("123px", 10));
console.log(Number.parseFloat("10.5px"));

const decimalNumber = 10.567;

console.log(decimalNumber.toFixed(2));
console.log(decimalNumber.toPrecision(4));

/*
toFixed and toPrecision return strings.
*/


/*
9.7 Math Object
--------------------------------------------------------------------------------
*/

console.log(Math.round(4.5));
console.log(Math.floor(4.9));
console.log(Math.ceil(4.1));
console.log(Math.trunc(4.9));
console.log(Math.trunc(-4.9));
console.log(Math.random());
console.log(Math.max(1, 5, 3));
console.log(Math.min(1, 5, 3));
console.log(Math.pow(2, 3));
console.log(2 ** 3);
console.log(Math.sqrt(16));
console.log(Math.abs(-10));

/*
Random integer from 1 to 10:
*/

const randomOneToTen = Math.floor(Math.random() * 10) + 1;

console.log(randomOneToTen);

/*
Math.random is not cryptographically secure.
Use crypto APIs for secure tokens.
*/


/*
================================================================================
 10. BOOLEANS
================================================================================
*/


/*
10.1 true and false
--------------------------------------------------------------------------------
*/

const booleanTrue = true;
const booleanFalse = false;

console.log(booleanTrue);
console.log(booleanFalse);


/*
10.2 Boolean Conversion
--------------------------------------------------------------------------------
*/

console.log(Boolean("hello"));
console.log(Boolean(""));
console.log(Boolean(1));
console.log(Boolean(0));
console.log(Boolean(null));
console.log(Boolean(undefined));

console.log(!!"hello");
console.log(!!0);

const booleanUser = {
  name: "Dinesh"
};

const hasUserName = !!booleanUser.name;

console.log(hasUserName);


/*
10.3 Short-Circuit Evaluation
--------------------------------------------------------------------------------

&& returns first falsy value or last truthy value.
*/

console.log("hello" && 123);
console.log(0 && "hello");

/*
Use case:
*/

const shortCircuitUser = {
  login() {
    console.log("Logged in");
  }
};

shortCircuitUser && shortCircuitUser.login();

/*
Modern:
*/

shortCircuitUser?.login();

/*
|| returns first truthy value or last falsy value.
*/

console.log("" || "Guest");
console.log("Dinesh" || "Guest");

/*
Problem:
*/

const countValue = 0 || 10;

console.log(countValue);

/*
Better with ??:
*/

const betterCountValue = 0 ?? 10;

console.log(betterCountValue);


/*
10.4 Logical Expressions
--------------------------------------------------------------------------------
*/

const logicalAge = 25;
const hasId = true;

if (logicalAge >= 18 && hasId) {
  console.log("Allowed");
}

const logicalRole = "editor";

if (logicalRole === "admin" || logicalRole === "editor") {
  console.log("Can edit");
}

const loggedIn = false;

if (!loggedIn) {
  console.log("Please login");
}

/*
Readable complex condition:
*/

const isActive = true;
const canEdit = logicalRole === "admin" || logicalRole === "editor";
const hasAccess = canEdit && isActive;

if (hasAccess) {
  console.log("Access granted");
}


/*
================================================================================
 QUICK RECALL CHEAT SHEET
================================================================================

1. Declaration:
   const -> default choice
   let   -> when reassignment needed
   var   -> avoid in modern JavaScript

2. Equality:
   === -> preferred
   ==  -> avoid except value == null for null/undefined check

3. Scope:
   var   -> function scope
   let   -> block scope
   const -> block scope
   module variables -> module scope

4. Primitive types:
   string
   number
   bigint
   boolean
   undefined
   symbol
   null

5. Non-primitive:
   object

6. Falsy values:
   false
   0
   -0
   0n
   ""
   null
   undefined
   NaN

7. Nullish coalescing:
   value ?? default
   Only uses default for null or undefined.

8. Optional chaining:
   user?.profile?.city

9. Spread:
   [...array]
   { ...object }

10. Rest:
   function sum(...numbers) {}

11. Strings are immutable.

12. Objects are reference values.

13. NaN is not equal to itself:
   NaN === NaN -> false
   Number.isNaN(NaN) -> true

14. typeof null is "object" due to historical JavaScript behavior.

15. Math.random is not secure for passwords/tokens.

================================================================================
 END OF GUIDE
================================================================================
*/
