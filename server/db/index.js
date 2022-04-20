//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const OrderProducts = require('./models/OrderProducts');
const Order = require('./models/Orders');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: 'OrderProducts' });
Product.belongsToMany(Order, { through: 'OrderProducts' });
Order.hasMany(OrderProducts);
OrderProducts.belongsTo(Order);
Product.hasMany(OrderProducts);
OrderProducts.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProducts,
    Order,
  },
};
