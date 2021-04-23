import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          required
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          autoComplete="on"
          required
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
