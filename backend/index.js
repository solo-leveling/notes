require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config.json");
const jwt = require("jsonwebtoken");

mongoose.connect(config.connectionString);

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.get("/", (req, res) => {
  res.json({ data: "hello, welcome aa" });
  //   res.send("Hello");
});
app.post("/create-account", async (res, req) => {
  const { fullName, email, password } = req.body;

  if (!fullName) {
    res.status(400).json({
      error: true,
      message: "Something went wrong with name",
    });
  }

  if (!email) {
    res.status(400).json({
      error: true,
      message: "Something went wrong with email",
    });
  }

  if (!password) {
    res.status(400).json({
      error: true,
      message: "Something went wrong with password",
    });
  }
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`server is connected successfully at port ${PORT}`);
});

module.exports = app;
