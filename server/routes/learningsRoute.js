const route = require("express").Router();
const learningsController = require("../controllers/learningsController");

route.post("/:uid/:vid", learningsController.addVocabularyToLearning);
route.delete("/:uid/:vid", learningsController.removeVocabularyFromLearning);

module.exports = route;
