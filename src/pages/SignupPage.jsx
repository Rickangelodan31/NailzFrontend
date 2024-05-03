import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";
import { Button, Group } from "@mantine/core";
import { format } from "date-fns";
import "./signupPage.css";
const SignupPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(
    format("1990-01-01", "yyyy-MM-dd")
  );
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [scroll, scrollTo] = useWindowScroll();
  const [username, setUsername] = useState("randome");
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
          body: JSON.stringify({
            firstName,
            lastName,
            dateOfBirth,
            email,
            username,
            password,
          }),
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
      <div className="sign">
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
            Email
            <input
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
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
          <div className="button">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>

      <Group className="scrollbutton" justify="center">
        {/* <Text>
          Scroll position x: {scroll.x}, y: {scroll.y}
        </Text> */}
        <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
      </Group>
    </>
  );
};

export default SignupPage;
