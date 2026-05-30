import axios from "axios";

const API =
  import.meta.env
    .VITE_API_URL;

export const getProfile =
  async (token) => {
    return await axios.get(
      `${API}/users/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };