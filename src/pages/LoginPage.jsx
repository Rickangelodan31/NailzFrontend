import { useContext, useState } from "react";
import { SessionContext } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";
import classes from "./login.module.css";

const LoginPage = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(SessionContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, password);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      if (response.status === 200) {
        const parsed = await response.json();
        console.log(parsed);
        setToken(parsed.token);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label>
          Username
          <input
            value={username}
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
            type="password"
          />
          <button
            className="passtoggle"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default LoginPage;
