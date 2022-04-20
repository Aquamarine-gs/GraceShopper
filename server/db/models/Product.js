const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  description: {
    type: Sequelize.TEXT,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://cdn.shopify.com/s/files/1/0581/9138/0663/files/pokemart_logo_2_1200x1200.png',
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
  category: {
    type: Sequelize.STRING,
  },
});
module.exports = Product;
