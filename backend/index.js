require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/database/db");
const homeRoutes = require("./src/routes/homeRoutes");
const registerRoutes = require("./src/routes/registerRoutes");
const loginRoutes = require("./src/routes/loginRoutes");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

//connect to database
connectToDB();

//route_test
app.get("/", (req, res) => {
  return res.status(200).json({
    data: "Route is working",
  });
});

//routes
app.use(registerRoutes);
app.use(loginRoutes);
app.use(homeRoutes);

//get port from .env
const PORT = process.env.PORT || 8001;

//connection to server
app.listen(PORT, () => {
  console.log(`server is connected successfully at port ${PORT}`);
});
