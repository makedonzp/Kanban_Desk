const users = [
  { username: "makedonzp", password: "rfinfyrf123", role: "admin" },
  { username: "Anna", password: "123321", role: "user" },
  { username: "melix", password: "123321", role: "user" },
  { username: "test", password: "test", role: "test" },
  { username: "admin", password: "admin", role: "admin" },
  { username: "user", password: "user", role: "user" },
];

export const initializeUsers = () => {
  return users;
};

export const checkCredentials = (username, password) => {
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  return !!user;
};

export const getUserRole = (username) => {
  const user = users.find((user) => user.username === username);
  return user ? user.role : null;
};

export const checkAutoLogin = () => {
  const autoLoginFlag = localStorage.getItem("autoLoginFlag");
  return autoLoginFlag !== "false";
};

export const setAutoLoginFlag = (flag) => {
  localStorage.setItem("autoLoginFlag", flag);
};

export const setLoginTime = () => {
  localStorage.setItem("loginTime", Date.now());
};

export const getLoginTime = () => {
  return parseInt(localStorage.getItem("loginTime")) || 0;
};

export const checkTestAccountTime = () => {
  const loginTime = getLoginTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - loginTime;
  return timeDifference < 10 * 60 * 1000;
};
