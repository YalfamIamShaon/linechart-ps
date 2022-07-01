const express = require("express");
const connectDb = require("../src/db/conn");
connectDb();
const Task = require("../src/models/tasks");
const Graph = require("./models/graph");

const app = express();
const port = process.env.PORT || 5100;

// to handle CORS

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,PATCH,POST,DELETE,OPTIONS"
  );
  next();
});

app.use(express.json());

app.post("/tasks", async (req, res) => {
  try {
    const today = new Date();
    var time = today.getHours();
    const addingTasks = new Task(req.body);
    const showTasks = await addingTasks.save();
    const graph = await Graph.findOne({ date: req.body.date });

    if (graph !== null) {
      const Assigned = await Task.find({
        taskStatus: "Assigned",
      }).countDocuments();

      const Closed = await Task.find({ taskStatus: "Closed" }).countDocuments();

      const Resolved = await Task.find({
        taskStatus: "Resolved",
      }).countDocuments();
      const Unassigned = await Task.find({
        taskStatus: "Unassigned",
      }).countDocuments();
      graph.set_data.push({
        time: time,
        countTask: {
          Unassigned: Unassigned,
          Assigned: Assigned,
          Closed: Closed,
          Resolved: Resolved,
        },
      });
      await graph.save();
    } else {
      const newGraph = await Graph.create({ date: req.body.date });

      const Assigned = await Task.find({
        taskStatus: "Assigned",
      }).countDocuments();
      const Closed = await Task.find({ taskStatus: "Closed" }).countDocuments();
      const Resolved = await Task.find({
        taskStatus: "Resolved",
      }).countDocuments();
      const Unassigned = await Task.find({
        taskStatus: "Unassigned",
      }).countDocuments();
      newGraph.set_data.push({
        time: time,
        countTask: {
          Unassigned: Unassigned,
          Assigned: Assigned,
          Closed: Closed,
          Resolved: Resolved,
        },
      });
      await newGraph.save();
    }
    res.status(201).send(showTasks);
    // it will show the task in postman console
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get("/graph", async (req, res) => {
  try {
    const getGraph = await Graph.find({});
    res.send(getGraph);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log(`connection is live at port ${port}`);
});
