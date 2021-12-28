import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "./style/app.scss";
import { Kalendar } from "./Components/Kalendar";

function App() {
  return (
    <div className="App">
      <a href="/zvone">kalendar</a>
      <Router>
        <Routes>
          <Route>
            <Route path="/zvone" element={<Kalendar />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
