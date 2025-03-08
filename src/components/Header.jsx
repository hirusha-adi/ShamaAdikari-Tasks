import { isUserLoggedIn, logout } from "../utils/pocketbase";
import { Search, PlusCircle, CalendarEvent } from "react-bootstrap-icons";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {isUserLoggedIn ? (
        <div className="navbar bg-base-100 shadow-lg">
          <div className="navbar-start"></div>
          <div className="navbar-center flex">
            <ul className="menu menu-horizontal px-1">
              <li><NavLink to={"/today"} className="active"><CalendarEvent className="text-lg" /> <div className="hidden md:block">Today</div></NavLink></li>
              <li><NavLink to={"/new"}><PlusCircle className="text-lg" /> <div className="hidden md:block">New</div></NavLink></li>
              <li><NavLink to={"/search"}><Search className="text-lg" /> <div className="hidden md:block">Search</div></NavLink></li>
              <li>
                <details>
                  <summary>Other</summary>
                  <ul className="p-2">
                    <li><a onClick={() => logout()}>Logout</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="navbar-end"></div>
        </div>
      ) : (
        <></>
      )}

    </>
  );
}

export { Header }