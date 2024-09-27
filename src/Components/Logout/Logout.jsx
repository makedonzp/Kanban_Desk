// src/Components/Logout/Logout.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Logout.module.css";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  useEffect(() => {
    onLogout();
    // Устанавливаем таймер на 5 секунд
    const timer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    // Очистка таймера при размонтировании компонента
    return () => clearTimeout(timer);
  }, [navigate, onLogout]);

  return (
    <div className={styles.logout}>
      <h2>Вы вышли из аккаунта</h2>
      <p>Вы будете перенаправлены на страницу входа через 5 секунд.</p>
    </div>
  );
};

export default Logout;
