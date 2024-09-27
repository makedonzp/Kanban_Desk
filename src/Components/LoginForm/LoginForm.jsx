// src/Components/LoginForm/LoginForm.jsx
import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import { Col, Container, Row } from "react-bootstrap";

const LoginForm = ({ onLogin, errorMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <Container fluid className={styles.loginForm}>
      <Row>
        <Col className={styles.loginForm__container}>
          <h2 className={styles.loginForm__title}>Kanban Desk</h2>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <input
                type="text"
                id="username"
                placeholder="Логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Войти
            </button>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
