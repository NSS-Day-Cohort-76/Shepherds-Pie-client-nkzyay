import { useEffect, useState } from "react";
import {
  getOrdersWithCustomer,
  getOrderWithMatchingMonth,
} from "../../services/orderService.jsx";
import { PopularItems } from "./PopularItem.jsx";



export const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState(NaN);
  const [filteredMonth, setFilteredMonth] = useState([]);

  useEffect(() => {
    getOrdersWithCustomer().then(setOrders);
  }, []);

  useEffect(() => {
    getOrderWithMatchingMonth(month).then(setFilteredMonth);
  }, [month]);

  const totalOrders = filteredMonth.length;
  const totalCompanyOrders = orders.length;
  const orderDollarAmount = (obj) => {
    return obj.reduce((sum, order) => sum + order.totalCost, 0);
  };

  return (
    // selection menu
    <div>
      <select onChange={(e) => setMonth(Number(e.target.value))}>
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
      {month > 0 ? (
        <div>
          <h1>
            {/* render on intial load */}
            Orders for{" "}
            {!Number.isNaN(month) && typeof month === "number"
              ? new Date(0, month - 1).toLocaleString("en-US", {
                  month: "long",
                })
              : "Company"}
          </h1>

          <fieldset style={{ marginBottom: "1rem" }}>
            <div>
              <h3># of Orders for This Month: {totalOrders}</h3>
              <h3>
                Order Dollar Amount: $
                {orderDollarAmount(filteredMonth).toFixed(2)}
              </h3>
            </div>
            <div>
              <h3>
                Average Order Value: $
                {(orderDollarAmount(filteredMonth) / totalOrders).toFixed(2)}
              </h3>
            </div>
          </fieldset>

          <h1>Day-By-Day</h1>
          <fieldset>
            {filteredMonth.map((obj, index) => {
              const isoTime = obj.orderTime;
              const localTime = new Date(isoTime).toLocaleString();
              return (
                <h3 key={index}>
                  {localTime} : ${obj.totalCost}
                </h3>
              );
            })}
          </fieldset>
        </div>
      ) : (
        // render when user selects a month
        <div>
          <h1>
            Orders for{" "}
            {Number.isNaN(month)
              ? "Company"
              : new Date(0, month - 1).toLocaleString("en-US", {
                  month: "long",
                })}
          </h1>

          <fieldset style={{ marginBottom: "1rem" }}>
            <div>
              <h3># of Orders for This Company: {totalCompanyOrders}</h3>
              <h3>
                Order Dollar Amount: ${orderDollarAmount(orders).toFixed(2)}
              </h3>
            </div>
            <div>
              <h3>
                Average Order Value: $
                {(orderDollarAmount(orders) / totalCompanyOrders).toFixed(2)}
              </h3>
            </div>
          </fieldset>
          {/* day by day section */}
          <h1>Day-By-Day</h1>
          <fieldset>
            {orders.map((obj, index) => {
              const isoTime = obj.orderTime;
              const localTime = new Date(isoTime).toLocaleString();
              return (
                <h3 key={index}>
                  {localTime} : ${obj.totalCost}
                </h3>
              );
            })}
          </fieldset>
          {/* popular items section */}
          <div>
            <PopularItems/>

          </div>
        </div>
      )}
    </div>
  );
};
