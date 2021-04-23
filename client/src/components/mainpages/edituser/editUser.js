import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../globalState";
import { useHistory } from "react-router-dom";
import Loading from "../loading/loading";
import "./editUser.css";

const EditUser = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [user, setUser] = state.userAPI.user;
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState(false);
  const history = useHistory();
  const [callback, setCallback] = state.userAPI.callback;

  useEffect(() => {
    if (user.displaypicture) setImages(user.displaypicture);
  }, [user.displaypicture]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("Size too large!");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect.");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      alert(res.data.msg);
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/user/update_user/${user._id}`,
        { ...user, displaypicture: images },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="edit_user">
      <div className="dp-upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={{ display: images ? "block" : "none" }}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSumbit}>
        <div className="row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            disabled
          />
        </div>
        <div className="row">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={user.name}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={user.password}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={user.phone}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={user.address}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="city">City</label>
          <input
            type="text"
            name="city"
            id="city"
            value={user.city}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="state">State</label>
          <input
            type="text"
            name="state"
            id="state"
            value={user.state}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            id="country"
            value={user.country}
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
