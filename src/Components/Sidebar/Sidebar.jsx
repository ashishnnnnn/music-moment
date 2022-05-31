import "./Sidebar.css";
import { useLocation, Link } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useFilter } from "../../Context/FilterContext";
import { getPageName } from "../../Utils/getPageName";

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

export const Sidebar = () => {
  const location = useLocation().pathname;
  const activeSideBar = pages_name[location];
  const { auth_state } = useAuthContext();
  const { token } = auth_state;
  const { setFilterState } = useFilter();
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
              setFilterState({
                type: "CATEGORY",
                payload: "ALL",
              });
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
