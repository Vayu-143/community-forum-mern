import axios from "axios";

const API =
  import.meta.env.VITE_API_URL +
  "/discussions";

export const getDiscussions =
  async () => {
    return await axios.get(API);
  };

export const createDiscussion =
  async (
    discussionData,
    token
  ) => {
    return await axios.post(
      API,
      discussionData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

export const getDiscussionById =
  async (id) => {
    return await axios.get(
      `${API}/${id}`
    );
  };

export const likeDiscussion =
  async (
    id,
    token
  ) => {
    return await axios.put(
      `${API}/like/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

export const deleteDiscussion =
  async (
    id,
    token
  ) => {
    return await axios.delete(
      `${API}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };