import React from "react";
import { Link } from "react-router-dom";
import styles from "./Task.module.css";
import deleteIcon from "../../assets/delete_icon.png";

const Task = ({ task, moveTask, deleteTask, columns }) => {
  const handleMove = (e) => {
    const newColumn = e.target.value;
    moveTask(task.id, newColumn);
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const getBackgroundColor = () => {
    switch (task.column) {
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
      <Link to={`/task/${task.id}`} className={styles.task__name}>
        {typeof task.name === "object" ? JSON.stringify(task.name) : task.name}
      </Link>
    </div>
  );
};

export default Task;
