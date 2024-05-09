import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import { Button } from "@mantine/core";

import "./navbar.css";

const Navbar = ({ darkMode, toggleMode }) => {
  const { token, logout } = useContext(SessionContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleClick = () => {
    setIsOpen(!isOpen);
  };
 
  return (
    
    <div className='navbar'>
   
      <div className={`navbar ${isOpen ? "open" : ""}`}>
      <div className="navbar-toggle" onClick={handleToggleClick}>
        ☰
      </div>
     
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
                <Link to="/profile">Profile</Link>
              </li>
          {token ? (
            <>
              <li>
                <Link to="/newPost">Create new post</Link>
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
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      <Button  color={darkMode ? "dark" : "light"} onClick={toggleMode}>
        {darkMode ? "Dark mode" : "Light mode"} 
      </Button>
    </div>
  );
};

export default Navbar;
