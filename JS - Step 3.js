/*****************************************************************************************
 *
 * JAVASCRIPT ADVANCED NOTES - SECTIONS 21 TO 30
 *
 * Topics:
 * 21. JSON
 * 22. Advanced Built-in Objects
 * 23. Destructuring
 * 24. Spread and Rest
 * 25. Modules
 * 26. Asynchronous JavaScript
 * 27. Event Loop and Scheduling
 * 28. DOM and Browser APIs
 * 29. Events
 * 30. Forms and Validation
 *
 *****************************************************************************************/


/*****************************************************************************************
 *
 * 21. JSON
 *
 *****************************************************************************************/


/*
==========================================================================================
21.1 WHAT IS JSON?
==========================================================================================

JSON stands for JavaScript Object Notation.

JSON is a lightweight text-based data format used to exchange data between systems.

Important point:
JSON looks similar to JavaScript object syntax, but JSON is NOT exactly the same as a
JavaScript object.

JSON is only a data format.

It is commonly used in:

1. REST API responses
2. Frontend to backend communication
3. Backend to frontend communication
4. Configuration files
5. LocalStorage/sessionStorage
6. Database document formats
7. Third-party API integrations
8. Message queues
9. Microservice communication

Example JSON:

{
  "name": "Dinesh",
  "role": "Developer",
  "skills": ["JavaScript", "React", "Drupal"],
  "active": true,
  "address": {
    "city": "Coimbatore",
    "state": "Tamil Nadu"
  }
}

JSON supports only these data types:

1. String
2. Number
3. Boolean
4. null
5. Array
6. Object

JSON does NOT support:

1. Function
2. undefined
3. Symbol
4. BigInt directly
5. Date object directly
6. Map directly
7. Set directly
8. Comments
9. Trailing commas
10. NaN
11. Infinity

Why JSON exists:

A JavaScript frontend and a Java/PHP/Node/Python backend cannot directly exchange
language-specific objects.

They need a common neutral text format.

So data flow usually looks like this:

JavaScript object
      ↓ JSON.stringify()
JSON string
      ↓ HTTP/network
Backend receives text
      ↓ parse into backend object

And when backend sends response:

Backend object
      ↓ JSON encode
JSON string
      ↓ HTTP/network
Frontend receives JSON text
      ↓ JSON.parse() or response.json()
JavaScript object

*/


/*
==========================================================================================
21.2 JSON VS JAVASCRIPT OBJECT
==========================================================================================

JavaScript object:

const user = {
  name: "Dinesh",
  age: 25
};

JSON:

{
  "name": "Dinesh",
  "age": 25
}

Main differences:

1. JSON keys must be double-quoted strings.
2. JSON string values must use double quotes.
3. JSON cannot contain functions.
4. JSON cannot contain comments.
5. JSON cannot contain trailing commas.
6. JSON cannot contain undefined.
7. JSON is text, not an actual object until parsed.

Invalid JSON:

{
  name: "Dinesh",
}

Why invalid?
- name is not in double quotes.
- trailing comma is not allowed.

Valid JSON:

{
  "name": "Dinesh"
}

*/


/*
==========================================================================================
21.3 JSON.stringify()
==========================================================================================

JSON.stringify() converts a JavaScript value into a JSON string.

Syntax:

JSON.stringify(value)
JSON.stringify(value, replacer)
JSON.stringify(value, replacer, space)

Parameters:

1. value
   The value to convert into JSON.

2. replacer
   Optional function or array used to control what gets included or modified.

3. space
   Optional number/string used for pretty formatting.

Why JSON.stringify() exists:

JavaScript objects cannot be directly transferred as objects through HTTP body.
Usually data must be converted into a string format.

Example use case:

Sending data to backend using fetch:

fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(user)
});

*/

{
  const user = {
    name: "Dinesh",
    age: 25,
    active: true
  };

  const jsonString = JSON.stringify(user);

  console.log("JSON.stringify example:", jsonString);

  /*
  Output:

  {"name":"Dinesh","age":25,"active":true}

  Important:
  The output is a string, not an object.
  */
}


/*
==========================================================================================
21.4 JSON.stringify() WITH PRETTY FORMATTING
==========================================================================================

By default, JSON.stringify() produces compact JSON.

For readable output, use third argument.

*/

{
  const user = {
    name: "Dinesh",
    role: "Developer",
    skills: ["JavaScript", "React"]
  };

  const prettyJson = JSON.stringify(user, null, 2);

  console.log("Pretty JSON:");
  console.log(prettyJson);

  /*
  Output:

  {
    "name": "Dinesh",
    "role": "Developer",
    "skills": [
      "JavaScript",
      "React"
    ]
  }

  Use cases:

  1. Debugging
  2. Logging
  3. Saving readable config files
  4. Showing API payload clearly
  */
}


/*
==========================================================================================
21.5 JSON.stringify() REPLACER FUNCTION
==========================================================================================

The replacer function allows filtering or transforming values during stringification.

Syntax:

JSON.stringify(object, function(key, value) {
  return modifiedValue;
});

If replacer returns undefined for a property, that property is removed from output.

Use cases:

1. Remove password
2. Hide token
3. Convert special values
4. Filter sensitive data
5. Modify values before sending to API

*/

{
  const user = {
    name: "Dinesh",
    email: "dinesh@example.com",
    password: "secret123",
    token: "abc-token"
  };

  const safeJson = JSON.stringify(user, function (key, value) {
    if (key === "password" || key === "token") {
      return undefined;
    }

    return value;
  });

  console.log("Safe JSON:", safeJson);

  /*
  Output:

  {"name":"Dinesh","email":"dinesh@example.com"}
  */
}


/*
==========================================================================================
21.6 JSON.stringify() REPLACER ARRAY
==========================================================================================

Instead of a function, replacer can also be an array.

Only listed properties will be included.

*/

{
  const user = {
    name: "Dinesh",
    age: 25,
    password: "secret",
    role: "Developer"
  };

  const selectedJson = JSON.stringify(user, ["name", "role"]);

  console.log("Selected JSON:", selectedJson);

  /*
  Output:

  {"name":"Dinesh","role":"Developer"}
  */
}


/*
==========================================================================================
21.7 toJSON()
==========================================================================================

Objects can define a toJSON() method.

When JSON.stringify() is called, JavaScript automatically calls toJSON() if it exists.

Use cases:

1. Control how object is serialized
2. Remove private data
3. Format complex objects
4. Convert class instances into plain data

*/

{
  const user = {
    name: "Dinesh",
    password: "secret",

    toJSON() {
      return {
        name: this.name
      };
    }
  };

  console.log("toJSON example:", JSON.stringify(user));

  /*
  Output:

  {"name":"Dinesh"}
  */
}


/*
==========================================================================================
21.8 JSON.parse()
==========================================================================================

JSON.parse() converts a JSON string into a JavaScript value/object.

Syntax:

JSON.parse(jsonString)
JSON.parse(jsonString, reviver)

Why JSON.parse() exists:

When data comes from server/localStorage/config file, it is usually text.
To work with it in JavaScript, we convert it into actual JS object.

*/

{
  const jsonText = '{"name":"Dinesh","age":25}';

  const user = JSON.parse(jsonText);

  console.log("Parsed object:", user);
  console.log("Parsed name:", user.name);

  /*
  Output:

  { name: "Dinesh", age: 25 }
  Dinesh
  */
}


/*
==========================================================================================
21.9 JSON.parse() REVIVER FUNCTION
==========================================================================================

The reviver function allows transforming values while parsing.

Syntax:

JSON.parse(jsonText, function(key, value) {
  return modifiedValue;
});

Most common use case:
Convert date strings back into Date objects.

Problem:
JSON cannot store Date object. It stores date as string.

*/

{
  const jsonText = '{"name":"Dinesh","createdAt":"2026-07-02T10:00:00.000Z"}';

  const user = JSON.parse(jsonText, function (key, value) {
    if (key === "createdAt") {
      return new Date(value);
    }

    return value;
  });

  console.log("Date restored:", user.createdAt instanceof Date);

  /*
  Output:

  true
  */
}


/*
==========================================================================================
21.10 JSON LIMITATIONS
==========================================================================================

JSON is excellent for simple data exchange, but it has limitations.

LIMITATION 1: Functions are removed.

*/

{
  const obj = {
    name: "Dinesh",
    greet() {
      console.log("Hello");
    }
  };

  console.log("Function removed:", JSON.stringify(obj));

  /*
  Output:

  {"name":"Dinesh"}

  Reason:
  JSON stores data, not behavior.
  */
}


/*
LIMITATION 2: undefined is removed from objects.
*/

{
  const obj = {
    name: "Dinesh",
    age: undefined
  };

  console.log("Undefined removed:", JSON.stringify(obj));

  /*
  Output:

  {"name":"Dinesh"}
  */
}


/*
LIMITATION 3: undefined in arrays becomes null.
*/

{
  const arr = [1, undefined, 3];

  console.log("Undefined in array:", JSON.stringify(arr));

  /*
  Output:

  [1,null,3]
  */
}


/*
LIMITATION 4: Symbol keys are ignored.
*/

{
  const secretKey = Symbol("secret");

  const obj = {
    name: "Dinesh",
    "hidden"
  };

  console.log("Symbol ignored:", JSON.stringify(obj));

  /*
  Output:

  {"name":"Dinesh"}
  */
}


/*
LIMITATION 5: Date becomes string.
*/

{
  const obj = {
    createdAt: new Date()
  };

  const json = JSON.stringify(obj);
  const parsed = JSON.parse(json);

  console.log("Date after parse type:", typeof parsed.createdAt);

  /*
  Output:

  string

  Solution:
  Use reviver during JSON.parse().
  */
}


/*
LIMITATION 6: Circular references fail.

Circular reference means object refers to itself.

Example:

const obj = {};
obj.self = obj;

JSON.stringify(obj);

This throws:

TypeError: Converting circular structure to JSON

Solution options:

1. Avoid circular structure before serializing.
2. Use custom replacer.
3. Use specialized libraries.
4. Use structuredClone() only for cloning, not JSON text conversion.

*/

{
  const obj = {};
  obj.name = "Dinesh";
  obj.self = obj;

  function circularSafeReplacer() {
    const seen = new WeakSet();

    return function (key, value) {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return "[Circular]";
        }

        seen.add(value);
      }

      return value;
    };
  }

  const safeJson = JSON.stringify(obj, circularSafeReplacer(), 2);

  console.log("Circular safe JSON:");
  console.log(safeJson);
}


/*
LIMITATION 7: JSON deep copy trick is limited.

Old technique:

const copy = JSON.parse(JSON.stringify(original));

This works only for simple data.

It fails for:

1. Date
2. Map
3. Set
4. Function
5. Symbol
6. undefined
7. RegExp
8. Class instances
9. Circular references
10. BigInt

Better modern option:

structuredClone(original)

But structuredClone() also cannot clone functions.

*/

{
  const original = {
    name: "Dinesh",
    address: {
      city: "Coimbatore"
    }
  };

  const copy = structuredClone(original);

  console.log("structuredClone:", copy);
}


/*****************************************************************************************
 *
 * 22. ADVANCED BUILT-IN OBJECTS
 *
 *****************************************************************************************/


/*
==========================================================================================
22.1 MAP
==========================================================================================

Map is a key-value collection.

Syntax:

const map = new Map();

Why Map exists:

Plain objects are commonly used as dictionaries, but objects have limitations:

1. Object keys are strings or symbols.
2. Number keys become strings.
3. Object keys are difficult to use safely.
4. Object has prototype properties unless Object.create(null) is used.
5. Size is not directly available.
6. Frequent add/delete can be cleaner with Map.

Map solves these issues.

Map keys can be:

1. String
2. Number
3. Boolean
4. Object
5. Function
6. Symbol
7. NaN

*/

{
  const map = new Map();

  map.set("name", "Dinesh");
  map.set("role", "Developer");
  map.set(1, "number key");
  map.set(true, "boolean key");

  console.log("Map get name:", map.get("name"));
  console.log("Map has role:", map.has("role"));
  console.log("Map size:", map.size);

  map.delete("role");

  console.log("Map after delete:", map);
}


/*
Object key problem:

*/

{
  const obj = {};

  obj[1] = "number key";
  obj["1"] = "string key";

  console.log("Object key collision:", obj);

  /*
  Output:

  { "1": "string key" }

  Because object converted numeric key 1 into string "1".
  */
}


/*
Map solves key collision:
*/

{
  const map = new Map();

  map.set(1, "number key");
  map.set("1", "string key");

  console.log("Map numeric key:", map.get(1));
  console.log("Map string key:", map.get("1"));
}


/*
Map with object keys:
*/

{
  const user = {
    id: 101
  };

  const permissions = new Map();

  permissions.set(user, ["read", "write"]);

  console.log("Object key in Map:", permissions.get(user));
}


/*
Map iteration:
*/

{
  const map = new Map([
    ["name", "Dinesh"],
    ["role", "Developer"],
    ["city", "Coimbatore"]
  ]);

  for (const [key, value] of map) {
    console.log("Map entry:", key, value);
  }

  console.log("Map keys:", [...map.keys()]);
  console.log("Map values:", [...map.values()]);
  console.log("Map entries:", [...map.entries()]);
}


/*
When to use Map:

Use Map when:

1. Keys are dynamic.
2. Keys are not only strings.
3. You need object keys.
4. You frequently add/remove entries.
5. You need direct size.
6. You need dictionary-like behavior.

Use Object when:

1. You represent fixed structured data.
2. You need JSON serialization.
3. You want simple dot access.
4. Data is naturally an entity/model.

Map limitation:

JSON.stringify(new Map()) gives "{}".

Solution:

Convert Map to array or object first.
*/

{
  const map = new Map([
    ["name", "Dinesh"],
    ["role", "Developer"]
  ]);

  const asObject = Object.fromEntries(map);
  const asArray = [...map];

  console.log("Map to object JSON:", JSON.stringify(asObject));
  console.log("Map to array JSON:", JSON.stringify(asArray));

  const restoredMap = new Map(asArray);

  console.log("Restored Map:", restoredMap);
}


/*
==========================================================================================
22.2 SET
==========================================================================================

Set is a collection of unique values.

Syntax:

const set = new Set();

Why Set exists:

Arrays allow duplicates.

If we need uniqueness, using array includes/indexOf repeatedly is less clean.

Set solves:

1. Duplicate removal
2. Fast membership checking
3. Unique selected IDs
4. Unique tags
5. Avoid repeated processing

*/

{
  const set = new Set();

  set.add(1);
  set.add(1);
  set.add(2);
  set.add(3);

  console.log("Set:", set);
  console.log("Set has 2:", set.has(2));
  console.log("Set size:", set.size);

  set.delete(2);

  console.log("Set after delete:", set);
}


/*
Remove duplicates from array:
*/

{
  const numbers = [1, 1, 2, 2, 3, 3, 4];

  const uniqueNumbers = [...new Set(numbers)];

  console.log("Unique numbers:", uniqueNumbers);
}


/*
Set with objects:

Important:
Objects are compared by reference, not structure.

*/

{
  const set = new Set();

  set.add({ id: 1 });
  set.add({ id: 1 });

  console.log("Set object size:", set.size);

  /*
  Output:

  2

  Because both objects are different references.
  */

  const user = { id: 1 };

  set.add(user);
  set.add(user);

  /*
  Same object reference is added only once.
  */
}


/*
When to use Set:

1. Remove duplicate primitive values.
2. Track selected items.
3. Track visited IDs.
4. Fast lookup.
5. Prevent duplicate actions.

Set limitation:

Set cannot remove duplicate objects by content automatically.

Solution for object uniqueness:

Use Map with ID as key.
*/

{
  const users = [
    { id: 1, name: "A" },
    { id: 1, name: "A duplicate" },
    { id: 2, name: "B" }
  ];

  const uniqueById = [...new Map(users.map(user => [user.id, user])).values()];

  console.log("Unique users by id:", uniqueById);
}


/*
==========================================================================================
22.3 WEAKMAP
==========================================================================================

WeakMap is similar to Map, but:

1. Keys must be objects.
2. Keys are weakly referenced.
3. If object key becomes unreachable elsewhere, garbage collector can remove it.
4. WeakMap is not iterable.
5. WeakMap has no size property.

Why WeakMap exists:

To avoid memory leaks when storing metadata about objects.

Normal Map keeps strong reference.

Example:

let user = {};
const map = new Map();
map.set(user, "data");
user = null;

The object may still stay in memory because map references it.

WeakMap solves this:

let user = {};
const weakMap = new WeakMap();
weakMap.set(user, "data");
user = null;

Now the object can be garbage collected if no other references exist.

*/

{
  const privateData = new WeakMap();

  class User {
    constructor(name, password) {
      this.name = name;

      privateData.set(this, {
        password
      });
    }

    checkPassword(password) {
      return privateData.get(this).password === password;
    }
  }

  const user = new User("Dinesh", "12345");

  console.log("WeakMap private data:", user.checkPassword("12345"));
}


/*
WeakMap use cases:

1. Private class data.
2. DOM element metadata.
3. Cache data tied to object lifetime.
4. Avoid memory leaks.
5. Framework internals.

Limitations:

1. Cannot iterate keys.
2. Cannot get size.
3. Keys must be objects.
4. Cannot inspect contents.

Reason:
Garbage collection is nondeterministic. Objects can disappear anytime.
*/


/*
==========================================================================================
22.4 WEAKSET
==========================================================================================

WeakSet stores objects weakly.

Rules:

1. Values must be objects.
2. Weakly referenced.
3. Not iterable.
4. No size.
5. Good for tracking objects without preventing garbage collection.

Use cases:

1. Track visited objects.
2. Avoid processing same object twice.
3. Mark DOM nodes internally.
4. Memory-safe object tracking.

*/

{
  const visited = new WeakSet();

  function processObject(obj) {
    if (visited.has(obj)) {
      console.log("Already processed");
      return;
    }

    visited.add(obj);

    console.log("Processing object:", obj);
  }

  const item = { id: 1 };

  processObject(item);
  processObject(item);
}


/*
==========================================================================================
22.5 SYMBOL
==========================================================================================

Symbol is a primitive data type used to create unique identifiers.

Syntax:

const id = Symbol("description");

Important:
The description is only for debugging.
It does not make symbols equal.

*/

{
  const id1 = Symbol("id");
  const id2 = Symbol("id");

  console.log("Symbols equal?", id1 === id2);

  /*
  Output:

  false
  */
}


/*
Why Symbol exists:

Before Symbol, object property names could easily collide.

Example:

Library A uses obj.id
Library B also uses obj.id

Conflict.

Symbol creates unique property keys and avoids collision.

*/

{
  const internalId = Symbol("internalId");

  const user = {
    name: "Dinesh",
    101
  };

  console.log("Symbol key value:", user[internalId]);

  for (const key in user) {
    console.log("for...in key:", key);
  }

  console.log("Symbol keys:", Object.getOwnPropertySymbols(user));
}


/*
Symbol properties:

1. Do not appear in for...in.
2. Do not appear in Object.keys().
3. Are not included in JSON.stringify().
4. Can be discovered using Object.getOwnPropertySymbols().
5. Are not truly private.

*/


/*
Symbol.for()

Symbol.for() uses global symbol registry.

If symbol already exists with same key, it returns same symbol.

Use case:
Shared symbols across modules/files.

*/

{
  const s1 = Symbol.for("app.id");
  const s2 = Symbol.for("app.id");

  console.log("Global symbols equal?", s1 === s2);
}


/*
==========================================================================================
22.6 WELL-KNOWN SYMBOLS
==========================================================================================

Well-known symbols are built-in symbols used by JavaScript internals.

Examples:

1. Symbol.iterator
   Makes object iterable.

2. Symbol.asyncIterator
   Makes object async iterable.

3. Symbol.toPrimitive
   Controls object to primitive conversion.

4. Symbol.toStringTag
   Customizes Object.prototype.toString output.

5. Symbol.hasInstance
   Customizes instanceof behavior.

Why they exist:

They allow developers to customize built-in language behavior.

*/

{
  const user = {
    name: "Dinesh",
    age: 25,

    hint {
      if (hint === "string") {
        return this.name;
      }

      return this.age;
    }
  };

  console.log("String conversion:", String(user));
  console.log("Number conversion:", +user);
}


/*
==========================================================================================
22.7 ITERABLE PROTOCOL
==========================================================================================

An object is iterable if it has a method at:

object[Symbol.iterator]

That method must return an iterator.

Built-in iterables:

1. Array
2. String
3. Map
4. Set
5. NodeList in modern browsers
6. arguments object in some contexts

Iterable objects can be used with:

1. for...of
2. spread operator
3. Array.from()
4. destructuring
5. Promise.all() input
6. new Map(iterable)
7. new Set(iterable)

Why iterable protocol exists:

JavaScript needed one common standard for looping through different data structures.

*/

{
  const text = "JS";

  for (const char of text) {
    console.log("Iterable string char:", char);
  }

  const arr = [10, 20];

  console.log("Spread iterable:", [...arr]);
}


/*
Custom iterable:
*/

{
  const range = {
    start: 1,
    end: 5,

     {
      let current = this.start;
      const end = this.end;

      return {
        next() {
          if (current <= end) {
            return {
              value: current++,
              done: false
            };
          }

          return {
            value: undefined,
            done: true
          };
        }
      };
    }
  };

  for (const number of range) {
    console.log("Custom iterable number:", number);
  }
}


/*
==========================================================================================
22.8 ITERATOR PROTOCOL
==========================================================================================

Iterator is an object with a next() method.

next() must return an object:

{
  value: anyValue,
  done: boolean
}

done false:
More values available.

done true:
Iteration finished.

*/

{
  const iterator = {
    current: 1,

    next() {
      if (this.current <= 3) {
        return {
          value: this.current++,
          done: false
        };
      }

      return {
        value: undefined,
        done: true
      };
    }
  };

  console.log("Iterator 1:", iterator.next());
  console.log("Iterator 2:", iterator.next());
  console.log("Iterator 3:", iterator.next());
  console.log("Iterator 4:", iterator.next());
}


/*
Iterable vs Iterator:

Iterable:
Has Symbol.iterator method.

Iterator:
Has next() method.

An object can be both iterable and iterator if Symbol.iterator returns itself.

*/


/*
==========================================================================================
22.9 GENERATORS
==========================================================================================

Generator is a special function that can pause and resume execution.

Syntax:

function* name() {
  yield value;
}

Calling generator function does not execute entire function immediately.
It returns a generator object.

Generator object is also an iterator.

Why generators exist:

Before generators, creating custom iterators required manual state management.

Generators make iterator creation simple.

*/

{
  function* numbers() {
    yield 1;
    yield 2;
    yield 3;
  }

  const gen = numbers();

  console.log("Generator 1:", gen.next());
  console.log("Generator 2:", gen.next());
  console.log("Generator 3:", gen.next());
  console.log("Generator 4:", gen.next());
}


/*
yield:

yield pauses generator execution and returns value.

When next() is called again, execution resumes after previous yield.

*/

{
  function* demoGenerator() {
    console.log("Start");
    yield "A";

    console.log("Middle");
    yield "B";

    console.log("End");
    return "Finished";
  }

  const gen = demoGenerator();

  console.log(gen.next());
  console.log(gen.next());
  console.log(gen.next());
}


/*
Generator benefits:

1. Lazy execution.
2. Memory efficient.
3. Useful for large sequences.
4. Useful for infinite sequences.
5. Cleaner iterator implementation.
6. Can model step-by-step workflows.

*/

{
  function* idGenerator() {
    let id = 1;

    while (true) {
      yield id++;
    }
  }

  const ids = idGenerator();

  console.log("Generated ID:", ids.next().value);
  console.log("Generated ID:", ids.next().value);
  console.log("Generated ID:", ids.next().value);
}


/*
Generator use cases:

1. Infinite ID generation.
2. Pagination.
3. Lazy data processing.
4. Custom iterables.
5. State machines.
6. Reading streams/chunks.
*/

{
  function* paginate(items, pageSize) {
    for (let i = 0; i < items.length; i += pageSize) {
      yield items.slice(i, i + pageSize);
    }
  }

  const pages = paginate([1, 2, 3, 4, 5], 2);

  console.log("Pages:", [...pages]);
}


/*
==========================================================================================
22.10 ASYNC GENERATORS
==========================================================================================

Async generators combine async behavior with generator behavior.

Syntax:

async function* name() {
  yield await somePromise;
}

Consumed using:

for await (const item of asyncIterable) {
}

Why async generators exist:

Normal generators are good for synchronous lazy values.
But real-world data may arrive asynchronously from:

1. APIs
2. Streams
3. Files
4. WebSocket
5. Pagination
6. Database cursors

Async generators allow producing values over time.

*/

{
  async function* asyncNumberGenerator() {
    yield await Promise.resolve(1);
    yield await Promise.resolve(2);
    yield await Promise.resolve(3);
  }

  async function consumeAsyncGenerator() {
    for await (const number of asyncNumberGenerator()) {
      console.log("Async generated number:", number);
    }
  }

  consumeAsyncGenerator();
}


/*
==========================================================================================
22.11 ARRAYBUFFER
==========================================================================================

ArrayBuffer represents raw binary data memory.

It is a fixed-length memory buffer.

Syntax:

const buffer = new ArrayBuffer(bytes);

Why ArrayBuffer exists:

JavaScript originally focused on text and high-level objects.
Modern web apps need binary processing for:

1. Images
2. Audio
3. Video
4. Files
5. WebGL
6. WebAssembly
7. Network protocols
8. Cryptography
9. Canvas image data

ArrayBuffer itself cannot be directly read/written conveniently.
You need a view.

*/

{
  const buffer = new ArrayBuffer(8);

  console.log("ArrayBuffer byteLength:", buffer.byteLength);
}


/*
==========================================================================================
22.12 TYPED ARRAYS
==========================================================================================

Typed arrays are views over ArrayBuffer.

They allow reading/writing binary data as specific numeric types.

Common typed arrays:

1. Int8Array
2. Uint8Array
3. Uint8ClampedArray
4. Int16Array
5. Uint16Array
6. Int32Array
7. Uint32Array
8. Float32Array
9. Float64Array
10. BigInt64Array
11. BigUint64Array

*/

{
  const buffer = new ArrayBuffer(4);

  const uint8 = new Uint8Array(buffer);

  uint8[0] = 255;
  uint8[1] = 10;

  console.log("Typed array:", uint8);
}


/*
Typed array use cases:

1. File binary manipulation.
2. Image pixel processing.
3. Audio samples.
4. WebGL buffers.
5. Network packet parsing.
6. Performance-sensitive numeric data.

Limitation:

Typed arrays use fixed numeric type.
For mixed data types and endian control, use DataView.
*/


/*
==========================================================================================
22.13 DATAVIEW
==========================================================================================

DataView is a flexible view over ArrayBuffer.

It allows reading/writing different numeric types at specific byte offsets.

It also allows controlling endianness.

Endianness means byte order:

1. Little-endian
2. Big-endian

DataView is useful for binary protocols and file formats.

*/

{
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);

  view.setInt32(0, 12345);
  view.setFloat32(4, 3.14);

  console.log("DataView int:", view.getInt32(0));
  console.log("DataView float:", view.getFloat32(4));
}


/*
==========================================================================================
22.14 PROMISE AS ADVANCED OBJECT
==========================================================================================

Promise is also a built-in object.

It represents a future async result.

Detailed Promise explanation is in section 26.

Short idea:

const promise = new Promise((resolve, reject) => {
  resolve("success");
});

promise.then(value => console.log(value));

*/


/*
==========================================================================================
22.15 PROXY
==========================================================================================

Proxy allows intercepting operations on an object.

Syntax:

const proxy = new Proxy(target, handler);

Target:
Original object.

Handler:
Object containing traps.

Traps are functions that intercept operations.

Common traps:

1. get
2. set
3. deleteProperty
4. has
5. apply
6. construct
7. ownKeys
8. getOwnPropertyDescriptor

Why Proxy exists:

To customize object behavior.

Use cases:

1. Validation
2. Logging
3. Reactivity
4. Security checks
5. Default values
6. API wrappers
7. Access control
8. Framework internals

*/

{
  const target = {
    name: "Dinesh",
    age: 25
  };

  const proxy = new Proxy(target, {
    get(target, property) {
      console.log("Reading property:", property);

      return target[property];
    },

    set(target, property, value) {
      console.log("Setting property:", property, value);

      if (property === "age" && value < 0) {
        throw new Error("Age cannot be negative");
      }

      target[property] = value;

      return true;
    }
  });

  console.log(proxy.name);

  proxy.age = 26;
}


/*
Proxy limitation:

1. Can make debugging harder.
2. Can reduce performance if overused.
3. Cannot directly proxy primitive values.
4. Some internal object behaviors are complex.
5. Private class fields are not normally intercepted.
6. Overusing Proxy creates hidden behavior.

Advanced use:
Reactivity systems like Vue-style reactive state can be built with Proxy.
*/

{
  const state = {
    count: 0
  };

  const reactiveState = new Proxy(state, {
    set(target, key, value) {
      target[key] = value;

      console.log("State changed. UI should update.");

      return true;
    }
  });

  reactiveState.count = 1;
}


/*
==========================================================================================
22.16 REFLECT
==========================================================================================

Reflect is a built-in object that provides methods for object operations.

Reflect is commonly used with Proxy.

Examples:

Reflect.get()
Reflect.set()
Reflect.has()
Reflect.deleteProperty()
Reflect.ownKeys()
Reflect.apply()
Reflect.construct()

Why Reflect exists:

1. Provides standard object operation methods.
2. Works cleanly with Proxy traps.
3. Returns boolean for some operations instead of throwing.
4. Preserves correct receiver behavior.

*/

{
  const user = {
    name: "Dinesh"
  };

  console.log("Reflect.get:", Reflect.get(user, "name"));

  Reflect.set(user, "role", "Developer");

  console.log("Reflect.set result:", user);
}


/*
Proxy + Reflect best practice:
*/

{
  const user = {
    name: "Dinesh"
  };

  const proxy = new Proxy(user, {
    get(target, property, receiver) {
      console.log("Accessing:", property);

      return Reflect.get(target, property, receiver);
    },

    set(target, property, value, receiver) {
      console.log("Updating:", property);

      return Reflect.set(target, property, value, receiver);
    }
  });

  console.log(proxy.name);

  proxy.name = "Kumar";
}


/*
==========================================================================================
22.17 INTL
==========================================================================================

Intl is the Internationalization API.

It helps format language/region-specific values.

Use cases:

1. Currency formatting
2. Date formatting
3. Time formatting
4. Number formatting
5. Relative time
6. Plural rules
7. Locale-aware sorting
8. Multi-language apps

Why Intl exists:

Different countries format data differently.

Example:

India:
₹1,23,456.78

US:
$123,456.78

Dates also differ:

India:
02/07/2026

US:
07/02/2026

Intl handles this correctly.

*/

{
  const amount = 123456.78;

  const inr = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount);

  console.log("INR:", inr);
}

{
  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(date);

  console.log("Formatted date:", formattedDate);
}

{
  const relativeTime = new Intl.RelativeTimeFormat("en", {
    numeric: "auto"
  });

  console.log("Relative time:", relativeTime.format(-1, "day"));
}


/*****************************************************************************************
 *
 * 23. DESTRUCTURING
 *
 *****************************************************************************************/


/*
==========================================================================================
23.1 WHAT IS DESTRUCTURING?
==========================================================================================

Destructuring is syntax for extracting values from arrays or objects into variables.

Why destructuring exists:

Without destructuring:

const name = user.name;
const age = user.age;

With destructuring:

const { name, age } = user;

Benefits:

1. Cleaner code
2. Less repetition
3. Easier parameter handling
4. Better readability
5. Useful with APIs
6. Useful with React props/state
7. Useful with function returns

*/


/*
==========================================================================================
23.2 ARRAY DESTRUCTURING
==========================================================================================

Array destructuring extracts values by position.

*/

{
  const numbers = [10, 20, 30];

  const [first, second, third] = numbers;

  console.log("Array destructuring:", first, second, third);
}


/*
Skipping values:
*/

{
  const numbers = [10, 20, 30, 40];

  const [first, , third] = numbers;

  console.log("Skipped value:", first, third);
}


/*
Swapping variables:
*/

{
  let a = 10;
  let b = 20;

  [a, b] = [b, a];

  console.log("Swapped:", a, b);
}


/*
Destructuring function return:
*/

{
  function getCoordinates() {
    return [12.9, 77.5];
  }

  const [lat, lng] = getCoordinates();

  console.log("Coordinates:", lat, lng);
}


/*
==========================================================================================
23.3 OBJECT DESTRUCTURING
==========================================================================================

Object destructuring extracts values by property name.

*/

{
  const user = {
    name: "Dinesh",
    role: "Developer"
  };

  const { name, role } = user;

  console.log("Object destructuring:", name, role);
}


/*
Object destructuring does not depend on order.
*/

{
  const user = {
    name: "Dinesh",
    role: "Developer"
  };

  const { role, name } = user;

  console.log("Order independent:", name, role);
}


/*
==========================================================================================
23.4 DEFAULT VALUES
==========================================================================================

Default value is used when extracted value is undefined.

*/

{
  const user = {
    name: "Dinesh"
  };

  const { name, role = "Guest" } = user;

  console.log("Default value:", name, role);
}


/*
Important:

Default value does NOT apply to null.

*/

{
  const user = {
    role: null
  };

  const { role = "Guest" } = user;

  console.log("Default with null:", role);

  /*
  Output:

  null
  */
}


/*
==========================================================================================
23.5 NESTED DESTRUCTURING
==========================================================================================

Used to extract values from nested objects/arrays.

*/

{
  const user = {
    name: "Dinesh",
    address: {
      city: "Coimbatore",
      state: "Tamil Nadu"
    }
  };

  const {
    address: { city, state }
  } = user;

  console.log("Nested destructuring:", city, state);
}


/*
Nested destructuring limitation:

If nested object is undefined, it throws error.

Example:

const user = {};
const { address: { city } } = user;

Error:
Cannot read properties of undefined.

Solution:

Use default object.
*/

{
  const user = {};

  const {
    address: { city = "Unknown" } = {}
  } = user;

  console.log("Safe nested destructuring:", city);
}


/*
==========================================================================================
23.6 REST IN DESTRUCTURING
==========================================================================================

Rest collects remaining values.

Array rest:
*/

{
  const numbers = [1, 2, 3, 4];

  const [first, ...others] = numbers;

  console.log("Array rest:", first, others);
}


/*
Object rest:
*/

{
  const user = {
    name: "Dinesh",
    age: 25,
    role: "Developer"
  };

  const { name, ...details } = user;

  console.log("Object rest:", name, details);
}


/*
Use case:
Remove sensitive data.
*/

{
  const user = {
    name: "Dinesh",
    email: "dinesh@example.com",
    password: "secret"
  };

  const { password, ...safeUser } = user;

  console.log("Safe user:", safeUser);
}


/*
==========================================================================================
23.7 ALIASING PROPERTIES
==========================================================================================

Aliasing means renaming property while destructuring.

Syntax:

const { originalName: newName } = object;

*/

{
  const user = {
    name: "Dinesh"
  };

  const { name: userName } = user;

  console.log("Aliased name:", userName);
}


/*
Use cases:

1. Avoid variable name conflict.
2. Improve readability.
3. Match naming conventions.
4. Rename API response fields.

*/

{
  const response = {
    data: ["User1", "User2"],
    error: null
  };

  const { data: users, error: userError } = response;

  console.log("Aliased API data:", users, userError);
}


/*
==========================================================================================
23.8 DESTRUCTURING FUNCTION PARAMETERS
==========================================================================================

Very common in real projects.

*/

{
  function printUser({ name, role }) {
    console.log(`${name} is a ${role}`);
  }

  printUser({
    name: "Dinesh",
    role: "Developer"
  });
}


/*
Safe parameter default:
*/

{
  function createUser({ name = "Anonymous", role = "Guest" } = {}) {
    return {
      name,
      role
    };
  }

  console.log("Create user no args:", createUser());
}


/*****************************************************************************************
 *
 * 24. SPREAD AND REST
 *
 *****************************************************************************************/


/*
==========================================================================================
24.1 SPREAD VS REST
==========================================================================================

Both use three dots:

...

Meaning depends on context.

Spread:
Expands values.

Rest:
Collects values.

Example:

Spread:
const arr2 = [...arr1];

Rest:
function sum(...numbers) {}

*/


/*
==========================================================================================
24.2 SPREAD IN ARRAYS
==========================================================================================

Spread expands iterable elements.

*/

{
  const a = [1, 2];
  const b = [3, 4];

  const combined = [...a, ...b];

  console.log("Combined array:", combined);
}


/*
Copy array:

*/

{
  const original = [1, 2, 3];

  const copy = [...original];

  console.log("Array copy:", copy);
}


/*
Important limitation:

Spread creates shallow copy, not deep copy.

*/

{
  const original = [
    {
      id: 1,
      name: "Dinesh"
    }
  ];

  const copy = [...original];

  copy[0].name = "Changed";

  console.log("Original affected:", original);

  /*
  Because nested object reference is shared.

  Solution:
  structuredClone(original)
  */
}


/*
==========================================================================================
24.3 SPREAD IN OBJECTS
==========================================================================================

Spread copies enumerable own properties into a new object.

*/

{
  const user = {
    name: "Dinesh",
    role: "Developer"
  };

  const updatedUser = {
    ...user,
    city: "Coimbatore"
  };

  console.log("Object spread:", updatedUser);
}


/*
Override behavior:

Later properties override earlier ones.
*/

{
  const user = {
    name: "Dinesh",
    role: "Guest"
  };

  const updatedUser = {
    ...user,
    role: "Admin"
  };

  console.log("Override with spread:", updatedUser);
}


/*
Object spread limitation:

It is shallow copy.

Nested objects are shared.

Solution:
structuredClone() for deep clone when supported.

*/


/*
==========================================================================================
24.4 SPREAD IN FUNCTION CALLS
==========================================================================================

Spread can pass array values as separate arguments.

*/

{
  const numbers = [10, 20, 30];

  console.log("Max:", Math.max(...numbers));
}


/*
Before spread:

Math.max.apply(null, numbers)

Spread is cleaner.
*/


/*
==========================================================================================
24.5 REST PARAMETERS
==========================================================================================

Rest parameters collect multiple function arguments into an array.

*/

{
  function sum(...numbers) {
    return numbers.reduce((total, number) => total + number, 0);
  }

  console.log("Sum:", sum(1, 2, 3, 4));
}


/*
Rules:

1. Rest parameter must be last.
2. Only one rest parameter allowed.
3. Rest parameter is a real array.

Valid:

function demo(a, b, ...others) {}

Invalid:

function demo(...others, last) {}

*/


/*
==========================================================================================
24.6 REST IN DESTRUCTURING
==========================================================================================

Same syntax, but used while extracting data.

*/

{
  const [first, ...rest] = [1, 2, 3, 4];

  console.log("Rest in array destructuring:", first, rest);
}

{
  const { password, ...safeUser } = {
    name: "Dinesh",
    password: "secret",
    role: "Developer"
  };

  console.log("Rest in object destructuring:", safeUser);
}


/*****************************************************************************************
 *
 * 25. MODULES
 *
 *****************************************************************************************/


/*
==========================================================================================
25.1 WHY MODULES?
==========================================================================================

As applications grow, putting all code in one file becomes difficult.

Problems without modules:

1. Global variable pollution.
2. Naming conflicts.
3. File order dependency.
4. Hard to reuse code.
5. Hard to test code.
6. Hard to maintain large codebases.
7. Hard to optimize unused code.

Modules solve this by allowing us to split code into separate files.

Benefits:

1. Reusability
2. Maintainability
3. Encapsulation
4. Explicit dependencies
5. Module scope
6. Better tooling
7. Tree shaking
8. Lazy loading using dynamic import

*/


/*
==========================================================================================
25.2 ES MODULES
==========================================================================================

ES Modules are the standard JavaScript module system.

They use:

export
import

Example file structure:

math.js
main.js

math.js:

export function add(a, b) {
  return a + b;
}

main.js:

import { add } from "./math.js";

console.log(add(2, 3));

In browser:

main.jsscript>

Important:
ES modules run in strict mode by default.

*/


/*
==========================================================================================
25.3 NAMED EXPORTS
==========================================================================================

Named exports allow exporting multiple values by name.

utils.js:

export const appName = "My App";

export function greet(name) {
  return `Hello ${name}`;
}

Import:

import { appName, greet } from "./utils.js";

Rules:

1. Import name must match exported name.
2. Can export many named values.
3. Good for utilities.
4. Helps tree shaking.

*/


/*
==========================================================================================
25.4 DEFAULT EXPORTS
==========================================================================================

A module can have one default export.

logger.js:

export default function log(message) {
  console.log(message);
}

Import:

import log from "./logger.js";

Default import can use any local name:

import myLogger from "./logger.js";

Useful for:

1. Main class/component/function from a file.
2. React components.
3. Single-purpose modules.

Limitation:

Only one default export per module.

*/


/*
==========================================================================================
25.5 EXPORT COMBINATIONS
==========================================================================================

A file can have default and named exports.

userService.js:

export const API_URL = "/api/users";

export function getUsers() {}

export default class UserService {}

Import:

import UserService, { API_URL, getUsers } from "./userService.js";

*/


/*
==========================================================================================
25.6 ALIAS IMPORTS
==========================================================================================

Used to rename imports.

Example:

import { add as sum } from "./math.js";

Why alias?

1. Avoid name conflict.
2. Improve meaning.
3. Import same names from different modules.

*/


/*
==========================================================================================
25.7 NAMESPACE IMPORTS
==========================================================================================

Imports everything as one object.

Example:

import * as MathUtils from "./math.js";

MathUtils.add(1, 2);
MathUtils.subtract(5, 3);

Use cases:

1. Group related utilities.
2. Avoid many named imports.
3. Make source clear.

*/


/*
==========================================================================================
25.8 DYNAMIC import()
==========================================================================================

Dynamic import loads module at runtime.

Syntax:

const module = await import("./module.js");

Use cases:

1. Lazy loading
2. Route-based code splitting
3. Load heavy library only when needed
4. Conditional imports
5. Improve initial page load

Example:

button.addEventListener("click", async () => {
  const chartModule = await import("./chart.js");
  chartModule.renderChart();
});

Dynamic import returns a Promise.

*/


/*
==========================================================================================
25.9 MODULE SCOPE
==========================================================================================

Each module has its own scope.

Variables inside module are not global unless exported.

Example:

// user.js
const secret = "hidden";
export const name = "Dinesh";

// main.js
import { name } from "./user.js";

secret is not accessible in main.js.

Benefits:

1. Avoid global pollution.
2. Encapsulation.
3. Better maintainability.

*/


/*
==========================================================================================
25.10 COMMONJS
==========================================================================================

CommonJS is another module system, mostly used historically in Node.js.

It uses:

require()
module.exports

Example:

math.js:

function add(a, b) {
  return a + b;
}

module.exports = {
  add
};

main.js:

const { add } = require("./math");

console.log(add(1, 2));

*/


/*
==========================================================================================
25.11 module.exports
==========================================================================================

To export single function:

logger.js:

module.exports = function log(message) {
  console.log(message);
};

main.js:

const log = require("./logger");

log("Hello");

To export multiple values:

module.exports = {
  add,
  subtract
};

*/


/*
==========================================================================================
25.12 ES MODULES VS COMMONJS
==========================================================================================

ES Modules:

1. import/export
2. Static structure
3. Better tree shaking
4. Native browser support
5. Asynchronous module loading in browsers
6. Top-level await supported in modules
7. Modern standard

CommonJS:

1. require/module.exports
2. Runtime loading
3. Common in older Node.js projects
4. Harder for tree shaking
5. Synchronous require

*/


/*
==========================================================================================
25.13 TREE SHAKING
==========================================================================================

Tree shaking means removing unused code during bundling.

Example:

utils.js:

export function used() {}
export function unused() {}

main.js:

import { used } from "./utils.js";

used();

A bundler can remove unused() from final bundle.

Why ES Modules help tree shaking:

Because imports and exports are static and analyzable.

Tree shaking benefits:

1. Smaller bundle size.
2. Faster page load.
3. Less JavaScript parsing.
4. Better performance.

Limitations:

1. Dynamic code is harder to analyze.
2. Side effects can prevent removal.
3. CommonJS is harder to tree shake.
4. Incorrect package configuration can reduce effectiveness.

*/


/*
==========================================================================================
25.14 CIRCULAR DEPENDENCIES
==========================================================================================

Circular dependency means:

A imports B
B imports A

Example:

a.js imports b.js
b.js imports a.js

Problems:

1. Undefined values.
2. Initialization order bugs.
3. Temporal dead zone errors.
4. Hard debugging.
5. Poor architecture signal.

Solutions:

1. Move shared logic to third file.
2. Use dependency injection.
3. Avoid side effects at module top level.
4. Import functions instead of initialized values.
5. Refactor tightly coupled modules.

Better structure:

shared.js
a.js imports shared.js
b.js imports shared.js

*/


/*****************************************************************************************
 *
 * 26. ASYNCHRONOUS JAVASCRIPT
 *
 *****************************************************************************************/


/*
==========================================================================================
26.1 SYNCHRONOUS VS ASYNCHRONOUS
==========================================================================================

Synchronous code runs line by line.

*/

{
  console.log("Sync A");
  console.log("Sync B");
  console.log("Sync C");
}


/*
Output:

Sync A
Sync B
Sync C

Problem with synchronous long tasks:

If one task takes long time, everything after it waits.

Example:

1. Fetch data from server
2. Read large file
3. Wait for timer
4. User interaction

If JavaScript waited synchronously, UI would freeze.

Asynchronous code allows long tasks to complete later without blocking main execution.

*/

{
  console.log("Async Start");

  setTimeout(() => {
    console.log("Timer finished");
  }, 1000);

  console.log("Async End");
}

/*
Output:

Async Start
Async End
Timer finished

*/


/*
==========================================================================================
26.2 CALLBACK FUNCTIONS
==========================================================================================

Callback is a function passed as argument to another function.

*/

{
  function greet(name, callback) {
    console.log("Hello", name);

    callback();
  }

  greet("Dinesh", function () {
    console.log("Callback executed");
  });
}


/*
Async callback example:
*/

{
  setTimeout(function () {
    console.log("Async callback after timeout");
  }, 500);
}


/*
Why callbacks exist:

Functions are first-class values in JavaScript.
So we can pass behavior to other functions.

Use cases:

1. Event handlers
2. Timers
3. Array methods
4. Async operations
5. Custom hooks/utilities
6. Node.js-style APIs

*/


/*
==========================================================================================
26.3 CALLBACK HELL
==========================================================================================

Callback hell means deeply nested callbacks.

Example:

loginUser(function(user) {
  getProfile(user.id, function(profile) {
    getOrders(profile.id, function(orders) {
      getOrderDetails(orders[0].id, function(details) {
        console.log(details);
      });
    });
  });
});

Problems:

1. Deep nesting.
2. Difficult error handling.
3. Difficult readability.
4. Difficult maintenance.
5. Inversion of control.
6. Hard to compose.
7. Hard to reuse each step clearly.

Solutions:

1. Promises.
2. Async/Await.
3. Break callbacks into named functions.
4. Use modular service functions.

*/


/*
==========================================================================================
26.4 TIMERS
==========================================================================================

Timers are provided by host environment, not core ECMAScript only.

Browser/Node provides:

1. setTimeout()
2. setInterval()
3. clearTimeout()
4. clearInterval()

*/


/*
setTimeout()

Runs callback once after minimum delay.

*/

{
  const timeoutId = setTimeout(() => {
    console.log("setTimeout executed");
  }, 1000);

  /*
  timeoutId can be used to cancel timeout.
  */
}


/*
clearTimeout()

Cancels scheduled timeout before it runs.
*/

{
  const timeoutId = setTimeout(() => {
    console.log("This may not run");
  }, 1000);

  clearTimeout(timeoutId);
}


/*
setInterval()

Runs repeatedly after interval delay.

*/

{
  let count = 0;

  const intervalId = setInterval(() => {
    count++;

    console.log("Interval count:", count);

    if (count === 3) {
      clearInterval(intervalId);
    }
  }, 500);
}


/*
Timer limitations:

1. Delay is minimum delay, not exact guarantee.
2. Callback waits until call stack is empty.
3. Browser throttles timers in inactive tabs.
4. Long-running JS can delay timers.
5. setInterval can overlap logic if task takes longer than interval.

Better pattern for repeated async work:

Use recursive setTimeout when task duration matters.

*/

{
  function repeatTaskSafely(count = 0) {
    if (count >= 3) return;

    setTimeout(() => {
      console.log("Safe repeat:", count);

      repeatTaskSafely(count + 1);
    }, 500);
  }

  repeatTaskSafely();
}


/*
==========================================================================================
26.5 PROMISE BASICS - DEEP EXPLANATION
==========================================================================================

Promise is an object representing eventual completion or failure of an asynchronous operation.

Think of Promise as a placeholder for a future value.

Real life analogy:

You order food.

Immediately you get an order confirmation.

Food is not available immediately.

Future possibilities:

1. Food delivered successfully.
2. Food delivery failed.

Promise works similarly.

When async operation starts, Promise is created.

Later it becomes:

1. Fulfilled with value.
2. Rejected with reason/error.

Why Promise exists:

Before Promises, callbacks caused callback hell.

Promises solve:

1. Callback hell.
2. Better chaining.
3. Centralized error handling.
4. Composition of async tasks.
5. Parallel async operations.
6. Cleaner async workflows.

Promise states:

1. pending
   Initial state.
   Operation not completed yet.

2. fulfilled
   Operation completed successfully.

3. rejected
   Operation failed.

4. settled
   General term meaning fulfilled or rejected.

Important rule:

Once a Promise is fulfilled or rejected, its state cannot change again.

*/


{
  const promise = new Promise((resolve, reject) => {
    const success = true;

    if (success) {
      resolve("Promise fulfilled successfully");
    } else {
      reject("Promise rejected");
    }
  });

  promise
    .then(result => {
      console.log("Promise result:", result);
    })
    .catch(error => {
      console.log("Promise error:", error);
    });
}


/*
Important interview point:

Promise executor function runs immediately.

Example:
*/

{
  const promise = new Promise(resolve => {
    console.log("Promise executor runs immediately");

    resolve("Done");
  });

  promise.then(value => {
    console.log("Then handler:", value);
  });
}


/*
Output order:

Promise executor runs immediately
Then handler: Done

Why?

The executor runs synchronously immediately.
.then() callback runs later as a microtask.
*/


/*
==========================================================================================
26.6 then()
==========================================================================================

then() registers success handler.

It returns a new Promise.

Syntax:

promise.then(onFulfilled)
promise.then(onFulfilled, onRejected)

*/

{
  Promise.resolve(10)
    .then(value => {
      console.log("First then:", value);

      return value * 2;
    })
    .then(value => {
      console.log("Second then:", value);
    });
}


/*
Why then() returns new Promise:

This allows chaining.

Each then can:

1. Return plain value.
2. Return another Promise.
3. Throw error.
4. Transform async result.

*/


/*
==========================================================================================
26.7 catch()
==========================================================================================

catch() handles rejection/errors.

It is similar to:

promise.then(null, errorHandler)

*/

{
  Promise.reject("Something failed")
    .catch(error => {
      console.log("Caught error:", error);
    });
}


/*
Centralized error handling:
*/

{
  Promise.resolve()
    .then(() => {
      throw new Error("Step failed");
    })
    .then(() => {
      console.log("This will not run");
    })
    .catch(error => {
      console.log("Central catch:", error.message);
    });
}


/*
==========================================================================================
26.8 finally()
==========================================================================================

finally() runs regardless of success or failure.

Use cases:

1. Hide loader.
2. Cleanup resources.
3. Reset state.
4. Close modal/loading spinner.
5. Stop progress indicator.

finally() does not normally change result unless it throws or returns rejected promise.

*/

{
  Promise.resolve("Success")
    .then(value => {
      console.log("Value:", value);
    })
    .catch(error => {
      console.log("Error:", error);
    })
    .finally(() => {
      console.log("Cleanup always runs");
    });
}


/*
==========================================================================================
26.9 PROMISE CHAINING
==========================================================================================

Promise chaining avoids callback hell.

*/

{
  function fetchUser() {
    return Promise.resolve({
      id: 1,
      name: "Dinesh"
    });
  }

  function fetchOrders(userId) {
    return Promise.resolve([
      {
        id: 101,
        userId
      }
    ]);
  }

  function fetchOrderDetails(orderId) {
    return Promise.resolve({
      orderId,
      item: "Laptop"
    });
  }

  fetchUser()
    .then(user => {
      return fetchOrders(user.id);
    })
    .then(orders => {
      return fetchOrderDetails(orders[0].id);
    })
    .then(details => {
      console.log("Order details:", details);
    })
    .catch(error => {
      console.log("Chain error:", error);
    });
}


/*
Common mistake:

Not returning promise inside then.

Wrong:

fetchUser()
  .then(user => {
    fetchOrders(user.id);
  })
  .then(orders => {
    console.log(orders); // undefined
  });

Correct:

fetchUser()
  .then(user => {
    return fetchOrders(user.id);
  })
  .then(orders => {
    console.log(orders);
  });

*/


/*
==========================================================================================
26.10 PROMISE.resolve()
==========================================================================================

Creates already fulfilled Promise.

Use cases:

1. Normalize sync/async value.
2. Testing.
3. Start promise chain.
4. Return promise from function consistently.

*/

{
  Promise.resolve("Resolved value").then(value => {
    console.log("Promise.resolve:", value);
  });
}


/*
==========================================================================================
26.11 PROMISE.reject()
==========================================================================================

Creates already rejected Promise.

Use cases:

1. Testing error flow.
2. Return error as Promise.
3. Consistent async API.

*/

{
  Promise.reject("Rejected value").catch(error => {
    console.log("Promise.reject:", error);
  });
}


/*
==========================================================================================
26.12 PROMISE.all()
==========================================================================================

Promise.all() runs multiple promises in parallel and waits for all to fulfill.

If all fulfill:
Returns array of results in same order as input.

If any one rejects:
Promise.all rejects immediately.

Use when:
All results are required.

*/

{
  const p1 = Promise.resolve("User");
  const p2 = Promise.resolve("Settings");
  const p3 = Promise.resolve("Permissions");

  Promise.all([p1, p2, p3]).then(results => {
    console.log("Promise.all results:", results);
  });
}


/*
Failure example:

Promise.all([
  Promise.resolve("A"),
  Promise.reject("B failed"),
  Promise.resolve("C")
]).catch(error => {
  console.log(error); // B failed
});

Limitation:

One failure rejects whole result.

Solution:
Use Promise.allSettled() if partial success is acceptable.

*/


/*
==========================================================================================
26.13 PROMISE.allSettled()
==========================================================================================

Waits until all promises settle, no matter success or failure.

Returns array:

[
  { status: "fulfilled", value: ... },
  { status: "rejected", reason: ... }
]

Use when:
You want all results, even failed ones.

*/

{
  Promise.allSettled([
    Promise.resolve("Success A"),
    Promise.reject("Failure B"),
    Promise.resolve("Success C")
  ]).then(results => {
    console.log("Promise.allSettled:", results);
  });
}


/*
==========================================================================================
26.14 PROMISE.race()
==========================================================================================

Promise.race() settles as soon as first promise settles.

First settled can be fulfilled or rejected.

Use cases:

1. Timeout pattern.
2. First response wins.
3. Racing operations.

*/

{
  const slow = new Promise(resolve => {
    setTimeout(() => resolve("Slow"), 1000);
  });

  const fast = new Promise(resolve => {
    setTimeout(() => resolve("Fast"), 500);
  });

  Promise.race([slow, fast]).then(result => {
    console.log("Promise.race:", result);
  });
}


/*
Timeout pattern:
*/

{
  function timeout(ms) {
    return new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), ms);
    });
  }

  function fakeRequest() {
    return new Promise(resolve => {
      setTimeout(() => resolve("Data"), 1000);
    });
  }

  Promise.race([fakeRequest(), timeout(1500)])
    .then(result => {
      console.log("Request result:", result);
    })
    .catch(error => {
      console.log("Request error:", error.message);
    });
}


/*
==========================================================================================
26.15 PROMISE.any()
==========================================================================================

Promise.any() fulfills when the first promise fulfills.

It ignores rejections until one fulfills.

If all reject:
It rejects with AggregateError.

Use cases:

1. Use fastest successful API.
2. Try mirror servers.
3. Use fallback sources.

*/

{
  Promise.any([
    Promise.reject("API 1 failed"),
    Promise.resolve("API 2 success"),
    Promise.reject("API 3 failed")
  ]).then(result => {
    console.log("Promise.any:", result);
  });
}


/*
==========================================================================================
26.16 ASYNC FUNCTIONS
==========================================================================================

async function always returns a Promise.

*/

{
  async function hello() {
    return "Hello";
  }

  console.log("Async function returns:", hello());

  hello().then(value => {
    console.log("Async resolved value:", value);
  });
}


/*
Why async/await exists:

Promises improved callbacks, but long promise chains can still be harder to read.

async/await allows asynchronous code to look like synchronous code.

*/


/*
==========================================================================================
26.17 await
==========================================================================================

await waits for a Promise to settle inside async function.

If promise fulfills:
await returns fulfilled value.

If promise rejects:
await throws error.

*/

{
  async function getData() {
    const value = await Promise.resolve("Data loaded");

    console.log("Await value:", value);
  }

  getData();
}


/*
Important:

await only pauses the async function, not the entire JavaScript engine.

Other code can continue executing.
*/


/*
==========================================================================================
26.18 ERROR HANDLING WITH ASYNC/AWAIT
==========================================================================================

Use try/catch/finally.

*/

{
  async function loadUser() {
    try {
      const user = await Promise.resolve({
        id: 1,
        name: "Dinesh"
      });

      console.log("Loaded user:", user);
    } catch (error) {
      console.log("Failed to load user:", error);
    } finally {
      console.log("Async cleanup");
    }
  }

  loadUser();
}


/*
==========================================================================================
26.19 SEQUENTIAL ASYNC
==========================================================================================

Sequential means each async step waits for previous step.

Use when each step depends on previous result.

*/

{
  async function sequentialFlow() {
    const user = await Promise.resolve({ id: 1 });
    const orders = await Promise.resolve([{ id: 101, userId: user.id }]);
    const details = await Promise.resolve({ orderId: orders[0].id });

    console.log("Sequential result:", details);
  }

  sequentialFlow();
}


/*
Limitation:

If tasks are independent, sequential awaiting is slower.

*/


/*
==========================================================================================
26.20 PARALLEL ASYNC
==========================================================================================

Parallel means start multiple promises together, then wait.

Use when tasks are independent.

*/

{
  async function parallelFlow() {
    const userPromise = Promise.resolve({ name: "Dinesh" });
    const settingsPromise = Promise.resolve({ theme: "dark" });

    const [user, settings] = await Promise.all([
      userPromise,
      settingsPromise
    ]);

    console.log("Parallel result:", user, settings);
  }

  parallelFlow();
}


/*
Common mistake with map + async:

Wrong:

const results = ids.map(async id => fetchUser(id));
console.log(results); // Promise[]

Correct:

const results = await Promise.all(ids.map(id => fetchUser(id)));

*/


/*
==========================================================================================
26.21 CANCELLATION PATTERNS
==========================================================================================

Important:
Promise itself does not have built-in cancellation.

Once Promise starts, it cannot be directly cancelled.

But we can cancel the underlying operation if that operation supports cancellation.

Common solution:
AbortController.

*/


/*
==========================================================================================
26.22 AbortController
==========================================================================================

AbortController is commonly used to cancel fetch requests.

Example:

const controller = new AbortController();

fetch(url, {
  signal: controller.signal
});

controller.abort();

Use cases:

1. Cancel search request when user types new input.
2. Cancel request when component unmounts.
3. Timeout long request.
4. Avoid race conditions.
5. Save bandwidth.

*/

{
  /*
  Browser fetch example:

  const controller = new AbortController();

  async function loadData() {
    try {
      const response = await fetch("/api/users", {
        signal: controller.signal
      });

      const data = await response.json();

      console.log(data);
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Request cancelled");
      } else {
        console.error(error);
      }
    }
  }

  loadData();

  controller.abort();
  */
}


/*
Search race condition solution:

let controller;

async function search(query) {
  if (controller) {
    controller.abort();
  }

  controller = new AbortController();

  try {
    const response = await fetch(`/search?q=${query}`, {
      signal: controller.signal
    });

    const data = await response.json();

    renderResults(data);
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error);
    }
  }
}

*/


/*****************************************************************************************
 *
 * 27. EVENT LOOP AND SCHEDULING
 *
 *****************************************************************************************/


/*
==========================================================================================
27.1 WHY EVENT LOOP EXISTS
==========================================================================================

JavaScript executes code on a single main thread in the browser.

But browser apps need to handle:

1. User clicks
2. Network requests
3. Timers
4. DOM updates
5. Animations
6. File reading

If JavaScript waited synchronously for everything, the page would freeze.

The event loop allows JavaScript to be non-blocking.

It coordinates:

1. Call stack
2. Web APIs / Host APIs
3. Task queue / callback queue
4. Microtask queue
5. Rendering

*/


/*
==========================================================================================
27.2 CALL STACK
==========================================================================================

Call stack tracks currently executing functions.

Stack behavior:
Last In, First Out.

*/

{
  function first() {
    second();
  }

  function second() {
    third();
  }

  function third() {
    console.log("Call stack example");
  }

  first();
}


/*
Execution:

first pushed
second pushed
third pushed
console.log pushed
console.log popped
third popped
second popped
first popped

If stack becomes too deep:

RangeError: Maximum call stack size exceeded

Usually caused by infinite recursion.
*/


/*
==========================================================================================
27.3 WEB APIs / HOST APIs
==========================================================================================

JavaScript engine does not handle everything alone.

Browser provides Web APIs:

1. setTimeout
2. setInterval
3. fetch
4. DOM events
5. localStorage
6. geolocation
7. WebSocket
8. File APIs
9. Canvas

Node.js provides host APIs:

1. fs
2. timers
3. network
4. streams

Async tasks are handled by host, then callbacks are queued.

*/


/*
==========================================================================================
27.4 CALLBACK QUEUE / TASK QUEUE
==========================================================================================

When async callback is ready, it waits in task queue.

The event loop moves it to call stack only when stack is empty.

*/

{
  console.log("Queue Start");

  setTimeout(() => {
    console.log("Timer callback");
  }, 0);

  console.log("Queue End");

  /*
  Output:

  Queue Start
  Queue End
  Timer callback
  */
}


/*
==========================================================================================
27.5 MACROTASKS
==========================================================================================

Macrotask examples:

1. setTimeout
2. setInterval
3. DOM events
4. UI events
5. MessageChannel
6. script execution

Macrotasks are usually processed one at a time.

*/


/*
==========================================================================================
27.6 MICROTASKS
==========================================================================================

Microtasks have higher priority than macrotasks.

Microtask examples:

1. Promise.then
2. Promise.catch
3. Promise.finally
4. queueMicrotask()
5. MutationObserver

After synchronous code finishes, JavaScript clears all microtasks before running next macrotask.

*/


/*
==========================================================================================
27.7 EXECUTION ORDER
==========================================================================================

Order:

1. Synchronous code
2. Microtasks
3. Macrotasks

*/

{
  console.log("A");

  setTimeout(() => {
    console.log("B - macrotask");
  }, 0);

  Promise.resolve().then(() => {
    console.log("C - microtask");
  });

  console.log("D");

  /*
  Output:

  A
  D
  C - microtask
  B - macrotask
  */
}


/*
==========================================================================================
27.8 queueMicrotask()
==========================================================================================

queueMicrotask schedules a microtask manually.

*/

{
  console.log("Microtask Start");

  queueMicrotask(() => {
    console.log("Queued microtask");
  });

  console.log("Microtask End");

  /*
  Output:

  Microtask Start
  Microtask End
  Queued microtask
  */
}


/*
Microtask danger:

If microtasks continuously schedule more microtasks, browser may not get time to render.

Bad:

function loop() {
  queueMicrotask(loop);
}

loop();

This can freeze the page.

*/


/*****************************************************************************************
 *
 * 28. DOM AND BROWSER APIs
 *
 *****************************************************************************************/


/*
==========================================================================================
28.1 DOM
==========================================================================================

DOM stands for Document Object Model.

DOM is the browser's object representation of HTML document.

HTML:

<html>
  <body>
    <h1>Hello</h1>
    <p>Welcome</p>
  </body>
</html>

DOM tree:

document
 └── html
     └── body
         ├── h1
         └── p

Why DOM exists:

JavaScript needs a way to read and modify web pages.

DOM allows JavaScript to:

1. Select elements.
2. Change text.
3. Change HTML.
4. Change styles.
5. Add/remove elements.
6. Handle events.
7. Read form values.

*/


/*
==========================================================================================
28.2 BOM
==========================================================================================

BOM stands for Browser Object Model.

BOM represents browser-related objects.

Examples:

1. window
2. navigator
3. location
4. history
5. screen

*/

{
  /*
  Browser examples:

  console.log(window.location.href);
  console.log(navigator.userAgent);
  console.log(history.length);
  */
}


/*
==========================================================================================
28.3 window
==========================================================================================

window is the global object in browser.

It contains:

1. document
2. location
3. history
4. navigator
5. timers
6. alert
7. console

var variables become window properties.
let and const do not.

Example:

var appName = "Demo";
console.log(window.appName);

let appVersion = "1.0";
console.log(window.appVersion); // undefined

*/


/*
==========================================================================================
28.4 document
==========================================================================================

document represents the current web page.

Examples:

document.title
document.body
document.head
document.querySelector()

*/


/*
==========================================================================================
28.5 SELECTING ELEMENTS
==========================================================================================

getElementById()

Returns one element by ID or null.

*/

{
  /*
  HTML:
  <h1 id="title">Hello</h1>

  JS:
  const title = document.getElementById("title");
  console.log(title.textContent);
  */
}


/*
getElementsByClassName()

Returns live HTMLCollection.

Live means it updates automatically when DOM changes.

*/

/*
const items = document.getElementsByClassName("item");
*/


/*
getElementsByTagName()

Returns live HTMLCollection of elements with tag name.
*/

/*
const paragraphs = document.getElementsByTagName("p");
*/


/*
querySelector()

Returns first matching element using CSS selector.
*/

/*
const firstItem = document.querySelector(".item");
const input = document.querySelector("form input[name='email']");
*/


/*
querySelectorAll()

Returns static NodeList of all matching elements.
*/

/*
const items = document.querySelectorAll(".item");

items.forEach(item => {
  console.log(item.textContent);
});
*/


/*
Selector comparison:

getElementById:
Fast, ID only, returns single element.

getElementsByClassName:
Class only, live collection.

getElementsByTagName:
Tag only, live collection.

querySelector:
Any CSS selector, first match.

querySelectorAll:
Any CSS selector, all matches, static NodeList.

*/


/*
==========================================================================================
28.6 DOM MANIPULATION
==========================================================================================

textContent:

Gets/sets text content.
Safe for user text.

*/

/*
element.textContent = "Hello";
*/


/*
innerText:

Gets/sets visible rendered text.
Considers CSS and layout.
Can be slower than textContent.
*/

/*
element.innerText = "Visible text";
*/


/*
innerHTML:

Gets/sets HTML content.

Powerful but dangerous with untrusted input.

Risk:
XSS attacks.

Bad:

element.innerHTML = userInput;

Good:

element.textContent = userInput;

Use innerHTML only for trusted HTML.

*/

/*
element.innerHTML = "<strong>Hello</strong>";
*/


/*
setAttribute() and getAttribute()
*/

/*
const link = document.querySelector("a");

link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
*/


/*
classList

Used to add/remove/toggle/check classes.
*/

/*
element.classList.add("active");
element.classList.remove("hidden");
element.classList.toggle("open");
element.classList.contains("active");
*/


/*
style

Inline style manipulation.

For many styles, prefer classList.
*/

/*
element.style.color = "red";
element.style.backgroundColor = "yellow";
*/


/*
createElement()
*/

/*
const li = document.createElement("li");
li.textContent = "New item";
*/


/*
appendChild()

Adds one node.
*/

/*
list.appendChild(li);
*/


/*
append()

Can append multiple nodes or text.
*/

/*
list.append(li, "text");
*/


/*
prepend()

Adds at beginning.
*/

/*
list.prepend(li);
*/


/*
remove()

Removes element.
*/

/*
element.remove();
*/


/*
replaceChild()
*/

/*
parent.replaceChild(newChild, oldChild);
*/


/*
==========================================================================================
28.7 DOM TRAVERSAL
==========================================================================================

DOM traversal means moving between related DOM nodes/elements.

Common properties:

1. parentElement
2. children
3. firstElementChild
4. lastElementChild
5. nextElementSibling
6. previousElementSibling

*/

/*
const list = document.querySelector("#list");

console.log(list.parentElement);
console.log(list.children);
console.log(list.firstElementChild);
console.log(list.lastElementChild);

const secondItem = list.children[1];

console.log(secondItem.previousElementSibling);
console.log(secondItem.nextElementSibling);
*/


/*****************************************************************************************
 *
 * 29. EVENTS
 *
 *****************************************************************************************/


/*
==========================================================================================
29.1 EVENT BASICS
==========================================================================================

Events are actions that happen in browser.

Examples:

1. click
2. double click
3. typing
4. form submit
5. page load
6. scroll
7. focus
8. blur
9. mouse movement

JavaScript can listen to events and respond.

*/

/*
const button = document.querySelector("button");

button.addEventListener("click", () => {
  console.log("Button clicked");
});
*/


/*
==========================================================================================
29.2 EVENT OBJECT
==========================================================================================

Event handler receives event object.

It contains information about event.

Important properties:

1. event.type
2. event.target
3. event.currentTarget
4. event.key
5. event.clientX
6. event.clientY

Important methods:

1. event.preventDefault()
2. event.stopPropagation()

*/

/*
button.addEventListener("click", event => {
  console.log(event.type);
  console.log(event.target);
  console.log(event.currentTarget);
});
*/


/*
target vs currentTarget:

target:
Actual element that triggered event.

currentTarget:
Element where listener is attached.

Important for event delegation.
*/


/*
==========================================================================================
29.3 addEventListener()
==========================================================================================

Recommended modern way to attach events.

Syntax:

element.addEventListener(eventType, handler, options);

Advantages:

1. Multiple listeners allowed.
2. Cleaner than inline events.
3. Supports capture/passive/once options.
4. Separates HTML and JS.

*/

/*
element.addEventListener("click", handler);
*/


/*
Options:

element.addEventListener("click", handler, {
  once: true,
  capture: false,
  passive: true
});

once:
Run handler once.

capture:
Use capturing phase.

passive:
Tells browser handler will not call preventDefault().
Useful for scroll/touch performance.

*/


/*
==========================================================================================
29.4 removeEventListener()
==========================================================================================

Removes listener.

Important:
You must pass the same function reference.

Correct:

function handleClick() {}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

Wrong:

button.addEventListener("click", () => {});
button.removeEventListener("click", () => {});

Both arrow functions are different references.

*/


/*
==========================================================================================
29.5 INLINE EVENTS
==========================================================================================

Example:

<button onclick="alert('Clicked')">Click</button>

Not recommended.

Reasons:

1. Mixes HTML and JS.
2. Harder to maintain.
3. Harder to test.
4. Security concerns.
5. Poor separation of concerns.

*/


/*
==========================================================================================
29.6 EVENT HANDLER PROPERTIES
==========================================================================================

Example:

button.onclick = function() {
  console.log("Clicked");
};

Limitation:

Only one handler per property.

button.onclick = handler1;
button.onclick = handler2;

handler2 replaces handler1.

addEventListener is better.
*/


/*
==========================================================================================
29.7 EVENT TYPES
==========================================================================================

click:
Fires when element is clicked.

dblclick:
Fires on double click.

input:
Fires whenever input value changes.

change:
Fires when value is committed.

submit:
Fires when form submits.

keydown:
Fires when key is pressed down.

keyup:
Fires when key is released.

mouseover:
Fires when mouse enters element or child.

mouseout:
Fires when mouse leaves element or child.

focus:
Fires when element receives focus.

blur:
Fires when element loses focus.

load:
Fires when page/resource fully loads.

scroll:
Fires when page/element scrolls.

Examples:

*/

/*
button.addEventListener("click", () => {
  console.log("Clicked");
});

button.addEventListener("dblclick", () => {
  console.log("Double clicked");
});

input.addEventListener("input", event => {
  console.log(event.target.value);
});

select.addEventListener("change", event => {
  console.log(event.target.value);
});

form.addEventListener("submit", event => {
  event.preventDefault();
  console.log("Form submitted");
});

input.addEventListener("keydown", event => {
  console.log(event.key);
});

input.addEventListener("keyup", event => {
  console.log(event.key);
});

element.addEventListener("mouseover", () => {
  console.log("Mouse over");
});

element.addEventListener("mouseout", () => {
  console.log("Mouse out");
});

input.addEventListener("focus", () => {
  console.log("Focused");
});

input.addEventListener("blur", () => {
  console.log("Blurred");
});

window.addEventListener("load", () => {
  console.log("Page loaded");
});

window.addEventListener("scroll", () => {
  console.log(window.scrollY);
});
*/


/*
Scroll performance note:

Scroll fires many times.
Use throttle/debounce for expensive work.

*/


/*
==========================================================================================
29.8 EVENT FLOW
==========================================================================================

When event happens, it moves through three phases:

1. Capturing phase
   From document/root down to target.

2. Target phase
   Event reaches actual target.

3. Bubbling phase
   Event bubbles from target back up to ancestors.

*/


/*
==========================================================================================
29.9 EVENT BUBBLING
==========================================================================================

Most events bubble.

Example:

<div id="parent">
  <button id="child">Click</button>
</div>

If child is clicked:

child handler runs.
then parent handler runs.

*/

/*
parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", () => {
  console.log("Child clicked");
});
*/


/*
==========================================================================================
29.10 EVENT CAPTURING
==========================================================================================

Capturing runs from ancestor to target.

Enable capture:

element.addEventListener("click", handler, true);

or:

element.addEventListener("click", handler, {
  capture: true
});

*/


/*
==========================================================================================
29.11 EVENT DELEGATION
==========================================================================================

Event delegation means attaching one listener to parent instead of many children.

Why it works:
Because events bubble.

Benefits:

1. Better performance.
2. Less memory.
3. Works with dynamically added elements.
4. Cleaner code.

Example:

<ul id="list">
  <li data-id="1">One</li>
  <li data-id="2">Two</li>
</ul>

*/

/*
const list = document.getElementById("list");

list.addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    console.log("Clicked item:", event.target.dataset.id);
  }
});
*/


/*
==========================================================================================
29.12 preventDefault()
==========================================================================================

Stops default browser behavior.

Use cases:

1. Prevent form refresh.
2. Prevent link navigation.
3. Prevent checkbox default behavior in special cases.
4. Prevent drag/drop default.

*/

/*
form.addEventListener("submit", event => {
  event.preventDefault();

  console.log("Handle form using JS");
});
*/


/*
==========================================================================================
29.13 stopPropagation()
==========================================================================================

Stops event from moving to further ancestors.

*/

/*
child.addEventListener("click", event => {
  event.stopPropagation();

  console.log("Only child handler runs");
});
*/


/*
Warning:

Do not overuse stopPropagation().
It can break event delegation and other parent-level listeners.

*/


/*****************************************************************************************
 *
 * 30. FORMS AND VALIDATION
 *
 *****************************************************************************************/


/*
==========================================================================================
30.1 FORM ELEMENTS
==========================================================================================

Forms collect user input.

Common form elements:

1. form
2. input
3. textarea
4. select
5. option
6. checkbox
7. radio
8. button
9. label
10. fieldset

Example HTML:

<form id="registerForm">
  <label>
    Username
    <input type="text" name="username" required />
  </label>

  <label>
    Email
    <input type="email" name="email" required />
  </label>

  <label>
    Password
    <input type="password" name="password" minlength="8" required />
  </label>

  <button type="submit">Register</button>
</form>

*/


/*
==========================================================================================
30.2 FORM SUBMISSION
==========================================================================================

Default form submission sends data and reloads/navigates page.

Modern apps often prevent default and submit using fetch.

*/

/*
const form = document.getElementById("registerForm");

form.addEventListener("submit", event => {
  event.preventDefault();

  console.log("Handle form submission with JavaScript");
});
*/


/*
==========================================================================================
30.3 INPUT HANDLING
==========================================================================================

input event fires whenever value changes.

Useful for:

1. Live validation
2. Search suggestions
3. Character counters
4. Auto-save
5. Dynamic UI updates

*/

/*
const username = document.querySelector("[name='username']");

username.addEventListener("input", event => {
  console.log("Current value:", event.target.value);
});
*/


/*
change event fires when value is committed.

Useful for:

1. select dropdown
2. checkbox
3. radio
4. date input
5. file input

*/


/*
==========================================================================================
30.4 VALIDATION
==========================================================================================

Validation means checking whether input data is acceptable.

Types:

1. Client-side validation
2. Server-side validation

Client-side validation:

Runs in browser.
Improves user experience.
Gives instant feedback.

But it is NOT enough for security.

Why?

Users can bypass browser validation using:

1. DevTools
2. API clients
3. Disabled JavaScript
4. Modified requests

Therefore always validate on server also.

Validation examples:

1. Required fields
2. Email format
3. Password length
4. Number range
5. Pattern matching
6. File type
7. File size
8. Confirm password match

*/


/*
HTML validation attributes:

required
minlength
maxlength
min
max
pattern
type="email"
type="url"
type="number"

Example:

<input type="email" required />
<input type="password" minlength="8" />
<input type="number" min="18" max="60" />

*/


/*
==========================================================================================
30.5 CONSTRAINT VALIDATION API
==========================================================================================

Browser provides built-in validation API.

Important properties/methods:

1. element.validity
2. element.validationMessage
3. element.checkValidity()
4. element.reportValidity()
5. element.setCustomValidity()

*/

/*
const email = document.querySelector("[name='email']");

console.log(email.validity);
console.log(email.validity.valid);
console.log(email.validationMessage);

*/


/*
checkValidity()

Returns true/false.
Does not show message automatically.

*/

/*
if (!email.checkValidity()) {
  console.log("Invalid email");
}
*/


/*
reportValidity()

Returns true/false and shows browser validation UI.

*/

/*
email.reportValidity();
*/


/*
setCustomValidity()

Sets custom error message.

Important:
Set empty string when valid.
Otherwise field stays invalid.

*/

/*
const password = document.querySelector("[name='password']");

password.addEventListener("input", () => {
  if (password.value.length < 8) {
    password.setCustomValidity("Password must be at least 8 characters");
  } else {
    password.setCustomValidity("");
  }
});
*/


/*
==========================================================================================
30.6 PREVENTING DEFAULT SUBMIT BEHAVIOR
==========================================================================================

Use preventDefault() to stop page reload.

Then process data manually.

*/

/*
form.addEventListener("submit", async event => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  console.log("Form is valid. Submit with fetch.");
});
*/


/*
==========================================================================================
30.7 WORKING WITH FORM DATA
==========================================================================================

Manual way:

const username = document.querySelector("[name='username']").value;
const email = document.querySelector("[name='email']").value;

This works but becomes repetitive.

Better:
Use FormData.

*/


/*
==========================================================================================
30.8 FormData
==========================================================================================

FormData represents form fields as key-value pairs.

Why FormData exists:

It makes collecting form data easier.

Use cases:

1. Submit regular forms.
2. Submit file uploads.
3. Send multipart/form-data.
4. Convert form to object.
5. Work with dynamic forms.

*/

/*
const form = document.getElementById("registerForm");

const formData = new FormData(form);

console.log(formData.get("username"));
console.log(formData.get("email"));
*/


/*
Iterating FormData:
*/

/*
for (const [key, value] of formData) {
  console.log(key, value);
}
*/


/*
Convert FormData to object:
*/

/*
const data = Object.fromEntries(formData.entries());

console.log(data);
*/


/*
Send as JSON:
*/

/*
form.addEventListener("submit", async event => {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await response.json();

  console.log(result);
});
*/


/*
Send file upload:

HTML:

<form id="uploadForm">
  <input type="file" name="avatar" />
  <button type="submit">Upload</button>
</form>

JS:

const uploadForm = document.getElementById("uploadForm");

uploadForm.addEventListener("submit", async event => {
  event.preventDefault();

  const formData = new FormData(uploadForm);

  await fetch("/upload", {
    method: "POST",
    body: formData
  });
});

Important:

When sending FormData with files, do NOT manually set:

Content-Type: multipart/form-data

Browser automatically sets correct boundary.

*/


/*
==========================================================================================
30.9 COMPLETE FORM EXAMPLE
==========================================================================================

HTML:

<form id="signupForm">
  <input name="username" required minlength="3" />
  <input name="email" type="email" required />
  <input name="password" type="password" required minlength="8" />
  <button type="submit">Signup</button>
</form>

JS:

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async event => {
  event.preventDefault();

  if (!signupForm.checkValidity()) {
    signupForm.reportValidity();
    return;
  }

  const formData = new FormData(signupForm);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const result = await response.json();

    console.log("Signup success:", result);
  } catch (error) {
    console.error("Signup error:", error);
  }
});

*/


/*****************************************************************************************
 *
 * FINAL QUICK RECALL MAP
 *
 *****************************************************************************************/

/*
JSON:
JS data <-> JSON text.
stringify converts object to JSON string.
parse converts JSON string to object.
Limitations: no functions, undefined, symbols, circular references, Date becomes string.

Map:
Key-value collection. Any key type.

Set:
Unique values.

WeakMap:
Object keys, weak references, memory-safe metadata.

WeakSet:
Object tracking with weak references.

Symbol:
Unique identifiers and collision-free property keys.

Iterable:
Object with Symbol.iterator.

Iterator:
Object with next() returning { value, done }.

Generator:
function* with yield. Produces iterator lazily.

Async Generator:
async function* with for await...of.

ArrayBuffer:
Raw binary memory.

TypedArray:
Numeric view over ArrayBuffer.

DataView:
Flexible binary view with byte offsets and endian control.

Promise:
Future async result with pending/fulfilled/rejected states.

Proxy:
Intercept object operations.

Reflect:
Standard object operation methods, useful with Proxy.

Intl:
International formatting for numbers, dates, currencies, languages.

Destructuring:
Extract array/object values into variables.

Spread:
Expands values.

Rest:
Collects remaining values.

Modules:
Split code into reusable scoped files.

ES Modules:
import/export.

CommonJS:
require/module.exports.

Tree Shaking:
Remove unused code.

Circular Dependency:
Modules depending on each other. Avoid/refactor.

Async JS:
Callbacks, timers, promises, async/await.

Event Loop:
Sync code -> microtasks -> macrotasks.

DOM:
Object model of HTML document.

Events:
User/browser actions handled with listeners.

Forms:
Collect and validate user input.

FormData:
Easy form data extraction and file upload support.
*/

/*****************************************************************************************
 *
 * END OF ADVANCED JAVASCRIPT SECTIONS 21 TO 30
 *
 *****************************************************************************************/
