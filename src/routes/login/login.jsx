import { useContext, useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

function Login() {
  const [error, setError] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const { updataUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // TODO: handle form submission
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      // localStorage.setItem("user", JSON.stringify(res.data));
      updataUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>欢迎回来</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
          <button disabled={isLoding}>Login</button>
          {error && <span className="error">{error}</span>}
          <Link to="/register">还没有账号？</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
