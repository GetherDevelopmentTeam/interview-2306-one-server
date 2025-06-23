const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/databse");
const corsMiddleware = require("./middleware/cors");
const app = express();

const port = 5702;

dotenv.config();
connectDB();
app.use(corsMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
    next();
  });
}

app.use("/api/events", require("./routes/event"));

// Health Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
const PORT = process.env.PORT || port;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module;
