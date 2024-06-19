import { useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
import Modal from "react-modal";
import "./add-image-to-collection-modal.css";
const api = require("./api.json");

export default function AddImageToCollectionModal(props) {
  const [data, setData] = useState({ collections: [] });

  useEffect(() => {
    Modal.setAppElement("#root");
    const start = async () => {
      const response = await fetch(api.profileCollectionList, { method: "POST", body: JSON.stringify(props.data.image.id), credentials: "include" });
      response.ok ? setData({ collections: await response.json() }) : alert(await response.text());
    };
    start();
  }, []);

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        props.onClose();
      }}
      style={{
        overlay: {
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        },
        content: {
          margin: "auto",
          overflow: "hidden",
          inset: "200px calc(50% - 600px) ",
          padding: "0",
          border: "0",
          width: "600px",
          height: "500px",
        },
      }}
    >
      <div style={{ padding: "0", margin: "0", display: "flex", height: "100%" }}>
        <div
          style={{
            overflow: "hidden",
            width: "200px",
          }}
        >
          <img
            id={`aitc-image-${props.data.image.id}`}
            key={props.data.image.id}
            style={{
              position: "relative",
              margin: "0",
              border: "0",
              padding: "0",
            }}
            alt=""
            src={props.data.image.link}
            onLoad={() => {
              const currentImage = document.querySelector(`#aitc-image-${props.data.image.id}`);
              const ratio = currentImage.naturalWidth / currentImage.naturalHeight;
              if (ratio > 1) {
                currentImage.style.height = "500px";
                const width = 500 * ratio;
                currentImage.style.left = `${(200 - width) / 2}px`;
              } else {
                currentImage.style.width = "200px";
                const height = 200 / ratio;
                currentImage.style.top = `${(500 - height) / 2}px`;
              }
            }}
          />
        </div>
        <div
          style={{
            display: "block",
            overflowY: "auto",
            width: "400px",
            padding: "10px",
            marginBottom: "0",
          }}
        >
          <div
            key="-2"
            style={{ cursor: "pointer", lineHeight: "3", textAlign: "center", marginBottom: "10px", borderRadius: "5px", height: "80px", fontSize: "25px" }}
            className="collection-button-modal"
            onClick={async () => {
              const response = await fetch(api.addCollection, { method: "POST", body: JSON.stringify(props.data.image.id), credentials: "include" });
              response.ok ? props.onClose() : alert(await response.text());
            }}
          >
            Создать новую коллекцию
          </div>
          {data.collections.map((collection) => (
            <div
              key={collection.id}
              style={{ cursor: "pointer", lineHeight: "3", textAlign: "center", marginBottom: "10px", borderRadius: "5px", height: "80px", fontSize: "25px" }}
              className="collection-button-modal"
              onClick={async () => {
                const response = await fetch(api.addImageToCollection, {
                  method: "POST",
                  body: JSON.stringify(`${props.data.image.id} ${collection.id}`),
                  credentials: "include",
                });
                response.ok ? props.onClose() : alert(await response.text());
              }}
            >
              {collection.name.length > 20 ? collection.name.slice(0, 20) + "..." : collection.name}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
