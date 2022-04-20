const router = require('express').Router();
const { user } = require('pg/lib/defaults');
const {
  models: { User, UserProducts },
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
    const cart = await UserProducts.findAll({
      where: { userId: req.params.id },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

// api/users/:id/cart
router.put('/:id/cart', async(req, res, next) =>{
  try {
    const user = await User.findByPk(req.params.id)
    const product = await UserProducts.findOne(
      {where:{productId:req.body.productId, userId: user.id}}
    )

    console.log(product)
    if(product){
      // person is updating qty of an existing product in cart
      const updatedCart = await product.update(
        {quantity: req.body.quantity},
      )
    } else {
      // person is adding new item to cart
      const createCart = await UserProducts.create({
        userId: user.id,
        productId: req.body.productId,
        quantity: req.body.quantity
      })
    }
    res.status(200).send('cart updated');
  } catch (err) {
    next(err)
  }
})

// api/users/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

// api/users/:id
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


// api/users
router.post('/', async (req, res, next) => {
  try {
    let user = await User.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
