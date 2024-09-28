// src/Components/AdminPanel/AdminPanel.jsx
import React, { useState, useEffect } from "react";
import { initializeUsers } from "../../api/auth";
import styles from "./AdminPanel.module.css";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  useEffect(() => {
    setUsers(initializeUsers());
  }, []);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = { username, password, role };
    setUsers([...users, newUser]);
    setUsername("");
    setPassword("");
    setRole("user");
    handleCloseModal();
  };

  const handleDeleteUser = (username) => {
    const updatedUsers = users.filter((user) => user.username !== username);
    setUsers(updatedUsers);
  };

  const getBackgroundColor = (role) => {
    switch (role) {
      case "admin":
        return "rgb(82 226 82)"; // Зеленый
      case "user":
        return "rgb(245 245 76)"; // Желтый
      case "test":
        return "rgb(255 128 128)"; // Красный
      default:
        return "#FFFFFF"; // Белый (по умолчанию)
    }
  };

  return (
    <Container fluid className={styles.adminPanel}>
      <Container className={styles.adminPanel__container}>
        <Row>
          <Col>
            <h1 className={styles.adminPanel__title}>Панель Администратора</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Пользователи</h3>
            <ul>
              {users.map((user, index) => (
                <li
                  className={styles.adminPanel__user}
                  key={index}
                  style={{ backgroundColor: getBackgroundColor(user.role) }}
                >
                  <p className={styles.adminPanel__userText}>
                    {user.username} - {user.role}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteUser(user.username)}
                    className={styles.adminPanel__deleteButton}
                  >
                    Удалить
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
          <Col className={styles.adminPanel__button_wrapper}>
            <button
              type="button"
              className={styles.adminPanel__button}
              onClick={handleShowModal}
            >
              <p className={styles.adminPanel__plus}>+</p>
            </button>
            <p className={styles.adminPanel__text}>Добавить пользователя</p>
          </Col>
        </Row>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить нового пользователя</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className={styles.form__add} onSubmit={handleSubmit}>
              <Form.Group controlId="formUsername">
                <Form.Label>Логин</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите логин"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Пароль</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Роль</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="admin">Админ</option>
                  <option value="user">Пользователь</option>
                  <option value="test">Тест</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Добавить
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </Container>
  );
};

export default AdminPanel;
