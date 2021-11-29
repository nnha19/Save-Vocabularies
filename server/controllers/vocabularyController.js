const Vocabulary = require("../Models/Vocabulary");
const User = require("../Models/User");
const { validationResult } = require("express-validator");

const getAllVocabulariesByUserId = async (req, res) => {
  try {
    const { uid } = req.params;
    if (uid) {
      const vocabularies = await Vocabulary.find({ owner: uid });
      res.status(200).json(vocabularies);
    } else {
      res.status(400).json("User with the provided id couldn't be found.");
    }
  } catch (err) {
    res.status(400).json("Something went wrong.");
  }
};

const getVocabulariesByUserId = async (req, res) => {
  try {
    const { uid, page } = req.params;
    let vocabularies = await Vocabulary.find({ owner: uid });
    vocabularies.reverse();
    let hasMore = !!vocabularies[Number(page)];
    if (vocabularies[Number(page) + 10]) {
      vocabularies = vocabularies.splice(page, 10);
    } else {
      vocabularies = vocabularies.splice(page);
    }
    res.status(200).json({ vocabularies, hasMore });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getVocabulariesBySearchQuery = async (req, res) => {
  try {
    const { query, uid } = req.params;
    const vocabularies = await Vocabulary.find({
      owner: uid,
      vocabulary: { $regex: query, $options: "i" },
    });
    res.status(200).json(vocabularies);
  } catch (err) {
    console.log(err);
    res.status(400).json("Something went wrong");
  }
};

const addNewVocabulary = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .json(
          "Invalid input fields. Please make sure to fill all the required fields."
        );
      return;
    }
    const { uid } = req.params;
    const user = await User.findById(uid);
    if (!user) {
      res.status(400).json("User can't be found.");
    } else {
      if (user._id.toString() !== uid.toString()) {
        res.status(404).json("You can add vocabularies only to your list.");
        return;
      }
      const { vocabulary, definition, exampleSentences, note, resource } =
        req.body;
      const newVocabulary = await Vocabulary.create({
        vocabulary,
        definition,
        exampleSentences,
        note,
        timeStamp: new Date(),
        owner: uid,
        resource,
      });
      user.vocabularies.push(newVocabulary);
      await user.save();
      res.status(200).json(newVocabulary);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const getVocabularyById = async (req, res) => {
  try {
    const { vid } = req.params;
    const vocabulary = await Vocabulary.findById(vid);
    if (vocabulary) {
      res.status(200).json(vocabulary);
    } else {
      res.status(400).json("Can't find the vocabulary with given ID.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("Something went wrong with the server. Try again.");
  }
};

const getVocabulariesByResources = async (req, res) => {
  try {
    const { resources } = req.params;
    const vocabularies = await Vocabulary.find({
      resource: resources.split("&"),
    });
    res.status(200).json(vocabularies);
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
};

exports.getAllVocabulariesByUserId = getAllVocabulariesByUserId;
exports.getVocabulariesByUserId = getVocabulariesByUserId;
exports.getVocabulariesBySearchQuery = getVocabulariesBySearchQuery;
exports.addNewVocabulary = addNewVocabulary;
exports.getVocabularyById = getVocabularyById;
exports.getVocabulariesByResources = getVocabulariesByResources;
