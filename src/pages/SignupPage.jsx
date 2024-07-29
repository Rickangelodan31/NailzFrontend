import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWindowScroll } from "@mantine/hooks";
import { Button, Group } from "@mantine/core";
import { format } from "date-fns";
import classes from "./signupPage.module.css";

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
  const [username, setUsername] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, firstName, lastName, dateOfBirth, email, password);

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
      } else {
        const errorData = await response.json();
        console.error('Signup error:', errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.page}>
      <div className={classes.pageContainer}>
        <div className="sign">
          <h1>Signup</h1>

          <form className={classes.form} onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <label className={classes.label}>
                FirstName
                <input
                  value={firstName}
                  placeholder="Firstname"
                  onChange={(event) => setFirstName(event.target.value)}
                  required
                  className={classes.input}
                />
              </label>
              <label className={classes.label}>
                LastName
                <input
                  value={lastName}
                  placeholder="Lastname"
                  onChange={(event) => setLastname(event.target.value)}
                  required
                  className={classes.input}
                />
              </label>
              <label className={classes.label}>
                username
                <input
                  value={username}
                  placeholder="username"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                  className={classes.input}
                />
              </label>
              <label className={classes.label}>
                Date Of Birth
                <input
                  value={dateOfBirth}
                  placeholder="D.O.B"
                  onChange={(event) => setDateOfBirth(event.target.value)}
                  required
                  type="date"
                  className={classes.input}
                />
              </label>
              <label className={classes.label}>
                Email
                <input
                  value={email}
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  type="email"
                  className={classes.input}
                />
              </label>
              <label className={classes.label}>
                Password
                <input
                  value={password}
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  type="password"
                  className={classes.input}
                />
              </label>
            </div>
            <div className="button">
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
      <Group className={classes.scrollbutton} justify="center">
        {/* <Text>
          Scroll position x: {scroll.x}, y: {scroll.y}
        </Text> */}
        <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
      </Group>
    </div>
  );
};

export default SignupPage;
