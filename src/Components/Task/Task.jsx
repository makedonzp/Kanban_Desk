import React from "react";
import { Link } from "react-router-dom";
import styles from "./Task.module.css";
import deleteIcon from "../../assets/delete_icon.png";

const Task = ({ task, deleteTask }) => {
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
      <Link to={`/task/${task.id}`} className={styles.task__name}>
        {typeof task.name === "object" ? JSON.stringify(task.name) : task.name}
      </Link>
      <div className={styles.task__controls}>
        <button className={styles.task__delete} onClick={handleDelete}>
          <img src={deleteIcon} alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default Task;
