import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home/home";
import Profile from "./components/pages/profile/profile";
import Settings from "./components/pages/profile/profile-settings/profile-settings";
import Collection from "./components/pages/collection/collection";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter basename="/">
    <Routes>
      <Route path="" element={<Home />} />
      <Route path=":userName" element={<Profile />} />
      <Route path="collection/:collectionId" element={<Collection />} />
      <Route path="settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>,
);
