import "./Employees.css";
import { getUserById } from "../services/userService";
import { useEffect, useState } from "react";
import { getAllEmployees } from "../services/employeeService";
import { Link } from "react-router-dom";

export const Employees = ({ currentUser }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getAllEmployees().then((res) => setEmployees(res));
  }, []);

  useEffect(() => {
    getUserById(currentUser.id).then((userArr) => {
      const userObj = userArr[0];
      setIsAdmin(userObj?.isAdmin);
    });
  }, [currentUser]);

  return isAdmin ? (
    <section className="employees-section">
      <div className="employees-title">
        <h1>All Employees</h1>
      </div>
      {employees.map((employeeObj) => {
        return (
          <Link key={employeeObj.id} to={`/employees/${employeeObj.id}`}>
            <div className="employee">
              <div className="employee-details">
                <span className="detail-header">Name:</span> {employeeObj.name}
              </div>
              <div className="employee-details">
                <span className="detail-header">Address:</span>{" "}
                {employeeObj.address}
              </div>
              <div className="employee-details">
                {" "}
                <span className="detail-header">Phone:</span>{" "}
                {employeeObj.phone}
              </div>
              <div className="employee-details">
                {" "}
                <span className="detail-header">Email:</span>{" "}
                {employeeObj.email}
              </div>
            </div>
          </Link>
        );
      })}
    </section>
  ) : (
    <section className="error-section">
      <div className="the-great-dom-container">
        <Link to="/">
          <img src="../src/theGreatDom.png" className="the-great-dom"></img>
        </Link>
      </div>
      <span className="error">Error:</span>
      <h1 className="error-title">
        The Great Dom does not allow non-admins to view this page
      </h1>
    </section>
  );
};
