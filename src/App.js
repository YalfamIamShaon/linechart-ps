import "./App.css";
import { Routes, Route } from "react-router-dom";
import LineChart from "./Chart/LineChart";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LineChart />} />
      </Routes>
    </div>
  );
}

export default App;
