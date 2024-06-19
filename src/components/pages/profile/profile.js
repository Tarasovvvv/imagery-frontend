import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileMediaBrowser from "./profile-media-browser/profile-media-browser";
import "./profile.css";
const api = require("./api.json");

export default function Profile() {
  let { userName } = useParams();
  document.title = userName;
  userName = userName.replace("@", "");

  const [profileData, setProfileData] = useState({
    status: "not authorized",
    user: {},
    media: {
      type: "images",
      imagesAmount: 0,
      collectionsAmount: 0,
      data: [[], [], []],
    },
  });

  useEffect(() => {
    const loadStartProfileData = async () => {
      const fetchedStatus = await fetch(api.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      });
      const fetchedStartUserData = await fetch(`${api.profile}${userName}`);
      let startUserData;
      if (fetchedStartUserData.ok) startUserData = await fetchedStartUserData.json();
      else startUserData = { error: await fetchedStartUserData.text() };
      setProfileData({
        status: fetchedStatus.ok ? "authorized" : "not authorized",
        user: startUserData,
        media: await loadMediaData("images"),
      });
    };
    loadStartProfileData();
  }, []);

  async function loadMediaData(mediaType) {
    const fetchedMediaAmountsData = await fetch(`${api.mediaAmounts}${userName}`, { credentials: "include" });
    const mediaAmountsData = await fetchedMediaAmountsData.json();
    const fetchedMediaData = await fetch(`${api.media}${mediaType}?userName=${userName}`, { credentials: "include" });
    if (fetchedMediaData.ok) {
      let mediaData = await fetchedMediaData.json();
      let mediaData2 = mediaType === "collections" ? mediaData.collections : mediaData;
      const totalCount = mediaData2.length;
      let sortedMediaData = [mediaData2.slice((totalCount * 2) / 3), mediaData2.slice(totalCount / 3, (totalCount * 2) / 3), mediaData2.slice(0, totalCount / 3)];
      return {
        type: mediaType,
        imagesAmount: parseInt(mediaAmountsData[0]),
        collectionsAmount: parseInt(mediaAmountsData[1]) + parseInt(mediaAmountsData[2]),
        data:
          mediaType === "collections"
            ? {
                collections: sortedMediaData,
                alienProfile: mediaData.alienProfile,
              }
            : sortedMediaData,
      };
    } else {
      const mediaData = await fetchedMediaData.text();
      return {
        type: mediaType,
        imagesAmount: parseInt(mediaAmountsData[0]),
        collectionsAmount: parseInt(mediaAmountsData[1]) + parseInt(mediaAmountsData[2]),
        data: { error: mediaData },
      };
    }
  }

  return (
    <>
      {profileData.user.hasOwnProperty("error") ? (
        <h1 style={{ margin: "100px auto", textAlign: "center" }}>{profileData.user.error}</h1>
      ) : typeof profileData.user.id == "undefined" ? (
        <></>
      ) : (
        <div className="profile-page">
          <div className="user">
            <div className="user-photo-area">
              {profileData.user.photoLink === null || profileData.user.photoLink === "null" || profileData.user.photoLink === undefined || profileData.user.photoLink === "undefined" || profileData.user === undefined || profileData === undefined ? (
                <svg width="200px" height="200px" viewBox="1 1 22 22" fill="none">
                  <path
                    d="M12.12 12.78C12.05 12.77 11.96 12.77 11.88 12.78C10.12 12.72 8.71997 11.28 8.71997 9.50998C8.71997 7.69998 10.18 6.22998 12 6.22998C13.81 6.22998 15.28 7.69998 15.28 9.50998C15.27 11.28 13.88 12.72 12.12 12.78Z"
                    stroke="black"
                    strokeWidth="0.7"
                    fill="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.74 19.3801C16.96 21.0101 14.6 22.0001 12 22.0001C9.40001 22.0001 7.04001 21.0101 5.26001 19.3801C5.36001 18.4401 5.96001 17.5201 7.03001 16.8001C9.77001 14.9801 14.25 14.9801 16.97 16.8001C18.04 17.5201 18.64 18.4401 18.74 19.3801Z"
                    stroke="black"
                    fill="black"
                    strokeWidth="0.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="black" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <img className="user-photo" src={`${profileData.user.photoLink}`} alt="Фото профиля" />
              )}
              <div className="create-date">
                {`Регистрация ${new Date(profileData.user.createDate)
                  .toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/\s*г\.?$/, "")}`}
              </div>
            </div>
            <div className="user-data">
              <div className="user-name">
                {profileData.user.name} {profileData.user.secondName}
              </div>
              <div className="user-description">{profileData.user.description}</div>
            </div>
          </div>
          <div className="media">
            <div className="media-buttons-area">
              <div
                id="mb1"
                className="media-button margin-right-10px"
                style={profileData.media.type === "images" ? { border: "1px solid black", borderBottom: "1px solid white" } : { border: "1px solid transparent", borderBottom: "1px solid black" }}
                onMouseOver={() => {
                  const mb1 = document.querySelector("#mb1");
                  if (profileData.media.type === "collections") {
                    mb1.style.border = "1px solid rgb(200,200,200)";
                    mb1.style.borderBottom = "1px solid black";
                    mb1.style.backgroundColor = "white";
                    mb1.style.color = "black";
                  }
                }}
                onMouseOut={() => {
                  const mb1 = document.querySelector("#mb1");
                  if (profileData.media.type === "collections") {
                    mb1.style.border = "1px solid transparent";
                    mb1.style.borderBottom = "1px solid black";
                  }
                }}
              >
                <svg style={{ marginRight: "5px" }} width="18px" height="18px" viewBox="2 2 20 20" fill="none">
                  <path
                    d="M3.00005 18.0001C3 17.9355 3 17.8689 3 17.8002V6.2002C3 5.08009 3 4.51962 3.21799 4.0918C3.40973 3.71547 3.71547 3.40973 4.0918 3.21799C4.51962 3 5.08009 3 6.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21 4.5192 21 5.07899 21 6.19691V17.8031C21 18.2881 21 18.6679 20.9822 18.9774M3.00005 18.0001C3.00082 18.9884 3.01337 19.5058 3.21799 19.9074C3.40973 20.2837 3.71547 20.5905 4.0918 20.7822C4.5192 21 5.07899 21 6.19691 21H17.8036C18.9215 21 19.4805 21 19.9079 20.7822C20.2842 20.5905 20.5905 20.2837 20.7822 19.9074C20.9055 19.6654 20.959 19.3813 20.9822 18.9774M3.00005 18.0001L7.76798 12.4375L7.76939 12.436C8.19227 11.9426 8.40406 11.6955 8.65527 11.6064C8.87594 11.5282 9.11686 11.53 9.33643 11.6113C9.58664 11.704 9.79506 11.9539 10.2119 12.4541L12.8831 15.6595C13.269 16.1226 13.463 16.3554 13.6986 16.4489C13.9065 16.5313 14.1357 16.5406 14.3501 16.4773C14.5942 16.4053 14.8091 16.1904 15.2388 15.7607L15.7358 15.2637C16.1733 14.8262 16.3921 14.6076 16.6397 14.5361C16.8571 14.4734 17.0896 14.4869 17.2988 14.5732C17.537 14.6716 17.7302 14.9124 18.1167 15.3955L20.9822 18.9774M20.9822 18.9774L21 18.9996M15 9C14.4477 9 14 8.55228 14 8C14 7.44772 14.4477 7 15 7C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  onClick={async () => {
                    setProfileData({
                      user: profileData.user,
                      media: await loadMediaData("images"),
                    });
                  }}
                >
                  {` Изображения ${profileData.media.imagesAmount}`}
                </div>
              </div>

              <div style={{ marginRight: "10px" }} />
              <div
                id="mb2"
                className="media-button"
                style={profileData.media.type === "collections" ? { border: "1px solid black", borderBottom: "1px solid white" } : { border: "1px solid transparent", borderBottom: "1px solid black" }}
                onMouseOver={() => {
                  const mb2 = document.querySelector("#mb2");
                  if (profileData.media.type === "images") {
                    mb2.style.border = "1px solid rgb(200,200,200)";
                    mb2.style.borderBottom = "1px solid black";
                    mb2.style.backgroundColor = "white";
                    mb2.style.color = "black";
                  }
                }}
                onMouseOut={() => {
                  const mb2 = document.querySelector("#mb2");
                  if (profileData.media.type === "images") {
                    mb2.style.border = "1px solid transparent";
                    mb2.style.borderBottom = "1px solid black";
                  }
                }}
              >
                <svg style={{ marginRight: "5px" }} fill="black" width="18px" height="18px" viewBox="0 0 490 490">
                  <rect width="219.352" height="219.352" />
                  <rect x="270.648" width="219.352" height="219.352" />
                  <rect y="270.648" width="219.352" height="219.352" />
                  <rect x="270.648" y="270.648" width="219.352" height="219.352" />
                </svg>
                <div
                  onClick={async () => {
                    setProfileData({
                      user: profileData.user,
                      media: await loadMediaData("collections"),
                    });
                  }}
                >
                  {` Коллекции ${profileData.media.collectionsAmount}`}
                </div>
              </div>
            </div>
            <ProfileMediaBrowser media={profileData.media} user={profileData.user} status={profileData.status} />
          </div>
        </div>
      )}
    </>
  );
}
