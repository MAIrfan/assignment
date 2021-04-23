import React, { useContext } from "react";
import { GlobalState } from "../../../globalState";
import { Link } from "react-router-dom";
import axios from "axios";
import "./header.css";

const Header = () => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const [user] = state.userAPI.user;

  const logout = async () => {
    await axios.get("/user/logout");
    localStorage.removeItem("firstLogin");
    window.location.href = "/";
  };

  return (
    <header>
      <h1>Tech Blog</h1>
      <div className="headerSide">
        {isAdmin ? (
          <Link to="/superadmin" className="admin">
            Super Admin Dashboard
          </Link>
        ) : (
          ""
        )}
        <Link to={`/edit_user/${user._id}`} className="user-panel">
          {console.log(user)}
          {user.displaypicture ? (
            <img
              src={user.displaypicture.url}
              alt=""
              style={{ width: 55, height: 55, borderRadius: "50%" }}
            />
          ) : (
            <i className="fas fa-user-circle"></i>
          )}
          <div>
            <div>{user.name}</div>
            <div>{user.email}</div>
          </div>
        </Link>
        <button onClick={logout}>
          <i className="fas fa-sign-out-alt"></i> <span>Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
