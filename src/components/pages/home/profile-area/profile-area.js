import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Registration from "./registration/registration";
import Login from "./login/login";
import Stats from "./stats/stats";
import AddImageButton from "./add-image-button/add-image-button";
import "./profile-area.css";
const api = require("./api.json");

export default function ProfileArea(props) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (props.data.status === "not authorized" || props.data.status === "authorized") {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  });

  useEffect(() => {
    setMenuOpen(false);
    document.addEventListener("click", (e) => {
      setMenuOpen(e.composedPath().includes(document.querySelector(".profile")));
    });
  }, []);

  return (
    <>
      {props.data.status === "authorized" ? (
        <>
          <AddImageButton />
          <div
            className="profile"
            onClick={() => {
              setMenuOpen(!menuOpen);
              if (menuOpen) {
                document.querySelector(".profile").style.color = "rgb(173, 173, 173)";
              } else {
                document.querySelector(".profile").style.color = "rgb(128, 128, 128)";
              }
            }}
          >
            <div className="profile-header">
              <div className="profile-preview">
                <div className="profile-nick">{props.data.userData.userName.length > 20 ? props.data.userData.userName.slice(0, 20) + "..." : props.data.userData.userName}</div>
                <Stats userData={props.data.userData} menuOpen={menuOpen} />
              </div>
              {props.data.userData.photoLink === "undefined" || props.data.userData.photoLink === null || props.data.userData.photoLink === "null" || props.data.userData.photoLink === undefined ? (
                <svg className="profile-button" width="40" height="40" viewBox="0 26 312 259">
                  <path d="m155.771,0.00001c-86.031,0 -155.771,69.74 -155.771,155.771c0,37.488 13.25,71.883 35.314,98.761c3.404,-27.256 30.627,-50.308 68.8,-61.225c13.946,12.994 31.96,20.878 51.656,20.878c19.233,0 36.894,-7.487 50.698,-19.936c38.503,11.871 65.141,36.27 66.017,64.63c24.284,-27.472 39.056,-63.555 39.056,-103.108c0,-86.031 -69.74,-155.771 -155.77,-155.771zm0,195.738c-9.944,0 -19.314,-2.732 -27.634,-7.464c-20.05,-11.409 -33.855,-34.756 -33.855,-61.711c0,-38.143 27.583,-69.176 61.489,-69.176c33.909,0 61.489,31.033 61.489,69.176c0,27.369 -14.237,51.004 -34.786,62.215c-8.095,4.414 -17.128,6.96 -26.703,6.96z" />
                </svg>
              ) : (
                <img className="profile-button" src={props.data.userData.photoLink} alt="" />
              )}
            </div>
            {menuOpen && (
              <div className="menu">
                <div className="menu-line border-top padding-top-50px">
                  <div className="menu-item">
                    <svg width="14px" height="14px" viewBox="0 0 20 20">
                      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g transform="translate(-140.000000, -2159.000000)" fill="rgb(130, 130, 130)">
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path d="M100.562548,2016.99998 L87.4381713,2016.99998 C86.7317804,2016.99998 86.2101535,2016.30298 86.4765813,2015.66198 C87.7127655,2012.69798 90.6169306,2010.99998 93.9998492,2010.99998 C97.3837885,2010.99998 100.287954,2012.69798 101.524138,2015.66198 C101.790566,2016.30298 101.268939,2016.99998 100.562548,2016.99998 M89.9166645,2004.99998 C89.9166645,2002.79398 91.7489936,2000.99998 93.9998492,2000.99998 C96.2517256,2000.99998 98.0830339,2002.79398 98.0830339,2004.99998 C98.0830339,2007.20598 96.2517256,2008.99998 93.9998492,2008.99998 C91.7489936,2008.99998 89.9166645,2007.20598 89.9166645,2004.99998 M103.955674,2016.63598 C103.213556,2013.27698 100.892265,2010.79798 97.837022,2009.67298 C99.4560048,2008.39598 100.400241,2006.33098 100.053171,2004.06998 C99.6509769,2001.44698 97.4235996,1999.34798 94.7348224,1999.04198 C91.0232075,1998.61898 87.8750721,2001.44898 87.8750721,2004.99998 C87.8750721,2006.88998 88.7692896,2008.57398 90.1636971,2009.67298 C87.1074334,2010.79798 84.7871636,2013.27698 84.044024,2016.63598 C83.7745338,2017.85698 84.7789973,2018.99998 86.0539717,2018.99998 L101.945727,2018.99998 C103.221722,2018.99998 104.226185,2017.85698 103.955674,2016.63598" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <Link
                    to={`/@${props.data.userData.userName}`}
                    className="menu-item cursor-pointer"
                    onClick={() => {
                      document.title = props.data.userData.userName;
                    }}
                  >
                    Профиль
                  </Link>
                </div>
                <div className="menu-line">
                  <div className="menu-item">
                    <svg width="14px" height="14px" viewBox="2 2 20 20" fill="none">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="m4.929 4.93.001-.002.002.001.527-.528a.575.575 0 0 1 .786-.025l1.21 1.061c.332.305.774.492 1.26.492.514 0 .98-.21 1.316-.548.318-.32.52-.754.539-1.235h.004l.105-1.607a.575.575 0 0 1 .574-.537h.746V2v.002h.747c.303 0 .554.235.574.537l.105 1.607h.005c.019.484.223.92.544 1.24.336.335.8.543 1.312.543.492 0 .94-.192 1.272-.504l1.196-1.05a.575.575 0 0 1 .786.026l.528.528.002-.002v.002l-.001.002.528.527a.575.575 0 0 1 .026.786l-1.06 1.212a1.85 1.85 0 0 0-.492 1.258c0 .515.21.98.548 1.317.32.318.753.52 1.235.539v.004l1.606.105c.303.02.538.271.538.574V12H22v.002h-.002v.746a.575.575 0 0 1-.537.574l-1.607.107v.001c-.484.02-.92.223-1.24.544-.335.336-.543.8-.543 1.312 0 .486.187.928.493 1.26h-.002l1.062 1.211c.2.228.188.572-.026.786l-.528.528v.002h-.001l-.528.527a.575.575 0 0 1-.785.026l-1.168-1.021a1.851 1.851 0 0 0-1.302-.534c-.515 0-.98.21-1.317.548-.318.32-.52.755-.54 1.238h-.004l-.105 1.607a.575.575 0 0 1-.54.536H11.22a.575.575 0 0 1-.54-.536l-.105-1.607h-.004a1.851 1.851 0 0 0-.545-1.244 1.851 1.851 0 0 0-1.31-.542c-.504 0-.96.2-1.295.526l-1.177 1.03a.575.575 0 0 1-.785-.027l-.528-.528-.001-.001-.528-.528a.575.575 0 0 1-.026-.786l1.062-1.21-.001-.001a1.85 1.85 0 0 0 .493-1.26c0-.515-.21-.98-.548-1.317a1.85 1.85 0 0 0-1.236-.539v-.001l-1.607-.107a.575.575 0 0 1-.537-.574v-.746H2V12h.001v-.747c0-.303.235-.554.538-.574l1.606-.105v-.004a1.851 1.851 0 0 0 1.242-.545c.335-.336.542-.8.542-1.31 0-.49-.19-.935-.499-1.267L4.376 6.244a.575.575 0 0 1 .026-.786l.528-.527-.001-.002zM16.286 12a4.286 4.286 0 1 1-8.572 0 4.286 4.286 0 0 1 8.572 0z"
                        fill="rgb(130,130,130)"
                      />
                    </svg>
                  </div>
                  <Link to="/settings" className="menu-item cursor-pointer">
                    Настройки
                  </Link>
                </div>
                <div className="menu-line border-top last-menu-item">
                  <div className="menu-item">
                    <svg fill="rgb(130,130,130)" width="14px" height="14px" viewBox="0 0 16 16">
                      <path d="M12.207 9H5V7h7.136L11.05 5.914 12.464 4.5 16 8.036l-3.536 3.535-1.414-1.414L12.207 9zM10 4H8V2H2v12h6v-2h2v4H0V0h10v4z" fillRule="evenodd" />
                    </svg>
                  </div>
                  <div
                    className="menu-item"
                    onClick={async () => {
                      await fetch(api.logout, { credentials: "include" }).then((response) => {
                        if (response.ok) {
                          props.setData({
                            status: "not authorized",
                            userData: {},
                          });
                        }
                      });
                    }}
                  >
                    Выйти
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <button
          className="login-button"
          onClick={() => {
            props.setData({
              status: "loginning",
              userData: {},
            });
          }}
        >
          Войти
        </button>
      )}
      <Login
        isOpen={props.data.status === "loginning"}
        onClose={(status, userData) => {
          props.setData({
            status: status,
            userData: userData,
          });
        }}
        onRegistration={() => {
          props.setData({
            status: "registration",
            userData: {},
          });
        }}
      />
      <Registration
        isOpen={props.data.status === "registration"}
        onClose={(status, userName) => {
          props.setData({
            status: status,
            userData: {
              userName: userName,
              imagesCount: 0,
              privateCollectionsCount: 0,
              publicCollectionsCount: 0,
            },
          });
        }}
      />
    </>
  );
}
