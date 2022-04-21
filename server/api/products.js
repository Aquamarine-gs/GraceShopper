const router = require('express').Router();
// const { user } = require('pg/lib/defaults');

const {
  models: { Product, UserProducts },
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
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// api/products/:id  // add admin check in here
router.delete('/:id', async (req, res, next) => {
  try {
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
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      res.status(401);
      throw new Error('Product Not Found');
    }
    const updatedProduct = await product.update(req.body);
    res.status(200).send(updatedProduct);
  } catch (err) {
    next(err);
  }
});

// api/products  // add admin check here
router.post('/', async (req, res, next) => {
  try {
    let product = await Product.create(req.body);
    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
