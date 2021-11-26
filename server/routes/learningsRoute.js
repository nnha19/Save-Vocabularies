const route = require("express").Router();
const learningsController = require("../controllers/learningsController");

route.get("/:uid", learningsController.getLearningsByUserId);
route.post("/:uid/:vid", learningsController.addVocabularyToLearning);

module.exports = route;
