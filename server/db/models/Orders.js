const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Order;
