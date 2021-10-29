const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const userRoute = require("./routes/userRoute");
const axios = require("axios");
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

const http = require("https");

const app_id = "214ad845"; // insert your APP Id
const app_key = "97a07562fa8162b4b1015c53a0094923"; // insert your APP Key
const wordId = "wonderful";
const strictMatch = "false";
const fields = "examples";

const options = {
  host: "od-api.oxforddictionaries.com",
  port: "443",
  path:
    "/api/v2/entries/en-gb/" +
    wordId +
    "?fields=" +
    fields +
    "&strictMatch=" +
    strictMatch,
  method: "GET",
  headers: {
    app_id: "214ad845",
    app_key: "97a07562fa8162b4b1015c53a0094923",
  },
};

http.get(options, (resp) => {
  let body = "";
  resp.on("data", (d) => {
    body += d;
  });
  resp.on("end", () => {
    let parsed = JSON.stringify(body);

    console.log(parsed);
  });
});

axios({
  method: "GET",
  url:
    "od-api.oxforddictionaries.com/api/v2/entries/en-gb/" +
    wordId +
    "?fields=" +
    fields +
    "&strictMatch=" +
    strictMatch,
  headers: {
    Accept: "application/json",
    app_id: "214ad845",
    app_key: "97a07562fa8162b4b1015c53a0094923",
  },
})
  .then((resp) => console.log(resp.data))
  .catch((err) => {
    console.log("Error occured.");
    // console.log(err);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server has started on ${PORT}`);
});
