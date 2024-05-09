import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { SessionContext } from "../contexts/SessionContext";
import classes from "./profilePage.module.css";

const ProfilePage = () => {
  const { token } = useContext(SessionContext);

  const [files, setFiles] = useState([]);
  const [user, setUser] = useState();
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [age, setAge] = useState("");
  const [username, setUsername] = useState();

  async function fetchUserDetails() {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      // Update the product state with the fetched data
      setUser(data);
    } catch (error) {
      // Log the error if the fetch fails
      console.log("Error fetching user details:", error);
    }
  }

  useEffect(() => {
    // let's make a function inside ..

    // Check if the productId is not null, then call the function

    fetchUserDetails();
  }, []);

  const handleProfilePictureUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", files[0]);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/profilePicture`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        setProfilePicture(data.profilePicture);
      } else {
        console.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          bio,
          age,
        }),
      });

      if (response.ok) {
        console.log("Profile updated successfully");
        fetchUserDetails();
      } else {
        console.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <>
      <div className={classes.profileContainer}>
        <h2 className={classes.h2}>Profile Picture</h2>

        {files.length > 0 && (
          <Button className={classes.Butt}
            onClick={handleProfilePictureUpload}
            style={{ marginTop: "10px" }}
          >
            Upload Profile Picture
          </Button>
        )}
        {profilePicture && (
          <img className={classes.imagePP}
            src={profilePicture}
            alt="Profile"
            style={{ marginTop: "10px", width: "200px" }}
          />
        )}
      </div>
      <div className={classes.profileSection}>
        <h2 className={classes.h2}>Edit Profile</h2>
        <label className={classes.label}>
          userame:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label className={classes.label}>
          Bio:
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </label>
        <label className={classes.label}>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label >
        <Button  onClick={handleUpdateProfile}>Update Profile</Button>
      </div>
      <div className={classes.detailsContainer}>
        <Link to="/newDesigner">Create Desiner</Link>
        {user ? (
          <div className="details-Container">
            <h2>{user.title}</h2>
            <img  src={user.image} alt={user.title} />
            <p>Price: ${user.price}</p>
            <p>Description: {user.description}</p>
            {/* Add more product details here as needed */}
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
