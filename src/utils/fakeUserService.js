// src/utils/fakeUserService.js
const USERS_KEY = "cs568_users";
const CURRENT_USER_KEY = "cs568_current_user";

export function signupUser(username, password) {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  // Check if the user already exists
  const exists = users.find(user => user.username === username);
  if (exists) {
    return false;
  }
  const newUser = { username, password };
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  // Set current user after successful signup
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
  return true;
}

export function loginUser(username, password) {
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  const user = users.find(
    user => user.username === username && user.password === password
  );
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    return true;
  }
  return false;
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}