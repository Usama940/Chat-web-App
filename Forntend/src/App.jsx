import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./Components/Navbar";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import SettingPage from "./Pages/SettingPage";
import ProfilePage from "./Pages/ProfilePage";
import { useAuthStore } from "../store/useAuthStore.js";

import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  console.log({ authUser });

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <HomePage />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <HomePage />}
        />

        {/* Protected routes */}
        <Route path="/" element={authUser ? <HomePage /> : <LoginPage />} />
        <Route
          path="/setting"
          element={authUser ? <SettingPage /> : <LoginPage />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <LoginPage />}
        />
      </Routes>
    </>
  );
};

export default App;
