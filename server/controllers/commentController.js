const Comment =
  require("../models/Comment");

const addComment =
  async (req, res) => {
    try {
      const comment =
        await Comment.create({
          discussionId:
            req.body
              .discussionId,

          userId:
            req.user.id,

          text:
            req.body.text,
        });

      const populatedComment =
        await Comment.findById(
          comment._id
        ).populate(
          "userId",
          "name"
        );

      res
        .status(201)
        .json(
          populatedComment
        );
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to add comment",
        });
    }
  };

const getComments =
  async (req, res) => {
    try {
      const comments =
        await Comment.find({
          discussionId:
            req.params
              .discussionId,
        })
          .populate(
            "userId",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      res.json(
        comments
      );
    } catch (error) {
      console.log(error);

      res
        .status(500)
        .json({
          message:
            "Failed to load comments",
        });
    }
  };

module.exports = {
  addComment,
  getComments,
};