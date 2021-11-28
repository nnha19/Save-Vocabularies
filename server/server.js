const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

const learningsRoute = require("./routes/learningsRoute");
const userRoute = require("./routes/userRoute");
const vocabularyRoute = require("./routes/vocabularyRoute");
const notificationsRoute = require("./routes/notificationsRoute");

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use("/learnings", learningsRoute);
app.use("/vocabulary", vocabularyRoute);
app.use("/notification", notificationsRoute);
app.use(userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server has started on ${PORT}`);
});
