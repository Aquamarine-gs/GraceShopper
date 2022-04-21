const router = require('express').Router();
const { isAdmin, requireToken } = require('./gatekeeper');
const {
  models: { User, Order, Product, OrderProducts },
} = require('../db');
module.exports = router;

// URL Path: http://localhost:8080/api/users

// Description: Create/Register user
// Route: POST api/users
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, street, city, state, zip } =
      req.body;

    // Check if all fields were included
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !street ||
      !city ||
      !state ||
      !zip
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      street,
      city,
      state,
      zip,
    });

    if (user) {
      res.status(201).json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        street: user.street,
        city: user.city,
        state: user.state,
        zip: user.zip,
        token: generateToken(user.id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (err) {
    next(err);
  }
});



// Description: Get all users
// Route: GET api/users/:id/all
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

// Description: Get single users
// Route: GET api/users/:id
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

// Description: Get cart items by userId
// Route: GET api/users/:id/cart
router.get('/:id/cart', async (req, res, next) => {
  try {
    const { id } = await User.findByPk(req.params.id, {
      attributes: ['id'],
    });
    const cart = await Order.findAll({
      where: { userId: id, isComplete: req.body.isComplete },
      include: { model: Product },
    });
    res.json(cart);
  } catch (err) {
    next(err);
  }
});

//UPDATE CART

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

module.exports = router;
