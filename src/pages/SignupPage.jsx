import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(Date.now());
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(firstName, lastName, dateOfBirth, password);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, dateOfBirth, password }),
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
            value={lastName}
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
            onChange={(event) => setDateOfBirth(event.target.value)}
            required
            type="date"
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
