export const getSizes = () => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/sizes").then((res) => res.json());
};

export const getSauces = () => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/sauces").then((res) => res.json());
};

export const getCheeses = () => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/cheeses").then((res) => res.json());
};

export const getToppings = () => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/toppings").then((res) => res.json());
};

export const postPizza = (pizzaObj) => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/pizzas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pizzaObj),
  }).then((res) => res.json());
};

export const postPizzaTopping = (toppingObj) => {
  return fetch("http://https://shepherds-pie-backend-9.onrender.com/pizzaToppings", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(toppingObj),
  }).then((res) => res.json());
};

export const getPizza = () => {
  return fetch(
    "http://https://shepherds-pie-backend-9.onrender.com/pizzas?_expand=size&_expand=cheese&_expand=sauce"
  ).then((res) => res.json());
};

export const getPizzaToppings = () => {
  return fetch(
    "http://https://shepherds-pie-backend-9.onrender.com/pizzaToppings?_expand=topping&_expand=pizza"
  ).then((res) => res.json());
};
export const getPizzaByOrderId = (orderId) => {
  return fetch(
    `http://https://shepherds-pie-backend-9.onrender.com/pizzas?orderId=${orderId}&_embed=pizzaToppings`
  ).then((res) => res.json());
};

export const getSizeByPizzaId = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzas/${pizzaId}?_expand=size`).then(
    (res) => res.json()
  );
};

export const getSauceByPizzaId = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzas/${pizzaId}?_expand=sauce`).then(
    (res) => res.json()
  );
};

export const getCheeseByPizzaId = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzas/${pizzaId}?_expand=cheese`).then(
    (res) => res.json()
  );
};

export const deletePizza = (orderId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzas?orderId=${orderId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const deletePizzaTopping = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzaToppings?pizzaId=${pizzaId}`)
    .then((res) => res.json())
    .then((toppings) => {
      const deletePromises = toppings.map((topping) =>
        fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzaToppings/${topping.id}`, {
          method: "DELETE",
        })
      );
      return Promise.all(deletePromises);
    });
};

export const getPizzaToppingsByPizzaId = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzaToppings?pizzaId=${pizzaId}`).then(
    (res) => res.json()
  );
};

export const removePizza = (pizzaId) => {
  return fetch(`http://https://shepherds-pie-backend-9.onrender.com/pizzas/${pizzaId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};
