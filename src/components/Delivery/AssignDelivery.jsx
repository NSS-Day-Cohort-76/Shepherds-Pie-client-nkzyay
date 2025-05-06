import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { assignEmployee, getAllEmployees, postEditedEmployee } from "../../services/employeeService";
import "./AssignDelivery.css"
import {getOrderDetailsById } from "../../services/orderService";

export const AssignDelivery = () => {
    const [employees, setEmployees] = useState([])
    const navigate = useNavigate()
    const { orderId } = useParams()
    const [order, setOrder] = useState({})

    useEffect(() => {
        getAllEmployees().then((employeesArray) => {
            const unassigned = employeesArray.filter(employee => ! employee.isAssigned)
            setEmployees(unassigned)
        })
    }, [])

    useEffect(() => {
        getOrderDetailsById(orderId).then((orderData) => setOrder(orderData));
    }, [orderId])


    const handleAssign = (employee) => {
        const updatedEmployee = { ...employee, isAssigned: true };
    
        postEditedEmployee(updatedEmployee)
          .then(() => getOrderDetailsById(orderId))
          .then((order) => {
            const updatedOrder = {
              ...order,
              status: "Out-for-Delivery",
              deliveredByEmployeeId: employee.id,
            }
            return assignEmployee(orderId, updatedOrder)
          })
          .then(() => navigate(`/OrderDetails/${orderId}`))
    }



    return (
        <section className="available-employees">
            <div className="available-employee-header">
                <h2>Available Employees</h2>
            </div>
            {employees.map((employee) => (
                <div className="employee-card" key={employee.id}>
                <span className="employee-info">
                  <strong>Employee Name:</strong> {employee.name}
                </span>
                <div className="select-btn">
                  <button onClick={() => handleAssign(employee)}>Select Employee</button>
                </div>
              </div>
            ))}
        </section>
    )
}