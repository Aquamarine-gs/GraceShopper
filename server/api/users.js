const router = require('express').Router();
const { user } = require('pg/lib/defaults');
const {
  models: { User, UserProducts },
} = require('../db');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/cart', async (req, res, next) => {
  try {
    const cart = await UserProducts.findAll({
      where: { userId: req.params.id },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(401);
      throw new Error('User Not Found');
    }
    const updatedUser = await user.update(req.body);
    res.status(200).send(updatedUser);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
