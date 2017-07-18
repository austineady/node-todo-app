const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User } = require('./../models');
const { authenticate } = require('./../middleware/authenticate');

// User Routes
// -------------------------------------
router.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  // user.generateAuthToken

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(
      token => {
        // send token as HTTP header
        // x-name is a custom header
        res.header('x-auth', token).send(user);
      },
      e => {
        res.status(400).send(e);
      }
    );
});

router.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

module.exports = router;
