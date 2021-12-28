import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import "./style/app.scss";
import { Kalendar } from "./Components/Kalendar";
import { Services } from "./Components/AddService";

function App() {
  return (
    <div className="App">
      <a href="/zvone">kalendar</a>

      <a style={{ display: "block" }} href="/marsel">
        usluge
      </a>
      <Router>
        <Routes>
          <Route>
            <Route path="/zvone" element={<Kalendar />} />
          </Route>
          <Route>
            <Route path="/marsel" element={<Services />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
