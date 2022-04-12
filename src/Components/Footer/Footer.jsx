import "./Footer.css";
export const Footer = () => {
  return (
    <div className="footer flex-center-column">
      <div className="message fnt-1-2 text-center">
        Made By <span className="theme-color">Ashish</span> Kumar
      </div>
      <div className="social-links mar-t-1 flex-center-row gap-1-5">
        <button className="fnt-2">
          <a
            href="https://www.linkedin.com/in/ashish-kumar-41a205163/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="footer-icon fab fa-linkedin"></i>
          </a>
        </button>
        <button className="fnt-2">
          <a
            href="https://twitter.com/ASHISHK15345275"
            target="_blank"
            rel="noreferrer"
          >
            <i className="footer-icon fab fa-twitter"></i>
          </a>
        </button>
        <button className="fnt-2">
          <a
            href="https://github.com/ashishnnnnn/"
            target="_blank"
            rel="noreferrer"
          >
            <i className="footer-icon fab fa-github"></i>
          </a>
        </button>
      </div>
    </div>
  );
};
