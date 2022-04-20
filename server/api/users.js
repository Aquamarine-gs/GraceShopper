const router = require('express').Router();
const { isAdmin, requireToken } = require('./gatekeeper');
const { user } = require('pg/lib/defaults');
const {
  models: { User, OrderProducts },
} = require('../db');
module.exports = router;

// api/users/:id/all
router.get('/:id/all', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user.isAdmin) {
      const users = await User.findAll({
        // explicitly select only the id and username fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: [
          'id',
          'firstName',
          'lastName',
          'email',
          'street',
          'city',
          'state',
          'zip',
          'isAdmin',
        ],
      });
      res.json(users);
    } else {
      res.send('User Not Authorized!!!');
    }
  } catch (err) {
    next(err);
  }
});

// api/users/:id
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'street',
        'city',
        'state',
        'zip',
      ],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const cart = await OrderProducts.findAll({
      where: { orderId: req.body.orderId },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//DELETE
//api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

//UPDATE
//api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error('User Not Found');
    }
    const updatedUser = await user.update(req.body);
    //add password updating check
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
});

//CREATE
//api/users
router.post('/', async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
