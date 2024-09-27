// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

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
        return "rgb(255 128 128)"; // Красный
      case "Ready":
        return "rgb(255 163 71)"; // Оранжевый
      case "In Progress":
        return "rgb(245 245 76)"; // Желтый
      case "Finished":
        return "rgb(82 226 82)"; // Зеленый
      default:
        return "#FFFFFF"; // Белый (по умолчанию)
    }
  };

  return (
    <div className={styles.profile}>
      <h2 className={styles.title}>Список личных Задач</h2>
      <div className={styles.taskList}>
        {tasks.map((task) => (
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
