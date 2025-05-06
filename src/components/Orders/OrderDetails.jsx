import "./OrderDetails.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteOrder,
  getOrderById,
  getToppingsByToppingId,
  updatedOrderWithTip,
} from "../../services/orderService";
import {
  deletePizza,
  deletePizzaTopping,
  getCheeseByPizzaId,
  getPizzaByOrderId,
  getPizzaToppingsByPizzaId,
  getSauceByPizzaId,
  getSizeByPizzaId,
} from "../../services/pizzaService";
import { getAllEmployees } from "../../services/employeeService";

export const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const [pizzas, setPizzas] = useState([]);
  const [pizzaDetails, setPizzaDetails] = useState([]);
  const [pizzaToppings, setPizzaToppings] = useState([]);
  const [toppingDetails, setToppingDetails] = useState([]);
  const [createdBy, setCreatedBy] = useState({});
  const [employees, setEmployees] = useState([]);

  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const foundEmployee = employees.find(
      (emp) => emp.id === order.takenByEmployeeId
    );
    setCreatedBy(foundEmployee);
  }, [order]);

  useEffect(() => {
    getAllEmployees().then(setEmployees);
    getOrderById(orderId).then((orderArr) => {
      const orderObj = orderArr[0];
      setOrder(orderObj);
    });
    getPizzaByOrderId(orderId).then(setPizzas);
  }, []);

  useEffect(() => {
    const pizzaDetailPromises = pizzas.map((pizza) =>
      Promise.all([
        getSizeByPizzaId(pizza.id),
        getSauceByPizzaId(pizza.id),
        getCheeseByPizzaId(pizza.id),
      ]).then(([sizeRes, sauceRes, cheeseRes]) => {
        return {
          ...pizza,
          size: sizeRes.size.name,
          sauce: sauceRes.sauce.name,
          cheese: cheeseRes.cheese.name,
        };
      })
    );

    Promise.all(pizzaDetailPromises).then((res) => {
      setPizzaDetails(res);
    });

    const pizzaToppingPromises = pizzas.map((pizza) =>
      getPizzaToppingsByPizzaId(pizza.id)
    );
  }, [pizzas]);

  let d = "";
  let t = "";
  if (order?.orderTime) {
    let splitDate = order.orderTime.split("T");
    d = splitDate[0];
    t = splitDate[1].split("Z");
  }

  const handleCancelOrder = (e) => {
    if (e.target.name === "cancel") {
      if (confirm("Are you sure you want to cancel this order?")) {
        const toppingDeletes = pizzas.map((pizza) =>
          deletePizzaTopping(pizza.id)
        );

        Promise.all(toppingDeletes)
          .then(() => deletePizza(order.id))
          .then(() => deleteOrder(order.id))
          .then(() => {
            navigate("/orders");
            window.alert("Order Canceled");
          });
      } else {
        window.location.reload();
      }
    }
  };

  const handleSubmit = (e) => {
    if (e.target.name === "submit") {
      const updatedOrder = {
        id: order.id,
        customerId: order.customerId,
        order: order.orderTime,
        tableNumber: order.tableNumber,
        status: order.status,
        gratuity: order.gratuity,
        totalCost: order.totalCost,
        takenByEmployeeId: order.takenByEmployeeId,
        deliveredByEmployeedId: order.deliveredByEmployeedId,
        monthId: order.monthId,
      };
      updatedOrderWithTip(updatedOrder).then(() => {
        window.alert("Order details updated!");
        navigate("/orders");
      });
    }
  };

  //Write a function that will take a pizza object as input and
  //  return an object with the size, cheese, sauce, toppings and price for that pizza
  //How would i get the toppings
  return (
    <article className="order-details-container">
      <div className="title">
        <h2>Order #{order.id}</h2>
      </div>
      <div className="title">
        <h3>Customer Info</h3>
      </div>
      <section className="customer-info">
        <div className="customer-detail">
          <div className="customer-detail-title">Name</div>
          <div className="customer-detail-info">{order?.customer?.name}</div>
        </div>
        <div className="customer-detail">
          <div className="customer-detail-title">Address</div>
          <div className="customer-detail-info">{order?.customer?.address}</div>
        </div>
        <div className="customer-detail">
          <div className="customer-detail-title">Phone</div>
          <div className="customer-detail-info">{order?.customer?.phone}</div>
        </div>
        <div className="customer-detail">
          <div className="customer-detail-title">Email</div>
          <div className="customer-detail-info">{order?.customer?.email}</div>
        </div>
        {order.tableNumber && (
          <div className="customer-detail">
            <div className="customer-detail-title">Table #</div>
            <div className="customer-detail-info">{order?.tableNumber}</div>
          </div>
        )}
        <div className="customer-detail">
          <div className="customer-detail-title">Order Date</div>
          <div className="customer-detail-info">{d}</div>
        </div>
        <div className="customer-detail">
          <div className="customer-detail-title">Order Time</div>
          <div className="customer-detail-info">{t}</div>
        </div>
      </section>
      {pizzas.length === 0 ? (
        <section className="order-section">
          <h3>Your order is empty - please add a pizza</h3>
          <button
            className="button pizza-button"
            onClick={() => {
              navigate(`/CreatePizza/${orderId}`);
            }}
          >
            Add Pizza
          </button>
        </section>
      ) : (
        <section className="order-section">
          <div className="pizza-section">
            <h2>Order Items:</h2>
            <br></br>
            {pizzaDetails.map((pizza) => {
              return (
                <div className="pizza-details" key={pizza.id}>
                  <div className="pizza-detail">{pizza.size}</div>
                  <div className="pizza-detail">{pizza.cheese}</div>
                  <div className="pizza-detail">{pizza.sauce}</div>
                  <div className="pizza-detail">
                    ${pizza.totalCost.toFixed(2)}
                  </div>
                  <button className="pizza-button">Edit</button>
                  <button className="pizza-button">Remove</button>
                </div>
              );
            })}
          </div>
          <div className="order-details">
            <div className="total">
              <label>Order Total:</label>
              <div className="total-price">$22.50</div>
            </div>
            <div className="tip">
              <label htmlFor="tip">Add Tip:</label>
              <input
                id="tip"
                name="tip"
                min="0"
                className="tip-amount"
                type="number"
                onChange={(e) => {
                  setOrder({
                    ...order,
                    gratuity: parseInt(e.target.value) || 0,
                  });
                }}
              />
            </div>
            <div className="created">
              <label>Order Created by:</label>
              <div className="created-detail">{createdBy?.name}</div>
            </div>
            <div className="order-button-container">
              <button
                className="button add-pizza-button"
                onClick={() => {
                  navigate(`/CreatePizza/${orderId}`);
                }}
              >
                Add Pizza
              </button>
              <button
                className="button add-pizza-button"
                onClick={() => {
                  navigate(`/AssignDelivery/${orderId}`);
                }}
              >
                Assign Employee
              </button>
              <button
                className="button add-pizza-button"
                name="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="button add-pizza-button"
                name="cancel"
                onClick={handleCancelOrder}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

//If no pizzas in order display "Your order is empty, please add a pizza"
// Otherwise display current pizzas in order with details
