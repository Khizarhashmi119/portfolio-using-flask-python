import "./styles.scss";

const Footer = (): JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer">
      <div className="container">
        <p>Copyright &copy; {currentYear} 😎 Mohd. Khizar Hashmi.</p>
      </div>
    </footer>
  );
};

export default Footer;
