// Home.js
import React, { useState, useEffect } from "react";
import CreatePostForm from "./CreatePostForm";
import HomePage from "./HomePage";
import ProfilePage from "../pages/ProfilePage";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <div>
      <CreatePostForm setPosts={setPosts} />
      <HomePage posts={posts} />
      <ProfilePage posts={posts} />
    </div>
  );
};

export default Home;
