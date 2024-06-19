import "./change-password.css";
const api = require("./api.json");
export default function ChangePassword() {
  return (
    <div className="change-password-page">
      <div className="delete-profile-label no-margin-top ">Текущий пароль</div>
      <input id="prevPassword" className="delete-profile-input" placeholder="Введите пароль" type="password" />
      <div className="delete-profile-label">Новый пароль</div>
      <input id="newPassword" className="delete-profile-input" placeholder="Введите новый пароль" type="password" />
      <div className="delete-profile-label">Повторите новый пароль</div>
      <input id="newRepeatedPassword" className="delete-profile-input" placeholder="Введите новый пароль" type="password" />
      <button
        className="change-password-button"
        onClick={async () => {
          let requestBody = {};

          let currentBodyElement = document.querySelector("#prevPassword");
          if (typeof currentBodyElement.value !== "undefined" && currentBodyElement.value !== "") {
            requestBody["prevPassword"] = currentBodyElement.value;
          } else {
            alert("Текущий пароль не указан");
            return;
          }

          currentBodyElement = document.querySelector("#newPassword");
          if (typeof currentBodyElement.value !== "undefined" && currentBodyElement.value !== "") {
            requestBody["newPassword"] = currentBodyElement.value;
          } else {
            alert("Новый пароль не указан");
            return;
          }

          currentBodyElement = document.querySelector("#newRepeatedPassword");
          if (typeof currentBodyElement.value !== "undefined" && currentBodyElement.value !== "") {
          } else {
            alert("Новый пароль не повторен");
            return;
          }

          if (document.querySelector("#newRepeatedPassword").value !== document.querySelector("#newPassword").value) {
            alert("Новый пароль не повторен неправильно");
            return;
          }

          const response = await fetch(api.changePassword, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
            credentials: "include",
          });
          if (response.ok) {
          } else {
            alert(await response.text());
          }
        }}
      >
        Сохранить
      </button>
    </div>
  );
}
