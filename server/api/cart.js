const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const {
  models: { User, Order, Product, OrderProducts },
} = require('../db');
module.exports = router;

// Description: Get all items in a cart
// Route: /api/cart
router.get('/:token', async (req, res, next) => {
  try {
    const token = req.params.token;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw 'user not found';
    }
    const orderId = await Order.findOne({
      where: { userId: id, isComplete: false },
    });
    if (!orderId) {
      return res.send([]);
    }

    const cart = await OrderProducts.findAll({
      where: { orderId: orderId.id },
      include: { model: Product },
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

// Description: Add/delete item to cart
// Route: /api/cart/edit
router.post('/edit', async (req, res, next) => {
  try {
    const { token, productId, updatedQuantity, unitPrice } = req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    let orderId = await Order.findOne({
      where: { userId: id, isComplete: false },
      attributes: ['id'],
    });
    if (orderId !== null) orderId = orderId.id;
    if (!orderId) {
      orderId = await Order.create({
        userId: id,
        isComplete: false,
      });
      orderId = orderId.id;
    }

    let updatedTotalPrice;
    if (updatedQuantity && unitPrice) {
      updatedTotalPrice = updatedQuantity * unitPrice;
    }
    const cartItem = await OrderProducts.findOne({
      where: { orderId: Number(orderId), productId: Number(productId) },
      include: [
        {
          model: Product,
        },
      ],
    });

    if (cartItem) {
      const { quantity, unitPrice, totalPrice } = cartItem;
      const existingQuantity = quantity;
      const existingTotalPrice = totalPrice;

      if (existingQuantity + Number(updatedQuantity) < 1) {
        const deletedCartItem = await OrderProducts.destroy({
          where: { orderId, productId },
        });
        return res.send('Item deleted');
      }

      const updatedCartItem = await OrderProducts.update(
        {
          quantity: existingQuantity + Number(updatedQuantity),
          unitPrice: Number(unitPrice),
          totalPrice: existingTotalPrice + updatedTotalPrice,
        },
        {
          where: {
            orderId,
            productId,
          },
          include: [
            {
              model: Product,
            },
          ],
        },
      );
      return res.json(updatedCartItem);
    }

    if (!cartItem && updatedQuantity > 0) {
      const order = await OrderProducts.create({
        orderId,
        productId: Number(productId),
        quantity: Number(updatedQuantity),
        unitPrice: Number(unitPrice),
        totalPrice: updatedTotalPrice,
      });
      res.json(order);
    } else {
      return res.send('Item not found');
    }
  } catch (err) {
    err.status = 401;
    throw new Error('An error occurred adding an item to the cart');
  }
});
