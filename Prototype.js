//Functional Prototype Inheritance
function Animal() {
  this.makeSound = function () {
    console.log("Make Sound");
  };
}

function Dog() {
  this.barks = true;
  Animal.call(this);
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

const d = new Dog();

d.makeSound();
//Object Prototypal Inheritance
const df = {
  name: "Dinesh",
  details: () => {
    console.log("I am dinesh 26 years old");
  },
};

const df2 = {
  age: 26,
};
df2.__proto__ = df;

console.log(df2.name);
df2.details();
