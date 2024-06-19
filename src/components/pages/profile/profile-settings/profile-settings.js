import { useState, useEffect } from "react";
import EditProfile from "./edit-profile/edit-profile";
import ChangePassword from "./change-password/change-password";
import DeleteProfile from "./delete-profile/delete-profile";
import "./profile-settings.css";
const api = require("./api.json");

export default function ProfileSettings() {
  document.title = "Настройки";
  const [menuData, setMenuData] = useState();

  useEffect(() => {
    const loadStartProfileData = async () => {
      await loadProfileData();
    };
    loadStartProfileData();
  }, []);

  const loadProfileData = async () => {
    const fetchedSettingsData = await fetch(`${api.settings}`, { credentials: "include" });
    if (fetchedSettingsData.ok) {
      setMenuData({
        status: "edit-profile",
        data: await fetchedSettingsData.json(),
      });
    } else {
      setMenuData({
        status: "user-not-authorized",
        data: await fetchedSettingsData.text(),
      });
    }
  };

  const switchScreen = async (status) => {
    const fetchedAuthData = await fetch(`${api.ckeckAuth}`, { credentials: "include" });
    if (fetchedAuthData.ok) {
      if (status === "edit-profile") {
        await loadProfileData();
      } else {
        setMenuData({ status: status, data: menuData.data });
      }
    } else {
      setMenuData({ status: "user-not-authorized", data: await fetchedAuthData.text() });
    }
  };

  return (
    <>
      {typeof menuData == "undefined" ? (
        <></>
      ) : menuData.status === "user-not-authorized" ? (
        <h1 style={{ margin: "100px auto", textAlign: "center" }}>{menuData.data}</h1>
      ) : (
        <div className="profile-settings-page">
          <div className="settings-menu x">
            <div
              id="edit-profile-button"
              className="settings-menu-item"
              style={menuData.status === "edit-profile" ? { border: "1px solid black", borderRight: "1px solid white" } : { border: "1px solid transparent", borderRight: "1px solid black" }}
              onMouseOver={() => {
                const button = document.querySelector("#edit-profile-button");
                if (menuData.status === "change-password" || menuData.status === "delete-profile") {
                  button.style.border = "1px solid rgb(200,200,200)";
                  button.style.borderRight = "1px solid black";
                  button.style.backgroundColor = "white";
                  button.style.color = "black";
                }
              }}
              onMouseOut={() => {
                const button = document.querySelector("#edit-profile-button");
                if (menuData.status === "change-password" || menuData.status === "delete-profile") {
                  button.style.border = "1px solid transparent";
                  button.style.borderRight = "1px solid black";
                }
              }}
              onClick={() => {
                switchScreen("edit-profile");
              }}
            >
              Редактировать профиль
            </div>
            <div
              id="change-password-button"
              className="settings-menu-item"
              style={menuData.status === "change-password" ? { border: "1px solid black", borderRight: "1px solid white" } : { border: "1px solid transparent", borderRight: "1px solid black" }}
              onMouseOver={() => {
                const button = document.querySelector("#change-password-button");
                if (menuData.status === "edit-profile" || menuData.status === "delete-profile") {
                  button.style.border = "1px solid rgb(200,200,200)";
                  button.style.borderRight = "1px solid black";
                  button.style.backgroundColor = "white";
                  button.style.color = "black";
                }
              }}
              onMouseOut={() => {
                const button = document.querySelector("#change-password-button");
                if (menuData.status === "edit-profile" || menuData.status === "delete-profile") {
                  button.style.border = "1px solid transparent";
                  button.style.borderRight = "1px solid black";
                }
              }}
              onClick={() => {
                switchScreen("change-password");
              }}
            >
              Сменить пароль
            </div>
            <div
              id="delete-profile-button"
              className="settings-menu-item red-color"
              style={menuData.status === "delete-profile" ? { border: "1px solid black", borderRight: "1px solid white" } : { border: "1px solid transparent", borderRight: "1px solid black" }}
              onMouseOver={() => {
                const button = document.querySelector("#delete-profile-button");
                if (menuData.status === "edit-profile" || menuData.status === "change-password") {
                  button.style.border = "1px solid rgb(200,200,200)";
                  button.style.borderRight = "1px solid black";
                  button.style.backgroundColor = "white";
                  button.style.color = "rgb(240, 0, 0)";
                }
              }}
              onMouseOut={() => {
                const button = document.querySelector("#delete-profile-button");
                if (menuData.status === "edit-profile" || menuData.status === "change-password") {
                  button.style.border = "1px solid transparent";
                  button.style.borderRight = "1px solid black";
                }
              }}
              onClick={() => {
                switchScreen("delete-profile");
              }}
            >
              Удалить профиль
            </div>
          </div>
          {menuData.status === "edit-profile" && (
            <EditProfile
              data={typeof menuData.data === "undefined" ? {} : menuData.data}
              reloadPage={(data) => {
                setMenuData(data);
              }}
            />
          )}
          {menuData.status === "change-password" && <ChangePassword />}
          {menuData.status === "delete-profile" && <DeleteProfile />}
        </div>
      )}
    </>
  );
}
