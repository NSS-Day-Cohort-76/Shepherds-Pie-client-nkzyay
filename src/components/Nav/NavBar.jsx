import ".//NavBar.css";
import { Link } from "react-router-dom";
export const NavBar = () => {
  return (
    <ul className="nav-bar">
      <li className="nav-bar-item">
        <Link className="nav-bar-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-bar-item">
        <Link className="nav-bar-link" to="/employees">
          Employees
        </Link>
      </li>
      <li className="nav-bar-item">
        <Link className="nav-bar-link" to="/sales">
          Sales
        </Link>
      </li>
      <li className="nav-bar-item">
        <Link className="nav-bar-link" to="/orders">
          Orders
        </Link>
      </li>
      {localStorage.getItem("learning_user") ? (
        <li className="nav-bar-item">
          <Link
            className="nav-bar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("learning_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
