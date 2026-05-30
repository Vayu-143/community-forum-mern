const express =
  require("express");

const router =
  express.Router();

const {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  likeDiscussion,
  deleteDiscussion,
} = require(
  "../controllers/discussionController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

router.get(
  "/",
  getDiscussions
);

router.get(
  "/:id",
  getDiscussionById
);

router.post(
  "/",
  protect,
  createDiscussion
);

router.put(
  "/like/:id",
  protect,
  likeDiscussion
);

router.delete(
  "/:id",
  protect,
  deleteDiscussion
);

module.exports =
  router;