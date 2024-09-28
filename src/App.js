// src/App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import {
  checkCredentials,
  getUserRole,
  checkAutoLogin,
  setAutoLoginFlag,
  setLoginTime,
  checkTestAccountTime,
} from "./api/auth";
import LoginForm from "./Components/LoginForm/LoginForm";
import Layout from "./Components/Layout/Layout";
import Logout from "./Components/Logout/Logout";
import AdminPanel from "./Components/AdminPanel/AdminPanel";
import styles from "./App.module.css";
import { Container, Modal, Button } from "react-bootstrap";

const LOGIN_TIME_KEY = "loginTime";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [showTestAccountModal, setShowTestAccountModal] = useState(false);

  useEffect(() => {
    const autoLogin = checkAutoLogin();
    const user = JSON.parse(localStorage.getItem("user"));
    if (autoLogin && user) {
      setIsAuthenticated(true);
      const role = getUserRole(user.username);
      setUserRole(role);
      if (role === "test") {
        setShowTestAccountModal(true);
      }
    } else {
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAuthenticated && userRole === "test" && !checkTestAccountTime()) {
        handleLogout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, userRole]);

  const handleLogin = async (username, password) => {
    console.log(
      "Attempting login with username:",
      username,
      "and password:",
      password
    );
    if (await checkCredentials(username, password)) {
      const user = { username, password };
      localStorage.setItem("user", JSON.stringify(user));
      setAutoLoginFlag(true);
      setLoginTime();
      console.log("Login successful, setting isAuthenticated to true");
      setIsAuthenticated(true);
      const role = await getUserRole(username);
      setUserRole(role);
      setErrorMessage("");
      if (role === "test") {
        setShowTestAccountModal(true);
      }
    } else {
      console.log("Login failed, setting error message");
      setErrorMessage("Для входа обратитесь к создателю проекта");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem(LOGIN_TIME_KEY);
    setAutoLoginFlag(false);
    console.log("Logout successful, setting isAuthenticated to false");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Container fluid className={styles.app}>
      <Modal
        show={showTestAccountModal}
        onHide={() => setShowTestAccountModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Внимание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Данный аккаунт является тестовым, поэтому время использования
          ограничено 10 минутами.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowTestAccountModal(false)}
          >
            Понятно
          </Button>
        </Modal.Footer>
      </Modal>
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
          path="/admin"
          element={
            isAuthenticated && userRole === "admin" ? (
              <AdminPanel />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
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
