const router = require('express').Router();
const authController = require('../controllers/auth');
const foodsController = require('../controllers/foods');

router
  .post('/login', authController.login)
  .post('/register', authController.register);

router.route('/foods')
  .get(foodsController.index)
  .post(foodsController.create);

router.route('/foods/:id')
  .get(foodsController.show)
  .put(foodsController.update)
  .delete(foodsController.delete);

module.exports = router;
