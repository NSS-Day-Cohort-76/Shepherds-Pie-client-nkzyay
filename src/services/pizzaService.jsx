export const getSizes = () => {
  return fetch("http://localhost:8088/sizes").then((res) => res.json());
};

export const getSauces = () => {
  return fetch("http://localhost:8088/sauces").then((res) => res.json());
};

export const getCheeses = () => {
  return fetch("http://localhost:8088/cheeses").then((res) => res.json());
};

export const getToppings = () => {
  return fetch("http://localhost:8088/toppings").then((res) => res.json());
};

export const postPizza = (pizzaObj) => {
  return fetch("http://localhost:8088/pizzas", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(pizzaObj),
  }).then((res) => res.json());
};

export const postPizzaTopping = (toppingObj) => {
  return fetch("http://localhost:8088/pizzaToppings", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(toppingObj),
  }).then((res) => res.json());
};

export const getPizza = () => {
  return fetch("http://localhost:8088/pizzas?_expand=size&_expand=cheese&_expand=sauce").then((res) => res.json())
}

export const getPizzaToppings = () => {
  return fetch("http://localhost:8088/pizzaToppings?_expand=topping&_expand=pizza").then(res => res.json())
}
export const getPizzaByOrderId = (orderId) => {
  return fetch(
    `http://localhost:8088/pizzas?orderId=${orderId}&_embed=pizzaToppings`
  ).then((res) => res.json());
};

export const getSizeByPizzaId = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzas/${pizzaId}?_expand=size`).then(
    (res) => res.json()
  );
};

export const getSauceByPizzaId = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzas/${pizzaId}?_expand=sauce`).then(
    (res) => res.json()
  );
};

export const getCheeseByPizzaId = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzas/${pizzaId}?_expand=cheese`).then(
    (res) => res.json()
  );
};

export const deletePizza = (orderId) => {
  return fetch(`http://localhost:8088/pizzas?orderId=${orderId}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export const deletePizzaTopping = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`)
    .then((res) => res.json())
    .then((toppings) => {
      const deletePromises = toppings.map((topping) =>
        fetch(`http://localhost:8088/pizzaToppings/${topping.id}`, {
          method: "DELETE",
        })
      );
      return Promise.all(deletePromises);
    });
};

export const getPizzaToppingsByPizzaId = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`).then(
    (res) => res.json()
  );
};
