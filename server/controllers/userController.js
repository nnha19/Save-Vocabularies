const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json("User with this email already exists.");
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        joinedDate: new Date(),
      });
      const token = await jwt.sign(
        { userId: newUser._id, username },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        message: "Account successfully created",
        token,
        user: { username: newUser.username, userId: newUser._id },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User with the provided email doesn't exist");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign(
          {
            userId: user._id,
            username: user.username,
            admin: user.admin,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          message: "Logged you in",
          token,
          user: {
            username: user.username,
            userId: user._id,
            admin: user.admin,
          },
        });
      } else {
        res.status(400).json("Incorrect password.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.getAllUsers = getAllUsers;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;
