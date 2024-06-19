import "./edit-profile.css";
const api = require("./api.json");
export default function EditProfile(props) {
  return (
    <div className="edit-profile-page">
      <div style={{ display: "flex", justifyContent: "left" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {props.data.photoLink === null || props.data.photoLink === "null" || props.data.photoLink === undefined || props.data.photoLink === "undefined" || props.data === "undefined" || props === "undefined" ? (
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
            <img id="photoLink" className="edit-profile-photo" src={props.data.photoLink} alt="Фото профиля" />
          )}
          <button className="udpate-photo-button margin-right-10px ">Обновить фото</button>
        </div>
        <div>
          <div className="label no-margin-top ">Имя</div>
          <input id="name" className="registration-input margin-bottom width-expand" placeholder={props.data.name} maxLength="20" />

          <div className="label">Фамилия</div>
          <input id="secondName" className="registration-input margin-bottom width-expand" placeholder={props.data.secondName} maxLength="20" />

          <div className="label">Отчество</div>
          <input id="patronymic" className="registration-input margin-bottom width-expand" placeholder={props.data.patronymic} maxLength="20" />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div className="input-layer no-top-border no-bottom-border margin-right-10px no-padding-top">
            <div className="label">Имя пользователя</div>
            <input id="userName" className="registration-input margin-bottom" placeholder={props.data.userName} maxLength="44" />
          </div>
          <div className="input-layer no-top-border no-bottom-border no-padding-top">
            <div className="label">Почта</div>
            <input id="email" className="registration-input margin-bottom " placeholder={props.data.email} maxLength="50" />
          </div>
        </div>
        <div className="label ">Расскажите о себе</div>
        <textarea id="description" className="registration-input expand-height margin-bottom width-610px padding-5px no-margin-bottom" placeholder={props.data.description} maxLength="500" />
        <button
          className="change-password-button"
          onClick={async () => {
            let requestBody = props.data;
            let dataChanged = false;

            let currentBodyElement = document.querySelector("#userName");
            if (currentBodyElement.value !== "") {
              requestBody["userName"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            currentBodyElement = document.querySelector("#name");
            if (currentBodyElement.value !== "") {
              requestBody["name"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            currentBodyElement = document.querySelector("#secondName");
            if (currentBodyElement.value !== "") {
              requestBody["secondName"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            currentBodyElement = document.querySelector("#patronymic");
            if (currentBodyElement.value !== "") {
              requestBody["patronymic"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            currentBodyElement = document.querySelector("#email");
            if (currentBodyElement.value !== "") {
              requestBody["email"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            currentBodyElement = document.querySelector("#description");
            if (currentBodyElement.value !== "") {
              requestBody["description"] = currentBodyElement.value;
              currentBodyElement.value = "";
              dataChanged = true;
            }

            if (!dataChanged) {
              alert("Новые данные не указаны");
              return;
            }

            const response = await fetch(api.editProfile, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(requestBody),
              credentials: "include",
            });
            if (response.ok) {
              document.querySelector("#userName").setAttribute("placeholder", requestBody.userName);
              document.querySelector("#name").setAttribute("placeholder", requestBody.name);
              document.querySelector("#secondName").setAttribute("placeholder", requestBody.secondName);
              document.querySelector("#patronymic").setAttribute("placeholder", requestBody.patronymic);
              document.querySelector("#email").setAttribute("placeholder", requestBody.email);
              document.querySelector("#description").setAttribute("placeholder", requestBody.description);
            } else {
              alert(await response.text());
            }
          }}
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
