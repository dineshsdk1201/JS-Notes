# JS-Notes
This repo is for recalling concepts with detailed explanation along with simple code snippets
Map,SET,Week map and set,Debounce,throttle,abort controller

Mixins,compose functions,replacer,reviver,sparse array,symbor,iterator,generator function,

Destructuring,export def,named,combination,alias import,import * as MathUtils from "./math.js";(Namespace imports)

Dynamic import const module = await import("./module.js");

Common JS

Tree shaking means removing unused code during bundling.

Circular dependency means:



A imports B
B imports A





Asynchronous JS

Callback,
------------------
Limitation 1: Callback hell
Limitation 2: Error handling becomes messy
Limitation 3: Inversion of control
Limitation 4: Difficult chaining
Limitation 5: Harder debugging

--- Eg Object to test
const fakeDB = {
  users: [
    { id: 1, name: "Dinesh", email: "dinesh@example.com" },
    { id: 2, name: "Kumar", email: "kumar@example.com" },
  ],
  profiles: [
    { id: 1, userId: 1, age: 25, city: "Karur" },
    { id: 2, userId: 2, age: 28, city: "Chennai" },
  ],
  orders: [
    { id: 101, profileId: 1, items: ["Laptop", "Mouse"] },
    { id: 102, profileId: 2, items: ["Phone", "Charger"] },
  ],
  orderDetails: [
    { id: 101, status: "Shipped", total: 60000 },
    { id: 102, status: "Pending", total: 25000 },
  ],
};
---
------------------

Promise 3rd-> 26,

Async await

