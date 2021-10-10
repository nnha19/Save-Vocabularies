const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");

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
app.use(userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server has started on ${PORT}`);
});
