const route = require("express").Router();
const vocabularyController = require("../controllers/vocabularyController");

const authMiddleware = require("../middlewares/authMiddleware");

route.use(authMiddleware);

route.get("/vocabulary/:vid/", vocabularyController.getVocabularyById);
route.get("/:uid/:page", vocabularyController.getVocabulariesByUserId);
route.post("/:uid", vocabularyController.addNewVocabulary);

module.exports = route;
