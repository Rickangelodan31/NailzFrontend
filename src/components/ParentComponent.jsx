import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import ProfilePage from "../pages/ProfilePage";
import PostList from "../components/PostList"; // Ensure this path is correct

const ParentComponent = () => {
  const { token, currentUser } = useContext(SessionContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const [posts, setPosts] = useState([]); // Initialize your posts data

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/friends/requests`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFriendRequests(data);
        } else {
          console.error("Error fetching friend requests:", response);
        }
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      }
    };
    fetchRequests();
  }, [token]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error("Error fetching posts:", response);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [token]);

  const handleDelete = async (postId) => {
    console.log("Deleting post with ID:", postId); // Log the postId
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers/${postId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }, // Ensure to include the authorization header
        }
      );
      if (response.ok) {
        // Remove the deleted post from the local state
        setPosts(posts.filter((post) => post._id !== postId));
        console.log("Post deleted successfully");
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleUpdate = (postId) => {
    console.log("Updating post with ID:", postId);
    // Logic to update the post
  };

  return (
    <div>
      <PostList
        posts={posts}
        currentUser={currentUser}
        handleDelete={handleDelete}
        handleUpdate={(postId) => console.log("Update post with ID:", postId)} // Placeholder handleUpdate function
      />
      <ProfilePage friendRequests={friendRequests} />
    </div>
  );
};

export default ParentComponent;
