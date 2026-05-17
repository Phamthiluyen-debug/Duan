const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 3001;

// CORS
app.use(cors());

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
routes(app);

// ✅ Kết nối MongoDB (ĐÚNG CHUẨN Mongoose 6+)
mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("Connect Db success!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Start server
app.listen(port, () => {
  console.log("Server is running on port:", port);
});
console.log("MONGO_DB:", process.env.MONGO_DB);


