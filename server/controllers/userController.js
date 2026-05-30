const mongoose = require("mongoose");

const User = require("../models/User");
const Discussion = require("../models/Discussion");
const Comment = require("../models/Comment");

const getProfile = async (
  req,
  res
) => {
  try {
    const user =
      await User.findById(
        req.user.id
      ).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({
          message:
            "User not found",
        });
    }

    // Total discussions created by user
    const discussions =
      await Discussion.countDocuments(
        {
          author:
            user._id,
        }
      );

    // Count comments that belong
    // to discussions that still exist
    const comments =
      await Comment.aggregate([
        {
          $match: {
            userId:
              new mongoose.Types.ObjectId(
                user._id
              ),
          },
        },
        {
          $lookup: {
            from:
              "discussions",
            localField:
              "discussionId",
            foreignField:
              "_id",
            as:
              "discussion",
          },
        },
        {
          $match: {
            discussion: {
              $ne: [],
            },
          },
        },
      ]);

    const commentCount =
      comments.length;

    res.json({
      name:
        user.name,

      email:
        user.email,

      createdAt:
        user.createdAt,

      discussions,

      comments:
        commentCount,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "Server Error",
    });
  }
};

module.exports = {
  getProfile,
};