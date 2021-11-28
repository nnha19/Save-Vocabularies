const User = require("../Models/User");
const Notification = require("../Models/Notifications");
const getNotisByUserId = (req, res) => {};

const addNoti = async (req, res) => {
  try {
    const { userId, vocabulary } = req.body;
    const user = await User.findById(userId);
    const newNoti = await Notification.create({
      user,
      new: true,
      vocabulary,
      action: "added",
    });
    const users = await User.find({ _id: user.sendNotisTo });
    users.forEach(async (u) => {
      u.notifications.push(newNoti);
      await u.save();
    });
    res.status(200).json("Succeded");
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong");
  }
};

const ringNotiBell = async (req, res) => {
  try {
    //curUser rings user's noti bell to receive notis from user.
    const { userId, curUserId } = req.body;
    const user = await User.findById(userId);
    if (!user.sendNotisTo) {
      user.sendNotisTo = [];
    }
    user.sendNotisTo.push(curUserId);
    console.log(user);
    await user.save();
    res.status(200).json("Succeeded");
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong.");
  }
};

const turnOffNoti = async (req, res) => {
  try {
    const { userId, curUserId } = req.body;
    const user = await User.findById(userId);
    user.sendNotisTo = user.sendNotisTo.filter(
      (uid) => uid.toString() !== curUserId
    );
    await user.save();
    console.log(user);
    res.status(200).json("Succeded");
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong.");
  }
};

exports.getNotisByUserId = getNotisByUserId;
exports.addNoti = addNoti;
exports.ringNotiBell = ringNotiBell;
exports.turnOffNoti = turnOffNoti;
