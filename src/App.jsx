import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Content from "./Content";
import { useState } from "react";
import CreateNewDesigner from "./pages/CreateNewDesigner";
import CreatePostForm from "./components/CreatePostForm";
import AboutPage from "./pages/About";
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
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route
            path="/profile"
            element={<ProfilePage darkMode={darkMode} />}
          />
          <Route path="/newPost" element={<CreatePostForm />} />
          <Route path="/newDesigner" element={<CreateNewDesigner />} />
          <Route path="/about" element={<AboutPage/>} />
          <Route path="*" element={<h1>404 page</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
