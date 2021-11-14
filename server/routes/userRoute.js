const router = require("express").Router();
const { body } = require("express-validator");
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post(
  "/signup",
  body("username").not().isEmpty(),
  body("email").isEmail(),
  body("password").not().isEmpty(),
  userController.signUpUser
);
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").not().isEmpty(),
  userController.signInUser
);

module.exports = router;
