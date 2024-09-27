import React, { useState } from "react";
import Task from "../Task/Task";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import styles from "./Column.module.css";
import { Col } from "react-bootstrap";

const Column = ({ title, issues, addTask, moveTask, deleteTask, columns }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAddTask = (task) => {
    addTask(title, task);
    setShowForm(false);
  };

  const handleMoveTask = (taskId, newColumn) => {
    moveTask(title, newColumn, taskId);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(title, taskId);
  };

  return (
    <Col className={styles.column__card}>
      <h2 className={styles.column__title}>{title}</h2>
      <div className={styles.tasks__container}>
        {issues.map((task) => (
          <Task
            key={task.id}
            task={task}
            moveTask={handleMoveTask}
            deleteTask={handleDeleteTask}
            columns={columns}
          />
        ))}
      </div>
      {showForm ? (
        <AddTaskForm
          onSubmit={handleAddTask}
          onCancel={() => setShowForm(false)}
        />
      ) : (
        <button
          className={styles.column__add}
          onClick={() => setShowForm(true)}
        >
          + Add card
        </button>
      )}
    </Col>
  );
};

export default Column;
