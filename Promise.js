
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
  .catch((e) => console.log(e));
