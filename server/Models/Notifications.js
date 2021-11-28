const mongoose = require("mongoose");

const notiSchema = new mongoose.Schema({
  notification: { type: String, required: true },
});

module.exports = mongoose.model("Notification", notiSchema);
