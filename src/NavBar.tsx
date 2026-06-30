import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <header className = "sticky">
      <NavLink to="/" className="button rounded">
        <span className="icon-home"></span> Home
      </NavLink>

      <NavLink to="/signinplaceholder" className="button rounded">
        Replace With Google Auth
      </NavLink>
    </header>
  );
}

export default NavBar;