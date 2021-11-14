const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  vocabulary: { type: String, required: true },
  definition: { type: String, required: true },
  exampleSentences: [{ type: String }],
  note: { type: String },
  timeStamp: { type: Date, default: Date.now },
  resource: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Vocabulary", vocabularySchema);
