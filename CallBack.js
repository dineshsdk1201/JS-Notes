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

const loginUser = function (name, cb) {
  setTimeout(() => {
    const user = fakeDB.users.find((t) => t.name === name);
    cb(user);
  }, 500);
};
const getUserProfile = function (id, cb) {
  setTimeout(() => {
    const profile = fakeDB.profiles.find((r) => r.id === id);
    cb(profile);
  }, 500);
};
const getOrders = function (id, cb) {
  setTimeout(() => {
    const orders = fakeDB.orders.find((o) => o.profileId === id);
    cb(orders);
  }, 500);
};
const getorderDetails = function (id, cb) {
  setTimeout(() => {
    const details = fakeDB.orderDetails.find((c) => c.id === id);
    cb(details);
  }, 500);
};

loginUser("Dinesh", function (user) {
  console.log("USER", user);
  getUserProfile(user.id, function (profile) {
    console.log("Profile", profile);
    getOrders(profile.id, function (orders) {
      console.log("Orders", orders);
      getorderDetails(orders.id, function (details) {
        console.log("Details", details);
      });
    });
  });
});
