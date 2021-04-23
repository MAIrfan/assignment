const Articles = require("../models/articleModel");

const articleCtrl = {
  getArticles: async (req, res) => {
    try {
      const articles = await Articles.find();

      res.json({
        status: "success",
        result: articles.length,
        articles: articles,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createArticle: async (req, res) => {
    try {
      const { title, description, images } = req.body;

      if (!images) return res.status(400).json({ msg: "No image upload." });

      const article = await Articles.findOne({ title });
      if (article)
        return res.status(400).json({ msg: "This article already exists." });

      const newArticle = new Articles({
        title: title.replace(/\b\w/g, (l) => l.toUpperCase()),
        description,
        images,
      });

      await newArticle.save();
      res.json({ msg: "Created an article." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteArticles: async (req, res) => {
    try {
      await Articles.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted an article." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateArticles: async (req, res) => {
    try {
      const { title, description, images } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Articles.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.replace(/\b\w/g, (l) => l.toUpperCase()),
          description,
          images,
        }
      );

      res.json({ msg: "Updated an article." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = articleCtrl;
