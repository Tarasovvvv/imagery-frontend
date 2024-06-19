import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import AddImageToCollection from "../../add-image-to-collections/add-image-to-collection";
import "./browse-image-modal.css";
const api = require("./api.json");

export default function BrowseImageModal(props) {
  const [addImageToCollectionModalIsOpen, setAddImageToCollectionModalIsOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#root");
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
          inset: "20px 230px",
          padding: "0",
          border: "0px solid transparent",
        },
      }}
    >
      <div className="browse-image-modal no-padding-bottom">
        <img id={`image-${props.data.image.id}`} src={props.data.image.imageFile === null ? props.data.image.link : "data:image/*;base64," + props.data.image.imageFile} alt="1" className="browse-image-modal-image no-padding-bottom" />
      </div>
      <div className="browse-image-modal" style={{ flexDirection: "column", marginTop: "25px", paddingTop: "0" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "gray", marginLeft: "25px" }}>Опубликовано</div>
              <div className="browse-image-modal-create-date">
                {new Date(props.data.image.createDate)
                  .toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/\s*г\.?$/, "")}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "gray", marginLeft: "25px" }}>Последнее изменение</div>
              <div className="browse-image-modal-create-date">
                {new Date(props.data.image.lastEditDate)
                  .toLocaleDateString("ru-RU", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                  .replace(/\s*г\.?$/, "")}
              </div>
            </div>
          </div>
          <div style={{ marginRight: "25px" }}>
            <button
              className="browse-image-modal-button margin-right-10px"
              onClick={async () => {
                const href = URL.createObjectURL(await (await fetch(props.data.image.link)).blob());

                const anchorElement = document.createElement("a");
                anchorElement.href = href;
                anchorElement.download = "Изображение";

                document.body.appendChild(anchorElement);
                anchorElement.click();

                document.body.removeChild(anchorElement);
                window.URL.revokeObjectURL(href);
              }}
            >
              Скачать
            </button>
            {props.data.status === "not authorized" ? (
              <></>
            ) : (
              <button
                className="browse-image-modal-button"
                onClick={() => {
                  setAddImageToCollectionModalIsOpen(true);
                }}
              >
                <AddImageToCollection data={props.data} />
                Добавить в коллекцию
              </button>
            )}
          </div>
        </div>
        <div className="browse-image-modal-buttons-area">
          <div style={{ marginLeft: "25px", display: "flex" }}>
            <Link to={`/@${props.data.author.userName}`}>
              {props.data.author.photoLink === null ? (
                <svg style={{ borderRadius: "100%" }} height="52px" width="52px" viewBox="3 3 18 18" fill="none">
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
                <img src={props.data.author.photoLink} className="browse-image-modal-author-button" alt="Фото автора" />
              )}
            </Link>
            <Link to={`/@${props.data.author.userName}`} className="browse-image-modal-author-title">
              {props.data.author.userName}
            </Link>
          </div>
        </div>
        <div className="tags-area" style={{ margin: "0 25px" }}>
          {props.data.tags.slice(0, 50).map((tag, index) => (
            <button className="no-action-tag " key={index}>
              {tag}
            </button>
          ))}
        </div>
        <div className="browse-image-modal-description">{props.data.image.description}</div>
      </div>
    </Modal>
  );
}
