
import { Link } from "react-router-dom";
import "./sidebar.css";
import SidebarData from "./SidebarData.jsx"
import { Button } from "@mantine/core";

import "./navbar.css";

const Sidebar = () => {


  return (
    <div className="sidebar">
      <div>
        <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row">
              {" "}
              <Link to={val.link}>
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </Link>
            </li>
          );
        })}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
