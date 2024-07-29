import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../contexts/SessionContext"; // Import SessionContext
import classes from "./HomePage.module.css"; // Changed CSS module

const HomePage = () => {
  const { token, currentUser } = useContext(SessionContext); // Destructure token and user from context

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [post, setPost] = useState();

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers`, // API endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
        setData(responseData.reverse()); // Reverse data to show latest first
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(); // Fetch data if token exists
    } else {
      console.log("Token not provided or not valid");
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an error
  }

  const deletePost = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers/${id}`, // API endpoint for delete
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Use token for authorization
          },
        }
      );

      if (response.ok) {
        setData(data.filter((user) => user._id !== id)); // Filter out deleted post
      } else {
        setError("Failed to delete the post");
      }
    } catch (error) {
      setError(`Error deleting the post: ${error.message}`);
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.h1}>Home Page</h1> {/* Page heading */}
      <div className={classes.container}>
        {data.map((user) => (
          <div key={user._id} className={classes.userCard}>
            {/* Ensure unique key */}
            <div id={user._id}>{user.title}</div>
            <div id={user._id}>{user.description}</div>
            <div id={user._id}>{user.telephone}</div>
            <div id={user._id}>{user.style}</div>
            <img src={user.image} className={classes.PostImg} alt="profile" />
            {/* User image */}
            {user.owner === currentUser._id && ( // Check if current user is the owner
              <div>
                <button
                  id={user._posts}
                  type="button"
                  className={classes.button}
                  onClick={() => deletePost(user._id)}
                >
                  Delete
                </button>
                <button type="button" className={classes.button}>
                  Update
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
