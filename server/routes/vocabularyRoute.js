const route = require("express").Router();
const vocabularyController = require("../controllers/vocabularyController");

route.get("/:uid", vocabularyController.getVocabulariesByUserId);
route.get("/vocabulary/:vid", vocabularyController.getVocabularyById);
route.post("/:uid", vocabularyController.addNewVocabulary);

module.exports = route;
