import React, { useEffect, useState, useCallback } from "react";
import Column from "../Column/Column";
import styles from "./Board.module.css";
import { Container, Row, Modal, Button } from "react-bootstrap";

const Board = ({ setActiveTasks, setFinishedTasks }) => {
  const initialData = [
    { title: "Backlog", issues: [] },
    { title: "Ready", issues: [] },
    { title: "In Progress", issues: [] },
    { title: "Finished", issues: [] },
  ];

  const [data, setData] = useState(initialData);
  const [showAutoDeleteModal, setShowAutoDeleteModal] = useState(false);
  const columns = initialData.map((column) => column.title);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("kanbanData"));
    if (savedData) {
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
          issues: [
            ...toTasks,
            {
              ...task,
              column: toColumn,
              movedToFinishedAt: toColumn === "Finished" ? Date.now() : null,
            },
          ],
        };
      }
      return column;
    });
    setData(newData);
    localStorage.setItem("kanbanData", JSON.stringify(newData));

    if (toColumn === "Finished") {
      setShowAutoDeleteModal(true);
    }
  };

  const deleteTask = useCallback(
    (columnTitle, taskId) => {
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
    },
    [data]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const finishedColumn = data.find((col) => col.title === "Finished");
      if (finishedColumn) {
        const now = Date.now();
        const tasksToDelete = finishedColumn.issues.filter(
          (task) =>
            task.movedToFinishedAt &&
            now - task.movedToFinishedAt >= 24 * 60 * 60 * 1000
        );
        tasksToDelete.forEach((task) => deleteTask("Finished", task.id));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data, deleteTask]);

  const getPreviousColumnIssues = (currentColumnIndex) => {
    if (currentColumnIndex === 0) return []; // Первая колонка не имеет предыдущей
    return data[currentColumnIndex - 1].issues;
  };

  return (
    <Container className={styles.board}>
      <Row className={styles.board__row}>
        {data.map((column, index) => (
          <Column
            key={column.title}
            title={column.title}
            issues={column.issues}
            addTask={addTask}
            moveTask={moveTask}
            deleteTask={deleteTask}
            columns={columns}
            previousColumnIssues={getPreviousColumnIssues(index)}
          />
        ))}
      </Row>
      <Modal
        show={showAutoDeleteModal}
        onHide={() => setShowAutoDeleteModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Внимание</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Задание будет автоматически удалено через 24 часа.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => setShowAutoDeleteModal(false)}
          >
            Понятно
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Board;
