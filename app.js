const express = require("express");
const app = express();
const mongoose = require("mongoose");
const blogRouter = require("./routes/blog-routes")

// Connection to the MongoDB database
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sistem_informasi_online", // Specify your database name
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB: " + err);
    });

// Middleware to parse JSON data
app.use(express.json());
app.use("/api/v1/blogs", blogRouter);
// Define your routes and other middleware as needed

// Start the server
const port = process.env.PORT || 3000; // Use the provided PORT or default to 3001
app.listen(port, () => {
    console.log("Server is running on port " + port);
});

module.exports = app;
