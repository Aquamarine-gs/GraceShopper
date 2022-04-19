//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const UserProducts = require('./models/UserProducts');

//associations could go here!
User.belongsToMany(Product, { through: 'UserProducts' });
Product.belongsToMany(User, { through: 'UserProducts' });

module.exports = {
  db,
  models: {
    User,
    Product,
    UserProducts,
  },
};
