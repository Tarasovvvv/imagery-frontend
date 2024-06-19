import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Card from "./card/card";
import "./collection.css";
const api = require("./api.json");

export default function Collection() {
  let { collectionId } = useParams();
  document.title = collectionId;

  const [data, setData] = useState({
    status: "not authorized",
    userData: {
      userName: "",
      imagesCount: 0,
      publicCollectionsCount: 0,
      privateCollectionsCount: 0,
    },
    collectionData: {},
    searchData: [[], [], []],
  });

  useEffect(() => {
    const setStartData = async () => {
      const collectionData = await fetch(`${api.collection}${collectionId}`, { method: "GET", credentials: "include" });
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
        searchData: parseImageData(await loadImageData()),
        collectionData: collectionData.ok ? await collectionData.json() : -1,
      });
    };
    setStartData();
  }, []);

  async function loadImageData() {
    const response = await fetch(`${api.collectionImages}${collectionId}`);
    const data = await response.json();
    return data;
  }

  function parseImageData(data) {
    const totalCount = data.length;
    const newData = [data.slice((totalCount * 2) / 3), data.slice(totalCount / 3, (totalCount * 2) / 3), data.slice(0, totalCount / 3)];
    return newData;
  }

  return (
    <>
      <div className="header" style={{ display: "flex", justifyContent: "center" }}>
        <h2>{data.collectionData.name} </h2>
      </div>
      {data.collectionData !== -1 ? (
        <div className="columns-area">
          {data.searchData.map((columnData, columnIndex) => (
            <div className="column" id={`column-${columnIndex}`} key={columnIndex}>
              {columnData.map((cardData, cardIndex) => (
                <Card
                  id={`image-${columnIndex}-${cardIndex}`}
                  key={`image-${columnIndex}-${cardIndex}`}
                  status={data.status}
                  image={cardData.image}
                  tags={cardData.tags}
                  author={cardData.user}
                  onTagClick={(value) => {
                    let searchTextField = document.querySelector(".search-text-field");
                    searchTextField.value += (searchTextField.value.slice(-1) !== " " ? " " : "") + value;
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <h1>Коллекции не существует</h1>
      )}
    </>
  );
}
