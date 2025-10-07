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
            `${isActive ? HeaderStyles.active : HeaderStyles.inactive} ${
              HeaderStyles.navLink
            }`
          }
          to="/"
        >
          Home
        </NavLink>

        <NavLink
          // Adding "end" after to=/parks shows All Parks as inactive in the Header, so user can click back to view all parks
          className={({ isActive }) =>
            `${isActive ? HeaderStyles.active : HeaderStyles.inactive} ${
              HeaderStyles.navLink
            }`
          }
          to="/parks"
          end
        >
          All Parks
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? HeaderStyles.active : HeaderStyles.inactive} ${
              HeaderStyles.navLink
            }`
          }
          to="/myparks"
        >
          My Parks
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
