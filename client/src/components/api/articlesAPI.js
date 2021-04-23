import { useState, useEffect } from "react";
import axios from "axios";

const ArticlesAPI = () => {
  const [articles, setArticles] = useState([]);
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const res = await axios.get("/api/articles");
      setArticles(res.data.articles);
    };
    getProducts();
  }, [callback]);

  return {
    articles: [articles, setArticles],
    callback: [callback, setCallback],
  };
};

export default ArticlesAPI;
