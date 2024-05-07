import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "@mantine/core";

import "./navbar.css";

const Navbar = ({ darkMode, toggleMode }) => {
  const { token, logout } = useContext(SessionContext);
 
  return (
    <div className='navbar'>
   
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/newPost">Create new post</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <button type="button" onClick={logout}>
                Logout
              </button>
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
          <li>
            <Link to="/books">All Post</Link>
          </li>
        </ul>
      </div>
      <Button className="togglebutt" color={darkMode ? "dark" : "light"} onClick={toggleMode}>
        {darkMode ? "Dark mode" : "Light mode"}
      </Button>
    </div>
  );
};

export default Navbar;
