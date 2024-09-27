// src/api/auth.js
export const initializeUser = () => {
  const user = {
    username: "skillfactory",
    password: "demo",
  };
  localStorage.setItem("user", JSON.stringify(user));
};

export const checkCredentials = (username, password) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(
    "Checking credentials with username:",
    username,
    "and password:",
    password
  );
  console.log("Stored user:", user);
  return user && user.username === username && user.password === password;
};
