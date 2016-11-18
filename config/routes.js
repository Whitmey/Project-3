const router = require('express').Router();
const authController = require('../controllers/auth');
const secureRoute = require('../lib/secureRoute');
const oauthController = require('../controllers/oauth');
const foodsController = require('../controllers/foods');
const usersController = require('../controllers/users');
// const goalsController = require('../controllers/goals');


router
  .post('/login', authController.login)
  .post('/register', authController.register)
  .post('/auth/facebook', oauthController.facebook);


router.route('/foods')
  .get(foodsController.index)
  .post(secureRoute, foodsController.create);

router.route('/foods/:id')
  .get(foodsController.show)
  .put(secureRoute, foodsController.update)
  .delete(secureRoute, foodsController.delete);

// router.route('/goals')
//   .get(goalsController.index)
//   .post(secureRoute, goalsController.create);
//
// router.route('/goals/:id')
//   .get(goalsController.show)
//   .put(secureRoute, goalsController.update)
//   .delete(secureRoute, goalsController.delete);

router
  .get('/users', usersController.index);

router.route('/users/:id')
  .get(usersController.show)
  .put(secureRoute, usersController.update)
  .delete(secureRoute, usersController.delete);

module.exports = router;
