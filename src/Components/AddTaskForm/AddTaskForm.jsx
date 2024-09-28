import React, { useState } from "react";
import styles from "./AddTaskForm.module.css";

const AddTaskForm = ({ onSubmit, onCancel }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      const task = {
        name: taskName,
        description: taskDescription,
        createdAt: new Date().toISOString(),
        dueDate: `${dueDate}T${dueTime}`,
      };
      onSubmit(task);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.form__input}
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="имя задания"
      />
      <textarea
        className={styles.form__input}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="описание задания"
      />
      <input
        className={styles.form__input}
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <input
        className={styles.form__input}
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
      />
      <div className={styles.form__buttons}>
        <button className={styles.form__button} type="submit">
          Подтвердить
        </button>
        <button
          className={styles.form__button}
          type="button"
          onClick={onCancel}
        >
          Отменить
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
