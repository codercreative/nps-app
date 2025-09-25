import { NavLink } from "react-router";
import NotFoundStyles from "./NotFound.module.css";

function NotFound() {
  return (
    <main className={NotFoundStyles.main}>
      <h2>Page not found.</h2>
      <NavLink to="/" className={NotFoundStyles.goBackBtn}>
        Go back home
      </NavLink>
    </main>
  );
}

export default NotFound;
