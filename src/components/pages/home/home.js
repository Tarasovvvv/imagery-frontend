import { useEffect, useState } from "react";
import ProfileMenu from "./profile-area/profile-area";
import ColumnsArea from "./columns-area/columns-area";
import "./home.css";
const api = require("./api.json");

export default function Home() {
  document.title = "Imagery - Поисковик картинок по описанию";
  const [data, setData] = useState({
    status: "not authorized",
    userData: {
      userName: "",
      imagesCount: 0,
      publicCollectionsCount: 0,
      privateCollectionsCount: 0,
    },
    searchData: [[], [], []],
  });

  useEffect(() => {
    const setStartData = async () => {
      const response = await fetch(api.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
        credentials: "include",
      });
      const isOk = response.ok;
      setData({
        status: isOk ? "authorized" : "not authorized",
        userData: isOk ? await response.json() : await response.text(),
        searchData: parseImageData(await loadImageData("Природа")),
      });
    };
    setStartData();
  }, []);

  async function loadImageData(text) {
    const response = await fetch(`${api.extractTags}${text}`);
    const data = await response.json();
    return data;
  }

  function parseImageData(data) {
    const totalCount = data.length;
    const newData = [data.slice((totalCount * 2) / 3), data.slice(totalCount / 3, (totalCount * 2) / 3), data.slice(0, totalCount / 3)];
    return newData;
  }

  return (
    <div className="home" key="home">
      <div className="header" key="header">
        <div className="search-area" key="search-area">
          <div className="search-box1" key="search-box1">
            <svg viewBox="0 0 512 512" className="search-favicon">
              <path d="m281.10025,0c-127.318,0 -230.9,103.582 -230.9,230.9c0,45.12 13.019,87.25 35.483,122.853l-70.654,70.654c-20.039,20.039 -20.039,52.527 0,72.564c20.039,20.039 52.527,20.039 72.564,0l70.654,-70.654c35.605,22.464 77.735,35.483 122.853,35.483c127.318,0 230.9,-103.582 230.9,-230.9s-103.58,-230.9 -230.9,-230.9zm0,410.489c-99.025,0 -179.589,-80.564 -179.589,-179.589s80.563,-179.589 179.589,-179.589s179.589,80.564 179.589,179.589s-80.562,179.589 -179.589,179.589z" />
            </svg>
            <input
              className="search-text-field"
              key="search-text-field"
              placeholder="Введите описание"
              onKeyUp={async (event) => {
                if (event.key === "Enter") {
                  setData({
                    status: data.status,
                    userData: data.userData,
                    searchData: parseImageData(await loadImageData(event.target.value)),
                  });
                }
              }}
            />
          </div>
          <button
            className="search-button"
            key="search-button"
            onClick={async (event) => {
              setData({
                status: data.status,
                userData: data.userData,
                searchData: parseImageData(await loadImageData(document.querySelector(".search-text-field").value)),
              });
            }}
          >
            Поиск
          </button>
          <ProfileMenu
            data={data}
            setData={(newData) => {
              setData({
                status: newData.status,
                userData: newData.userData,
                searchData: data.searchData,
              });
            }}
          />
        </div>
      </div>
      <ColumnsArea data={data} />
    </div>
  );
}
