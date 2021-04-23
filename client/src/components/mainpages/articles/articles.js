import React, { useContext } from "react";
import axios from "axios";
import { GlobalState } from "../../../globalState";
import { Link } from "react-router-dom";
import "./articles.css";

const Articles = () => {
  const state = useContext(GlobalState);
  const [articles] = state.articlesAPI.articles;
  const [token] = state.token;
  const [callback, setCallback] = state.articlesAPI.callback;

  const deleteArticle = async (id) => {
    try {
      const deleteArticle = axios.delete(`/api/articles/${id}`, {
        headers: { Authorization: token },
      });
      await deleteArticle;
      setCallback(!callback);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="articles">
      <Link to="/create_article" className="create-btn">
        <i className="fas fa-plus"></i>
        Create Article
      </Link>
      {articles.map((article) => (
        <div key={article._id} className="article-container">
          <h2>{article.title}</h2>
          <div>
            <img src={article.images.url} alt="" />
            <div className="article-description">{article.description}</div>
            <div className="operation-buttons">
              <Link to={`/edit_article/${article._id}`}>
                <i className="fas fa-edit"></i> Edit
              </Link>
              <button onClick={() => deleteArticle(article._id)}>
                <i className="fas fa-trash-alt"></i> Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Articles;
