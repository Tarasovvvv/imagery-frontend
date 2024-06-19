import "./delete-profile.css";
const api = require("./api.json");
export default function DeleteProfile() {
  return (
    <div className="delete-profile-page">
      <div className="delete-profile-label no-margin-top">Пароль</div>
      <input id="pas1" className="delete-profile-input" placeholder="Введите пароль" type="password" />
      <div className="delete-profile-label ">Повторите пароль</div>
      <input id="pas2" className="delete-profile-input" placeholder="Введите пароль" type="password" />
      <button
        className="delete-profile-button"
        onClick={async () => {
          const pas1 = document.querySelector("#pas1").value;
          const pas2 = document.querySelector("#pas2").value;
          if (typeof pas1 === "undefined" || typeof pas2 === "undefined" || pas1 !== pas2) {
            return;
          }
          const response = await fetch(api.deleteProfile, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: pas1,
            credentials: "include",
          });
          if (response.ok) {
          } else {
            alert(await response.text());
          }
        }}
      >
        Удалить
      </button>
    </div>
  );
}
