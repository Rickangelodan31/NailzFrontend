import React, { useState, useEffect } from "react";
import CreatePostForm from "./CreatePostForm";
import HomePage from "./HomePage";
import ProfilePage from "../pages/ProfilePage";

// Component representing the home page
const Home = () => {
  const [posts, setPosts] = useState([]); // State to store the fetched posts

  // Fetch posts from the API when the component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the API
  const fetchPosts = async() => 
    {
      try 
      {
        const response = await fetch("/api/posts"); // Fetch posts from the API endpoint
        if (response.ok) {
        const data = await response.json(); // Parse the response data
        setPosts(data); // Update the posts state with the fetched data
      } else {
        console.error("Failed to fetch posts"); // Log an error if fetching fails
      }
    } catch (error) {
      console.error("Error fetching posts:", error); // Log any errors that occur during fetching
    }
  };

  return (
    <div>
      {/* Render the create post form */}
      <CreatePostForm setPosts={setPosts} />
      {/* Render the home page with the fetched posts */}
      <HomePage posts={posts} />
      {/* Render the profile page with the fetched posts */}
      <ProfilePage posts={posts} />
    </div>
  );
};

export default Home;
