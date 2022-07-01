const mongoose = require("mongoose");

const graphSchema = new mongoose.Schema({
  date: String,
  set_data: [
    {
      time: Array,
      countTask: [],
    },
  ],
});
const Graph = mongoose.model("Graph", graphSchema);
module.exports = Graph;
