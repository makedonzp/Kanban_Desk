import React from "react";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";
import { getUserRole } from "../../api/auth";

const UserMenu = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = getUserRole(user.username);

  return (
    <ul className={styles.userMenu}>
      <li>
        <Link to="/profile" className={styles.userMenu__link}>
          Профиль
        </Link>
      </li>
      {userRole === "admin" && (
        <li>
          <Link to="/admin" className={styles.userMenu__link}>
            Админпанель
          </Link>
        </li>
      )}
      <li>
        <Link to="/logout" className={styles.userMenu__link}>
          Выйти
        </Link>
      </li>
    </ul>
  );
};

export default UserMenu;
