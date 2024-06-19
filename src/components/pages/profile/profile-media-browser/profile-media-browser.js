import { Link } from "react-router-dom";
import BrowseImage from "./browse-image/browse-image";
import AddImageToCollection from "../../home/columns-area/card/add-image-to-collections/add-image-to-collection";
import "./profile-media-browser.css";
const api = require("./api.json");

export default function ProfileMediaBrowser(props) {
  console.log(props);
  return (
    <div className="profile-media-browser">
      {props.media.type === "images" ? (
        <div className="columns-area" style={{ marginTop: "0" }}>
          {props.media.data.map((columnData, columnIndex) => (
            <div className="column" id={`column-${columnIndex}`} key={columnIndex}>
              {columnData.map((cardData, cardIndex) => (
                <div id={`card-${columnIndex}-${cardIndex}`} className="card" key={`card ${columnIndex}-${cardIndex}`}>
                  <div id={`image-area-${columnIndex}-${cardIndex}`} className="image-area">
                    <img id={`aitc-image-${cardData.image.id}`} className="image" alt="Изображение" src={"data:image/*;base64," + cardData.image.imageFile} key={`image ${columnIndex}-${cardIndex}`} />
                    <div id={`button-layout-${columnIndex}-${cardIndex}`} className="button-layout">
                      <BrowseImage data={cardData} user={props.user} status={props.status} />
                      <button className="collection-button" key={`collection-button ${columnIndex}-${cardIndex}`}>
                        <AddImageToCollection data={cardData} />
                        <svg width="20px" height="20px" viewBox="0 0 24 21">
                          <path d="m22 12a1 1 0 0 1 -1 1h-8v8a1 1 0 0 1 -2 0v-8h-8a1 1 0 0 1 0-2h8v-8a1 1 0 0 1 2 0v8h8a1 1 0 0 1 1 1z" />
                        </svg>
                      </button>
                      {cardData.user.id === -1 ? (
                        <></>
                      ) : (
                        <>
                          <button className="collection-button" style={{ top: "65px" }} key={`collection-button ${columnIndex}-${cardIndex}`}>
                            <svg width="20px" height="20px" viewBox="0 -0.5 21 21">
                              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="Dribbble-Light-Preview" transform="translate(-59.000000, -400.000000)" fill="#000000">
                                  <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M3,260 L24,260 L24,258.010742 L3,258.010742 L3,260 Z M13.3341,254.032226 L9.3,254.032226 L9.3,249.950269 L19.63095,240 L24,244.115775 L13.3341,254.032226 Z" id="edit_fill-[#1480]" />
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </button>
                          <button
                            className="delete-image-button"
                            style={{ top: "110px" }}
                            onClick={async () => {
                              const currentCard = document.querySelector(`#image-area-${columnIndex}-${cardIndex}`);
                              currentCard.removeChild(document.querySelector(`#button-layout-${columnIndex}-${cardIndex}`));
                              currentCard.style.opacity = "0.5";
                              document.querySelector(`#tag-area-${columnIndex}-${cardIndex}`).style.opacity = "0.5";
                              await fetch(api.deleteImage, {
                                method: "DELETE",
                                body: JSON.stringify(cardData.image.id),
                                credentials: "include",
                              });
                            }}
                            key={`delete-image-button ${columnIndex}-${cardIndex}`}
                          >
                            <svg width="20px" height="20px" viewBox="0 0 24 22">
                              <path
                                d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div id={`tag-area-${columnIndex}-${cardIndex}`} className="tags-area">
                    {cardData.tags.slice(0, 5).map((tag, index) => (
                      <button className="tag" key={`tag ${columnIndex}-${cardIndex}-${index}`} style={{ cursor: "default", backgroundColor: "rgb(233, 233, 233)", color: "rgb(85, 85, 85)" }}>
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="columns-area" style={{ marginTop: "0" }}>
          {props.media.data.collections.map((columnData, columnIndex) => (
            <div id={`column-${columnIndex}`} className="collection-column" key={`column-${columnIndex}`}>
              {columnData.map((cardData, cardIndex) => (
                <div id={`collection-card-${columnIndex}-${cardIndex}`} className="collection-card" key={`collection-card-${columnIndex}-${cardIndex}`}>
                  <div
                    id={`collection-card-sublayer-${columnIndex}-${cardIndex}`}
                    key={`collection-card-sublayer-${columnIndex}-${cardIndex}`}
                    className="collection-card-sublayer"
                    style={
                      cardData.previewImages.length === 0
                        ? {
                            border: "1px dashed gray",
                            boxSizing: "border-box",
                            cursor: "pointer",
                          }
                        : {
                            border: "1px dashed transparent",
                            cursor: "pointer",
                          }
                    }
                  >
                    <div className="big-item">
                      {cardData.previewImages.length > 0 ? (
                        <img
                          id={`big-image-${columnIndex}-${cardIndex}`}
                          alt="Изображение"
                          style={{ position: "relative" }}
                          src={cardData.previewImages[0].link}
                          key={`big-image ${columnIndex}-${cardIndex}`}
                          onLoad={() => {
                            const currentImage = document.querySelector(`#big-image-${columnIndex}-${cardIndex}`);
                            const ratio = currentImage.naturalWidth / currentImage.naturalHeight;
                            if (ratio > 1) {
                              currentImage.style.height = "250px";
                              currentImage.style.left = `-${(250 * ratio - 297.5) / 2}px`;
                            } else {
                              currentImage.style.width = "297.5px";
                              currentImage.style.top = `-${(297.5 / ratio - 250) / 2}px`;
                            }
                          }}
                          onClick={() => {
                            const link = <Link to={`/collection/${cardData.id}`} />;
                            link.click();
                            document.querySelector(`#collection-link-${columnIndex}-${cardIndex}`).click();
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", height: "inherit" }}>
                      <div className="small-item margin-bottom-2_5px" style={{ borderTopRightRadius: "5px" }}>
                        {cardData.previewImages.length > 1 ? (
                          <img
                            id={`small-image-1-${columnIndex}-${cardIndex}`}
                            alt="Изображение"
                            style={{ position: "relative" }}
                            src={cardData.previewImages[1].link}
                            key={`small-image-1 ${columnIndex}-${cardIndex}`}
                            onLoad={() => {
                              const currentImage = document.querySelector(`#small-image-1-${columnIndex}-${cardIndex}`);
                              const ratio = currentImage.naturalWidth / currentImage.naturalHeight;
                              if (ratio > 1) {
                                currentImage.style.height = "125px";
                                currentImage.style.left = `-${(125 * ratio - 97.5) / 2}px`;
                              } else {
                                currentImage.style.width = "97.5px";
                                currentImage.style.top = `-${(97.5 / ratio - 125) / 2}px`;
                              }
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="small-item margin-top-2_5px" style={{ borderBottomRightRadius: "5px" }}>
                        {cardData.previewImages.length > 2 ? (
                          <img
                            id={`small-image-2-${columnIndex}-${cardIndex}`}
                            alt="Изображение"
                            style={{ position: "relative" }}
                            src={cardData.previewImages[2].link}
                            key={`small-image-2 ${columnIndex}-${cardIndex}`}
                            onLoad={() => {
                              const currentImage = document.querySelector(`#small-image-2-${columnIndex}-${cardIndex}`);
                              const ratio = currentImage.naturalWidth / currentImage.naturalHeight;
                              if (ratio > 1) {
                                currentImage.style.height = "125px";
                                currentImage.style.left = `-${(125 * ratio - 97.5) / 2}px`;
                              } else {
                                currentImage.style.width = "97.5px";
                                currentImage.style.top = `-${(97.5 / ratio - 125) / 2}px`;
                              }
                            }}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                    <div id={`collection-button-layout-${columnIndex}-${cardIndex}`} className="collection-button-layout">
                      {props.media.data.alienProfile ? (
                        <></>
                      ) : (
                        <>
                          <Link to={`/collection/${cardData.id}`} style={{ position: "absolute", width: "calc(100% - 50px)", height: "inherit" }} />
                          <button
                            className="delete-collection-button"
                            onClick={async () => {
                              const currentCard = document.querySelector(`#collection-card-sublayer-${columnIndex}-${cardIndex}`);
                              currentCard.removeChild(document.querySelector(`#collection-button-layout-${columnIndex}-${cardIndex}`));
                              document.querySelector(`#collection-card-${columnIndex}-${cardIndex}`).style.opacity = "0.5";
                              await fetch(api.deleteCollection, {
                                method: "DELETE",
                                body: JSON.stringify(cardData.id),
                                credentials: "include",
                              });
                            }}
                            key={`delete-image-button ${columnIndex}-${cardIndex}`}
                          >
                            <svg width="20px" height="20px" viewBox="0 0 24 22">
                              <path
                                d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "left", marginTop: "5px", marginLeft: "5px" }}>
                    {props.media.data.alienProfile ? (
                      <></>
                    ) : cardData.type === "Закрытая" ? (
                      <svg style={{ marginRight: "5px", marginLeft: "-2px" }} width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <></>
                    )}
                    <div id={`collection-name-${columnIndex}-${cardIndex}`} className="collection-name" style={{ lineHeight: "1.2" }} key={`collection-name-${columnIndex}-${cardIndex}`}>
                      {cardData.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
