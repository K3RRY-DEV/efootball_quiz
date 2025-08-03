// Get users from localStorage or return empty array
const getStoredUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("currentUser"));
};

export const logoutUser = () => {
  localStorage.removeItem("currentUser");
};


// Save users back to localStorage
const saveUsers = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

// Sign up function
export const signupUser = (newUser) => {
  const users = getStoredUsers();

  // Check if email already exists
  const userExists = users.some((user) => user.email === newUser.email);

  if (userExists) {
    return { success: false, message: "Email already registered" };
  }

  // Add new user with timestamp as ID
  const userWithId = {
    ...newUser,
    id: Date.now(),
  };

  users.push(userWithId);
  saveUsers(users);

  // Optionally set current user right after signup
  localStorage.setItem("currentUser", JSON.stringify(userWithId));

  return { success: true, user: userWithId };
};

// login function
export function loginUser(email, password) {
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (foundUser) {
    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    return true;
  } else {
    return false;
  }
}
