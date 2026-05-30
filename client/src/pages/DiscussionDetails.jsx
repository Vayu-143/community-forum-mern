import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  getDiscussionById,
  likeDiscussion,
  deleteDiscussion,
} from "../services/discussionService";

import {
  getComments,
  addComment,
} from "../services/commentService";

import ChatBox from "../components/ChatBox";

function DiscussionDetails() {
  const { id } =
    useParams();

  const navigate =
    useNavigate();

  const [
    discussion,
    setDiscussion,
  ] = useState(null);

  const [
    comments,
    setComments,
  ] = useState([]);

  const [
    comment,
    setComment,
  ] = useState("");

  useEffect(() => {
    fetchDiscussion();
    fetchComments();
  }, [id]);

  const fetchDiscussion =
    async () => {
      try {
        const { data } =
          await getDiscussionById(
            id
          );

        setDiscussion(
          data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const fetchComments =
    async () => {
      try {
        const { data } =
          await getComments(
            id
          );

        setComments(
          data
        );
      } catch (
        error
      ) {
        console.log(
          error
        );
      }
    };

  const handleComment =
    async () => {
      if (
        !comment.trim()
      )
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await addComment(
          {
            discussionId:
              id,
            text:
              comment,
          },
          token
        );

        setComment("");

        fetchComments();
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          "Failed to add comment"
        );
      }
    };

  const handleLike =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await likeDiscussion(
          id,
          token
        );

        fetchDiscussion();
      } catch (
        error
      ) {
        alert(
          error.response?.data
            ?.message ||
            "Already liked"
        );
      }
    };

  const handleDelete =
    async () => {
      const confirmDelete =
        window.confirm(
          "Delete this discussion?"
        );

      if (
        !confirmDelete
      )
        return;

      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await deleteDiscussion(
          id,
          token
        );

        navigate(
          "/dashboard"
        );
      } catch (
        error
      ) {
        console.log(
          error
        );

        alert(
          error.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  if (!discussion)
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );

  return (
    <div className="container mt-4">

      {/* Discussion */}

      <div className="card shadow border-0 p-4 mb-4 main-card">
        <h1 className="fw-bold">
          {
            discussion.title
          }
        </h1>

        <p className="lead">
          {
            discussion.description
          }
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3">

          <div>
            <span className="me-3">
              👤{" "}
              {discussion
                .author?.name ||
                "Unknown"}
            </span>

            <span>
              📅{" "}
              {new Date(
                discussion.createdAt
              ).toLocaleDateString(
                "en-GB"
              )}
            </span>
          </div>

          <div className="d-flex gap-2">

            <button
              className="btn btn-success"
              onClick={
                handleLike
              }
            >
              ❤️{" "}
              {
                discussion.likes
              }
            </button>

            <button
              className="btn btn-danger"
              onClick={
                handleDelete
              }
            >
              🗑 Delete
            </button>

          </div>

        </div>
      </div>

      {/* Comments */}

      <div className="card shadow border-0 p-4 mb-4 main-card">

        <h2 className="mb-4">
          Comments (
          {
            comments.length
          }
          )
        </h2>

        <textarea
          className="form-control mb-3"
          rows="3"
          placeholder="Write a comment..."
          value={
            comment
          }
          onChange={(
            e
          ) =>
            setComment(
              e.target.value
            )
          }
        />

        <button
          className="btn btn-primary mb-4"
          onClick={
            handleComment
          }
        >
          Add Comment
        </button>

        {comments.map(
          (
            comment
          ) => (
            <div
              key={
                comment._id
              }
              className="border-bottom pb-3 mb-3"
            >
              <h6 className="fw-bold">
                👤{" "}
                {
                  comment
                    .userId
                    ?.name
                }
              </h6>

              <p>
                {
                  comment.text
                }
              </p>

              <small className="text-muted">
                {new Date(
                  comment.createdAt
                ).toLocaleString(
                  "en-GB"
                )}
              </small>
            </div>
          )
        )}

      </div>

      {/* Live Chat */}

      <ChatBox
        roomId={id}
      />

    </div>
  );
}

export default DiscussionDetails;