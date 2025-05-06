import { useNavigate } from "react-router-dom";
import "./Home.css";
export const Home = ({}) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="center-container">
        <h2>Dom-ino's Pizza</h2>
        </div>
       
        <div className="center-container">
        <img src="https://ik.imagekit.io/b0xq0alh4/Dom-ino's%20logo.png?updatedAt=1746194674980" className="dom-logo"/>
        </div>

      <div className="center-container">
        <h5>And Only Pizza</h5>
      </div>

      <div className="center-container">
        <button
          className="home-btn"
          onClick={() => {
            navigate("/CreateOrder");
          }}
        >
          Create New Order
        </button>
      </div>
    </div>
  );
};
