import "./ViewOrder.css";
import { useEffect, useState } from "react";
import { getOrdersWithCustomer } from "../../services/orderService.jsx";
import { Link } from "react-router-dom";

export const ViewOrder = () => {
  let orderMonthArr = [];
  const [orders, setOrders] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [month, setMonth] = useState(null);

  useEffect(() => {
    getOrdersWithCustomer().then(setOrders);
  }, []);

  const isDate = (dateString) => {
    const orderDate = new Date(dateString);
    const today = new Date();

    return (
      orderDate.getFullYear() === today.getFullYear() &&
      orderDate.getMonth() === today.getMonth() &&
      orderDate.getDate() === today.getDate()
    );
  };

  useEffect(() => {
    orders.map((order) => {
      const date = new Date(order.orderTime);
      const orderMonthInt = date.getUTCMonth() + 1;
      orderMonthArr.push(orderMonthInt);
      setOrderDate(orderMonthArr);
    });
  }, [orders]);

  const formatDate = (givenDate) => {
    const date = new Date(givenDate);
    return (fmtDate = date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }));
  };

  return (
    <div className="view-orders-container">
      <div className="header-row">
        <select onChange={(e) => setMonth(parseInt(e.target.value))}>
          <option>Month</option>
          {[
            ...new Set(
              orders.map((order) => new Date(order.orderTime).getUTCMonth())
            ),
          ]
            .sort((a, b) => a - b)
            .map((month, index) => {
              const monthName = new Date(0, month).toLocaleString("en-US", {
                month: "long",
              });
              return (
                <option key={index} value={month + 1}>
                  {" "}
                  {monthName}
                </option>
              );
            })}
        </select>
        <h2 className="header-center">Today's Orders</h2>
      </div>
      {orders
        .filter((order) =>
          month > 0
            ? new Date(order.orderTime).getUTCMonth() + 1 === month
            : isDate(order.orderTime)
        )
        .map((order) => (
          <fieldset
            className="order-fieldset"
            key={order.id}
            style={{ marginBottom: "1rem" }}
          >
            <div>
              <h3>Order Time: {order.orderTime}</h3>
            </div>
            <div>
              <Link to={`/OrderDetails/${order.id}`}>
                <h3>Order ID: {order.id}</h3>
              </Link>
            </div>
            <div>
              <h3>Customer: {order.customer?.name}</h3>
            </div>
            <div>
              <h3>Status: {order.status}</h3>
            </div>
          </fieldset>
        ))}
    </div>
  );
};
