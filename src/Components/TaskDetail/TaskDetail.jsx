import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./TaskDetail.module.css";
import { Col, Container, Row } from "react-bootstrap";

const TaskDetail = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("kanbanData"));
    if (savedData) {
      const task = savedData
        .flatMap((column) => column.issues)
        .find((task) => task.id === parseInt(taskId));
      setTask(task);
    }
  }, [taskId]);

  useEffect(() => {
    if (task) {
      const interval = setInterval(() => {
        const dueDate = new Date(task.dueDate);
        const now = new Date();
        const timeDiff = dueDate - now;

        if (timeDiff <= 0) {
          setTimeLeft("Time's up!");
          clearInterval(interval);
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          setTimeLeft(`${days}д: ${hours}ч: ${minutes}м: ${seconds}сек`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [task]);

  if (!task) {
    return <div>Скорость загрузки зависит от вашего интернета...</div>;
  }

  return (
    <Container fluid className={styles.taskDetail__fluid}>
      <Container className={styles.taskDetail__container}>
        <Container className={styles.taskDetail}>
          <Row className={styles.taskDetail__info}>
            <Col className={styles.taskDetail__back}>
              <Link className={styles.taskDetail__back_link} to="/"></Link>
            </Col>

            <Col className={styles.taskDetail__title}>
              <h2>{task.name}</h2>
            </Col>

            <Col className={styles.taskDetail__description}>
              <p>{task.description}</p>
            </Col>
          </Row>
          <Row className={styles.taskDetail__info_date}>
            <Col>
              <p
                className={
                  styles.taskDetail__date + " " + styles.taskDetail__start
                }
              >
                Дата создания: {new Date(task.createdAt).toLocaleString()}
              </p>
            </Col>
            <Col>
              <p
                className={
                  styles.taskDetail__date + " " + styles.taskDetail__end
                }
              >
                Дата окончания: {new Date(task.dueDate).toLocaleString()}
              </p>
            </Col>
            <Col>
              <p
                className={
                  styles.taskDetail__date + " " + styles.taskDetail__time
                }
              >
                Осталось: {timeLeft}
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </Container>
  );
};

export default TaskDetail;
