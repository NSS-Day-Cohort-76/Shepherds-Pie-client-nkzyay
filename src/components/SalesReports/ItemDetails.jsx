import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getPizza, getPizzaToppings } from "../../services/pizzaService.jsx";

export const ItemDetails = () => {
  const { item } = useParams();

  const [allItems, setAllItems] = useState([]);
  const [topping, setTopping] = useState([]);

  useEffect(() => {
    getPizza().then(setAllItems);
  }, []);

  useEffect(() => {
    getPizzaToppings().then(setTopping);
  }, []);

  const filteredSize = allItems.filter((items) => items.size.name === item);
  const filteredCheese = allItems.filter((items) => items.cheese.name === item);
  const filteredSauce = allItems.filter((items) => items.sauce.name === item);
  const filteredTopping = topping.filter(
    (items) => items.topping.name === item
  );

  const renderSection = (title, filteredList) => {
    return (
      filteredList && (
        <>
          <h2>{title}</h2>
          {filteredList.map((item) => {
            return (
              <div>
                <div>Price for each Associated Pizza: ${item.totalCost}</div>
              </div>
            );
          })}
          <div>
            Order in:{" "}
            {Math.round((filteredList.length / allItems.length) * 100)}%
          </div>
        </>
      )
    );
  };

  return (
    <div>
      <div>
        {filteredSize.length > 0
          ? renderSection(`${item} Size Details`, filteredSize)
          : ""}
        {filteredCheese.length > 0
          ? renderSection(`${item} Details`, filteredCheese)
          : ""}
        {filteredSauce.length > 0
          ? renderSection(`${item} Details`, filteredSauce)
          : ""}
      </div>
      <div>
        {filteredTopping.map((topping) => {
          return (
            <>
            <div>
              Cost for associated Topping: {topping.pizza.totalCost}
            </div>
            </>
          )
        })}
        <div>
        Percentage on pizza: {Math.round(filteredTopping.length / allItems.length * 100)}%
      </div>
      </div>
    </div>
  );
};
