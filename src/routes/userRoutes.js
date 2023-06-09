const { Router } = require("express");
const router = Router();
const usersController = require("../controllers/userController");

const jwtAuth = require("../middlewares/authentication");

router.use(jwtAuth);

router.route('/')
  .get(usersController.getAllUsers)
  .post(usersController.createUser);

router.route('/:id')
  .get(usersController.getUserById)
  .put(usersController.updateUser)
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);

module.exports = router;