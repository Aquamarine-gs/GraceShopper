const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./Orders');
const Product = require('./Product');

const OrderProducts = db.define('OrderProducts', {
  orderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id',
    },
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
    },
  },
  unitPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  totalPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
});

module.exports = OrderProducts;
