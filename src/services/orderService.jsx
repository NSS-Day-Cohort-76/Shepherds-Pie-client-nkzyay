export const getOrders = () => {
  return fetch("http://localhost:8088/orders").then((res) => res.json());
};

export const getOrdersWithCustomer = () => {
  return fetch("http://localhost:8088/orders?_expand=customer").then((res) =>
    res.json()
  );
};

export const getOrderWithMatchingMonth = (id) => {
  return fetch(
    `http://localhost:8088/orders?monthId=${id}&_expand=customer`
  ).then((res) => res.json());
};

export const getOrderById = (orderId) => {
  return fetch(
    `http://localhost:8088/orders?id=${orderId}&_expand=customer&_embed=pizzas`
  ).then((res) => res.json());
};

export const deleteOrder = (orderId) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const updatedOrderWithTip = (orderObj) => {
  return fetch(`http://localhost:8088/orders/${orderObj.id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(orderObj),
  }).then((res) => res.json());
};

export const getToppingsByToppingId = (toppingId) => {
  return fetch(`http://localhost:8088/toppings/${toppingId}`).then((res) =>
    res.json()
  );
};

export const getOrderDetailsById = (orderId) => {
  return fetch(`http://localhost:8088/orders/${orderId}`).then((res) => res.json())
}