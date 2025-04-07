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
                  <Input placeholder="linksheet/yourname"></Input>
                </div>
                <div className="footer-content-item-button">
                  <Link to={"/register"}>Claim your Linksheet</Link>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
