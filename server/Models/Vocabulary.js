const mongoose = require("mongoose");

const vocabularySchema = new mongoose.Schema({
  vocabulary: { type: String, required: true },
  defination: { type: String, required: true },
  exampleSentences: [{ type: String }],
  note: { type: String },
  timeStamp: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Vocabulary", vocabularySchema);
