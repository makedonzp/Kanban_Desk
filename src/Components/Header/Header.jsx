import React, { useState } from "react";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.css";
import { Col, Container, Row } from "react-bootstrap";
import user__icon from "../../assets/user-avatar.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <Container>
        <Row>
          <Col className={styles.header__title_wrapper}>
            <Link to="/" className={styles.header__title_link}>
              <h1 className={styles.header__title}>Awesome Kanban Board</h1>
            </Link>
          </Col>
          <Col
            className={styles.user_wraper}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <img className={styles.user__icon} src={user__icon} alt="" />{" "}
            <span className={styles.user__icon_up_down}>
              {isMenuOpen ? "▲" : "▼"}
            </span>
            {isMenuOpen && <UserMenu />}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
