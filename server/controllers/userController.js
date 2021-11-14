const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json("Invalid Input. Please fill all the required fields.");
      return;
    }
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
        { userId: newUser._id, username, email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      const { _id } = newUser;
      res.status(200).json({ username, email, _id, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const signInUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json("Invalid Input. Please fill all the required fields.");
    return;
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User with the provided email doesn't exist");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const { username, _id } = user;
        const token = jwt.sign(
          {
            userId: user._id,
            username,
            email,
          },
          process.env.JWT_KEY,
          { expiresIn: "1h" }
        );
        res.status(200).json({
          username,
          email,
          _id,
          token,
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
