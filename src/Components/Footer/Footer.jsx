import React from "react";
import styles from "./Footer.module.css";
import { Col, Container, Row } from "react-bootstrap";

const Footer = ({ activeTasks, finishedTasks }) => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col className={styles.footer__title_wrapper}>
            <p className={styles.footer__title}>Active tasks: {activeTasks}</p>

            <p className={styles.footer__title}>
              Finished tasks: {finishedTasks}
            </p>
          </Col>
          <Col>
            <p className={styles.footer__title}>
              Kanban board by Spichka A , 2024
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
