const router = require('express').Router();
const authController = require('../controllers/auth');
// const secureRoute = require('../lib/secureRoute');
// const oauthController = require('../controllers/oauth');
const foodsController = require('../controllers/foods');


router
  .post('/login', authController.login)
  .post('/register', authController.register);
  // .post('/auth/facebook', oauthController.facebook);


router.route('/foods')
  .get(foodsController.index)
  .post(secureRoute, foodsController.create);

router.route('/foods/:id')
  .get(foodsController.show)
  .put(secureRoute, foodsController.update)
  .delete(secureRoute, foodsController.delete);


module.exports = router;
