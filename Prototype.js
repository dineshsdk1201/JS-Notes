/**
 * JavaScript Prototype & Inheritance Cheat Sheet
 * Author: M365 Copilot
 * Topic: Constructor Prototype Inheritance + Object Prototypal Inheritance
 * Run: node prototype-cheatsheet.js
 */

console.log("===== 1. Object has its own properties =====");
const user = {
  name: "Dinesh",
  age: 26,
};
console.log(user.name); // Dinesh
console.log(user.age);  // 26
console.log(Object.hasOwn(user, "name")); // true


console.log("\n===== 2. Every normal object inherits from Object.prototype =====");
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null
console.log(obj.toString()); // [object Object] - inherited from Object.prototype


console.log("\n===== 3. Prototype chain basic lookup =====");
const parent = {
  city: "Chennai",
};

const child = Object.create(parent);
child.name = "Dinesh";

console.log(child.name); // Dinesh - own property
console.log(child.city); // Chennai - inherited from parent
console.log(child.country); // undefined - not found in chain


console.log("\n===== 4. Object.create() direct object inheritance =====");
const personPrototype = {
  greet() {
    console.log(`Hi, I am ${this.name}`);
  },
};

const person = Object.create(personPrototype);
person.name = "Dinesh";
person.greet(); // Hi, I am Dinesh


console.log("\n===== 5. Your object prototypal inheritance example - improved =====");
const df = {
  name: "Dinesh",
  details() {
    console.log(`I am ${this.name}, ${this.age} years old`);
  },
};

const df2 = Object.create(df);
df2.age = 26;

console.log(df2.name); // Dinesh - inherited from df
df2.details(); // I am Dinesh, 26 years old


console.log("\n===== 6. Avoid __proto__, but this is how it works =====");
const base = {
  role: "Developer",
};

const employee = {
  company: "Cognizant",
};

// Not recommended in modern code:
employee.__proto__ = base;

console.log(employee.company); // Cognizant - own property
console.log(employee.role);    // Developer - inherited property

// Preferred check:
console.log(Object.getPrototypeOf(employee) === base); // true


console.log("\n===== 7. Own property vs inherited property =====");
const animalObject = {
  eats: true,
};

const rabbit = Object.create(animalObject);
rabbit.jumps = true;

console.log(Object.hasOwn(rabbit, "jumps")); // true
console.log(Object.hasOwn(rabbit, "eats"));  // false
console.log(rabbit.eats); // true - inherited


console.log("\n===== 8. Shadowing inherited property =====");
const parentUser = {
  name: "Parent Name",
};

const childUser = Object.create(parentUser);
console.log(childUser.name); // Parent Name

childUser.name = "Child Name";
console.log(childUser.name); // Child Name - own property shadows inherited one
console.log(parentUser.name); // Parent Name


console.log("\n===== 9. Method overriding =====");
const animal = {
  makeSound() {
    console.log("Animal sound");
  },
};

const dogObject = Object.create(animal);
dogObject.makeSound = function () {
  console.log("Bark");
};

dogObject.makeSound(); // Bark
animal.makeSound();    // Animal sound


console.log("\n===== 10. Calling parent method manually =====");
const vehicle = {
  start() {
    console.log("Vehicle started");
  },
};

const car = Object.create(vehicle);
car.start = function () {
  vehicle.start.call(this);
  console.log("Car engine ready");
};

car.start();
// Vehicle started
// Car engine ready


console.log("\n===== 11. Constructor function basics =====");
function Person(name, age) {
  this.name = name;
  this.age = age;
}

const p1 = new Person("Dinesh", 26);
console.log(p1.name); // Dinesh
console.log(p1.age);  // 26
console.log(Object.getPrototypeOf(p1) === Person.prototype); // true


console.log("\n===== 12. What new keyword does conceptually =====");
function Developer(name) {
  this.name = name;
}

const dev = new Developer("Dinesh");
console.log(dev.name); // Dinesh

// Conceptually similar to:
const manualDev = {};
Object.setPrototypeOf(manualDev, Developer.prototype);
Developer.call(manualDev, "Kumar");
console.log(manualDev.name); // Kumar


console.log("\n===== 13. Bad pattern: method inside constructor copies function per object =====");
function BadUser(name) {
  this.name = name;
  this.sayHi = function () {
    console.log(`Hi ${this.name}`);
  };
}

const bad1 = new BadUser("Dinesh");
const bad2 = new BadUser("Kumar");
console.log(bad1.sayHi === bad2.sayHi); // false - separate function copies


console.log("\n===== 14. Good pattern: shared method on prototype =====");
function GoodUser(name) {
  this.name = name;
}

GoodUser.prototype.sayHi = function () {
  console.log(`Hi ${this.name}`);
};

const good1 = new GoodUser("Dinesh");
const good2 = new GoodUser("Kumar");
console.log(good1.sayHi === good2.sayHi); // true - shared method
good1.sayHi(); // Hi Dinesh
good2.sayHi(); // Hi Kumar


console.log("\n===== 15. Constructor prototype inheritance =====");
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function () {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // copy Animal instance properties
  this.breed = breed;
  this.barks = true;
}

Dog.prototype = Object.create(Animal.prototype); // inherit Animal prototype methods
Dog.prototype.constructor = Dog; // fix constructor reference

Dog.prototype.bark = function () {
  console.log(`${this.name} barks`);
};

const d = new Dog("Tommy", "Labrador");
d.makeSound(); // Tommy makes a sound
d.bark();      // Tommy barks
console.log(d.breed); // Labrador


console.log("\n===== 16. Prototype chain in constructor inheritance =====");
console.log(Object.getPrototypeOf(d) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true
console.log(Object.getPrototypeOf(Animal.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype)); // null


console.log("\n===== 17. instanceof checks prototype chain =====");
console.log(d instanceof Dog);    // true
console.log(d instanceof Animal); // true
console.log(d instanceof Object); // true


console.log("\n===== 18. isPrototypeOf checks prototype relationship =====");
console.log(Dog.prototype.isPrototypeOf(d));    // true
console.log(Animal.prototype.isPrototypeOf(d)); // true
console.log(Object.prototype.isPrototypeOf(d)); // true


console.log("\n===== 19. Why constructor property is fixed =====");
console.log(d.constructor === Dog); // true
console.log(Dog.prototype.constructor === Dog); // true


console.log("\n===== 20. Your original constructor example behavior =====");
function OriginalAnimal() {
  this.makeSound = function () {
    console.log("Make Sound");
  };
}

function OriginalDog() {
  this.barks = true;
  OriginalAnimal.call(this);
}

OriginalDog.prototype = Object.create(OriginalAnimal.prototype);
OriginalDog.prototype.constructor = OriginalDog;

const od1 = new OriginalDog();
const od2 = new OriginalDog();

od1.makeSound(); // Make Sound
console.log(Object.hasOwn(od1, "makeSound")); // true - method is directly on object
console.log(od1.makeSound === od2.makeSound); // false - separate copy per instance


console.log("\n===== 21. Improved constructor example behavior =====");
function BetterAnimal() {}

BetterAnimal.prototype.makeSound = function () {
  console.log("Make Sound");
};

function BetterDog() {
  this.barks = true;
}

BetterDog.prototype = Object.create(BetterAnimal.prototype);
BetterDog.prototype.constructor = BetterDog;

const bd1 = new BetterDog();
const bd2 = new BetterDog();

bd1.makeSound(); // Make Sound
console.log(Object.hasOwn(bd1, "makeSound")); // false - inherited method
console.log(bd1.makeSound === bd2.makeSound); // true - shared method


console.log("\n===== 22. Arrow function problem with this =====");
const wrongMethodObj = {
  name: "Dinesh",
  sayName: () => {
    console.log(this.name); // usually undefined in Node/module scope
  },
};

wrongMethodObj.sayName();

const rightMethodObj = {
  name: "Dinesh",
  sayName() {
    console.log(this.name);
  },
};

rightMethodObj.sayName(); // Dinesh


console.log("\n===== 23. Object.setPrototypeOf() example =====");
const mentor = {
  guide() {
    console.log("Guiding junior developer");
  },
};

const junior = {
  name: "Junior Dev",
};

Object.setPrototypeOf(junior, mentor);
junior.guide(); // Guiding junior developer

// Note: Prefer Object.create() when possible for performance-friendly object creation.


console.log("\n===== 24. Object.getPrototypeOf() example =====");
console.log(Object.getPrototypeOf(junior) === mentor); // true


console.log("\n===== 25. Object.create(null) - no Object.prototype =====");
const dictionary = Object.create(null);
dictionary.react = "Frontend library";
dictionary.drupal = "CMS";

console.log(dictionary.react); // Frontend library
console.log(dictionary.toString); // undefined
// console.log(dictionary.hasOwnProperty("react")); // Error: hasOwnProperty does not exist
console.log(Object.hasOwn(dictionary, "react")); // true


console.log("\n===== 26. Shared mutable prototype problem =====");
const sharedParent = {
  skills: [],
};

const childA = Object.create(sharedParent);
const childB = Object.create(sharedParent);

childA.skills.push("React");
console.log(childB.skills); // [ 'React' ] - dangerous shared array


console.log("\n===== 27. Fix shared mutable data by keeping it on instance =====");
const skillMethods = {
  addSkill(skill) {
    this.skills.push(skill);
  },
  showSkills() {
    console.log(this.skills);
  },
};

const devA = Object.create(skillMethods);
devA.skills = [];

const devB = Object.create(skillMethods);
devB.skills = [];

devA.addSkill("React");
devB.addSkill("Drupal");

devA.showSkills(); // [ 'React' ]
devB.showSkills(); // [ 'Drupal' ]


console.log("\n===== 28. ES6 class syntax over prototypes =====");
class User {
  constructor(name) {
    this.name = name;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

class Admin extends User {
  constructor(name, permissions) {
    super(name);
    this.permissions = permissions;
  }

  deletePost() {
    console.log(`${this.name} deleted a post`);
  }
}

const admin = new Admin("Dinesh", ["DELETE_POST"]);
admin.login();      // Dinesh logged in
admin.deletePost(); // Dinesh deleted a post

console.log(admin instanceof Admin); // true
console.log(admin instanceof User);  // true


console.log("\n===== 29. Class methods are on prototype =====");
console.log(Object.hasOwn(admin, "login")); // false
console.log(Admin.prototype.hasOwnProperty("deletePost")); // true
console.log(User.prototype.hasOwnProperty("login")); // true


console.log("\n===== 30. Borrowing methods using call() =====");
const personLike = {
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

const anotherUser = {
  firstName: "Dinesh",
  lastName: "Kumar",
};

console.log(personLike.fullName.call(anotherUser)); // Dinesh Kumar


console.log("\n===== 31. Method borrowing from Array.prototype =====");
function printArguments() {
  const args = Array.prototype.slice.call(arguments);
  console.log(args);
}

printArguments("React", "Drupal", "JavaScript"); // [ 'React', 'Drupal', 'JavaScript' ]


console.log("\n===== 32. Do not modify built-in prototypes in app code =====");
// Avoid this:
// Array.prototype.last = function () {
//   return this[this.length - 1];
// };

// Better: create utility function
function last(array) {
  return array[array.length - 1];
}

console.log(last([10, 20, 30])); // 30


console.log("\n===== 33. Real-world CMS-style inheritance example =====");
function CMSUser(name, email) {
  this.name = name;
  this.email = email;
}

CMSUser.prototype.login = function () {
  console.log(`${this.name} logged into CMS`);
};

function CMSAdmin(name, email, permissions) {
  CMSUser.call(this, name, email);
  this.permissions = permissions;
}

CMSAdmin.prototype = Object.create(CMSUser.prototype);
CMSAdmin.prototype.constructor = CMSAdmin;

CMSAdmin.prototype.clearCache = function () {
  if (this.permissions.includes("CLEAR_CACHE")) {
    console.log(`${this.name} cleared CMS cache`);
  } else {
    console.log("Permission denied");
  }
};

const cmsAdmin = new CMSAdmin("Dinesh", "dinesh@example.com", ["CLEAR_CACHE"]);
cmsAdmin.login();      // Dinesh logged into CMS
cmsAdmin.clearCache(); // Dinesh cleared CMS cache


console.log("\n===== 34. Quick memory rules =====");
console.log("1. obj.property -> JS checks obj, then prototype chain.");
console.log("2. new Constructor() -> object [[Prototype]] becomes Constructor.prototype.");
console.log("3. Parent.call(this) -> copies parent instance properties.");
console.log("4. Child.prototype = Object.create(Parent.prototype) -> inherits parent methods.");
console.log("5. Put data on instance, put shared methods on prototype.");
console.log("6. Prefer Object.create() over __proto__.");
console.log("7. Class extends still uses prototypes internally.");
