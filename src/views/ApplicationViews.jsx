import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "../components/Nav/NavBar";
import { useEffect, useState } from "react";
import { Employees } from "../components/Employees";
import { EmployeeEdit } from "../components/Forms/EmployeeEdit.jsx";
import { Home } from "../components/Home/Home";
import { CreateOrder } from "../components/Orders/CreateOrder";
import { ViewOrder } from "../components/viewOrder/ViewOrder.jsx";
import { OrderDetails } from "../components/Orders/OrderDetails.jsx";
import { CreatePizza } from "../components/Forms/CreatePizza.jsx";
import { ItemDetails } from "../components/SalesReports/ItemDetails.jsx";
import { SalesReport } from "../components/SalesReports/SalesReport.jsx"
import { AssignDelivery } from "../components/Delivery/AssignDelivery.jsx";


export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localLearningUser = localStorage.getItem("learning_user");
    const learningUserObject = JSON.parse(localLearningUser);
    setCurrentUser(learningUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home />} />
        <Route
          path="/CreateOrder"
          element={<CreateOrder currentUser={currentUser} />}
        />
        <Route
          path="/OrderDetails/:orderId"
          element={<OrderDetails currentUser={currentUser} />}
        />
        <Route path="/AssignDelivery/:orderId" element={ <AssignDelivery />} />
        <Route
          path="/employees/:orderId"
          element={<Employees currentUser={currentUser} />}
        />
        <Route path="/employees/:employeeId" element={<EmployeeEdit />} />
        <Route path="/sales" element={<SalesReport />} />
        <Route path="/orders" element={<ViewOrder />} />
        <Route path="/CreatePizza" element={<CreatePizza />} />
        <Route path="/itemdetails/:item" element={<ItemDetails/>}/>
        <Route path="/CreatePizza/:orderId" element={<CreatePizza />} />
        <Route path="/OrderDetails" element={<OrderDetails />} />
        <Route path="/OrderDetails/:orderId" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
};
