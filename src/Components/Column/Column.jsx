import React, { useState } from "react";
import Task from "../Task/Task";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import styles from "./Column.module.css";
import { Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useRef } from "react";

const Column = ({
  title,
  issues,
  addTask,
  moveTask,
  deleteTask,
  columns,
  previousColumnIssues,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const selectRef = useRef(null);

  const handleAddTask = (task) => {
    if (title === "Backlog") {
      addTask(title, task);
    } else {
      const selectedTask = previousColumnIssues.find(
        (issue) => issue.id === selectedTaskId
      );
      if (selectedTask) {
        moveTask(selectedTask.column, title, selectedTask.id);
      }
    }
    setShowForm(false);
    setSelectedTaskId(null);
  };

  const handleMoveTask = (taskId, newColumn) => {
    moveTask(title, newColumn, taskId);
  };

  const handleDeleteTask = (taskId) => {
    deleteTask(title, taskId);
  };

  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "5px",
      border: "1px solid #ccc",
      padding: "4px",
      width: "100%",
      marginTop: "12px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#0079bf" : "#fff",
      color: state.isSelected ? "#fff" : "#000",
      padding: "8px",
      wordWrap: "break-word",
    }),
  };

  return (
    <Col className={styles.column__card} key={title}>
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
        title === "Backlog" ? (
          <AddTaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            <Select
              ref={selectRef}
              className={styles.form__select}
              options={previousColumnIssues.map((issue) => ({
                value: issue.id,
                label: issue.name,
              }))}
              value={
                selectedTaskId
                  ? {
                      value: selectedTaskId,
                      label: previousColumnIssues.find(
                        (issue) => issue.id === selectedTaskId
                      ).name,
                    }
                  : null
              }
              onChange={(selectedOption) =>
                setSelectedTaskId(selectedOption.value)
              }
              styles={customSelectStyles}
              placeholder="Выберите задачу"
              menuPortalTarget={document.body}
              menuPosition="fixed"
            />
            <div className={styles.form__buttons}>
              <button className={styles.form__button} type="submit">
                Подтвердить
              </button>
              <button
                className={styles.form__button}
                type="button"
                onClick={() => setShowForm(false)}
              >
                Отменить
              </button>
            </div>
          </Form>
        )
      ) : (
        <button
          className={styles.column__add}
          onClick={() => setShowForm(true)}
          disabled={
            title !== "Backlog" &&
            (!previousColumnIssues || previousColumnIssues.length === 0)
          }
        >
          + Add card
        </button>
      )}
    </Col>
  );
};

export default Column;
