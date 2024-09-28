import React, { useState, useEffect, useRef } from "react";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.css";
import { Col, Container, Row, Modal, Button } from "react-bootstrap";
import user__icon from "../../assets/user-avatar.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [overdueTasksCount, setOverdueTasksCount] = useState(0);
  const [showOverdueTasksModal, setShowOverdueTasksModal] = useState(false);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("kanbanData"));
    if (savedData) {
      const overdueTasks = savedData
        .flatMap((column) => column.issues)
        .filter((task) => new Date(task.dueDate) < new Date());
      setOverdueTasksCount(overdueTasks.length);
      setOverdueTasks(overdueTasks);
    }
  }, []);

  const handleOverdueTasksClick = (event) => {
    event.stopPropagation(); // Предотвращаем закрытие меню пользователя
    setShowOverdueTasksModal(true);
  };

  return (
    <header className={styles.header}>
      <Container>
        <Row>
          <Col className={styles.header__title_wrapper}>
            <Link to="/" className={styles.header__title_link}>
              <h1 className={styles.header__title}>Awesome Kanban Board</h1>
            </Link>
          </Col>
          <Col
            className={styles.user_wraper}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            ref={menuRef}
          >
            <img className={styles.user__icon} src={user__icon} alt="" />{" "}
            <span className={styles.user__icon_up_down}>
              {isMenuOpen ? "▲" : "▼"}
            </span>
            <div
              className={styles.user__overdue_count}
              onClick={handleOverdueTasksClick}
            >
              {overdueTasksCount > 0 && (
                <span className={styles.notificationBadge}>
                  {overdueTasksCount}
                </span>
              )}
            </div>
            {isMenuOpen && <UserMenu />}
          </Col>
        </Row>
      </Container>
      <Modal
        show={showOverdueTasksModal}
        onHide={() => setShowOverdueTasksModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Просроченные задачи</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {overdueTasks.length > 0 ? (
            overdueTasks.map((task) => (
              <div key={task.id}>
                <h3>{task.name}</h3>
                <p>Дата окончания: {new Date(task.dueDate).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>Нет просроченных задач</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowOverdueTasksModal(false)}
          >
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
};

export default Header;
