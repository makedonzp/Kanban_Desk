// src/api/auth.js
const USERS_KEY = "users";
const AUTO_LOGIN_FLAG = "autoLoginFlag";
const LOGIN_TIME_KEY = "loginTime";

export const initializeUsers = () => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  if (users.length === 0) {
    const defaultUser = {
      username: "makedonzp",
      password: "32657845mn",
      role: "admin",
    };
    const userMelix = {
      username: "melix",
      password: "123321",
      role: "user",
    };
    const userAnna = {
      username: "Anna",
      password: "123321",
      role: "user",
    };
    users.push(defaultUser, userMelix, userAnna);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  return users;
};

export const checkCredentials = (username, password, users) => {
  return users.some(
    (user) => user.username === username && user.password === password
  );
};

export const addUser = (username, password, role = "user") => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const newUser = { username, password, role };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUsers = () => {
  return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
};

export const getUserRole = (username) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find((user) => user.username === username);
  return user ? user.role : null;
};

export const deleteUser = (username) => {
  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const updatedUsers = users.filter((user) => user.username !== username);
  localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
};

export const checkAutoLogin = () => {
  const autoLoginFlag = localStorage.getItem(AUTO_LOGIN_FLAG);
  return autoLoginFlag !== "false";
};

export const setAutoLoginFlag = (flag) => {
  localStorage.setItem(AUTO_LOGIN_FLAG, flag);
};

export const setLoginTime = () => {
  localStorage.setItem(LOGIN_TIME_KEY, Date.now());
};

export const getLoginTime = () => {
  return parseInt(localStorage.getItem(LOGIN_TIME_KEY)) || 0;
};

export const checkTestAccountTime = () => {
  const loginTime = getLoginTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - loginTime;
  return timeDifference < 10 * 60 * 1000;
};
