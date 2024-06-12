import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@mantine/core"; // Import Button component

const Navbar = ({ darkMode, toggleMode }) => {
  const { token, logout } = useContext(SessionContext);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);


  useEffect(() => {
    // Fetch and set profile picture logic
  }, [token]);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleSearch = debounce(async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/friends/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        console.log("Error:", response);
      }
    } catch (error) {
      console.log(error);
    }
  }, 300); // Debounce time in milliseconds

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    // Call handleSearch only if the input value is not empty
    if (inputValue.trim() !== "") {
      handleSearch();
    } else {
      // Clear the results if the input value becomes empty
      setResults([]);
    }
  };

  const handleSendRequest = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/friends/request`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userId }),
        }
      );
      if (response.ok) {
        console.log("Friend request sent");
      } else {
        console.log("Error:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };


// FETCH FRIEND REQUEST 

  useEffect(() => {
    if (token) {
      fetchPendingRequests();
    }
  }, [token]);
  
  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/friends/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPendingRequests(data);
      } else {
        console.log("Error:", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <ul className="navbar-links">
        <Button color={darkMode ? "dark" : "light"} onClick={toggleMode}>
          {darkMode ? "Dark mode" : "Light mode"}
        </Button>

        {token ? (
          <>
            <li>
              {/* Profile picture */}
              {profilePicture && (
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                />
              )}
            </li>
            <li>
              {/* Input field with dropdown */}
              <div className="search-bar">
                <input
                  type="text"
                  value={query}
                  onChange={handleInputChange}
                  placeholder="Search for friends"
                />
                {/* Dropdown to show search results */}
                <ul className="search-results">
                  {results.map((user) => (
                    <li key={user._id}>
                      <img
                        src={user.profilePicture}
                        alt={`${user.username}'s profile`}
                      />
                      <div className="conttain">
                        <div>
                          <p>{user.username}</p>
                          <p>{user.email}</p>
                        </div>
                        <button onClick={() => handleSendRequest(user._id)}>
                          Add Friend
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
                <button className="input-field" onClick={handleSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/friends">Friends List</Link>
            </li>
            <li>
              <Link to="/logout" onClick={logout}>
                Logout
              </Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link>
                <FontAwesomeIcon icon={faUserGroup} />
                {pendingRequests.length > 0 && (
                  <span className="notification-badge">
                    {pendingRequests.length}
                  </span>
                )}
              </Link>
            </li>
            {/* Add Button component */}
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}

        <li></li>
      </ul>
    </div>
  );
};

export default Navbar;
