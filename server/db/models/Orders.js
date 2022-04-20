const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  orderId: {
    type: Sequelize.INTEGER,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Order;
