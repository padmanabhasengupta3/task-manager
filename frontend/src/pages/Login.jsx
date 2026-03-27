import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./auth.css";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("role", res.data.role);

      navigate("/dashboard");
    } catch {
      alert("Invalid login");
    }
  };

  return (
    <div className="auth-container">

      <div className="auth-left">
        <h1>Task Manager</h1>
        <p>Manage your tasks efficiently </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Login</h2>

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

          <button onClick={login}>Login</button>

          <p className="switch-text">
            New here? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;