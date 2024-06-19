import { useEffect } from "react";
import Modal from "react-modal";
import "./registration.css";
const api = require("./api.json");

export default function Registration(props) {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={() => {
        props.onClose("not authorized", "");
      }}
      style={{
        overlay: {
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          overflow: "hidden",
        },
        content: {
          margin: "auto",
          inset: "calc(50% - 358px) calc(50% - 322px) auto",
          padding: "0 5px 5px",
          border: "0px solid transparent",
        },
      }}
    >
      <div className="registration-window">
        <div className="title">Регистрация</div>
        <div className="flex-layer">
          <div className="input-layer">
            <div className="label">Имя</div>
            <input id="name" className="registration-input margin-bottom margin-right" placeholder="Ваше имя" maxLength="20" />

            <div className="label">Фамилия</div>
            <input id="secondName" className="registration-input margin-bottom margin-right" placeholder="Ваша фамилия" maxLength="20" />

            <div className="label">Отчество</div>
            <input id="patronymic" className="registration-input margin-bottom" placeholder="Ваше отчество" maxLength="20" />
          </div>
          <div className="input-layer">
            <div className="label">Почта</div>
            <input id="email" className="registration-input margin-bottom" placeholder="Введите почту" maxLength="50" />

            <div className="label">Расскажите о себе</div>
            <textarea id="description" className="registration-input expand-height margin-bottom" placeholder="Текст" maxLength="500" />
          </div>
        </div>
        <div className="input-layer no-top-border">
          <div className="label">Имя пользователя</div>
          <input id="userName" className="registration-input expand-width margin-bottom red-border" placeholder="Введите имя пользователя" maxLength="44" />

          <div className="label">Пароль</div>
          <input id="password" className="registration-input expand-width margin-bottom red-border" placeholder="Введите пароль" type="password" maxLength="20" />

          <div className="label">Подтвердите пароль</div>
          <input id="repeatPassword" className="registration-input expand-width red-border" placeholder="Повторите пароль" type="password" maxLength="20" />
        </div>
        <button
          className="registration-submit-button"
          onClick={async () => {
            if (document.getElementById("password").value !== document.getElementById("repeatPassword").value) {
              alert("Пароль повторен неправильно!");
              return;
            }
            if (document.getElementById("userName").value === "") {
              alert("Имя пользователя не введено");
              return;
            }
            if (document.getElementById("password").value === "") {
              alert("Пароль не введен");
              return;
            }
            if (document.getElementById("userName").value.includes(" ")) {
              alert("Имя пользователя не должно содержать пробелов");
              return;
            }
            let response = await fetch(api.register, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: document.getElementById("userName").value,
                password: document.getElementById("password").value,
                name: document.getElementById("name").value,
                secondName: document.getElementById("secondName").value,
                patronymic: document.getElementById("patronymic").value,
                email: document.getElementById("email").value,
                description: document.getElementById("description").value,
              }),
              credentials: "include",
            });
            if (response.ok) {
              props.onClose("authorized", await response.text());
            } else {
              props.onClose("not authorized", "");
            }
          }}
        >
          Зарегистрироваться
        </button>
      </div>
    </Modal>
  );
}
