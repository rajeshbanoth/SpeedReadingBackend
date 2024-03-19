const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGOURL;

console.log(MONGODB_URI,"url")

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  });

module.exports = mongoose.connection;
