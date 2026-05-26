let mySet = new Set([10, 20, 30]);
const data = new Map([...mySet].map((v, i) => [i, v]));
console.log(data);
const data2 = new Set(data.entries());
console.log(data2);

const arr = [1, 2, 3, 4, 5];
const arrSet = new Set(arr);
console.log(arrSet);
const arrMap = new Map([...arr].map((v, i) => [i, v]));
console.log(arrMap);

const maptoArr = arrMap.entries();
console.log("MaptoArr", maptoArr);
const setToArr = [...arrSet];
console.log("SetToArr", setToArr);

let obj2 = { a: 1, b: 2, c: 3 };
const objtoset = new Set(Object.entries(obj2));
console.log(objtoset);
const objtoMap = new Map(Object.entries(obj2));
console.log(objtoMap);
const setToObj = Object.fromEntries([...objtoset].map((c) => c));
console.log("settoObj", setToObj);
const MaptoObj = Object.fromEntries([...objtoMap].map((c) => c));
console.log("MaptoObj", MaptoObj);

const demoFun = function () {
  console.log(this?.name?.salary ?? "Not Present");
};
const demoFun2 = function (...data) {
  console.log(data);
  console.log(this?.name);
};
const demoFun3 = function (data) {
  console.log(data);
  console.log(`${data} ${this?.name}`);
  return "Confidence";
};
demoFun.call({ name: "Dinesh", age: 26 });
demoFun2.apply({ name: "nila" }, [10, 2, 3, 4, 5]);

const bindex = demoFun3.bind({ name: "Suriyan" }, "hello");
console.log(bindex());
