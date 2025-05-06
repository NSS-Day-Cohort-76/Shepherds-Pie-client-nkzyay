import { useState } from "react";
import "./Order.css";
import { useNavigate } from "react-router-dom";
import { createOrder, createCustomer } from "../../services/CustomerService";

export const CreateOrder = ({ currentUser }) => {
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    tableNumber: "",
  });

  const [showTableNumber, setShowTableNumber] = useState(false);

  const navigate = useNavigate();

  const handleSave = (event) => {
    event.preventDefault();

    if (
      customerDetails.name &&
      customerDetails.address &&
      customerDetails.phone &&
      customerDetails.email
    ) {
      createCustomer(customerDetails).then((data) => {
        const newOrder = {
          customerId: data.id,
          orderTime: new Date(),
          tableNumber: customerDetails.tableNumber || null,
          status: "Pending",
          gratuity: 0,
          totalCost: 0,
          takenByEmployeeId: currentUser.id,
          deliveredByEmployeeId: null,
        };

        createOrder(newOrder).then((customerObj) => {
          navigate(`/OrderDetails/${customerObj.id}`);
        });
      });
    } else {
      window.alert("Please complete all required customer fields.");
    }
  };
  return (
    <form className="customer-info">
      <h2>Customer Info</h2>
      <div className="drop-down">
        <article className="pickup-option">
          <select
            id="pickup-option"
            required
            defaultValue=""
            onChange={(event) => {
              const value = event.target.value;
              setShowTableNumber(value === "1" ? true : false);
            }}
          >
            <option disabled value="">
              Pick-Up Method
            </option>
            <option value="1">Dine-In</option>
            <option value="2">Delivery</option>
          </select>
        </article>
      </div>

      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type name here"
          onChange={(event) => {
            const copy = { ...customerDetails };
            copy.name = event.target.value;
            setCustomerDetails(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type address here"
          onChange={(event) => {
            const copy = { ...customerDetails };
            copy.address = event.target.value;
            setCustomerDetails(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type phone number here"
          onChange={(event) => {
            const copy = { ...customerDetails };
            copy.phone = event.target.value;
            setCustomerDetails(copy);
          }}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type email here"
          onChange={(event) => {
            const copy = { ...customerDetails };
            copy.email = event.target.value;
            setCustomerDetails(copy);
          }}
        />
      </div>
      {showTableNumber && (
        <div className="form-group">
          <label>Table #</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type customer's table number here"
            onChange={(event) => {
              const copy = { ...customerDetails };
              copy.tableNumber = event.target.value;
              setCustomerDetails(copy);
            }}
          />
        </div>
      )}
      <fieldset>
        <div className="form-group">
          <button className="form-btn:focus" onClick={handleSave}>
            Save Order
          </button>
        </div>
      </fieldset>
    </form>
  );
};
