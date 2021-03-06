'use strict';
const bcrypt = require('bcrypt');

const {
  db,
  models: { User, Product, OrderProducts, Order },
} = require('../server/db');
const products = require('./productSeed');
const users = require('./userSeed');
const carts = require('./cartSeed');
const orders = require('./orderSeed');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      users.map(async (user) => {
        const {
          firstName,
          lastName,
          email,
          password,
          street,
          city,
          state,
          zip,
        } = user;
        const hashedPassword = await bcrypt.hash(password, 10);
        return User.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
          street,
          city,
          state,
          zip,
        });
      }),
    );

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      }),
    );

    await Promise.all(
      orders.map((order) => {
        return Order.create(order);
      }),
    );

    await Promise.all(
      carts.map((cart) => {
        return OrderProducts.create(cart);
      }),
    );
    console.log(`seeded ${users.length} users`);
    console.log(`seeded ${products.length} products`);
    console.log(`seeded ${carts.length} carts`);
    console.log(`seeded ${orders.length} orders`);
    console.log(`seeded successfully`);
  } catch (err) {
    console.log(err);
  }
};

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
