const mongoose = require("mongoose");

const notiSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vocabulary: { type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" },
  action: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notiSchema);
