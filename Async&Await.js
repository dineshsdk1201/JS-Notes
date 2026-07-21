//Async/Await

//Async/Await is a modern JavaScript syntax used to write Promise-based asynchronous code in a cleaner, readable way, almost like normal synchronous code.

//It is mainly used for API calls, database/file operations, timers, and sequential async tasks, where await pauses execution until the Promise is resolved or rejected.

//Its limitations are: it works only with Promises, wrong usage can make tasks run one-by-one instead of parallel, and errors must be handled properly using try...catch; for parallel tasks, use Promise.all().


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
      else rej("Order Details not found");
    }, 500);
  });
};

async function main() {
  try {
    const user = await loginUser("Dinesh");
    console.log(user);
    const profile = await getUserProfile(user.id);
    console.log(profile);
    const orders = await getOrders(profile.id);
    console.log(orders);
    const details = await getorderDetails(orders.id);
    console.log(details);
  } catch (e) {
    console.log(e);
  }
}

main();
