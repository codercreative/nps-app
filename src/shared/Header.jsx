import { NavLink } from "react-router";
import HeaderStyles from "./Header.module.css";

function Header({ title }) {
  return (
    <header className={HeaderStyles.header}>
      <div className={HeaderStyles.logoTitle}>
        <i className={`fa-solid fa-tree ${HeaderStyles.treeIcon}`}></i>
        <h1 className={HeaderStyles.title}>{title} </h1>
      </div>

      <nav className={HeaderStyles.nav}>
        <NavLink
          className={({ isActive }) =>
            isActive ? HeaderStyles.active : HeaderStyles.inactive
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? HeaderStyles.active : HeaderStyles.inactive
          }
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? HeaderStyles.active : HeaderStyles.inactive
          }
          to="/parks"
        >
          Parks
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
