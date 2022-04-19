const Sequelize = require('sequelize');
const db = require('../db');

const UserProducts = db.define('UserProducts', {
  userId: {
    type: Sequelize.INTEGER,
  },
  productId: {
    type: Sequelize.INTEGER,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: {
      min: 0,
    },
  },
});

module.exports = UserProducts;
