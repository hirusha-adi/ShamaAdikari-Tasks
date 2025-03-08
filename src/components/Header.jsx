import { isUserLoggedIn, logout } from "../utils/pocketbase";
import { Search, PlusCircle, CalendarEvent } from "react-bootstrap-icons";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      {isUserLoggedIn ? (
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <Link to={"/today"} className="btn btn-ghost text-xl">උසාවි දින පොත</Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><NavLink to={"/new"}><CalendarEvent className="text-lg" /> Today</NavLink></li>
              <li><NavLink to={"/new"}><PlusCircle className="text-lg" /> New</NavLink></li>
              <li><NavLink to={"/search"}><Search className="text-lg" /> Search</NavLink></li>
              <li>
                <details>
                  <summary>Other</summary>
                  <ul className="bg-base-100 rounded-t-none p-2">
                    <li><a onClick={() => logout()}>Logout</a></li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

    </>
  );
}

export { Header }