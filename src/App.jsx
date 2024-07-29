import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";
import CreateNewDesign from "./pages/CreateNewDesign";
import AboutPage from "./pages/About";
import Achievements from "./pages/Achievements";
import MessageBox from "./pages/MessageBox";
import UpdatePost from "./components/UpdatePost";
import UpdateUserDetails from "./components/UpdateUserDetails";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <Navbar darkMode={darkMode} toggleMode={toggleMode} />
      <Sidebar className="sidebar" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
        <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
        <Route path="/profile" element={
          <PrivateRoute>
            <ProfilePage darkMode={darkMode} />
          </PrivateRoute>
        } />
        <Route path="/newPost" element={<CreateNewDesign />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/message" element={<MessageBox darkMode={darkMode} />} />
        <Route path="/update-post/:postId" element={<UpdatePost />} />
        <Route path="/update-user-details" element={<UpdateUserDetails />} />
        <Route path="/achievements" element={<Achievements darkMode={darkMode} />} />
        <Route path="*" element={<h1>404 page</h1>} />
      </Routes>
    </div>
  );
}

export default App;
