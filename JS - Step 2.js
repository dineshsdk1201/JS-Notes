/*****************************************************************************************
 JAVASCRIPT DEEP NOTES - PART 11 TO 20
 Topics:
 11. Arrays
 12. Objects
 13. Functions
 14. Scope and Execution Context
 15. this Keyword
 16. Prototypes and Inheritance
 17. Classes
 18. Error Handling
 19. Dates and Time
 20. Regular Expressions

 You can paste this full content into a .js file.
 Most examples are executable.
 Some lines are commented because they intentionally produce errors.
*****************************************************************************************/


/*****************************************************************************************
 11. ARRAYS
*****************************************************************************************/

/*
 Array:
 - Ordered collection of values.
 - Zero-indexed.
 - Resizable.
 - Can store mixed data types.
 - Technically arrays are objects in JavaScript.

 Why arrays exist:
 - To store multiple related values under one variable.
 - Useful for lists, API data, cart items, menus, tables, search results, etc.
*/

const fruits = ["apple", "banana", "mango"];

console.log("First fruit:", fruits[0]);
console.log("Second fruit:", fruits[1]);
console.log("Last fruit:", fruits[fruits.length - 1]);
console.log("Last fruit using at():", fruits.at(-1));

/*
 Creating arrays
*/

const arrLiteral = [1, 2, 3];

const arrConstructor = new Array(1, 2, 3);

const confusingArray = new Array(3);
// Creates empty slots, not [3]
console.log("new Array(3):", confusingArray);

const fixedArray = Array(3).fill(0);
console.log("Array(3).fill(0):", fixedArray);

const arrayOfExample = Array.of(3);
console.log("Array.of(3):", arrayOfExample);

const stringToArray = Array.from("hello");
console.log("Array.from('hello'):", stringToArray);

/*
 Updating array elements
*/

const colors = ["red", "green", "blue"];
colors[1] = "yellow";
console.log("Updated colors:", colors);

/*
 const prevents reassignment, not mutation.
*/

const numsConst = [1, 2, 3];
numsConst.push(4);
console.log("Const array mutated:", numsConst);

// numsConst = [5, 6]; // Error: Assignment to constant variable

/*
 Array length
*/

const lengthExample = ["a", "b", "c"];
console.log("Length:", lengthExample.length);

lengthExample.length = 2;
console.log("After truncating:", lengthExample);

lengthExample.length = 5;
console.log("After increasing length:", lengthExample);

/*
 Sparse arrays:
 - Arrays with missing indexes.
 - Avoid if possible because some methods skip empty slots.
*/

const sparse = [];
sparse[3] = "hello";

console.log("Sparse array:", sparse);
console.log("Sparse length:", sparse.length);

const sparseMap = [1, , 3].map((x) => x * 2);
console.log("Sparse map result:", sparseMap);

/*
 Better:
 Use explicit undefined/null instead of holes.
*/

const nonSparse = [1, undefined, 3];
console.log("Non-sparse:", nonSparse);

/*
 Multidimensional arrays
*/

const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Matrix value:", matrix[1][2]);

/*
 Use cases:
 - Tables
 - Game boards
 - Calendars
 - Matrix calculations
*/

const ticTacToeBoard = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["", "", "X"],
];

console.log("Tic Tac Toe:", ticTacToeBoard);


/*****************************************************************************************
 MUTATING ARRAY METHODS
 These methods modify the original array.
*****************************************************************************************/

/*
 push()
 - Adds element at the end.
 - Returns new length.
*/

const pushExample = [1, 2];
const pushLength = pushExample.push(3);

console.log("After push:", pushExample);
console.log("Push returned length:", pushLength);

/*
 pop()
 - Removes last element.
 - Returns removed element.
*/

const popExample = [1, 2, 3];
const popped = popExample.pop();

console.log("Popped value:", popped);
console.log("After pop:", popExample);

/*
 shift()
 - Removes first element.
 - Returns removed element.
 - Can be slower for huge arrays because indexes shift.
*/

const shiftExample = ["task1", "task2", "task3"];
const shifted = shiftExample.shift();

console.log("Shifted value:", shifted);
console.log("After shift:", shiftExample);

/*
 unshift()
 - Adds element at beginning.
 - Returns new length.
*/

const unshiftExample = [2, 3];
unshiftExample.unshift(1);

console.log("After unshift:", unshiftExample);

/*
 splice()
 - Add, remove, or replace elements.
 Syntax:
 array.splice(startIndex, deleteCount, item1, item2, ...)
*/

const spliceRemove = ["a", "b", "c", "d"];
spliceRemove.splice(1, 2);
console.log("Splice remove:", spliceRemove);

const spliceAdd = ["a", "d"];
spliceAdd.splice(1, 0, "b", "c");
console.log("Splice add:", spliceAdd);

const spliceReplace = ["a", "x", "c"];
spliceReplace.splice(1, 1, "b");
console.log("Splice replace:", spliceReplace);

/*
 sort()
 - Sorts original array.
 - Default sort converts elements to strings.
*/

const sortStrings = ["Dinesh", "Arun", "Bala"];
sortStrings.sort();
console.log("String sort:", sortStrings);

const sortNumbersWrong = [10, 5, 100, 2];
sortNumbersWrong.sort();
console.log("Wrong numeric sort:", sortNumbersWrong);

const sortNumbersCorrect = [10, 5, 100, 2];
sortNumbersCorrect.sort((a, b) => a - b);
console.log("Correct ascending sort:", sortNumbersCorrect);

sortNumbersCorrect.sort((a, b) => b - a);
console.log("Correct descending sort:", sortNumbersCorrect);

const usersForSort = [
  { name: "A", age: 25 },
  { name: "B", age: 20 },
  { name: "C", age: 30 },
];

usersForSort.sort((a, b) => a.age - b.age);
console.log("Users sorted by age:", usersForSort);

/*
 reverse()
 - Reverses original array.
*/

const reverseExample = [1, 2, 3];
reverseExample.reverse();
console.log("After reverse:", reverseExample);


/*****************************************************************************************
 NON-MUTATING ARRAY METHODS
 These usually return a new value and do not modify original array.
*****************************************************************************************/

/*
 concat()
*/

const concatA = [1, 2];
const concatB = [3, 4];
const concatResult = concatA.concat(concatB);

console.log("Concat result:", concatResult);

/*
 slice()
 - Returns selected portion.
 - End index is excluded.
*/

const sliceExample = ["a", "b", "c", "d"];

console.log("Slice 1 to 3:", sliceExample.slice(1, 3));
console.log("Slice copy:", sliceExample.slice());

/*
 map()
 - Transforms each element.
 - Returns new array.
*/

const mapNums = [1, 2, 3];
const doubled = mapNums.map((num) => num * 2);

console.log("Doubled:", doubled);

/*
 filter()
 - Keeps only matching elements.
*/

const filterNums = [1, 2, 3, 4, 5, 6];
const evenNums = filterNums.filter((num) => num % 2 === 0);

console.log("Even numbers:", evenNums);

/*
 reduce()
 - Converts array into one final value.
*/

const reduceNums = [1, 2, 3, 4];
const total = reduceNums.reduce((acc, curr) => acc + curr, 0);

console.log("Total:", total);

const products = [
  { name: "Laptop", price: 50000 },
  { name: "Mouse", price: 1000 },
  { name: "Keyboard", price: 2000 },
];

const cartTotal = products.reduce((sum, product) => sum + product.price, 0);
console.log("Cart total:", cartTotal);

/*
 Grouping using reduce()
*/

const employees = [
  { name: "A", role: "admin" },
  { name: "B", role: "user" },
  { name: "C", role: "admin" },
];

const groupedByRole = employees.reduce((acc, employee) => {
  if (!acc[employee.role]) {
    acc[employee.role] = [];
  }

  acc[employee.role].push(employee);
  return acc;
}, {});

console.log("Grouped by role:", groupedByRole);

/*
 find()
 - Returns first matching element.
*/

const foundUser = employees.find((employee) => employee.role === "admin");
console.log("Found user:", foundUser);

/*
 findIndex()
 - Returns index of first matching element.
 - Returns -1 if not found.
*/

const foundIndex = employees.findIndex((employee) => employee.name === "B");
console.log("Found index:", foundIndex);

/*
 some()
 - true if at least one item matches.
*/

const hasAdmin = employees.some((employee) => employee.role === "admin");
console.log("Has admin:", hasAdmin);

/*
 every()
 - true only if all items match.
*/

const allAdmins = employees.every((employee) => employee.role === "admin");
console.log("All admins:", allAdmins);

/*
 includes()
 - Checks primitive values.
*/

const roles = ["admin", "editor", "user"];

console.log("Includes admin:", roles.includes("admin"));

const objectArray = [{ id: 1 }];
console.log("Object includes:", objectArray.includes({ id: 1 }));
console.log(
  "Object exists using some:",
  objectArray.some((item) => item.id === 1)
);

/*
 join()
 - Converts array to string.
*/

const skills = ["React", "Drupal", "JavaScript"];
console.log("Joined skills:", skills.join(", "));

/*
 flat()
 - Flattens nested arrays.
*/

const nestedArray = [1, [2, 3], [4, [5, 6]]];

console.log("Flat depth 1:", nestedArray.flat());
console.log("Flat depth 2:", nestedArray.flat(2));
console.log("Flat Infinity:", nestedArray.flat(Infinity));

/*
 flatMap()
 - map() + flat(1)
*/

const sentences = ["hello world", "js arrays"];
const words = sentences.flatMap((sentence) => sentence.split(" "));

console.log("FlatMap words:", words);

/*
 toSorted(), toReversed(), toSpliced()
 - Modern immutable alternatives.
 - Browser/runtime support may vary.
*/

const modernArray = [3, 1, 2];

if (typeof modernArray.toSorted === "function") {
  console.log("toSorted:", modernArray.toSorted((a, b) => a - b));
}

if (typeof modernArray.toReversed === "function") {
  console.log("toReversed:", modernArray.toReversed());
}

if (typeof modernArray.toSpliced === "function") {
  console.log("toSpliced:", modernArray.toSpliced(1, 1, 99));
}


/*****************************************************************************************
 ARRAY ITERATION METHODS
*****************************************************************************************/

/*
 forEach()
 - Used for side effects.
 - Returns undefined.
*/

const eachNums = [1, 2, 3];

eachNums.forEach((num) => {
  console.log("forEach value:", num);
});

/*
 map vs forEach:
 - map returns new transformed array.
 - forEach only performs action.
*/

const mappedResult = eachNums.map((num) => num * 10);
const forEachResult = eachNums.forEach((num) => num * 10);

console.log("map result:", mappedResult);
console.log("forEach result:", forEachResult);


/*****************************************************************************************
 ARRAY CONCEPTS
*****************************************************************************************/

/*
 Array destructuring
*/

const destructureColors = ["red", "green", "blue"];

const [firstColor, secondColor] = destructureColors;

console.log("First color:", firstColor);
console.log("Second color:", secondColor);

const [, skippedSecond] = destructureColors;
console.log("Skipped first, got:", skippedSecond);

const [aValue, bValue, cValue = "default"] = ["A", "B"];
console.log("Default destructuring:", cValue);

/*
 Swapping variables
*/

let x = 10;
let y = 20;

[x, y] = [y, x];

console.log("Swapped x:", x);
console.log("Swapped y:", y);

/*
 Spread with arrays
*/

const spreadNums = [1, 2, 3];

console.log("Spread values:", ...spreadNums);

const spreadCopy = [...spreadNums];
console.log("Spread copy:", spreadCopy);

const mergedArray = [...[1, 2], ...[3, 4]];
console.log("Merged using spread:", mergedArray);

const immutableAdd = [...spreadNums, 4];
console.log("Immutable add:", immutableAdd);

/*
 Rest with arrays
*/

const [firstItem, ...remainingItems] = [1, 2, 3, 4];

console.log("First item:", firstItem);
console.log("Remaining items:", remainingItems);

function sumNumbers(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log("Rest parameter sum:", sumNumbers(1, 2, 3, 4));

/*
 Shallow copy vs deep copy
*/

const originalArray = [{ name: "Dinesh" }];
const shallowCopyArray = [...originalArray];

shallowCopyArray[0].name = "Changed";

console.log("Original after shallow nested change:", originalArray);

/*
 structuredClone creates deep copy for many data types.
 It cannot clone functions, DOM nodes, etc.
*/

const deepOriginal = [{ name: "Dinesh", skills: ["JS", "React"] }];
const deepCopied = structuredClone(deepOriginal);

deepCopied[0].skills.push("Drupal");

console.log("Deep original:", deepOriginal);
console.log("Deep copied:", deepCopied);


/*****************************************************************************************
 12. OBJECTS
*****************************************************************************************/

/*
 Object:
 - Collection of key-value pairs.
 - Used to represent real-world entities.
*/

const user = {
  name: "Dinesh",
  role: "Associate",
  skills: ["React", "Drupal", "JavaScript"],
};

console.log("User:", user);

/*
 Creating objects
*/

// 1. Object literal
const objLiteral = {
  name: "Literal Object",
};

// 2. new Object()
const objConstructor = new Object();
objConstructor.name = "Constructor Object";

// 3. Constructor function
function UserConstructor(name, role) {
  this.name = name;
  this.role = role;
}

const constructedUser = new UserConstructor("Dinesh", "Developer");

// 4. Object.create()
const animalObject = {
  speak() {
    console.log("Animal speaks");
  },
};

const dogObject = Object.create(animalObject);
dogObject.name = "Tommy";
dogObject.speak();

// 5. Class
class UserClassExample {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

const classUser = new UserClassExample("Dinesh", "Developer");
classUser.login();

/*
 Dot notation
*/

console.log("Dot notation:", user.name);

/*
 Bracket notation
*/

console.log("Bracket notation:", user["role"]);

const dynamicKey = "skills";
console.log("Dynamic key:", user[dynamicKey]);

const specialKeyObject = {
  "first name": "Dinesh",
};

console.log("Special key:", specialKeyObject["first name"]);

/*
 Properties and methods
*/

const person = {
  firstName: "Dinesh",
  lastName: "Kumar",

  greet() {
    console.log(`Hello ${this.firstName}`);
  },
};

person.greet();

/*
 Dynamic properties
*/

const dynamicObject = {};
dynamicObject.name = "Dinesh";
dynamicObject.role = "Developer";

console.log("Dynamic object:", dynamicObject);

/*
 Computed property names
*/

const fieldName = "email";

const computedObject = {
  name: "Dinesh",
  [fieldName]: "dinesh@example.com",
};

console.log("Computed property:", computedObject.email);

/*
 Nested objects
*/

const nestedUser = {
  name: "Dinesh",
  address: {
    city: "Coimbatore",
    state: "TN",
  },
};

console.log("Nested city:", nestedUser.address.city);
console.log("Optional chaining:", nestedUser.company?.name);

/*
 Symbol keys
*/

const symbolId = Symbol("id");

const symbolUser = {
  name: "Dinesh",
  [symbolId]: 101,
};

console.log("Symbol value:", symbolUser[symbolId]);
console.log("Object.keys ignores symbols:", Object.keys(symbolUser));
console.log("Symbols:", Object.getOwnPropertySymbols(symbolUser));

/*
 Object utilities
*/

const utilityUser = {
  name: "Dinesh",
  role: "Developer",
  active: true,
};

console.log("Object.keys:", Object.keys(utilityUser));
console.log("Object.values:", Object.values(utilityUser));
console.log("Object.entries:", Object.entries(utilityUser));

for (const [key, value] of Object.entries(utilityUser)) {
  console.log("Entry:", key, value);
}

/*
 Object.assign()
 - Shallow copy/merge.
*/

const assignTarget = { a: 1 };
const assignSource = { b: 2 };

Object.assign(assignTarget, assignSource);
console.log("Assigned target:", assignTarget);

const mergedObject = { ...{ a: 1 }, ...{ b: 2 } };
console.log("Merged object with spread:", mergedObject);

/*
 Object.freeze()
 - Prevents add, delete, update.
 - Shallow only.
*/

const frozenObject = {
  name: "Dinesh",
  nested: {
    value: 10,
  },
};

Object.freeze(frozenObject);

// frozenObject.name = "Changed"; // Ignored or error in strict mode
frozenObject.nested.value = 99; // Allowed because freeze is shallow

console.log("Frozen object:", frozenObject);

/*
 Object.seal()
 - Cannot add/delete.
 - Can modify existing writable properties.
*/

const sealedObject = {
  name: "Dinesh",
};

Object.seal(sealedObject);
sealedObject.name = "Kumar";
// sealedObject.age = 25; // Not added
// delete sealedObject.name; // Not deleted

console.log("Sealed object:", sealedObject);

/*
 Object.preventExtensions()
 - Cannot add new properties.
 - Existing properties can be modified/deleted.
*/

const nonExtendable = {
  name: "Dinesh",
};

Object.preventExtensions(nonExtendable);
nonExtendable.name = "Kumar";
// nonExtendable.age = 25; // Not added

console.log("Prevent extensions:", nonExtendable);

/*
 hasOwnProperty()
*/

console.log("hasOwnProperty:", utilityUser.hasOwnProperty("name"));

/*
 Object.hasOwn()
 - Safer modern alternative.
*/

console.log("Object.hasOwn:", Object.hasOwn(utilityUser, "name"));

/*
 delete
*/

const deleteExample = {
  name: "Dinesh",
  age: 25,
};

delete deleteExample.age;

console.log("After delete:", deleteExample);

/*
 Property descriptors
*/

const descriptorObject = {
  name: "Dinesh",
};

console.log(
  "Descriptor:",
  Object.getOwnPropertyDescriptor(descriptorObject, "name")
);

Object.defineProperty(descriptorObject, "role", {
  value: "Developer",
  writable: false,
  enumerable: true,
  configurable: false,
});

// descriptorObject.role = "Admin"; // Not changed

console.log("Descriptor object:", descriptorObject);

/*
 enumerable false
*/

Object.defineProperty(descriptorObject, "secret", {
  value: "hidden",
  enumerable: false,
});

console.log("Keys without secret:", Object.keys(descriptorObject));
console.log("Secret direct access:", descriptorObject.secret);

/*
 Getters and setters
*/

const fullNameUser = {
  firstName: "Dinesh",
  lastName: "Kumar",

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },

  set fullName(value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  },
};

console.log("Getter fullName:", fullNameUser.fullName);

fullNameUser.fullName = "Arun Kumar";
console.log("After setter:", fullNameUser);


/*****************************************************************************************
 13. FUNCTIONS
*****************************************************************************************/

/*
 Function:
 - Reusable block of code.
 - Can accept inputs.
 - Can return output.
 - Functions are first-class values in JavaScript.
*/

/*
 Function declaration
 - Hoisted.
*/

function addDeclaration(a, b) {
  return a + b;
}

console.log("Function declaration:", addDeclaration(2, 3));

/*
 Function expression
*/

const addExpression = function (a, b) {
  return a + b;
};

console.log("Function expression:", addExpression(2, 3));

/*
 Anonymous function
*/

const anonymousExample = function () {
  console.log("Anonymous function assigned to variable");
};

anonymousExample();

/*
 Named function expression
*/

const factorialNamed = function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

console.log("Named function factorial:", factorialNamed(5));

/*
 Arrow function
*/

const addArrow = (a, b) => a + b;
console.log("Arrow function:", addArrow(2, 3));

const createUserArrow = (name) => ({ name });
console.log("Arrow returning object:", createUserArrow("Dinesh"));

/*
 Parameters vs arguments
*/

function greetFunction(name) {
  console.log(`Hello ${name}`);
}

greetFunction("Dinesh");

/*
 Default parameters
*/

function greetDefault(name = "Guest") {
  console.log(`Hello ${name}`);
}

greetDefault();
greetDefault("Dinesh");

/*
 Rest parameters
*/

function totalRest(...numbers) {
  return numbers.reduce((sum, num) => sum + num, 0);
}

console.log("Rest total:", totalRest(1, 2, 3));

/*
 Return values
*/

function multiply(a, b) {
  return a * b;
}

console.log("Multiply:", multiply(4, 5));

/*
 Higher-order functions
 - Function that takes another function or returns another function.
*/

function calculate(a, b, operation) {
  return operation(a, b);
}

console.log(
  "Higher order add:",
  calculate(10, 5, function (x, y) {
    return x + y;
  })
);

/*
 Callback functions
*/

function processUser(name, callback) {
  console.log("Processing:", name);
  callback();
}

processUser("Dinesh", function () {
  console.log("Callback executed");
});

/*
 First-class functions
*/

const firstClassFunction = function () {
  return "I am stored in a variable";
};

console.log(firstClassFunction());

/*
 Pure function
 - Same input gives same output.
 - No side effects.
*/

function pureAdd(a, b) {
  return a + b;
}

console.log("Pure add:", pureAdd(1, 2));

/*
 Impure function
 - Depends on or changes outside state.
*/

let outsideTotal = 0;

function impureAdd(value) {
  outsideTotal += value;
}

impureAdd(5);
console.log("Outside total after impure function:", outsideTotal);

/*
 Side effects:
 - console.log
 - DOM mutation
 - API call
 - modifying external variable
 - mutating input object/array
*/

/*
 Recursion
*/

function countdown(n) {
  if (n === 0) return;
  console.log("Countdown:", n);
  countdown(n - 1);
}

countdown(3);

function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

console.log("Recursive factorial:", factorialRecursive(5));

/*
 IIFE - Immediately Invoked Function Expression
*/

(function () {
  console.log("IIFE executed");
})();

(() => {
  console.log("Arrow IIFE executed");
})();

/*
 arguments object
 - Available in regular functions.
 - Not available in arrow functions.
*/

function argumentsExample() {
  console.log("Arguments object:", arguments);
  console.log("Arguments as array:", Array.from(arguments));
}

argumentsExample(1, 2, 3);

/*
 Function hoisting
*/

hoistedFunction();

function hoistedFunction() {
  console.log("Function declaration hoisted");
}

// notHoistedFunction(); // Error

const notHoistedFunction = function () {
  console.log("Function expression not usable before initialization");
};

/*
 Lexical scope
*/

const lexicalName = "Dinesh";

function lexicalGreet() {
  console.log("Lexical scope:", lexicalName);
}

lexicalGreet();

/*
 Function scope and block scope
*/

function scopeExample() {
  var functionScoped = "I am function scoped";

  if (true) {
    let blockScoped = "I am block scoped";
    const alsoBlockScoped = "I am also block scoped";
    console.log(blockScoped, alsoBlockScoped);
  }

  console.log(functionScoped);
  // console.log(blockScoped); // Error
}

scopeExample();

/*
 Closure
*/

function createCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = createCounter();

console.log("Closure counter:", counter());
console.log("Closure counter:", counter());
console.log("Closure counter:", counter());

/*
 Scope chain:
 current scope -> outer scope -> global scope
*/

const globalVar = "global";

function outerScope() {
  const outerVar = "outer";

  function innerScope() {
    const innerVar = "inner";
    console.log("Scope chain:", innerVar, outerVar, globalVar);
  }

  innerScope();
}

outerScope();

/*
 call(), apply(), bind()
*/

function introduce(city, country) {
  console.log(`${this.name} from ${city}, ${country}`);
}

const introUser = {
  name: "Dinesh",
};

introduce.call(introUser, "Coimbatore", "India");
introduce.apply(introUser, ["Coimbatore", "India"]);

const boundIntroduce = introduce.bind(introUser, "Coimbatore", "India");
boundIntroduce();

/*
 Currying
*/

const curriedAdd = (a) => (b) => a + b;

console.log("Curried add:", curriedAdd(2)(3));

const multiplyBy = (a) => (b) => a * b;
const double = multiplyBy(2);

console.log("Double:", double(10));

/*
 Partial application
*/

function multiplyThree(a, b, c) {
  return a * b * c;
}

const partiallyApplied = multiplyThree.bind(null, 2);

console.log("Partial application:", partiallyApplied(3, 4));

/*
 Function composition
*/

const doubleNumber = (num) => num * 2;
const squareNumber = (num) => num * num;

const compose =
  (fn1, fn2) =>
  (value) =>
    fn1(fn2(value));

console.log("Function composition:", compose(squareNumber, doubleNumber)(3));

/*
 Memoization
*/

function memoize(fn) {
  const cache = new Map();

  return function (value) {
    if (cache.has(value)) {
      console.log("From cache");
      return cache.get(value);
    }

    console.log("Calculating");
    const result = fn(value);
    cache.set(value, result);
    return result;
  };
}

const slowSquare = memoize((num) => num * num);

console.log(slowSquare(5));
console.log(slowSquare(5));

/*
 Debouncing
 - Executes function only after user stops triggering for delay time.
*/

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const debouncedSearch = debounce(function (query) {
  console.log("Searching:", query);
}, 500);

// debouncedSearch("react");

/*
 Throttling
 - Executes at most once in a fixed time interval.
*/

function throttle(fn, limit) {
  let waiting = false;

  return function (...args) {
    if (!waiting) {
      fn.apply(this, args);
      waiting = true;

      setTimeout(() => {
        waiting = false;
      }, limit);
    }
  };
}

const throttledScroll = throttle(function () {
  console.log("Scroll handled");
}, 1000);

// throttledScroll();


/*****************************************************************************************
 14. SCOPE AND EXECUTION CONTEXT
*****************************************************************************************/

/*
 Execution context:
 - Environment where JS code runs.

 Types:
 1. Global execution context
 2. Function execution context
 3. Eval execution context rarely used

 Each function call creates a new function execution context.
*/

/*
 Call stack:
 - Keeps track of function calls.
 - Last in, first out.
*/

function stackOne() {
  stackTwo();
}

function stackTwo() {
  stackThree();
}

function stackThree() {
  console.log("Call stack example complete");
}

stackOne();

/*
 Lexical environment:
 - Stores variable bindings.
 - Has reference to outer lexical environment.
*/

/*
 Variable environment:
 - Handles var declarations.
 - var is hoisted and initialized with undefined.
*/

function varHoistingExample() {
  console.log("var before declaration:", hoistedVar);
  var hoistedVar = "Now assigned";
  console.log("var after assignment:", hoistedVar);
}

varHoistingExample();

/*
 Closure internals:
 - Inner function keeps reference to outer function variables.
*/

function bankAccount() {
  let balance = 0;

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },

    withdraw(amount) {
      balance -= amount;
      return balance;
    },

    getBalance() {
      return balance;
    },
  };
}

const accountClosure = bankAccount();

console.log("Deposit:", accountClosure.deposit(1000));
console.log("Withdraw:", accountClosure.withdraw(300));
console.log("Balance:", accountClosure.getBalance());


/*****************************************************************************************
 15. THIS KEYWORD
*****************************************************************************************/

/*
 this:
 - Refers to execution context object.
 - Value depends on how function is called.
 - Arrow functions do not have their own this.
*/

/*
 Global this:
 In browser non-module script, this is window.
 In strict mode function call, this is undefined.
 In Node, global this behavior is different.
*/

console.log("Global this exists:", typeof this);

/*
 Function this
*/

function normalThisFunction() {
  console.log("Normal function this:", this);
}

// normalThisFunction();

/*
 Method this
*/

const thisUser = {
  name: "Dinesh",

  greet() {
    console.log("Method this:", this.name);
  },
};

thisUser.greet();

/*
 Losing this
*/

const detachedGreet = thisUser.greet;
// detachedGreet(); // this lost

const fixedGreet = thisUser.greet.bind(thisUser);
fixedGreet();

/*
 Constructor this
*/

function PersonConstructor(name) {
  this.name = name;
}

const personConstructed = new PersonConstructor("Dinesh");
console.log("Constructor this:", personConstructed.name);

/*
 Event handler this:
 Traditional function: this usually points to element.
 Arrow function: this is lexical.
*/

/*
 Arrow function this
*/

const arrowThisUser = {
  name: "Dinesh",

  regularMethod() {
    console.log("Regular method this:", this.name);
  },

  arrowMethod: () => {
    console.log("Arrow method this usually undefined/global:", this?.name);
  },

  delayedGreet() {
    setTimeout(() => {
      console.log("Arrow inside method keeps this:", this.name);
    }, 100);
  },
};

arrowThisUser.regularMethod();
arrowThisUser.arrowMethod();
arrowThisUser.delayedGreet();


/*****************************************************************************************
 16. PROTOTYPES AND INHERITANCE
*****************************************************************************************/

/*
 JavaScript uses prototype-based inheritance.
 Objects can inherit properties/methods from other objects.
*/

const animalPrototype = {
  eat() {
    console.log(`${this.name} is eating`);
  },
};

const dogPrototypeObject = Object.create(animalPrototype);
dogPrototypeObject.name = "Tommy";
dogPrototypeObject.bark = function () {
  console.log(`${this.name} is barking`);
};

dogPrototypeObject.eat();
dogPrototypeObject.bark();

/*
 Prototype chain:
 - JS checks object itself.
 - Then prototype.
 - Then prototype's prototype.
 - Until null.
*/

console.log(
  "Prototype of dog:",
  Object.getPrototypeOf(dogPrototypeObject) === animalPrototype
);

/*
 __proto__
 - Legacy way.
 - Prefer Object.getPrototypeOf().
*/

console.log("__proto__ check:", dogPrototypeObject.__proto__ === animalPrototype);

/*
 prototype property
 - Functions have prototype property.
 - Objects created with new use constructor.prototype as prototype.
*/

function PrototypeUser(name) {
  this.name = name;
}

PrototypeUser.prototype.greet = function () {
  console.log(`Hello ${this.name}`);
};

const prototypeUser = new PrototypeUser("Dinesh");
prototypeUser.greet();

console.log(
  "Prototype relation:",
  Object.getPrototypeOf(prototypeUser) === PrototypeUser.prototype
);

/*
 Method sharing:
 - Put common methods on prototype to avoid duplicate function copies.
*/

/*
 Inheritance through prototypes
*/

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  console.log(`${this.name} eats`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const inheritedDog = new Dog("Rocky", "Labrador");

inheritedDog.eat();
inheritedDog.bark();

/*
 Property shadowing
*/

const parentObject = {
  value: 10,
};

const childObject = Object.create(parentObject);
childObject.value = 20;

console.log("Shadowed value:", childObject.value);
console.log("Own property:", childObject.hasOwnProperty("value"));


/*****************************************************************************************
 17. CLASSES
*****************************************************************************************/

/*
 Classes are syntactic sugar over prototypes.
 They make object creation and inheritance cleaner.
*/

class ClassUser {
  constructor(name, role) {
    this.name = name;
    this.role = role;
  }

  greet() {
    console.log(`Hello ${this.name}`);
  }

  static createGuest() {
    return new ClassUser("Guest", "guest");
  }
}

const classUserOne = new ClassUser("Dinesh", "Developer");
classUserOne.greet();

const guestUser = ClassUser.createGuest();
console.log("Static method user:", guestUser);

/*
 Static properties
*/

class AppConfig {
  static appName = "JavaScript Notes";
  static version = "1.0.0";
}

console.log("Static property:", AppConfig.appName);

/*
 Inheritance with extends and super
*/

class BaseAnimal {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} eats`);
  }
}

class ClassDog extends BaseAnimal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log(`${this.name} barks`);
  }

  eat() {
    super.eat();
    console.log(`${this.name} finished eating`);
  }
}

const classDog = new ClassDog("Bruno", "German Shepherd");

classDog.eat();
classDog.bark();

/*
 Getters and setters in classes
*/

class FullNameClass {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(value) {
    const [first, last] = value.split(" ");
    this.firstName = first;
    this.lastName = last;
  }
}

const fullNameClassUser = new FullNameClass("Dinesh", "Kumar");

console.log("Class getter:", fullNameClassUser.fullName);

fullNameClassUser.fullName = "Arun Kumar";
console.log("After class setter:", fullNameClassUser);

/*
 Public fields
*/

class PublicFieldExample {
  role = "guest";

  constructor(name) {
    this.name = name;
  }
}

const publicFieldUser = new PublicFieldExample("Dinesh");
console.log("Public field:", publicFieldUser);

/*
 Private fields
*/

class BankAccountClass {
  #balance = 0;

  deposit(amount) {
    if (amount <= 0) {
      throw new Error("Amount must be positive");
    }

    this.#balance += amount;
  }

  getBalance() {
    return this.#balance;
  }
}

const bankClassAccount = new BankAccountClass();
bankClassAccount.deposit(1000);

console.log("Private field balance:", bankClassAccount.getBalance());

// console.log(bankClassAccount.#balance); // SyntaxError

/*
 Class expressions
*/

const ClassExpressionUser = class {
  constructor(name) {
    this.name = name;
  }
};

const expressionUser = new ClassExpressionUser("Dinesh");
console.log("Class expression:", expressionUser);


/*****************************************************************************************
 18. ERROR HANDLING
*****************************************************************************************/

/*
 Error types:
 - SyntaxError
 - Runtime error
 - Logical error
*/

/*
 SyntaxError example:
 if (true {
   console.log("Invalid syntax");
 }
*/

/*
 Runtime error example:
 const nullUser = null;
 console.log(nullUser.name);
*/

/*
 Logical error example:
*/

function wrongAverage(a, b) {
  return a + b / 2;
}

function correctAverage(a, b) {
  return (a + b) / 2;
}

console.log("Wrong average:", wrongAverage(10, 20));
console.log("Correct average:", correctAverage(10, 20));

/*
 try...catch...finally
*/

try {
  const result = JSON.parse('{"name":"Dinesh"}');
  console.log("Parsed JSON:", result);
} catch (error) {
  console.log("Error message:", error.message);
} finally {
  console.log("Finally always runs");
}

/*
 throw
*/

function withdraw(amount, balance) {
  if (amount > balance) {
    throw new Error("Insufficient balance");
  }

  return balance - amount;
}

try {
  console.log("Withdraw result:", withdraw(500, 1000));
  console.log("Withdraw result:", withdraw(1500, 1000));
} catch (error) {
  console.log("Withdraw error:", error.message);
}

/*
 Built-in error types
*/

try {
  throw new TypeError("Wrong type used");
} catch (error) {
  console.log("TypeError:", error.name, error.message);
}

try {
  // console.log(notDefinedVariable);
} catch (error) {
  console.log("ReferenceError:", error.name, error.message);
}

try {
  new Array(-1);
} catch (error) {
  console.log("RangeError:", error.name, error.message);
}

try {
  decodeURIComponent("%");
} catch (error) {
  console.log("URIError:", error.name, error.message);
}

/*
 Custom errors
*/

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

function validateUser(userInput) {
  if (!userInput.email) {
    throw new ValidationError("Email is required", "email");
  }

  return true;
}

try {
  validateUser({ name: "Dinesh" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation field:", error.field);
    console.log("Validation message:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}

/*
 Error propagation
*/

function functionA() {
  functionB();
}

function functionB() {
  functionC();
}

function functionC() {
  throw new Error("Error from function C");
}

try {
  functionA();
} catch (error) {
  console.log("Propagated error:", error.message);
  console.log("Stack trace exists:", Boolean(error.stack));
}


/*****************************************************************************************
 19. DATES AND TIME
*****************************************************************************************/

/*
 Date object:
 - Represents date and time.
 - Internally stores timestamp in milliseconds since Jan 1, 1970 UTC.
*/

const now = new Date();

console.log("Current date:", now);
console.log("Timestamp Date.now():", Date.now());
console.log("Timestamp getTime():", now.getTime());

/*
 Creating dates
*/

const isoDate = new Date("2026-06-29T10:30:00Z");
console.log("ISO date:", isoDate);

const numericDate = new Date(2026, 5, 29);
// Month is zero-based: 0 Jan, 5 Jun
console.log("Numeric date:", numericDate);

/*
 Parsing dates:
 Prefer ISO format.
 Avoid ambiguous formats like 06/07/2026.
*/

/*
 Formatting dates
*/

console.log("toDateString:", now.toDateString());
console.log("toISOString:", now.toISOString());
console.log("toLocaleDateString:", now.toLocaleDateString());
console.log("toLocaleTimeString:", now.toLocaleTimeString());

const indiaFormatter = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "full",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

console.log("Formatted India date:", indiaFormatter.format(now));

/*
 UTC vs local
*/

console.log("Local hours:", now.getHours());
console.log("UTC hours:", now.getUTCHours());

/*
 Date arithmetic
*/

const today = new Date();
const nextWeek = new Date(today);

nextWeek.setDate(nextWeek.getDate() + 7);

console.log("Today:", today);
console.log("Next week:", nextWeek);

const startDate = new Date("2026-06-01T00:00:00Z");
const endDate = new Date("2026-06-29T00:00:00Z");

const diffMs = endDate - startDate;
const diffDays = diffMs / (1000 * 60 * 60 * 24);

console.log("Difference in days:", diffDays);

/*
 Date limitations:
 - Month is zero-based.
 - Parsing can be inconsistent.
 - Timezones are tricky.
 - Date object is mutable.
 - Daylight saving can cause edge cases.

 Solutions:
 - Use ISO strings.
 - Use Intl.DateTimeFormat for formatting.
 - Use date libraries when needed.
 - Use Temporal API when available.
*/


/*****************************************************************************************
 20. REGULAR EXPRESSIONS
*****************************************************************************************/

/*
 RegExp:
 - Pattern used to match/search/replace/extract text.

 Use cases:
 - Validation
 - Search
 - Replace
 - Extract values
 - Tokenize strings
 - Parse logs
*/

/*
 Regex literal
*/

const helloRegex = /hello/;

console.log("Regex test:", helloRegex.test("hello world"));

/*
 RegExp constructor
 - Useful for dynamic patterns.
*/

const searchWord = "react";
const dynamicRegex = new RegExp(searchWord, "i");

console.log("Dynamic regex:", dynamicRegex.test("I love React"));

/*
 Flags:
 g - global
 i - case-insensitive
 m - multiline
 s - dotAll
 u - unicode
 y - sticky
*/

console.log("Global match:", "cat cat".match(/cat/g));
console.log("Ignore case:", /react/i.test("React"));

const multilineText = "one\ntwo";
console.log("Multiline:", /^two/m.test(multilineText));

console.log("DotAll:", /a.b/s.test("a\nb"));
console.log("Unicode:", /😀/u.test("😀"));

const stickyRegex = /hello/y;
stickyRegex.lastIndex = 0;
console.log("Sticky true:", stickyRegex.test("hello world"));

stickyRegex.lastIndex = 1;
console.log("Sticky false:", stickyRegex.test("hello world"));

/*
 Character classes
*/

console.log("[abc]:", /[abc]/.test("apple"));
console.log("[^abc]:", /[^abc]/.test("xyz"));
console.log("[a-z]:", /[a-z]/.test("m"));
console.log("[0-9]:", /[0-9]/.test("5"));

/*
 Shorthands:
 \d digit
 \D non-digit
 \w word character
 \W non-word character
 \s whitespace
 \S non-whitespace
*/

console.log("\\d:", /\d/.test("abc1"));
console.log("\\s:", /\s/.test("hello world"));

/*
 Quantifiers:
 * 0 or more
 + 1 or more
 ? 0 or 1
 {3} exactly 3
 {2,} 2 or more
 {2,5} between 2 and 5
*/

console.log("ab*c with ac:", /ab*c/.test("ac"));
console.log("ab+c with ac:", /ab+c/.test("ac"));
console.log("ab+c with abc:", /ab+c/.test("abc"));
console.log("a{3}:", /a{3}/.test("aaa"));

/*
 Groups and capturing groups
*/

const nameMatch = "John Doe".match(/(\w+) (\w+)/);

console.log("Full match:", nameMatch[0]);
console.log("First name:", nameMatch[1]);
console.log("Last name:", nameMatch[2]);

/*
 Non-capturing group
*/

console.log("Non capturing:", /(?:Mr|Ms)\. \w+/.test("Mr. John"));

/*
 Named capturing groups
*/

const dateMatch = "2026-06-29".match(
  /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/
);

console.log("Named year:", dateMatch.groups.year);
console.log("Named month:", dateMatch.groups.month);
console.log("Named day:", dateMatch.groups.day);

/*
 Alternation
*/

console.log("Alternation:", /cat|dog/.test("I love dog"));

/*
 Anchors:
 ^ start
 $ end
*/

console.log("Starts with Hello:", /^Hello/.test("Hello world"));
console.log("Ends with world:", /world$/.test("Hello world"));

const indianMobileRegex = /^[6-9]\d{9}$/;
console.log("Indian mobile valid:", indianMobileRegex.test("9876543210"));

/*
 Lookahead
*/

console.log("Positive lookahead:", /\d+(?=px)/.exec("10px")[0]);
console.log("Negative lookahead:", /\d+(?!px)/.exec("10em")[0]);

/*
 Lookbehind
*/

console.log("Positive lookbehind:", /(?<=₹)\d+/.exec("₹500")[0]);
console.log("Negative lookbehind:", /(?<!₹)\d+/.exec("$500")[0]);

/*
 Regex methods
*/

/*
 test()
 - Returns boolean.
*/

console.log("test:", /^\d+$/.test("12345"));

/*
 exec()
 - Returns match details or null.
*/

const execRegex = /(\d+)/;
const execResult = execRegex.exec("Order 123");

console.log("exec full:", execResult[0]);
console.log("exec group:", execResult[1]);

/*
 exec with g flag and lastIndex
*/

const globalNumberRegex = /\d+/g;
const globalNumberText = "A1 B22 C333";

let numberMatch;

while ((numberMatch = globalNumberRegex.exec(globalNumberText)) !== null) {
  console.log("Global exec match:", numberMatch[0]);
}

/*
 String methods with regex
*/

console.log("match:", "abc123".match(/\d+/));
console.log("match global:", "a1 b2 c3".match(/\d/g));

const matchAllText = "A1 B2 C3";
const allMatches = matchAllText.matchAll(/([A-Z])(\d)/g);

for (const match of allMatches) {
  console.log("matchAll letter:", match[1], "number:", match[2]);
}

console.log(
  "replace:",
  "hello world".replace(/world/, "Dinesh")
);

console.log(
  "replace with groups:",
  "2026-06-29".replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1")
);

console.log(
  "replaceAll:",
  "cat cat cat".replaceAll("cat", "dog")
);

console.log("search:", "hello123".search(/\d/));

console.log("split:", "a,b;c".split(/[,;]/));

/*
 Common regex examples
*/

/*
 Basic email validation
 Note:
 Full email validation is complex.
 This is enough for many frontend checks.
*/

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

console.log("Email valid:", emailRegex.test("test@example.com"));

/*
 Password:
 At least 8 characters,
 one lowercase,
 one uppercase,
 one digit.
*/

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

console.log("Password valid:", passwordRegex.test("Test1234"));

/*
 Extract hashtags
*/

const hashtagText = "Learning #JavaScript and #React";

const hashtags = hashtagText.match(/#[A-Za-z0-9_]+/g);

console.log("Hashtags:", hashtags);


/*****************************************************************************************
 FINAL QUICK RECALL
*****************************************************************************************/

/*
 Arrays:
 - Ordered list.
 - Use map for transform.
 - Use filter for selection.
 - Use reduce for one final value.
 - Mutating: push, pop, shift, unshift, splice, sort, reverse.
 - Non-mutating: concat, slice, map, filter, reduce, find, some, every, includes, join, flat.
 - Modern immutable: toSorted, toReversed, toSpliced.

 Objects:
 - Key-value data.
 - Use dot for fixed keys.
 - Use bracket for dynamic/special keys.
 - Object.keys/values/entries help iteration.
 - Object.freeze/seal/preventExtensions control modification.
 - Descriptors control writable/enumerable/configurable.

 Functions:
 - Reusable logic.
 - Declaration is hoisted.
 - Expression is not callable before initialization.
 - Arrow functions do not have own this.
 - Functions are first-class.
 - Closures remember outer variables.

 Scope:
 - Lexical scope depends on where code is written.
 - Scope chain searches current -> outer -> global.
 - var is function scoped.
 - let/const are block scoped.

 this:
 - Depends on call site.
 - Method call: object before dot.
 - Constructor call: new object.
 - call/apply/bind explicitly set this.
 - Arrow function uses lexical this.

 Prototypes:
 - Objects inherit from objects.
 - Constructor functions use prototype property.
 - Class syntax internally uses prototypes.
 - Property shadowing happens when child has same property as parent.

 Classes:
 - Cleaner syntax for constructor/prototype.
 - constructor initializes object.
 - instance methods are shared.
 - static belongs to class.
 - extends creates inheritance.
 - super calls parent.
 - # creates private fields.

 Errors:
 - try/catch handles runtime errors.
 - finally always runs.
 - throw creates custom failure.
 - Custom errors improve clarity.
 - Stack trace helps debugging.

 Dates:
 - Date stores timestamp internally.
 - Prefer ISO strings.
 - Use Intl.DateTimeFormat for formatting.
 - Timezones need careful handling.

 Regex:
 - Pattern matching for strings.
 - Use test for boolean.
 - Use exec for details.
 - Use match/matchAll/search/replace/split on strings.
 - Use anchors for full validation.
*/

/*****************************************************************************************
 END OF JAVASCRIPT NOTES
*****************************************************************************************/
