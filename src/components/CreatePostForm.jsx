import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePostForm = ({ setPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to create a new post
      const response = await axios.post("/api/posts", { title, content });
      const newPost = response.data;

      // Update the list of posts by adding the newly created post
      setPosts((prevPosts) => [newPost, ...prevPosts]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      ></textarea>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePostForm;
