import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-content-top">
            <div className="footer-content-item">
              <div className="footer-content-item-title">
                <h2>Jumpstart your corner of the internet today</h2>
              </div>
              <div className="footer-content-item">
                <div className="footer-content-item-input">
                  <Input placeholder="linksheet/yourname" />
                </div>
                <div className="footer-content-item-button">
                  <Link to={"/register"}>Claim your Linksheet</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content-bottom">
            <div className="footer-content-item">
              <div>
                <div>
                  <h3>Company</h3>
                </div>
                <div>
                  <Link to={"/"}>About</Link>
                  <Link to={"/"}>Careers</Link>
                  <Link to={"/"}>Blog</Link>
                  <Link to={"/"}>Press</Link>
                  <Link to={"/"}>Brand</Link>
                </div>
              </div>
              <div>
                <div>
                  <h3>Support</h3>
                </div>
                <div>
                  <Link to={"/"}>Contact Us</Link>
                  <Link to={"/"}>Help Center</Link>
                  <Link to={"/"}>Status</Link>
                </div>
              </div>
              <div>
                <div>
                  <h3>Trust & Legal</h3>
                </div>
                <div>
                  <Link to={"/"}>Privacy Policy</Link>
                  <Link to={"/"}>Terms of Service</Link>
                  <Link to={"/"}>Cookie Policy</Link>
                </div>
              </div>
            </div>
            <div className="footer-content-item">
              <div>
                <Link to={"/login"}>Log in</Link>
                <Link to={"/register"}>Sign up free</Link>
              </div>
              <div>
                <Link to={"/"}>
                  <i className="fa-brands fa-youtube"></i>
                </Link>
                <Link to={"/"}>
                  <i className="fa-brands fa-x-twitter"></i>
                </Link>
                <Link to={"/"}>
                  <i className="fa-brands fa-facebook"></i>
                </Link>
                <Link to={"/"}>
                  <i className="fa-brands fa-instagram"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
