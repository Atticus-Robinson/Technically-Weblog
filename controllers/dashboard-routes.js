const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

//Get all posts, include comments and submitting user. Then render dashboard with posts and set logged in to true
router.get("/", withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id,
    },
    attributes: ["id", "post_url", "title", "created_at", "content"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      // serialize data before passing to template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get single post to edit or delete. Render edit post page
router.get("/:id", withAuth, (req, res) => {
  console.log("dashboard edit");

  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title"],
  })
    .then((data) => {
      const post = data.get({ plain: true });

      res.render("edit-post", {
        post,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
