import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiscussion } from "../services/discussionService";

function CreateDiscussion() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await createDiscussion(
        {
          title,
          description,
        },
        token
      );

      alert("Discussion Created");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to Create Discussion");
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Create Discussion</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Discussion Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <br />
        <br />

        <textarea
          rows="5"
          cols="40"
          placeholder="Discussion Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br />
        <br />

        <button type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateDiscussion;