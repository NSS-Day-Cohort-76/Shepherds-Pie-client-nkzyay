export const getAllEmployees = () => {
  return fetch("https://shepherds-pie-backend-9.onrender.com/employees").then((res) => res.json());
};

export const postEditedEmployee = (employeeObj) => {
  return fetch(`https://shepherds-pie-backend-9.onrender.com/employees/${employeeObj.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(employeeObj),
  }).then((res) => res.json());
};

export const assignEmployee = (orderId, updatedOrder) => {
  return fetch(`https://shepherds-pie-backend-9.onrender.com/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedOrder),
  }).then((res) => res.json())
}

export const getEmployeeById = (id) => {
  return fetch(`http://localhost:8088/employees/${id}`).then((res) => res.json())
}