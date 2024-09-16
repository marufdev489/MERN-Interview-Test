import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Canvas } from "./components/canvas/Canvas";
import { AllCanvas } from "./components/all-canvas/AllCanvas";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<AllCanvas />} exact />
          <Route path="/add-canvas" element={<Canvas />} exact />
          <Route path="/canvas/:id" element={<Canvas />} exact />
        </Routes>
      </Router>
    </>
  );
}

export default App;
