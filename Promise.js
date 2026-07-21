//Promise:

//A Promise in JavaScript is an object that represents the future result of an asynchronous operation — it can be pending, fulfilled, or rejected.

//It is mainly used for API calls, file/database operations, timers, and async workflows, so we can handle success using .then() and errors using .catch() instead of deeply nested callbacks.

//Its limitations are: a Promise gives only one final result, it is not automatically cancellable, and too many .then() chains can still become hard to read — so we often use async/await, Promise.all(), and AbortController to manage these better.

//Limitation 1: Promise gives only one final result
//Limitation 2: Promise is not automatically cancellable
//Limitation 3: Too many .then() chains can still become hard to read
//Limitation 4: Error handling can be missed

//Promise Constructor:

const promise = new Promise((resolve, reject) => {
  // async task

  if (success) {
    resolve(value);
  } else {
    reject(error);
  }
});

///////////////////////

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

const loginUser = function (name) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const user = fakeDB.users.find((t) => t.name === name);
      if (user) res(user);
      rej("User Not found");
    }, 500);
  });
};
const getUserProfile = function (id) {
  return new Promise((r, rej) => {
    setTimeout(() => {
      const profile = fakeDB.profiles.find((r) => r.id === id);
      if (profile) r(profile);
      rej("Profile Not Found");
    }, 500);
  });
};
const getOrders = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const orders = fakeDB.orders.find((o) => o.profileId === id);
      if (orders) res(orders);
      rej("Orders Not Found");
    }, 500);
  });
};
const getorderDetails = function (id) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const details = fakeDB.orderDetails.find((c) => c.id === id);
      if (details) res(details);
      rej("Details Not Found");
    }, 500);
  });
};

loginUser("Dinesh")
  .then((d) => {
    console.log(d);
    return getUserProfile(d.id);
  })
  .then((d) => {
    console.log(d);
    return getOrders(d.id);
  })
  .then((d) => {
    console.log(d);
    return getorderDetails(d.id);
  })
  .then((d) => {
    console.log(d);
  })
  .catch((e) => console.log(e)).finally((r)=>{console.log("Promise Completed")});



//Promise.All  If one fails, treat the full operation as failed.
const p1 = loginUser("Dinesh");
const p2 = getUserProfile(1);
const p3 = getOrders(1);
const p4 = getorderDetails(101);

Promise.all([p1, p2, p3, p4])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

//Promise.allSettled Promise.allSettled() waits for all Promises to finish, whether they succeed or fail.

Promise.allSettled([p1, p2, p3, p4])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

//Promise.race() returns the result of the first Promise that settles, whether it succeeds or fails.

Promise.race([p1, p2, p3, p4])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

//Promise.any() returns the first successfully fulfilled Promise. If all Promises reject, then it rejects.


Promise.any([p1, p2, p3, p4])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });


