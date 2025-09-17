import "./ViewOrder.css";
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import { getOrderDetailsById, getOrdersWithCustomer } from "../../services/orderService.jsx";
import { assignEmployee, postEditedEmployee } from "../../services/employeeService"
import { Link } from "react-router-dom";

export const ViewOrder = () => {
  const location = useLocation()
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState(0); // 0 means "Today"

  useEffect(() => {
    getOrdersWithCustomer().then(setOrders);
  }, [location]);

  const isToday = (dateString) => {
    const orderDate = new Date(dateString);
    const today = new Date();

    return (
      orderDate.getUTCFullYear() === today.getUTCFullYear() &&
      orderDate.getUTCMonth() === today.getUTCMonth() &&
      orderDate.getUTCDate() === today.getUTCDate()
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (month > 0) {
      return new Date(order.order).getUTCMonth() + 1 === month;
    }
    return isToday(order.order);
  });

  const formatDate = (givenDate) => {
    const date = new Date(givenDate);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };



  const handleComplete = (employee) => {
    const updatedEmployee = { ...employee, isAssigned: false }

    postEditedEmployee(updatedEmployee)
      .then((order) => {
        const updatedOrder = {
          ...order,
          status: "Completed",
        };
        return assignEmployee(order.id, updatedOrder)
      })
     
  };



  return (
    <div className="view-orders-container">
      <div className="header-row">
        <select
          value={month}
          onChange={(e) => setMonth(parseInt(e.target.value))}
        >
          <option value="0">Today</option>
          {[
            ...new Set(
              orders
                .map((order) => new Date(order.order))
                .filter((date) => !isNaN(date))
                .map((date) => date.getUTCMonth())
            ),
          ]
            .sort((a, b) => a - b)
            .map((monthVal, index) => {
              const monthName = new Date(0, monthVal).toLocaleString("en-US", {
                month: "long",
              });
              return (
                <option key={index} value={monthVal + 1}>
                  {monthName}
                </option>
              );
            })}
        </select>
        <h2 className="header-center">
          {month === 0 ? "Today's Orders" : "Orders by Month"}
        </h2>
      </div>

      {filteredOrders.map((order) => (
        <fieldset
          className="order-fieldset"
          key={order.id}
          style={{ marginBottom: "1rem" }}
        >
          <div>
            <h3>Order Time: {order.order}</h3>
          </div>
          <div>
            <Link to={`/OrderDetails/${order.id}`}>
              <h3>Order ID: {order.id}</h3>
            </Link>
          </div>
          <div>
            <h3>Customer: {order.customer?.name}</h3>
          </div>
          <div className="order-status">
            <h3>Status:</h3>
            {order.status}
          </div>
          <div>
            <button
              className="complete-btn"
              onClick={() => handleComplete(order)}
              disabled={order.status === "Completed"}
            >Complete</button>
          </div>
        </fieldset>
      ))}
    </div>
  );
};
