import { useState } from "react";
import "./upload-area.css";
const api = require("./api.json");

export default function UploadArea(props) {
  const [files, setFiles] = useState({});
  return (
    <>
      <div id="upload" className="add-image-modal-upload-area padding-10px font-size-16px display-flex" style={{ display: "block" }}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={`a-${index}`} style={{ display: "block", width: "100%" }}>
              <div key={`b-${index}`} style={{ display: "flex", marginBottom: "10px", alignItems: "left" }}>
                <div key={`c-${index}`} style={{ overflow: "hidden", width: "200px", height: "160px", borderRadius: "5px" }}>
                  <img
                    id={`upload-image-${index}`}
                    key={`upload-image-${index}`}
                    className="upload-image"
                    src={URL.createObjectURL(file)}
                    style={{ position: "relative" }}
                    alt="Изображение для загрузки"
                    onLoad={() => {
                      const currentImage = document.querySelector(`#upload-image-${index}`);
                      const ratio = currentImage.naturalWidth / currentImage.naturalHeight;
                      if (ratio > 1) {
                        currentImage.style.height = "160px";
                        const width = 160 * ratio;
                        currentImage.style.left = `${(200 - width) / 2}px`;
                      } else {
                        currentImage.style.width = "200px";
                        const height = 200 / ratio;
                        currentImage.style.top = `${(160 - height) / 2}px`;
                      }
                    }}
                  />
                </div>
                <textarea
                  id={`d-${index}`}
                  key={`d-${index}`}
                  type="text"
                  style={{
                    fontSize: "17px",
                    boxSizing: "border-box",
                    marginLeft: "10px",
                    padding: "5px",
                    borderRight: "1px solid rgb(220,220,220)",
                    borderLeft: "1px solid rgb(220,220,220)",
                    borderBottom: "1px solid gray",
                    borderTop: "1px solid black",
                    resize: "none",
                    outline: "none",
                    width: "calc(100% - 210px)",
                  }}
                  placeholder="Введите описание"
                />
              </div>
              <textarea
                id={`e-${index}`}
                key={`e-${index}`}
                type="text"
                rows="5"
                style={{
                  fontSize: "17px",
                  boxSizing: "border-box",
                  width: "100%",
                  margin: "0",
                  padding: "5px",
                  borderRight: "1px solid rgb(220,220,220)",
                  borderLeft: "1px solid rgb(220,220,220)",
                  borderBottom: "1px solid gray",
                  borderTop: "1px solid black",
                  outline: "none",
                  marginBottom: "5px",
                  resize: "none",
                }}
                placeholder="Введите теги"
              />
            </div>
          ))
        ) : (
          <div style={{ fontWeight: "600" }}>Выберите изображение(-я) для загрузки</div>
        )}
      </div>
      <div className="add-image-modal-buttons-area display-flex">
        <div style={{ display: "flex", justifyContent: "left" }}>
          <input
            id="input"
            type="file"
            accept="image/*"
            className="add-image-modal-upload-input font-size-16px"
            placeholder="Нажмите 'Выбрать файлы' для загрузки"
            multiple
            onChange={(e) => {
              console.log(files);
              setFiles(Array.from(e.target.files));
            }}
          />
          <button
            className="search-button"
            style={{ borderRadius: "5px", height: "50px", boxSizing: "border-box" }}
            onClick={() => {
              setFiles({});
            }}
          >
            Очистить
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "left" }}>
          <button
            className="add-image-modal-button padding-10px font-size-16px"
            onClick={async () => {
              if (typeof files === "undefined" || files.length === 0) {
                props.onClose();
              } else {
                let formData = new FormData();
                for (let i = 0; i < files.length; i++) {
                  const tags = document.querySelector(`#e-${i}`).value;
                  if (tags === "" || typeof tags === "undefined") {
                    alert("Изображения должны иметь хотя бы один тег");
                    return;
                  }
                  formData.append("files[]", files[i]);
                  formData.append("descriptions[]", document.querySelector(`#d-${i}`).value);
                  formData.append("tags[]", tags.replace(/[^а-яА-Яa-zA-Z ]/g, "") + ",");
                }

                console.log(formData);
                const response = await fetch(api.addImage, {
                  method: "POST",
                  body: formData,
                  credentials: "include",
                });
                if (response.ok) props.onClose();
                else alert(await response.text());
              }
            }}
          >
            Подтвердить
          </button>
          <button
            className="add-image-modal-button padding-10px font-size-16px"
            onClick={() => {
              props.onClose();
            }}
          >
            Отмена
          </button>
        </div>
      </div>
    </>
  );
}
