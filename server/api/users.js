const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { protect } = require('../auth');
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

// Description: Authenticate and login user
// Route: POST /api/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (user && password && (await bcrypt.compare(password, user.password))) {
      res.json({
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
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    next(error);
  }
});

// Description: Get user data
// Route: GET /api/users/me
router.get('/me', protect, async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});

// Generate Token Function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

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

// Description: Get if user is admin
// Route: GET api/users/:id/isAdmin
router.get('/:id/:token/isAdmin', async (req, res, next) => {
  try {
    const token = req.params.token;
    const { id } = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error('user not found');
    }
    if (!user.isAdmin) {
      return res.send(false);
    } else {
      return res.json(user.isAdmin);
    }
  } catch (error) {
    console.log(error);
  }
});

// // Description: Get single users
// // Route: GET api/users/:id
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
    const cart = await Order.findOne({
      where: { userId: id, isComplete: false },
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
