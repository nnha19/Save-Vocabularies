const User = require("../Models/User");

const addVocabularyToLearning = async (req, res) => {
  try {
    const { vid, uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      res.status(400).json("User with provided id can't be found");
      return;
    }
    if (!user.learnings) {
      user.learnings = [];
    }
    user.learnings.push(vid);
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Something went wrong. Try again.");
  }
};

const removeVocabularyFromLearning = async (req, res) => {
  try {
    const { vid, uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      res.status(400).json("User with provided id can't be found");
      return;
    }
    const updatedLearnings = user.learnings.filter(
      (l) => l._id.toString() !== vid.toString()
    );
    user.learnings = updatedLearnings;
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json("Something went wrong. Try again.");
  }
};

exports.addVocabularyToLearning = addVocabularyToLearning;
exports.removeVocabularyFromLearning = removeVocabularyFromLearning;
