// src/Components/UserMenu/UserMenu.jsx
import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  return (
    <ul className={styles.userMenu}>
      <li>
        <Link to="/profile" className={styles.userMenu__link}>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/logout" className={styles.userMenu__link}>
          Logout
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;
