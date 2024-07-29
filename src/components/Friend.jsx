import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate} from "react-router-dom";
import Classes from "./Friend.module.css";

function Friend({ userId }) {
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]); // Ensure users is initialized as an empty array
  const { token } = useContext(SessionContext);
  const navigate = useNavigate(); // GET THE NAVIGATION FUNCTION

  useEffect(() => {
    const fetchUsers = async () => {
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
          throw new Error("Failed to fetch users");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error, "no data is available ");
      }
    };
    fetchUsers();
  }, [token]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/friends/${userId}/friends`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch friends");
        }
        const data = await response.json();
        setFriends(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (userId) {
      fetchFriends();
    }
  }, [userId, token]);

  const handleFriendRequest = async (userB) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/friends/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userB }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send friend request");
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };
  // Functions for accepting and rejecting friend requests

  return (
    <div className={Classes.friend}>
      {" "}
      {/* Apply CSS Module class */}
      <h1>Users</h1>
      {users && users.length > 0 ? (
        <ul className={Classes.user.list}>
          {" "}
          {/* Apply CSS Module class */}
          {users.map((user) => (
            <li key={user._id} className={Classes.user.item}>
              {" "}
              {/* Apply CSS Module class */}
              {user.firstName} {user.lastName}
              <button
                className={Classes.add.friend.button}
                onClick={() => handleFriendRequest(user._id)}
              >
                Add Friend
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
      <h1>Selected User Friends</h1>
      {friends.length > 0 ? (
        <div className={Classes.selected.user}>
          {" "}
          {/* Apply CSS Module class */}
          <h2>Friends</h2>
          <ul className={Classes.friends.list}>
            {" "}
            {/* Apply CSS Module class */}
            {friends.map((friend) => (
              <li key={friend._id} className={Classes.friendItem}>
                {" "}
                {/* Apply CSS Module class */}
                {friend.status === 3 ? "Friend" : "Pending"}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No friends found</p>
      )}
      <button className={Classes.button} onClick={handleBack}>
        Back
      </button>
    </div>
  );
}

export default Friend;
