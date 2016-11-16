const router = require('express').Router();
const authController = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const oauthController = require('../controllers/oauth');

router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook);







module.exports = router;
