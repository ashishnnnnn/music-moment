import "./Sidebar.css";
import { useLocation, Link } from "react-router-dom";
import { useVideoList } from "../../Context/VideosContext";
import { useAuthContext } from "../../Context/AuthContext";
import { getPageName } from "../../Utils/getPageName";

const pages_name = {
  ["/"]: "Home",
  ["/explore"]: "Explore",
  ["/history"]: "History",
  ["/watch-later"]: "Watch-Later",
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
    name: "Playlist",
    icon_class: "fas fa-play",
  },
  {
    name: "History",
    icon_class: "fas fa-history",
  },
];

export const Sidebar = () => {
  const location = useLocation().pathname;
  const activeSideBar = pages_name[location];
  const { setVideoList } = useVideoList();
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  return (
    <div className="sidebar pad-2 flex-column gap-2">
      {side_menu.map((ele) => (
        <Link
          to={getPageName(ele.name, token)}
          key={ele.name}
          className={`flex gap-1 ali-ce ${
            activeSideBar === ele.name ? "active" : ""
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
  );
};
