const router = require("express").Router();
const articleCtrl = require("../controllers/articleCtrl");

router
  .route("/articles")
  .get(articleCtrl.getArticles)
  .post(articleCtrl.createArticle);

router
  .route("/articles/:id")
  .delete(articleCtrl.deleteArticles)
  .put(articleCtrl.updateArticles);

module.exports = router;
