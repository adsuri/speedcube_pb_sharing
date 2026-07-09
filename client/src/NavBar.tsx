import { NavLink } from "react-router-dom";

import GoogleLoginButton from "./auth/GoogleLoginButton";
import { useAuth } from "./auth/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className = "sticky navbar">
      <NavLink to="/" className="button rounded">
        <span className="icon-home"></span> Home
      </NavLink>

      {
        user === null ? (
          <div style={{ marginLeft: "auto", marginRight: "2%" }}>
            <GoogleLoginButton />
          </div>
        ) : (
          <div className="logged-in">
            <NavLink
              to={"/users/" + user.publicId}
              className="button rounded"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
            >
              <img
                src={user.pictureURL ?? ""}
                alt={user.name ?? "User"}
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  marginRight: "8px",
                }} />
              {user.name ?? "User"}
            </NavLink>

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