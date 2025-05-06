import "./CreatePizza.css";
import { useState, useEffect } from "react";
import {
  getSizes,
  getCheeses,
  getSauces,
  getToppings,
  postPizza,
  postPizzaTopping,
} from "../../services/pizzaService";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePizza = () => {
  const [sizes, setSizes] = useState([]);
  const [sauces, setSauces] = useState([]);
  const [cheeses, setCheeses] = useState([]);
  const [toppings, setToppings] = useState([]);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [cost, setCost] = useState(0);

  const { orderId } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = useState({
    orderId: orderId,
    sizeId: 0,
    sauceId: 0,
    cheeseId: 0,
    totalCost: 0,
  });

  //for each topping selected we want to post a new pizzaToppings object
  //totalCost needs to add up the size, and topping prices

  useEffect(() => {
    getSizes().then((res) => setSizes(res));
    getSauces().then((res) => setSauces(res));
    getCheeses().then((res) => setCheeses(res));
    getToppings().then((res) => setToppings(res));
  }, []);

  useEffect(() => {
    const selectedSize = sizes.find((size) => size.id === pizza.sizeId);
    const sizePrice = selectedSize ? selectedSize.price : 0;

    const selectedToppingsPrices = toppings
      .filter((topping) => selectedToppings.includes(topping.id))
      .map((topping) => topping.price);

    const toppingsTotal = selectedToppingsPrices.reduce(
      (acc, price) => acc + price,
      0
    );

    setCost(sizePrice + toppingsTotal);
    setPizza({
      ...pizza,
      totalCost: sizePrice + toppingsTotal,
    });
  }, [pizza.sizeId, selectedToppings]);

  const handleSelection = (e) => {
    const { name, value } = e.target;
    setPizza({
      ...pizza,
      [name]: parseInt(value),
    });
  };

  const handleToppings = (e) => {
    const id = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedToppings([...selectedToppings, id]);
    } else {
      setSelectedToppings(
        selectedToppings.filter((toppingId) => toppingId !== id)
      );
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (pizza.sizeId && pizza.sauceId && pizza.cheeseId) {
      postPizza(pizza)
        .then((postedPizza) => {
          selectedToppings.map((toppingId) => {
            return postPizzaTopping({
              pizzaId: postedPizza.id,
              toppingId: toppingId,
            });
          });
        })
        .then(() => {
          navigate(`/OrderDetails/${orderId}`);
        });
    } else {
      window.alert("Please complete all required fields");
    }
  };
  return (
    <form className="create-pizza-form">
      <h1>Order # {orderId}</h1>
      <h2>Create Pizza</h2>
      <div id="selections-and-img">
        <div id="pizza-selections">
          <div className="pizza-section">
            <div className="pizza-label">
              <label>Size:</label>
            </div>
            <select
              className="pizza-option-select"
              required
              name="sizeId"
              onChange={handleSelection}
              defaultValue=""
            >
              <option disabled value="">
                Select Size:
              </option>
              {sizes.map((size) => {
                return (
                  <option value={size.id} key={size.id}>
                    {size.name} ${size.price.toFixed(2)}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="pizza-section">
            <div className="pizza-label">
              <label>Sauce:</label>
            </div>
            <select
              className="pizza-option-select"
              required
              name="sauceId"
              onChange={handleSelection}
              defaultValue=""
            >
              <option disabled value="">
                Select Sauce:
              </option>
              {sauces.map((sauce) => {
                return (
                  <option value={sauce.id} key={sauce.id}>
                    {sauce.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="drop-down, pizza-section">
            <div className="pizza-label">
              <label>Cheese:</label>
            </div>
            <select
              className="pizza-option-select"
              required
              name="cheeseId"
              onChange={handleSelection}
              defaultValue=""
            >
              <option disabled value="">
                Select Cheese:
              </option>
              {cheeses.map((cheese) => {
                return (
                  <option value={cheese.id} key={cheese.id}>
                    {cheese.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="pizza-section">
            <div className="pizza-label">
              <label>Toppings:</label>
            </div>
            <div id="pizza-toppings">
              {toppings.map((topping) => {
                return (
                  <div className="topping" key={topping.id}>
                    <input
                      className="topping-checkbox"
                      type="checkbox"
                      value={topping.id}
                      onChange={handleToppings}
                    />
                    {topping.name} ${topping.price.toFixed(2)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div id="pizza-image">
          <img src="/src/img/pizza.svg" alt="Pizza"></img>
          <div id="cost-container">
            <div id="cost-label">Total Price: </div>
            <div id="cost">${cost.toFixed(2)}</div>
          </div>
        </div>
      </div>
      <button className="button pizza-button" onClick={handleClick}>
        Add to Order
      </button>
    </form>
  );
};
