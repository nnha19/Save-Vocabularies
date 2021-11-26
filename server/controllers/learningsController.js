const getLearningsByUserId = (req, res) => {
  res.send("Get LEarning");
};

const addVocabularyToLearning = (req, res) => {
  res.send("Add this word to learning");
};

exports.getLearningsByUserId = getLearningsByUserId;
exports.addVocabularyToLearning = addVocabularyToLearning;
