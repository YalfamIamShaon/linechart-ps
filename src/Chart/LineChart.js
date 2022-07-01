import React from "react";
import { Line } from "react-chartjs-2";
import { useEffect } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  /* let data = []; */
  let assigned = [];
  let unassigned = [];
  let closed = [];
  let resolved = [];
  let time = [];
  const show = () => {
    try {
      const url = `http://localhost:5100/graph`;
      axios.get(url).then(async (res) => {
        const setData = res.data[0].set_data.length;
        for (let i = 0; i < setData; i++) {
          /* console.log(res.data[0].set_data[i].countTask[0].Assigned);
          console.log(res.data[0].set_data[i].countTask[0].Unassigned);
          console.log(res.data[0].set_data[i].countTask[0].Closed);
          console.log(res.data[0].set_data[i].countTask[0].Resolved); */

          /* data.push({
            unassigned: res.data[0].set_data[i].countTask[0].Unassigned,
            assigned: res.data[0].set_data[i].countTask[0].Assigned,
            closed: res.data[0].set_data[i].countTask[0].Closed,
            resolved: res.data[0].set_data[i].countTask[0].Resolved,
            time: res.data[0].set_data[i].time,
          }); */

          unassigned.push(res.data[0].set_data[i].countTask[0].Unassigned);
          assigned.push(res.data[0].set_data[i].countTask[0].Assigned);
          resolved.push(res.data[0].set_data[i].countTask[0].Resolved);
          closed.push(res.data[0].set_data[i].countTask[0].Closed);
          time.push(res.data[0].set_data[i].time);
        }
        /* console.log(res.data[0].set_data[0].countTask);
        console.log(res.data[0].set_data[0].time); 
        console.log(setData); */
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    show();
  }, []);

  /*  console.log(unassigned);
  console.log(assigned); */
  /* console.log(data) */ /* console.log(closed); */

  return (
    <React.Fragment>
      <div className="container-fluid">
        <h1>Dynamic Line Chart</h1>
        <div className="row">
          <div className="col-md-5 mb-3 mt-3">
            {/* {names.map(name => <h2>{name}</h2>)} */}
            <Line
              data={{
                labels: time,
                datasets: [
                  {
                    label: "Unassigned",
                    data: unassigned,
                    borderColor: "yellow",
                    backgroundColor: "yellow",
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                  },
                  {
                    label: "Assigned",
                    data: assigned,
                    borderColor: "#4361ee",
                    backgroundColor: "#4361ee",
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                  },
                  {
                    label: "Closed",
                    data: closed,
                    borderColor: "red",
                    backgroundColor: "red",
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                  },
                  {
                    label: "Resolved",
                    data: resolved,
                    borderColor: "green",
                    backgroundColor: "green",
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                    position: "bottom",
                  },
                  title: {
                    display: true,
                    text: "Chart.js Line Chart",
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false, // will hide the grids in the background of the graph
                    },
                  },
                  y: {
                    grid: {
                      display: true,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default LineChart;
