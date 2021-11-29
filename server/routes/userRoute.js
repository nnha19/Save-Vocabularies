const router = require("express").Router({ mergeParams: true });
const { body } = require("express-validator");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

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

router.use(authMiddleware);

router.get("/users", userController.getAllUsers);
router.put(
  "/user/:uid",
  body("value").not().isEmpty(),
  userController.updateUser
);

module.exports = router;
