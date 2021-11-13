const route = require("express").Router();
const vocabularyController = require("../controllers/vocabularyController");

route.get("/vocabulary/:vid/", vocabularyController.getVocabularyById);
route.get("/:uid/:page", vocabularyController.getVocabulariesByUserId);
route.post("/:uid", vocabularyController.addNewVocabulary);

module.exports = route;
