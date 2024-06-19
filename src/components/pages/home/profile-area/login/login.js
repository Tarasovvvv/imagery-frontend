import { useEffect } from "react";
import Modal from "react-modal";
import "./login.css";
const api = require("./api.json");

export default function Login(props) {
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
          inset: "calc(50% - 189px) calc(50% - 166px) auto",
          padding: "0 5px 5px",
          border: "1px solid transparent",
          overflow: "hidden",
        },
      }}
    >
      <div className="login-window">
        <div className="title">Вход</div>
        <div className="login-input-layer">
          <div className="label">Имя пользователя</div>
          <input id="userName" className="login-input  margin-bottom" placeholder="Введите имя пользователя" />

          <div className="label">Пароль</div>
          <input id="password" className="login-input" placeholder="Введите пароль" type="password" maxLength="20" />
        </div>
        <button
          className="submit-button"
          onClick={async () => {
            let response = await fetch(api.login, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: document.getElementById("userName").value,
                password: document.getElementById("password").value,
              }),
              credentials: "include",
            });
            if (response.ok) {
              props.onClose("authorized", await response.json());
            } else {
              props.onClose("not authorized", {});
            }
          }}
        >
          Войти
        </button>
        <div className="label-login gray-text">
          Нет аккаунта?
          <button
            className="no-account-button gray-text"
            onClick={() => {
              props.onClose();
              props.onRegistration();
            }}
          >
            Регистрация
          </button>
        </div>
      </div>
    </Modal>
  );
}
