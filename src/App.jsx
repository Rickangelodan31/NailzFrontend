import { Route, Routes} from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import Content from "./Content";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
          <Navbar darkMode={darkMode} toggleMode={toggleMode} />
          <Content darkMode={darkMode} />

          <Routes>
            <Route path="/" element={<h1>Home page</h1>} />
            <Route
              path="/signup"
              element={<SignupPage darkMode={darkMode} />}
            />
            <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
            <Route
              path="/profile"
              element={<ProfilePage darkMode={darkMode} />}/>
            <Route path="*" element={<h1>404 page</h1>} />
          </Routes>
      
      </div>
    </>
  );
}

export default App;
