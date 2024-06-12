import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Content from "./Content";
import { useState } from "react";
import CreateNewDesign from "./pages/CreateNewDesign";
import AboutPage from "./pages/About";
import Sidebar from "./components/Sidebar";
import Achievements from "./pages/Achievements";
import MessageBox from "./pages/MessageBox";
import PrivateRoute from "./components/PrivateRoute";
// import AddFriends from "./pages/AddFriendsPage";
// import FriendsList from "./pages/FriendsList";
// import Post from "./components/Post";
import UpdatePost from "./components/UpdatePost";
import UpdateUserDetails from "./components/UpdateUserDetails";
// import Friend from "./components/Friend";


function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };
  return (
    <>
      <div className={darkMode ? "dark-mode" : "light-mode"}>
        <Navbar darkMode={darkMode} toggleMode={toggleMode} />
        <Sidebar className="sidebar" />
        {/* <Content darkMode={darkMode} /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
          <Route path="/login" element={<LoginPage darkMode={darkMode} />} />
          <Route path="/profile/:userId" component={ProfilePage} />

          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage darkMode={darkMode} />
              </PrivateRoute>
            }
          />
          {/* <Route path="/friends" element={<Friend />} />
          <Route
            path="/friendlist"
            element={<FriendsList darkMode={darkMode} />}
          /> */}
          {/* <Route path="/newPost" element={<CreateNewDesign Post={Post} />} /> */}
          <Route path="/newPost" element={<CreateNewDesign />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/message" element={<MessageBox darkMode={darkMode} />} />
          {/* <Route path="/add-friends" element={<AddFriends />} /> */}
          <Route path="/update-post/:postId" element={<UpdatePost />} />
          <Route path="/update-user-details" element={<UpdateUserDetails />} />
          

          <Route
            path="/achievements"
            element={<Achievements darkMode={darkMode} />}
          />
          <Route path="/signup" element={<SignupPage darkMode={darkMode} />} />
          <Route path="*" element={<h1>404 page</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
