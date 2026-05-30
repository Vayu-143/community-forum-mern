import axios from "axios";

const API =
  "http://localhost:5000/api";

export const getMessages = async (
  roomId
) => {
  const response =
    await axios.get(
      `${API}/messages/${roomId}`
    );

  return response.data;
};