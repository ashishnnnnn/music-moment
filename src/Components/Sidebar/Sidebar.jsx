import "./Sidebar.css";
import { useState } from "react";

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
    name: "Watch Later",
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
  const [activeSideBar, setActiveSideBar] = useState("Home");
  return (
    <div className="sidebar pad-2 flex-column gap-2">
      {side_menu.map((ele) => (
        <div
          onClick={() => {
            setActiveSideBar(ele.name);
          }}
          key={ele.name}
          className={`flex gap-1 ali-ce ${
            activeSideBar === ele.name ? "active" : ""
          } cursor-pointer`}
        >
          <i className={ele.icon_class + " fnt-1-5"}></i>
          <p className="fnt-1-2">{ele.name}</p>
        </div>
      ))}
    </div>
  );
};
