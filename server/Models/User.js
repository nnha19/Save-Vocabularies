const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  vocabularies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
  joinedDate: { type: Date },
  status: { type: String, required: true },
  learnings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Vocabulary" }],
  sendNotisTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Notification" },
  ],
});

module.exports = mongoose.model("User", userSchema);
