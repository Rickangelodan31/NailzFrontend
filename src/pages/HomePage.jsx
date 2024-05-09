import { useEffect, useState } from "react";
import Post from "../components/Post";
import classes from "./homePage.module.css";




const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch posts from backend when component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Make API call to fetch posts from backend
      const response = await fetch(`${import.meta.env.VITE_API_URL}/Designer`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPosts(data); // Assuming the response contains an array of posts
      } else {
        setError("Failed to fetch posts");
      }
    } catch (error) {
      setError("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Home Page</h1>
      <div className={classes.centered}>
        {posts.map((post) => (
          <Post key={post._id} post={post} className={classes.post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
