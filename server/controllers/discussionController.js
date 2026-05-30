const Discussion = require("../models/Discussion");
const Comment = require("../models/Comment");

const createDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.create({
      title: req.body.title,
      description: req.body.description,
      author: req.user.id,
    });

    res.status(201).json(discussion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(discussions);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getDiscussionById = async (req, res) => {
  try {
    const discussion = await Discussion.findById(
      req.params.id
    ).populate("author", "name email");

    if (!discussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    res.json(discussion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const likeDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(
      req.params.id
    );

    if (!discussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    const alreadyLiked =
      discussion.likedBy?.includes(req.user.id);

    if (alreadyLiked) {
      return res.status(400).json({
        message: "Already liked",
      });
    }

    discussion.likes += 1;

    discussion.likedBy.push(req.user.id);

    await discussion.save();

    res.json(discussion);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

const deleteDiscussion = async (req, res) => {
  try {
    const discussion = await Discussion.findById(
      req.params.id
    );

    if (!discussion) {
      return res.status(404).json({
        message: "Discussion not found",
      });
    }

    // Only author can delete
    if (
      discussion.author.toString() !== req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    // Delete all comments of this discussion
    await Comment.deleteMany({
      discussionId: req.params.id,
    });

    // Delete discussion
    await discussion.deleteOne();

    res.json({
      message:
        "Discussion and comments deleted",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createDiscussion,
  getDiscussions,
  getDiscussionById,
  likeDiscussion,
  deleteDiscussion,
};