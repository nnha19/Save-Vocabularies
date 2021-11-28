const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ status: "Public" }).populate({
      path: "notifications",
    });
    const resultUsers = users.map((user) => {
      const {
        username,
        email,
        _id,
        joinedDate,
        vocabularies,
        sendNotisTo,
        notifications,
      } = user;
      return {
        username,
        email,
        _id,
        joinedDate,
        vocabularies,
        sendNotisTo,
        notifications,
      };
    });
    res.status(200).json(resultUsers);
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
        learnings: [],
      });
      const token = await jwt.sign(
        { userId: newUser._id, username, email },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );
      const { _id, vocabularies, joinedDate, status } = newUser;
      res.status(200).json({
        username,
        email,
        _id,
        token,
        vocabularies,
        joinedDate,
        status,
        learnings,
      });
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
    const user = await User.findOne({ email })
      .populate({
        path: "learnings",
      })
      .populate({
        path: "notifications",
        populate: { path: "vocabulary" },
      })
      .populate({
        path: "notifications",
        populate: { path: "user" },
      });
    console.log(user);
    if (!user) {
      res.status(400).json("User with the provided email doesn't exist");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const {
          username,
          _id,
          vocabularies,
          joinedDate,
          status,
          learnings,
          sendNotisTo,
          notifications,
        } = user;
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
          vocabularies,
          joinedDate,
          status,
          learnings,
          sendNotisTo,
          notifications,
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

const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    if (req.user.userId === uid) {
      const { type, value, confirmPassword } = req.body;
      const foundUser = await User.findById(uid);
      const validPassword = await bcrypt.compare(
        confirmPassword,
        foundUser.password
      );
      if (!validPassword) {
        res.status(400).json("Password you entered is incorrect.");
        return;
      }
      if (type === "password") {
        const hashedPassword = await bcrypt.hash(value, 12);
        foundUser[type] = hashedPassword;
      } else {
        foundUser[type] = value;
      }
      await foundUser.save();
      res.status(200).json({ user: foundUser });
    } else {
      res.status(400).json("You are not authorized to do this.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong.");
  }
};

exports.getAllUsers = getAllUsers;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;
exports.updateUser = updateUser;
