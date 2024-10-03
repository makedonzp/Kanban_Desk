import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";
import { Form } from "react-bootstrap";

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("kanbanData"));
    if (savedData) {
      const allTasks = savedData.flatMap((column) => column.issues);
      setTasks(allTasks);
    }
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseModal = () => {
    setSelectedTask(null);
  };

  const getBackgroundColor = (column) => {
    switch (column) {
      case "Backlog":
        return "rgb(255 128 128)";
      case "Ready":
        return "rgb(255 163 71)";
      case "In Progress":
        return "rgb(245 245 76)";
      case "Finished":
        return "rgb(82 226 82)";
      default:
        return "#FFFFFF";
    }
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      if (filter === "all") return true;
      if (filter === "overdue") return new Date(task.dueDate) < new Date();
      return task.column === filter;
    })
    .sort((a, b) => {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>Список личных Задач</h2>
      <Form.Group controlId="filter">
        <Form.Control
          as="select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className={styles.filter}
        >
          <option className={styles.filter__option} value="all">
            Все
          </option>
          <option className={styles.filter__option} value="overdue">
            Просроченные
          </option>
          <option className={styles.filter__option} value="Backlog">
            Backlog
          </option>
          <option className={styles.filter__option} value="Ready">
            Ready
          </option>
          <option className={styles.filter__option} value="In Progress">
            In Progress
          </option>
          <option className={styles.filter__option} value="Finished">
            Finished
          </option>
        </Form.Control>
      </Form.Group>
      <div className={styles.taskList}>
        {filteredAndSortedTasks.map((task) => (
          <div
            key={task.id}
            className={styles.taskItem}
            style={{ backgroundColor: getBackgroundColor(task.column) }}
            onClick={() => handleTaskClick(task)}
          >
            <h3>{task.name}</h3>
            <div className={styles.taskDetails}>
              <p>Дата создания: {new Date(task.createdAt).toLocaleString()}</p>
              <p>Дата окончания: {new Date(task.dueDate).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedTask && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={handleCloseModal}
            ></button>
            <h3>{selectedTask.name}</h3>
            <p className={styles.description}>{selectedTask.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
