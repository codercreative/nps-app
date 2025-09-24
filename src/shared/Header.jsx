import HeaderStyles from "./Header.module.css";

function Header() {
  return (
    <header className={HeaderStyles.header}>
      <h1 className={HeaderStyles.title}>US National Parks </h1>
    </header>
  );
}

export default Header;
