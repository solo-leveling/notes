require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./db");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Connect to database
connectToDB();

// Routes
app.get("/", (req, res) => {
  res.json({ data: "hello, welcome" });
});

// Import user routes
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

module.exports = app;
