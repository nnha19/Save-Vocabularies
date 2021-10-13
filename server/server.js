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

axios({
  url: `https://od-api.oxforddictionaries.com:443/api/v2/entries/EN-US/love`,
  headers: {
    ap_id: "214ad845",
    api_key: "97a07562fa8162b4b1015c53a0094923",
  },
})
  .then((resp) => console.log(resp))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server has started on ${PORT}`);
});
