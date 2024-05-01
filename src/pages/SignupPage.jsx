import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastname] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState();
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(firstName, LastName, dateOfBirth, password);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, LastName, dateOfBirth, password }),
        }
      );
      if (response.status === 201) {
        const newUser = await response.json();
        console.log(newUser);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          FirstName
          <input
            value={firstName}
            placeholder="Firstname"
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </label>
        <label>
          LastName
          <input
            value={LastName}
            placeholder="Lastname"
            onChange={(event) => setLastname(event.target.value)}
            required
          />
        </label>
        <label>
          Date Of Birth
          <input
            value={dateOfBirth}
            placeholder="D.O.B"
            onChange={(event) => setdateOfBirth(event.target.value)}
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
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
};

export default SignupPage;
