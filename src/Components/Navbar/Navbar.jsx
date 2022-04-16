import "./Navbar.css";
import { useState } from "react";

import { useLocation, Link, useNavigate } from "react-router-dom";
import { useVideoList } from "../../Context/VideosContext";
import { useAuthContext } from "../../Context/AuthContext";
import { getPageName } from "../../Utils/getPageName";
import { useToast } from "../../Context/ToastContext";
import { useUserData } from "../../Context/UserDataContext";

const pages_name = {
  ["/"]: "Home",
  ["/explore"]: "Explore",
  ["/history"]: "History",
  ["/watch-later"]: "Watch-Later",
  ["/liked"]: "Liked",
  ["/playlist"]: "Playlist",
};

const side_menu = [
  {
    name: "Home",
    icon_class: "fas fa-home",
  },
  {
    name: "Explore",
    icon_class: "fas fa-compass",
  },
  {
    name: "Watch-Later",
    icon_class: "fas fa-clock",
  },
  {
    name: "Liked",
    icon_class: "fas fa-thumbs-up",
  },
  {
    name: "Playlist",
    icon_class: "fas fa-play",
  },
  {
    name: "History",
    icon_class: "fas fa-history",
  },
];

export const Navbar = () => {
  const [sideBarActive, setSideBarActive] = useState(false);
  const { setVideoList } = useVideoList();
  const { handleaddtoast } = useToast();
  const location = useLocation().pathname;
  const hiddenActiveSideBar = pages_name[location];
  let navigate = useNavigate();
  const { auth_state, setAuthState } = useAuthContext();
  const { user, token } = auth_state;
  const { user_data, setUser_Data } = useUserData();
  return (
    <>
      <div className="navigation-bar z-ind-2">
        <div
          onClick={() => {
            setSideBarActive((prevState) => !prevState);
          }}
          className="hemburgur"
          href="#"
        >
          <i className="fas fa-bars"></i>
        </div>
        {sideBarActive && (
          <div className="side-hidden-bar  z-ind-2">
            <div className="user-info pad-2 flex-align jst-sp-sb">
              <img
                className="avatar avatar-md"
                src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                alt="avatar-image"
              />
              <div
                onClick={() => {
                  setSideBarActive((prevState) => !prevState);
                }}
                className="cross cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </div>
            </div>
            <div className=""></div>
            <div className="hidden-sidebar-menu pad-2 flex-column gap-2">
              {side_menu.map((ele) => (
                <Link
                  to={getPageName(ele.name, token)}
                  key={ele.name}
                  className={`flex gap-1 ali-ce ${
                    hiddenActiveSideBar === ele.name ? "active" : ""
                  } cursor-pointer`}
                  onClick={() => {
                    if (ele.name === "Explore") {
                      setVideoList([]);
                    }
                  }}
                >
                  <i className={ele.icon_class + " fnt-1-5"}></i>
                  <p className="fnt-1-2">{ele.name}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
        <div className="nav-title">
          <div
            onClick={() => {
              navigate("/");
            }}
            className="logo flex-center-column cursor-pointer"
          >
            <span className="fnt-2 fnt-w-600 theme-color">Music</span>
            <span className="fnt-0-8 fnt-w-900">Moment</span>
          </div>
        </div>
        <ul>
          <li>
            <div className="flex-align search-bar pad-1">
              <i className="fa fa-search mar-r-1"></i>
              <input className="fnt-1-2 search-input mar-r-1" />
            </div>
          </li>

          <li className="login-btn">
            {token ? (
              <div
                onClick={() => {
                  handleaddtoast({
                    message: `Bye Bye ${user.firstName}`,
                    type: "alert-success",
                  });

                  setAuthState({ type: "TOKEN", payload: null });
                  localStorage.removeItem("token");
                  setUser_Data({ type: "RESET" });
                }}
                className="btn btn-primary cursor-pointer"
              >
                LogOut
              </div>
            ) : (
              <div
                onClick={(e) => {
                  navigate("/login");
                }}
                className="btn btn-primary cursor-pointer"
              >
                Login
              </div>
            )}
          </li>
        </ul>
      </div>
      <div className="margin-req"></div>
    </>
  );
};
