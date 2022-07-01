const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const con = await mongoose.connect(
      "mongodb+srv://shaon:shaon123@cluster0.zhl1ddx.mongodb.net/tasks-api?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log("Connection successful");
  } catch (error) {
    console.log("Connection Error!");
    process.exit();
  }
};

module.exports = connectDb;

/*  shaon123        mongodb://localhost:27017/tasks-api*/
