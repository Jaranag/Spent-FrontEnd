import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import App from "./App";
import LoginPage from "./auth/LoginPage";
import RegisterPage from "./auth/RegisterPage";
import EventCreate from "./EventCreate";
import EventPage from "./EventPage";
import UserProfile from "./UserProfile";

function Router() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("accessToken"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  if (token)
    return (
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path=":username" element={<UserProfile />} />
      </Routes>
    );

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage setToken={setToken} />} />
      <Route path="/main" element={<App />} />
      <Route path="/events/id" element={<EventPage />} />
      <Route path=":username" element={<UserProfile />} />
      <Route path="/event/create" element={<EventCreate />} />
    </Routes>
  );
}

export default Router;
