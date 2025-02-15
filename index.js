require("dotenv").config()
const express = require('express');
const cors = require('cors');
const { connectDB } = require("./config/db");
connectDB()
const PORT = 8080
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    message: "Juda ko'p so'rov yubordingiz, keyinroq urinib ko'ring",
});

const app = express();
app.use(limiter);
app.use(express.json());
app.use(cors());

app.use("/", require("./routes/index"))

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT}/ da ishlamoqda`)
});