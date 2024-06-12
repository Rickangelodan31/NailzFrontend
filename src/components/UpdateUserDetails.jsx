// IMPORT REACT HOOKS AND COMPONENTS
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import classes from "./updateUserDetails.module.css"; // IMPORT CSS MODULE FILE

const UpdateUserDetails = () => {
  // GET THE AUTHENTICATION TOKEN FROM THE CONTEXT
  const { token } = useContext(SessionContext);
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION
  const [formData, setFormData] = useState();

  // INITIALIZE STATE VARIABLES
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [age, setAge] = useState(0);
  // const [image, setImage] = useState(""); // OPTIONAL: INITIALIZE IMAGE STATE
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ASYNCHRONOUS FUNCTION TO FETCH USER DETAILS FROM THE API
  async function fetchUserDetails() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`, // API ENDPOINT FOR USER DETAILS
        {
          headers: {
            Authorization: `Bearer ${token}`, // INCLUDE AUTHORIZATION HEADER
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json(); // PARSE RESPONSE DATA
      if (data) {
        // UPDATE STATE WITH USER DETAILS
        setUsername(data.username);
        setBio(data.bio);
        setAge(data.age);
      }
    } catch (error) {
      setError(`Error fetching user details: ${error.message}`);
    } finally {
      setLoading(false); // MARK LOADING AS COMPLETE
    }
  }

  // EFFECT HOOK TO FETCH USER DETAILS WHEN COMPONENT MOUNTS OR TOKEN CHANGES
  useEffect(() => {
    if (token) {
      fetchUserDetails();
    } else {
      setError("Token not provided or not valid");
      setLoading(false);
    }
  }, [token]);

  // FUNCTION TO HANDLE UPDATE USER DETAILS
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users`, // API ENDPOINT FOR UPDATING USER DETAILS
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // INCLUDE AUTHORIZATION HEADER
          },
          body: JSON.stringify({
            username,
            bio,
            age,
          }),
        }
      );
      if (response.ok) {
        navigate("/profile"); // NAVIGATE TO PROFILE PAGE AFTER SUCCESSFUL UPDATE
      } else {
        setError("Failed to update user details");
      }
    } catch (error) {
      setError(`Error updating user details: ${error.message}`);
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  // RENDER LOADING STATE IF STILL LOADING
  if (loading) {
    return <div>Loading...</div>;
  }

  // RENDER ERROR MESSAGE IF THERE IS AN ERROR
  if (error) {
    return <div>Error: {error}</div>;
  }

  // RENDER FORM TO UPDATE USER DETAILS
  return (
    <div className={classes.updateContainer}>
      <h2>Update User Details</h2>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Age:
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <button onClick={handleUpdate}>Update User Details</button>
      <button className={classes.button}onClick={handleBack}>Back</button>
    </div>
  );
};

export default UpdateUserDetails;
