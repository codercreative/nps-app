import { NavLink } from "react-router";

function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <NavLink to="/">Go back home</NavLink>
    </>
  );
}

export default NotFound;
