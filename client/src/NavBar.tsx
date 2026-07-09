import { NavLink } from "react-router-dom";

import GoogleLoginButton from "./auth/GoogleLoginButton";
import { useAuth } from "./auth/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  console.log("navbar user:", user);

  return (
    <header className = "sticky navbar">
      <NavLink to="/" className="button rounded">
        <span className="icon-home"></span> Home
      </NavLink>

      {
        user === null ? (
          <div className="google-login-container" style={{marginLeft: "auto", marginRight: "2%"}}>
            <GoogleLoginButton />
          </div>
        ) : (
          <div>
            <img
              src={user.pictureURL ?? ""}
              alt={user.name ?? "User"}
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />

            <span>
              {user.name ?? "User"}
            </span>

            <button
              className="secondary"
              onClick={logout}
              style={{ marginLeft: "8px" }}
            >
              Logout
            </button>
          </div>
        )
      }
    </header>
  );
}

export default NavBar;