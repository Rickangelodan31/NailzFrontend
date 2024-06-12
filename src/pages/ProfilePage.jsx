import { useEffect, useState, useRef, useContext } from "react"; // Added useRef
import { Link } from "react-router-dom"; // Added Link import for navigation
import { Button, Group } from "@mantine/core"; // Added imports from @mantine/core
import "@mantine/dropzone/styles.css"; // Added styles import
import { SessionContext } from "../contexts/SessionContext";
import classes from "./profilePage.module.css"; // Changed CSS module
import { useWindowScroll } from "@mantine/hooks"; // Added useWindowScroll for scrolling
import Post from "../components/Post"; // Added Post component import
import { useNavigate, useParams } from "react-router-dom"; // Added useNavigate and useParams


const ProfilePage = ({ match }) => {
  // Changed component name to ProfilePage and added match prop
  const { token } = useContext(SessionContext);
  const { userId } = useParams; // Added useParams to get userId

  const navigate = useNavigate(); // Added navigate for navigation
  const inputRef = useRef(null); // Added useRef for file input
  const [files, setFiles] = useState([]); // Added state for files
  const [user, setUser] = useState(""); // Added state for user
  const [profilePicture, setProfilePicture] = useState(null); // Added state for profile picture

  const [bio, setBio] = useState(""); // Added state for bio
  const [age, setAge] = useState(0); // Added state for age
  const [username, setUsername] = useState(""); // Added state for username
  const [posts, setPosts] = useState([]); // Changed state name to posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(""); // Added state for image
  const [data, setData] = useState(""); // Added state for data
  const [scroll, scrollTo] = useWindowScroll(); // Added useWindowScroll hook

  useEffect(() => {
    // Fetch user data logic
  }, [userId, token]); // Added useEffect for fetching user data

  const handleUpdateClick = (postId) => {
    // Added function for handling update click
    navigate(`/update-post/${postId}`);
  };

  const handleUpdateUserDetailsClick = () => {
    // Added function for handling user details update
    navigate("/update-user-details");
  };


  const handleDeleteClick = async (postId) => {
    if(window.confirm("do you want to delete"))
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/designers/${postId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete post');
      }
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      setError(`Error deleting post: ${error.message}`);
    }
  };







  async function fetchUserDetails() {
    // Added function to fetch user details
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      if (data) {
        setUser(data);
        setUsername(data.username);
        setBio(data.bio);
        setAge(data.age);
      }
    } catch (error) {
      setError(`Error fetching user details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserDetails();
    } else {
      setError("Token not provided or not valid");
      setLoading(false);
    }
  }, [token]); // Added useEffect to fetch user details

  useEffect(() => {
    const fetchUserAndPosts = async () => {
      // Modified function to fetch user and posts
      try {
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/designers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user details");
        }
        const userData = await userResponse.json();
        setUser(userData);

        const postsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/designers` // Modified API endpoint to fetch posts
        );
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData.reverse());
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUserAndPosts();
    } else {
      setError("Token not provided or not valid");
      setLoading(false);
    }
  }, [token]); // Modified useEffect to fetch user and posts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={classes.profileSection}>
        {" "}
        {/* Modified class name */}
        <h2>Profile</h2> {/* Changed heading */}
      </div>
      <div className={classes.detailsContainer}>
        {" "}
        {/* Modified class name */}
        <ul key={user._id}>
          <li>
            <h3>Username: {user?.username}</h3>
            <input type="text" />
          </li>
          {/* Changed details to display user info */}
          <li>
            <p>Bio: {user?.bio}</p>
          </li>
          {/* Changed details to display user info */}
          <li>
            <p>Age: {user?.age}</p>
          </li>{" "}
          {/* Changed details to display user info */}
          <button onClick={handleUpdateUserDetailsClick}>
            Update User Details
          </button>{" "}
          {/* Added button for updating user details */}
        </ul>
      </div>

      <div className={classes.detailsContainer}>
        {/* Modified class name */}
        <button className={classes.Butt}>
          {/* Modified class name */}
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/newPost"
          >
            Create Design
          </Link>
        </button>
        {/* Added button to create a new post */}
        <div className={classes.centered}>
          {/* Modified class name */}
          {posts.map((post) => (
            <div key={post._id} className={classes.postContainer}>
              {/* Modified class name */}
              <Post post={post} className={classes.post} />{" "}
              {/* Added Post component */}
              {post.ownerId === user?._id && (
                <>
                  <button
                    className={classes.button}
                    onClick={() => handleUpdateClick(post._id)}
                  >
                    Update
                  </button>
                  <button
                    className={classes.button}
                    onClick={() => handleDeleteClick(post._id)}
                  >
                    Delete
                  </button>
                 
                  
                </>
              )}
            </div>
          ))}
        </div>
        <Group className={classes.scrollbutton} justify="center">
          <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>{" "}
          {/* Added button to scroll to top */}
        </Group>
      </div>
    </>
  );
};

export default ProfilePage;
