export const getUserByEmail = (email) => {
  return fetch(`https://shepherds-pie-backend-9.onrender.com/employees?email=${email}`).then((res) =>
    res.json()
  );
};

export const createUser = (user) => {
  return fetch("https://shepherds-pie-backend-9.onrender.com/employees", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

export const getUserById = (currentUserId) => {
  return fetch(`/employees?id=${currentUserId}`).then(
    (res) => res.json()
  );
};

// https://shepherds-pie-backend-9.onrender.com
