export const getAllEmployees = () => {
  return fetch("http://localhost:8088/employees").then((res) => res.json());
};

export const postEditedEmployee = (employeeObj) => {
  return fetch(`http://localhost:8088/employees/${employeeObj.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(employeeObj),
  }).then((res) => res.json());
};

export const assignEmployee = (orderId, updatedOrder) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedOrder),
  }).then((res) => res.json())
}
