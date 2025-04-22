import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const [username, setUsername] = useState<string>("");

  const navigate = useNavigate();

  const handleClaimLinksheet = () => {
    if (username) {
      navigate("/register", {
        state: { username },
      });
    } else {
      toast.warn("Please enter a username");
    }
  };

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
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="linksheet/yourname"
                  />
                </div>
                <div className="footer-content-item-button">
                  <Button variant={"solid"} onClick={handleClaimLinksheet}>
                    Claim your Linksheet
                  </Button>
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
                  <a href="mailto:andrejkoller@outlook.com">Contact Us</a>
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
                <a href="https://www.youtube.com/@AndrejKoller" target="_blank">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://x.com/andrejkoller" target="_blank">
                  <i className="fa-brands fa-x-twitter"></i>
                </a>
                <a
                  href="https://www.facebook.com/andrej.koller.18"
                  target="_blank"
                >
                  <i className="fa-brands fa-facebook"></i>
                </a>
                <a
                  href="https://www.instagram.com/andrejkollerofficial"
                  target="_blank"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
