import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/" />}
        />
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/dashboard"
          element={
            <Home
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
