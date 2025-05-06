import { useEffect, useState } from "react";
import { getPizza, getPizzaToppings } from "../../services/pizzaService.jsx";
import { Link } from "react-router-dom";

export const PopularItems = () => {
  const [items, setItems] = useState([]);
  const [cheese, setCheese] = useState([]);
  const [sauce, setSauce] = useState([]);
  const [topping, setTopping] = useState([]);

  useEffect(() => {
    getPizza().then((res) => {
      setItems(res), setCheese(res), setSauce(res);
    });
  }, []);

  useEffect(() => {
    getPizzaToppings().then(setTopping);
  }, []);

  //Count Properties in Object

  const cheeseCount = cheese.reduce((acc, cheese) => {
    acc[cheese.cheese.name] = (acc[cheese.cheese.name] || 0) + 1;
    return acc;
  }, {});

  const count = items.reduce((acc, item) => {
    acc[item.size.name] = (acc[item.size.name] || 0) + 1;
    return acc;
  }, {});

  const sauceCount = sauce.reduce((acc, item) => {
    acc[item.sauce.name] = (acc[item.sauce.name] || 0) + 1;
    return acc;
  }, {});

  const toppingCount = topping.reduce((acc, item) => {
    acc[item.topping.name] = (acc[item.topping.name] || 0) + 1;
    return acc;
  }, {});

  //sort properties that have the most

  const mostPopularItem = Object.entries(count).reduce(
    (a, b) => {
      return b[1] > a[1] ? b : a;
    },
    [null, 0]
  )[0];

  const mostPopularCheese = Object.entries(cheeseCount).reduce(
    (a, b) => {
      return b[1] > a[1] ? b : a;
    },
    [null, 0]
  )[0];

  const mostPopularSauce = Object.entries(sauceCount).reduce(
    (a, b) => {
      return b[1] > a[1] ? b : a;
    },
    [null, 0]
  )[0];

  const mostPopularTopping = Object.entries(toppingCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  //get Id of most Popular

  const filteredPizzaSize = items.filter((item) => {
    return item.size.name === mostPopularItem;
  });

  const filteredPizzaCheese = items.filter((cheese) => {
    return cheese.cheese.name === mostPopularCheese;
  });

  const filteredPizzaSauce = items.filter((sauce) => {
    return sauce.sauce.name === mostPopularSauce;
  });

  const toppingDisplay = (n, m) => {
    return (
      <>
        {mostPopularTopping.length > 0 && (
          <Link to={`/itemdetails/${mostPopularTopping[n][0]}`}>
            <div>
              {mostPopularTopping[n][0]}, {mostPopularTopping[n][m]} Orders
            </div>
          </Link>
        )}
      </>
    );
  };

  return (
    <div>
      <h1>Popular Items</h1>
      Most Popular Size:{" "}
      <Link to={`/itemdetails/${mostPopularItem}`}>{mostPopularItem}</Link> : (
      {count.Kids} Times)
      <div>
        Most Popular Cheese: (
        <Link to={`/itemdetails/${mostPopularCheese}`}>
          {mostPopularCheese}
        </Link>
        ) : ({cheeseCount.Mozzarella} Times)
      </div>
      <div>
        Most Popular Sauce:{" "}
        <Link to={`/itemdetails/${mostPopularSauce}`}>{mostPopularSauce}</Link>{" "}
        : ({sauceCount.Marinara} Times)
      </div>
      <div>
        3 Most Popular Topping:{" "}
        {mostPopularTopping
          .map(([name, value]) => `${name} (${value}) Times,`)
          .join(" ")}
      </div>
      <div>{toppingDisplay(0, 1)}</div>
      <div>{toppingDisplay(1, 1)}</div>
      <div>{toppingDisplay(2,1)}</div>
    </div>
  );
};
