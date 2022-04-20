const Sequelize = require('sequelize');
const db = require('../db');

const OrderProducts = db.define('OrderProducts', {
  orderId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
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
