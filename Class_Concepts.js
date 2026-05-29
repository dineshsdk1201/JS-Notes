/**
 * =========================================
 * JavaScript Classes - Complete Guide
 * =========================================
 *
 * Note:
 * In JavaScript, classes are syntactic sugar over prototype-based inheritance.
 */

/* =========================
   1) WHAT IS A CLASS
========================= */

class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  drive() {
    console.log(`${this.brand} ${this.model} is driving.`);
  }
}

const car1 = new Car("Toyota", "Camry");
car1.drive();


/* =========================
   2) CLASS DECLARATION
========================= */

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

const p1 = new Person("Dinesh", 25);
p1.greet();


/* =========================
   3) CLASS EXPRESSION
========================= */

const Animal = class {
  constructor(type) {
    this.type = type;
  }

  speak() {
    console.log(`${this.type} makes a sound.`);
  }
};

const dog = new Animal("Dog");
dog.speak();


/* =========================
   4) CONSTRUCTOR
========================= */

class Student {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
  }
}


/* =========================
   5) INSTANCE METHODS
========================= */

class Calculator {
  add(a, b) {
    return a + b;
  }

  multiply(a, b) {
    return a * b;
  }
}


/* =========================
   6) GETTERS & SETTERS
========================= */

class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this._balance = balance;
  }

  get balance() {
    return this._balance;
  }

  set balance(amount) {
    if (amount < 0) {
      console.log("Balance cannot be negative.");
      return;
    }
    this._balance = amount;
  }
}


/* =========================
   7) STATIC METHODS
========================= */

class MathHelper {
  static add(a, b) {
    return a + b;
  }
}


/* =========================
   8) STATIC PROPERTIES
========================= */

class Company {
  static companyName = "Cognizant";

  static showCompany() {
    console.log(`Company: ${Company.companyName}`);
  }
}


/* =========================
   9) PUBLIC CLASS FIELDS
========================= */

class Product {
  category = "General";

  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}


/* =========================
   10) PRIVATE FIELDS
========================= */

class Account {
  #balance;

  constructor(initialBalance) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }

  getBalance() {
    return this.#balance;
  }
}


/* =========================
   11) INHERITANCE
========================= */

class AnimalBase {
  constructor(name) {
    this.name = name;
  }

  eat() {
    console.log(`${this.name} is eating.`);
  }
}

class Dog extends AnimalBase {
  bark() {
    console.log(`${this.name} is barking.`);
  }
}


/* =========================
   12) SUPER KEYWORD
========================= */

class Cat extends AnimalBase {
  constructor(name, color) {
    super(name);
    this.color = color;
  }
}


/* =========================
   13) METHOD OVERRIDING
========================= */

class Shape {
  area() {
    console.log("Area calculation");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}


/* =========================
   14) INSTANCEOF
========================= */

class Employee extends Person {}

const emp1 = new Employee("Dinesh", 25);

console.log(emp1 instanceof Employee); // true
console.log(emp1 instanceof Person);   // true


/* =========================
   15) FULL REAL-WORLD EXAMPLE
========================= */

class User {
  static userCount = 0;
  #password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = password;
    User.userCount++;
  }

  get maskedEmail() {
    const [username, domain] = this.email.split("@");
    return `${username[0]}***@${domain}`;
  }

  set updatePassword(newPassword) {
    if (newPassword.length < 6) {
      console.log("Password must be at least 6 characters.");
      return;
    }
    this.#password = newPassword;
  }

  login() {
    console.log(`${this.name} logged in.`);
  }

  static getTotalUsers() {
    return User.userCount;
  }
}

class Admin extends User {
  permissions = [];

  constructor(name, email, password, permissions = []) {
    super(name, email, password);
    this.permissions = permissions;
  }

  login() {
    super.login();
    console.log(`${this.name} logged in as Admin.`);
  }

  addPermission(permission) {
    this.permissions.push(permission);
  }
}


/* =========================
   16) BEST PRACTICES
========================= */

// ✅ Use classes for real-world entities
// ✅ Prefer composition over deep inheritance
// ✅ Use private fields (#) for encapsulation
// ✅ Use static methods for utilities


/* =========================
   17) COMMON MISTAKES
========================= */

// ❌ Forgetting new
// ❌ Using this before super()
// ❌ Accessing private fields outside class

/* =========================
   17) CALLING PARENT METHODS (super)
========================= */

class Bird {
  fly() {
    console.log("Bird is flying");
  }
}

class Eagle extends Bird {
  fly() {
    super.fly();
    console.log("Eagle flies very high");
  }
}

const eagle = new Eagle();
eagle.fly();


/* =========================
   18) METHOD OVERRIDING
========================= */

class Shape {
  area() {
    console.log("Area calculation");
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(10, 20);
console.log(rect.area()); // 200


/* =========================
   19) INSTANCEOF
========================= */

class PersonBase {}

class EmployeeBase extends PersonBase {}

const emp1 = new EmployeeBase();

console.log(emp1 instanceof EmployeeBase); // true
console.log(emp1 instanceof PersonBase);   // true
console.log(emp1 instanceof Object);       // true


/* =========================
   20) PROTOTYPE CHAIN
========================= */

class UserProto {
  sayHello() {
    console.log("Hello");
  }
}

const u1 = new UserProto();
const u2 = new UserProto();

console.log(u1.sayHello === u2.sayHello); // true
console.log(Object.getPrototypeOf(u1) === UserProto.prototype); // true


/* =========================
   21) COMPUTED METHOD NAMES ✅ FIXED
========================= */

const methodName = "sayWelcome";

class Greeter {
  [methodName]() {
    console.log("Welcome!");
  }
}

const g = new Greeter();
g.sayWelcome();


/* =========================
   22) CLASS HOISTING
========================= */

// ❌ Error (Temporal Dead Zone)
// const obj = new MyClass();

class MyClass {
  constructor() {
    console.log("Created");
  }
}

const obj = new MyClass();


/* =========================
   23) STRICT MODE
========================= */

class Demo {
  show() {
    let x = 10;
    console.log(x);
  }
}

new Demo().show();


/* =========================
   24) RETURNING OBJECT FROM CONSTRUCTOR
========================= */

class ExampleReturn {
  constructor() {
    this.name = "Original";

    return {
      name: "Returned Object"
    };
  }
}

const e = new ExampleReturn();
console.log(e.name); // Returned Object


/* =========================
   25) EXTENDING BUILT-IN CLASSES
========================= */

// Extend Array
class MyArray extends Array {
  first() {
    return this[0];
  }

  last() {
    return this[this.length - 1];
  }
}

const arr = new MyArray(10, 20, 30);

console.log(arr.first());
console.log(arr.last());
console.log(arr instanceof MyArray);
console.log(arr instanceof Array);


// Custom Error
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

function validateAge(age) {
  if (age < 18) {
    throw new ValidationError("Age must be 18 or older");
  }
  return "Valid age";
}

try {
  console.log(validateAge(16));
} catch (error) {
  console.log(error.name);    // ValidationError
  console.log(error.message); // Age must be 18 or older
}


/* =========================
   26) STATIC INITIALIZATION BLOCK
========================= */

class Settings {
  static appName;
  static version;

  static {
    Settings.appName = "Inventory App";
    Settings.version = "2.1.0";
    console.log("Static block executed");
  }

  static show() {
    console.log(`${Settings.appName} - ${Settings.version}`);
  }
}

Settings.show();


/* =========================
   27) MIXINS
========================= */

const CanEat = {
  eat() {
    console.log(`${this.name} is eating`);
  }
};

const CanWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

class Human {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Human.prototype, CanEat, CanWalk);

const human = new Human("Dinesh");
human.eat();
human.walk();


/* =========================
   28) REAL-WORLD EXAMPLE
========================= */

class UserFull {
  static userCount = 0;
  #password;

  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.#password = password;
    UserFull.userCount++;
  }

  get maskedEmail() {
    const [username, domain] = this.email.split("@");
    return `${username[0]}***@${domain}`;
  }

  set updatePassword(newPassword) {
    if (newPassword.length < 6) {
      console.log("Password too short");
      return;
    }
    this.#password = newPassword;
  }

  checkPassword(password) {
    return this.#password === password;
  }

  login() {
    console.log(`${this.name} logged in`);
  }
}

class AdminFull extends UserFull {
  permissions = [];

  constructor(name, email, password, permissions = []) {
    super(name, email, password);
    this.permissions = permissions;
  }

  login() {
    super.login();
    console.log(`${this.name} logged in as Admin`);
  }

  addPermission(permission) {
    this.permissions.push(permission);
  }
}


/* =========================
   29) BEST PRACTICES
========================= */

// Use classes for real entities
// Prefer composition over inheritance
// Use private fields
// Use static for utilities


/* =========================
   30) COMMON MISTAKES
========================= */

// ❌ Forgetting new
// ❌ Using this before super()
// ❌ Accessing private fields outside
// ❌ Misunderstanding prototype methods


/* =========================
   31) FULL MASTER EXAMPLE
========================= */

class PersonMaster {
  static count = 0;
  #id;

  constructor(name, age) {
    this.name = name;
    this.age = age;
    this.#id = ++PersonMaster.count;
  }

  get id() {
    return this.#id;
  }

  introduce() {
    console.log(`Hi, I am ${this.name}`);
  }

  static totalPersons() {
    return PersonMaster.count;
  }
}

class EmployeeMaster extends PersonMaster {
  constructor(name, age, role, salary) {
    super(name, age);
    this.role = role;
    this.salary = salary;
  }

  introduce() {
    super.introduce();
    console.log(`I work as ${this.role}`);
  }
}

class Manager extends EmployeeMaster {
  teamSize = 0;

  constructor(name, age, salary, teamSize) {
    super(name, age, "Manager", salary);
    this.teamSize = teamSize;
  }

  manage() {
    console.log(`${this.name} manages ${this.teamSize} people`);
  }
}



////////////////////////Adding Comment Notes for future reference//////////////////

/**
 * =========================================
 * 🚀 JavaScript Classes - Quick Reference
 * =========================================
 *
 * 📌 Key Concepts
 * - Class Declaration: `class Person { ... }`
 * - Class Expression: `const MyClass = class { ... }`
 * - Constructor: special method for initialization
 * - Instance Methods: functions tied to object instances
 * - Getters & Setters: controlled property access
 * - Static Methods & Properties: belong to the class itself
 * - Private Fields (#): encapsulated data
 * - Inheritance: `class Dog extends Animal { ... }`
 * - Super Keyword: call parent constructor/methods
 * - Method Overriding: redefine parent methods
 * - instanceof: check object type
 *
 * 🛠 Advanced Features
 * - Prototype Chain: shared methods across instances
 * - Computed Method Names: dynamic method names
 * - Class Hoisting: not hoisted (TDZ applies)
 * - Extending Built-in Classes: e.g. Array, Error
 * - Static Initialization Block: run once at class load
 * - Mixins: combine behaviors into a class
 *
 * ✅ Best Practices
 * - Use classes for real-world entities
 * - Prefer composition over deep inheritance
 * - Use private fields for encapsulation
 * - Use static methods for utilities
 *
 * ⚠️ Common Mistakes
 * - Forgetting `new` when instantiating
 * - Using `this` before `super()` in subclasses
 * - Accessing private fields outside the class
 * - Misunderstanding prototype methods
 *
 * 🌍 Real-World Examples
 * - User/Admin systems with permissions
 * - Employee/Manager hierarchies
 * - Custom error handling
 *
 * =========================================
 */

