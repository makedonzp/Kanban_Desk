// src/Components/Board/Board.jsx
import React, { useEffect, useState, useCallback } from "react";
import Column from "../Column/Column";
import styles from "./Board.module.css";
import { Container, Row } from "react-bootstrap";

const Board = ({ setActiveTasks, setFinishedTasks }) => {
  const initialData = [
    { title: "Backlog", issues: [] },
    { title: "Ready", issues: [] },
    { title: "In Progress", issues: [] },
    { title: "Finished", issues: [] },
  ];

  const [data, setData] = useState(initialData);
  const columns = initialData.map((column) => column.title);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("kanbanData"));
    if (savedData) {
      console.log("Loaded data from localStorage:", savedData);
      setData(savedData);
    }
  }, []);

  const updateTaskCounts = useCallback(() => {
    const backlogTasks = data.find((col) => col.title === "Backlog").issues
      .length;
    const finishedTasks = data.find((col) => col.title === "Finished").issues
      .length;
    setActiveTasks(backlogTasks);
    setFinishedTasks(finishedTasks);
  }, [data, setActiveTasks, setFinishedTasks]);

  useEffect(() => {
    updateTaskCounts();
  }, [data, updateTaskCounts]);

  const addTask = (columnTitle, task) => {
    const newData = data.map((column) => {
      if (column.title === columnTitle) {
        return {
          ...column,
          issues: [
            ...column.issues,
            {
              id: Date.now(),
              ...task,
              column: columnTitle,
            },
          ],
        };
      }
      return column;
    });
    setData(newData);
    localStorage.setItem("kanbanData", JSON.stringify(newData));
  };

  const moveTask = (fromColumn, toColumn, taskId) => {
    const fromTasks = data.find((col) => col.title === fromColumn).issues;
    const toTasks = data.find((col) => col.title === toColumn).issues;
    const task = fromTasks.find((task) => task.id === taskId);
    const newData = data.map((column) => {
      if (column.title === fromColumn) {
        return {
          ...column,
          issues: fromTasks.filter((task) => task.id !== taskId),
        };
      }
      if (column.title === toColumn) {
        return {
          ...column,
          issues: [...toTasks, { ...task, column: toColumn }],
        };
      }
      return column;
    });
    setData(newData);
    localStorage.setItem("kanbanData", JSON.stringify(newData));
  };

  const deleteTask = (columnTitle, taskId) => {
    const newData = data.map((column) => {
      if (column.title === columnTitle) {
        return {
          ...column,
          issues: column.issues.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });
    setData(newData);
    localStorage.setItem("kanbanData", JSON.stringify(newData));
  };

  return (
    <Container className={styles.board}>
      <Row className={styles.board__row}>
        {data.map((column) => (
          <Column
            key={column.title}
            title={column.title}
            issues={column.issues}
            addTask={addTask}
            moveTask={moveTask}
            deleteTask={deleteTask}
            columns={columns}
          />
        ))}
      </Row>
    </Container>
  );
};

export default Board;
