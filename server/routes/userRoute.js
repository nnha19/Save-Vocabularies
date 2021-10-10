const router = require("express").Router();

const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.post("/signup", userController.signUpUser);
router.post("/signin", userController.signInUser);

module.exports = router;
