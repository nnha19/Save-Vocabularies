const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
  joinedDate: { type: Date },
});

module.exports = mongoose.model("User", userSchema);
