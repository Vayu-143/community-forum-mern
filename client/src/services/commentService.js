import axios from "axios";

const API =
  import.meta.env.VITE_API_URL +
  "/comments";

// Get comments
export const getComments =
  async (discussionId) => {
    return await axios.get(
      `${API}/${discussionId}`
    );
  };

// Add comment
export const addComment =
  async (
    commentData,
    token
  ) => {
    return await axios.post(
      API,
      commentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };