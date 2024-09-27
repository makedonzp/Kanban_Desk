// src/App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { initializeUser, checkCredentials } from "./api/auth";
import LoginForm from "./Components/LoginForm/LoginForm";
import Layout from "./Components/Layout/Layout";
import Logout from "./Components/Logout/Logout";
import styles from "./App.module.css";
import { Container } from "react-bootstrap";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log("User found in localStorage:", user);
      setIsAuthenticated(true);
    } else {
      console.log("No user found in localStorage");
    }
  }, []);

  const handleLogin = (username, password) => {
    console.log(
      "Attempting login with username:",
      username,
      "and password:",
      password
    );
    initializeUser(); // Вызываем initializeUser при каждой попытке входа
    if (checkCredentials(username, password)) {
      const user = { username, password };
      localStorage.setItem("user", JSON.stringify(user));
      console.log("Login successful, setting isAuthenticated to true");
      setIsAuthenticated(true);
      setErrorMessage("");
    } else {
      console.log("Login failed, setting error message");
      setErrorMessage("Для входа обратитесь к создателю проекта");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    console.log("Logout successful, setting isAuthenticated to false");
    setIsAuthenticated(false);
  };

  return (
    <Container fluid className={styles.app}>
      <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <LoginForm onLogin={handleLogin} errorMessage={errorMessage} />
            )
          }
        />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
        <Route
          path="/*"
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/login" replace />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
