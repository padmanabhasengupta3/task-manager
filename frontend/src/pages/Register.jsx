import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./auth.css";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered!");
      navigate("/");
    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h1>Join Us</h1>
        <p>Create your account and start managing tasks</p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Register</h2>

          <input
            placeholder="Name"
            onChange={(e) =>
              setData({ ...data, name: e.target.value })
            }
          />

          <input
            placeholder="Email"
            onChange={(e) =>
              setData({ ...data, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button onClick={register}>Register</button>

          <p className="switch-text">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;