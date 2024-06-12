import { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Group } from "@mantine/core";
import "@mantine/dropzone/styles.css";
import { SessionContext } from "../contexts/SessionContext";
import classes from "./profilePage.module.css";
import { useWindowScroll } from "@mantine/hooks";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";


const ProfilePage = () => {
  const { token } = useContext(SessionContext);

  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [user, setUser] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const [bio, setBio] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  // const [friends, setFriends] = useState([]);
  // const [friendRequests, setFriendRequests] = useState("");
  // const [imagePreview, setImagePreview] = useState(null);
  const [data, setData] = useState("");
  const [scroll, scrollTo] = useWindowScroll(); // Use Mantine's useWindowScroll hook

  const handleUpdateClick = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  const handleUpdateUserDetailsClick = () => {
    navigate("/update-user-details");
  };

  async function fetchUserDetails() {
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
        setProfilePicture(data.profilePicture);
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
  }, [token]);

  // async function fetchFriendRequests() {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/friends/requests`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setFriendRequests(data);
  //   } catch (error) {
  //     console.log("Error fetching friend requests:", error);
  //   }
  // }

  // async function fetchFriends() {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/friends`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     const data = await response.json();
  //     setFriends(data);
  //   } catch (error) {
  //     console.log("Error fetching friends:", error);
  //   }
  // }

  // useEffect(() => {
  //   if (token) {
  //     fetchUserDetails();
  //     fetchFriendRequests();
  //     fetchFriends();
  //   } else {
  //     console.log("Token not provided or not valid");
  //   }
  // }, [token]);

  // const handleAcceptRequest = async (userId) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/friends/accept`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({ userId }),
  //       }
  //     );
  //     if (response.ok) {
  //       fetchUserDetails();
  //       fetchFriendRequests();
  //       fetchFriends();
  //     } else {
  //       console.error("Error accepting friend request:", response);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const handleImageOnchange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();

  //   reader.onloadend = () => {

  //     setImagePreview(reader.result);
  //   };

  //   if (file) {
  //     reader.readAsDataURL(file);
  //   }
  // };

  // this fetchpost is fully functional
  useEffect(() => {
    const fetchUserAndPosts = async () => {
      try {
        // Fetch user details
        const userResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
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

        // Fetch posts
        const postsResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/Designers`
        );
        if (!postsResponse.ok) {
          throw new Error("Failed to fetch posts");
        }
        const postsData = await postsResponse.json();
        setPosts(postsData.reverse()); // Reverse posts array to display latest post first
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
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // this delete button method is fully functional

 
  const deletePost = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/designers/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
      } else {
        setError("Failed to delete the post");
      }
    } catch (error) {
      setError(`Error deleting the post: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>

     {/* UPDATE USER DETAILS */}
      <div className={classes.profileSection}>
        <h2>Profile</h2>
        <button onClick={handleUpdateUserDetailsClick}>Update User Details</button>
      </div>
      <div className={classes.detailsContainer}>
        <h3>Username: {user?.username}</h3>
        <p>Bio: {user?.bio}</p>
        <p>Age: {user?.age}</p>
        {/* Add more user details as needed */}
      </div>



      {/* <div className={classes.friendRequests}>
        <h2>Friend Requests</h2>
        <ul>
          {friendRequests.map((user) => (
            <li key={user._id}>
              <img
                src={user.profilePicture}
                alt={`${user.username}'s profile`}
              />
              <div>
                <p>{user.username}</p>
                <p>{user.email}</p>
              </div>
              <button onClick={() => handleAcceptRequest(user._id)}>
                Accept
              </button>
            </li>
          ))}
        </ul>
      </div> */}

      
      {/* CREATE USER DETAILS */}
      <div className={classes.detailsContainer}>
        <button className={classes.Butt}>
          <Link
            style={{ textDecoration: "none", color: "white" }}
            to="/newPost
            "
          >
            Create Design
          </Link>
        </button>

        {/* HANDLE UPDATE CLICK */}
        <div className={classes.centered}>
          {posts.map((post) => (
            <div key={post._id} className={classes.postContainer}>
              <Post post={post} className={classes.post} />
              <button
                className={classes.button}
                onClick={() => handleUpdateClick(post._id)}
              >
                Update
              </button>
              <button
                className={classes.button}
                onClick={() => deletePost(post._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <Group className={classes.scrollbutton} justify="center">
          <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
        </Group>
      </div>
    </>
  );
};

export default ProfilePage;
