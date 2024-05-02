import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../contexts/SessionContext";
import "./navbar.css";

const Navbar = () => {
  const { token, logout } = useContext(SessionContext);

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <>
              <li>
                <Link to="/books/new">Create new post</Link>
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
    </div>
  );
};

export default Navbar;
