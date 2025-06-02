import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import React, { useState, Navigate } from "react";
import Pomodoro from "./pomodoro";
import Timer from "./timer";
import Stopwatch from "./stopwatch";

function App() {
  const [rblur, setRblur] = useState(false);

  return (
    <Router>
      <div className={`timer ${rblur ? "blur" : ""}`}>
        <div className="logo">Pomodoro</div>
        <nav className="navbar">
          <Link to="/pomodoro">Pomodoro</Link>
          <Link to="/timer">Timer</Link>
          <Link to="/stopwatch">Stopwatch</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/pomodoro" replace />} />
        <Route path="/pomodoro" element={<Pomodoro />} />
        <Route path="/timer" element={<Timer setRblur={setRblur} />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
      </Routes>
    </Router>
  );
}

export default App;
