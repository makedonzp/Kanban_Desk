// src/Components/Layout/Layout.jsx
import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Board from "../Board/Board";
import TaskDetail from "../TaskDetail/TaskDetail";
import Profile from "../Profile/Profile";
import { Container } from "react-bootstrap";

const Layout = () => {
  const [activeTasks, setActiveTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);

  const routes = useRoutes([
    {
      path: "/",
      element: (
        <Board
          setActiveTasks={setActiveTasks}
          setFinishedTasks={setFinishedTasks}
        />
      ),
    },
    { path: "task/:taskId", element: <TaskDetail /> },
    { path: "profile", element: <Profile /> },
  ]);

  return (
    <Container fluid className={styles.layout}>
      <Header />
      {routes}
      <Footer activeTasks={activeTasks} finishedTasks={finishedTasks} />
    </Container>
  );
};

export default Layout;
