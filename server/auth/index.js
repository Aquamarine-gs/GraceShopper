const router = require('express').Router();
const jwt = require('jsonwebtoken');
const {
  models: { User },
} = require('../db');
module.exports = router;

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from the token
        req.user = await User.findByPk(decoded.id, {
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
        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not Authorized');
      }
    }
    if (!token) {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  } catch (error) {
    console.log(error);
  }
};

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
