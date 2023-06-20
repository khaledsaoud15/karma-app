const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./controllers/auth.controller");

app.use(express.json());
dotenv.config();
app.use(cors());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("db is running"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 3000;

app.use("/api/", auth);

app.listen(port, () => {
  console.log(`server is running on port: http://localhost:${port}`);
});
