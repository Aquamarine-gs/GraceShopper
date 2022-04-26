const router = require('express').Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const {
  models: { Product, User },
} = require('../db');
module.exports = router;

// api/products  all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// api/products/:id  get product by id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    const similar = await Product.findAll({
      where: { category: product.category },
    });
    res.json({ product, similar });
  } catch (err) {
    next(err);
  }
});

// api/products/:id  // add admin check in here
router.delete('/:id', async (req, res, next) => {
  try {
    const { token } = req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isAdmin) {
      throw new Error('user is not authorized');
    }
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

// api/products/:id  // add admin check in here
router.put('/:id', async (req, res, next) => {
  try {
    const { token, name, price, description, imageUrl, category, quantity } =
      req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isAdmin) {
      throw new Error('user is not authorized');
    }
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(401);
      throw new Error('Product Not Found');
    }
    const updatedProduct = await product.update({
      name,
      price,
      description,
      imageUrl,
      category,
      quantity,
    });
    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// api/products  // add admin check here
router.post('/', async (req, res, next) => {
  try {
    const { token, name, price, description, imageUrl, category, quantity } =
      req.body;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isAdmin) {
      throw new Error('user is not authorized');
    }
    let product = await Product.create({
      name,
      price,
      description,
      imageUrl,
      category,
      quantity,
    });
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
