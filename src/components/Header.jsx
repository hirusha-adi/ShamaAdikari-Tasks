import { isUserLoggedIn, logout } from "../utils/pocketbase";

const Header = () => {
  return (
    <>
      {isUserLoggedIn ? (
        <div className="navbar bg-base-100 shadow-sm">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">උසාවි දින පොත</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><a>Link</a></li>
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