const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskTitle: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Task = mongoose.model("Task", tasksSchema);
module.exports = Task;
