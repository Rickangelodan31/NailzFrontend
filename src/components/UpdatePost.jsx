// UpdatePost.jsx
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import classes from "./updatePost.module.css"; // Create a corresponding CSS module file

const UpdatePost = () => {
  const { token } = useContext(SessionContext);
  const { postId } = useParams("");
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/designers/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchPost();
    } else {
      setError("Token not provided or not valid");
      setLoading(false);
    }
  }, [postId, token]);

  //   this update button is fully fuctional
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );
      if (response.ok) {
        navigate("/profile");
      } else {
        setError("Failed to update post");
      }
    } catch (error) {
      setError(`Error updating post: ${error.message}`);
    }
  };
  const renderUpdateButton = () => {
    if (user?._id === post?.ownerId) {
      return <button onClick={handleUpdate}>Update Post</button>;
    }
    return null;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.updateContainer}>
      <h2>Update Post</h2>
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      {/* Render the update button conditionally */}
      {renderUpdateButton()}
      <button onClick={handleUpdate}>Update Post</button>

      <button onClick={handleBack}>Back</button>
    </div>
  );
};

export default UpdatePost;
