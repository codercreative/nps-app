import FooterStyles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <hr className={FooterStyles.divider} />
      <footer className={FooterStyles.footer}>
        <p>&copy; Christina Ligare</p>
      </footer>
    </>
  );
}

export default Footer;
