import React from "react";
import { Link } from "react-router-dom";
import styles from "./Task.module.css";
import deleteIcon from "../../assets/delete_icon.png"; // Путь к иконке удаления

const Task = ({ task, moveTask, deleteTask, columns }) => {
  console.log("Task component rendered with task:", task);

  const handleMove = (e) => {
    const newColumn = e.target.value;
    moveTask(task.id, newColumn);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  // Определение цвета фона в зависимости от статуса задания
  const getBackgroundColor = () => {
    switch (task.column) {
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
    <div
      className={styles.task}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div className={styles.task__controls}>
        <select
          className={styles.task__select}
          onChange={handleMove}
          value={task.column}
        >
          {columns.map((column) => (
            <option key={column} value={column}>
              {column}
            </option>
          ))}
        </select>
        <button className={styles.task__delete} onClick={handleDelete}>
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
      <Link to={`/tasks/${task.id}`} className={styles.task__name}>
        {typeof task.name === "object" ? JSON.stringify(task.name) : task.name}
      </Link>
    </div>
  );
};

export default Task;
