import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { GlobalState } from "../../../globalState";
import Loading from "../loading/loading";
import { useHistory, useParams } from "react-router-dom";
import "./createArticle.css";

const initialSate = {
  title: "",
  description: "",
};

const CreateArticle = () => {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [articles] = state.articlesAPI.articles;
  const [article, setArticle] = useState(initialSate);
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const history = useHistory();
  const params = useParams();
  const [callback, setCallback] = state.articlesAPI.callback;

  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      articles.forEach((article) => {
        if (article._id === params.id) {
          setArticle(article);
          setImages(article.images);
        }
      });
    } else {
      setOnEdit(false);
      setArticle(initialSate);
      setImages(false);
    }
  }, [params.id, articles]);

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
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      if (!images) return alert("No Image Upload");

      if (onEdit) {
        await axios.put(
          `/api/articles/${article._id}`,
          { ...article, images },
          {
            headers: { Authorization: token },
          }
        );
      } else {
        await axios.post(
          "/api/articles",
          { ...article, images },
          {
            headers: { Authorization: token },
          }
        );
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="create_article">
      <div className="upload">
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
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={article.title}
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={article.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <button type="submit">{onEdit ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateArticle;
