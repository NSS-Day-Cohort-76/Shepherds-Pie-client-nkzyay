import { useEffect, useState } from "react";
import { getUserById } from "../../services/userService";
import { postEditedEmployee } from "../../services/employeeService";
import "./EmployeeEdit.css";
import { useNavigate, useParams } from "react-router-dom";

export const EmployeeEdit = () => {
  const [employee, setEmployee] = useState({
    id: 0,
    name: "",
    address: "",
    phone: null,
    email: "",
    isAssigned: false,
    isAdmin: false,
  });
  const { employeeId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getUserById(employeeId).then((userArr) => {
      const userObj = userArr[0];
      setEmployee(userObj);
    });
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: name.includes("phone") ? parseInt(value) : value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (employee.name && employee.address && employee.email && employee.phone) {
      postEditedEmployee(employee).then(() => {
        window.alert("Your changes have been saved");
        navigate("/");
      });
    } else {
      window.alert("Please complete all required fields");
    }
  };
  return (
    <form className="edit-form">
      <fieldset>
        <h2>Edit Employee</h2>
        <div className="employee-section">
          <label>Name:</label>
          <input
            type="text"
            className="employee-input"
            name="name"
            required
            value={employee?.name ? employee.name : ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="employee-section">
          <label>Address: </label>
          <input
            type="text"
            className="employee-input"
            name="address"
            required
            value={employee?.address ? employee.address : ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="employee-section">
          <label>Phone: </label>
          <input
            type="text"
            className="employee-input"
            name="phone"
            required
            value={employee?.phone ? employee.phone : ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="employee-section">
          <label>Email: </label>
          <input
            type="text"
            className="employee-input"
            name="email"
            required
            value={employee?.email ? employee.email : ""}
            onChange={handleChange}
          ></input>
        </div>
        <div className="button-container">
          <button className="employee-save-button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </fieldset>
    </form>
  );
};
