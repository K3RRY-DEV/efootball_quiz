
const USERS_KEY = 'quizUsers';
const CURRENT_USER_KEY = 'currentUser';
const ADMIN_EMAIL = 'kerrygameshd@gmail.com'; // adjust this as needed

export function signupUser({ name, email, password, confirmPassword }) {
  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match" };
  }

  const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const emailExists = existingUsers.some(user => user.email === email);
  if (emailExists) {
    return { success: false, message: "Email already exists" };
  }

  const newUser = { name, email, password };
  localStorage.setItem(USERS_KEY, JSON.stringify([...existingUsers, newUser]));
  return { success: true };
}

export function loginUser({ email, password }) {
  const existingUsers = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  const foundUser = existingUsers.find(user => user.email === email && user.password === password);
  if (!foundUser) {
    return { success: false, message: "Invalid email or password" };
  }

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
  return { success: true };
}

export function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

export function isAdmin() {
  const user = getCurrentUser();
  return user && user.email === ADMIN_EMAIL;
}

// localStorage.removeItem("currentUser");
