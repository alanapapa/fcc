require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {postURL, redirectOrigin} = require('./controllers/shortUrlController');

const app = express();
mongoose.connect(process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log(error);
    console.log("connection to the DB successful");
  }
);

//MW
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/public", express.static(`${process.cwd()}/public`));

//routes
app.get("/", (req, res) => res.sendFile(process.cwd() + "/views/index.html"));
app.post("/api/shorturl", postURL);
app.get("/api/shorturl/:id", redirectOrigin);

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
