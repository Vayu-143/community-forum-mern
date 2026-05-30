const mongoose = require("mongoose");

const discussionSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      author: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      likes: {
        type: Number,
        default: 0,
      },

      likedBy: [
        {
          type:
            mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Discussion",
    discussionSchema
  );