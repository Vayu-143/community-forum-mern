import {
  useEffect,
  useState,
} from "react";

import {
  getDiscussions,
  likeDiscussion,
  deleteDiscussion,
} from "../services/discussionService";

import { Link } from "react-router-dom";

function Dashboard() {
  const [discussions, setDiscussions] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    loadDiscussions();
  }, []);

  const loadDiscussions =
    async () => {
      try {
        const res =
          await getDiscussions();

        setDiscussions(
          res.data
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleLike =
    async (id) => {
      try {
        await likeDiscussion(id);

        loadDiscussions();
      } catch (error) {
        console.log(error);
      }
    };

  const handleDelete =
    async (id) => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        await deleteDiscussion(
          id,
          token
        );

        loadDiscussions();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>

      <Link
        className="btn btn-primary mb-3"
        to="/create-discussion"
      >
        Create Discussion
      </Link>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search discussions..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />

      {discussions
        .filter(
          (discussion) =>
            discussion.title
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )
        .map((discussion) => (
          <div
            key={discussion._id}
            className="card mb-3"
          >
            <div className="card-body">
              <h4>
                {
                  discussion.title
                }
              </h4>

              <p>
                {
                  discussion.description
                }
              </p>

              <p>
                Created By:
                {
                  discussion.author
                    ?.name
                }
              </p>

              <button
                className="btn btn-success me-2"
                onClick={() =>
                  handleLike(
                    discussion._id
                  )
                }
              >
                👍{" "}
                {
                  discussion.likes
                }
              </button>

              <button
                className="btn btn-danger me-2"
                onClick={() =>
                  handleDelete(
                    discussion._id
                  )
                }
              >
                Delete
              </button>

              <Link
                className="btn btn-primary"
                to={`/discussion/${discussion._id}`}
              >
                Open
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Dashboard;