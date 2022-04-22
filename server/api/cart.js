const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const {
  models: { User, Order, Product, OrderProducts },
} = require('../db');
module.exports = router;

// Description: Get all items in a cart
// Route: /api/cart
router.get('/', async (req, res, next) => {
  try {
    const { token } = req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw 'user not found';
    }
    const orderId = await Order.findOne({
      where: { userId: id, isComplete: false },
    });
    if (!orderId) {
      return res.send('order number not found');
    }
    const cart = await OrderProducts.findAll({
      where: { orderId: orderId.id },
    });
    if (!cart) {
      return res.send('no cart items');
    }
    res.json(cart);
  } catch (error) {
    error.status = 401;
    throw new Error('no cart info');
  }
});

// Description: Initial add item to cart
// Route: /api/cart/add
router.post('/add', async (req, res, next) => {
  try {
    const { token, productId, quantity, unitPrice } = req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw 'user not found';
    }
    let { id: orderId } = await Order.findOne({
      where: { userId: id, isComplete: false },
      attributes: ['id'],
    });

    if (orderId == null) {
      orderId = await Order.create({
        userId: id,
        isComplete: false,
      });
    }
    let totalPrice;
    if (quantity && unitPrice) {
      totalPrice = quantity * unitPrice;
    }
    const order = await OrderProducts.create({
      orderId,
      productId: Number(productId),
      quantity: Number(quantity),
      unitPrice: Number(unitPrice),
      totalPrice,
    });
    const cartItems = await OrderProducts.findAll({
      where: { orderId: Number(orderId) },
    });
    console.log('CART ITEMS: ', cartItems);
    res.json(order);
  } catch (err) {
    err.status = 401;
    throw new Error('bad token');
  }
});

// Description: Update items in cart
// Route: /api/cart/update
// router.put('/update', async (req, res, next) => {
//   const { token, productId, quantity, unitPrice } = req.body;
//   const { id } = await jwt.verify(token, process.env.JWT_SECRET);
//   const user = await User.findByPk(id);
//   if (!user) {
//     throw 'user not found';
//   }
// });
