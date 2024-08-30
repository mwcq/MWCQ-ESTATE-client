import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError] = useState(null);
  const [isLoding, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // TODO: handle form submission
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await apiRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>创建账号</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoding}>创建</button>
          {error && <span>{error}</span>}
          <Link to="/login">以有账号?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;
