import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Faq from "./Faq";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="home">
      <div className="intro">
        <div className="intro-container">
          <div className="intro-content">
            <div className="intro-content-left">
              <div className="intro-content-item">
                <div className="intro-content-item-title">
                  <h2>Everything you are. In one, simple link in bio.</h2>
                </div>
                <div className="intro-content-item-subtitle">
                  <p>
                    Join people using Linksheet for their link in bio. One link
                    to help you share everything you create, curate and sell
                    from your Instagram, TikTok, Twitter, YouTube and other
                    social media profiles.
                  </p>
                </div>
              </div>
              <div className="intro-content-item">
                <div className="intro-content-item-input">
                  <Input placeholder="linksheet/yourname"></Input>
                </div>
                <div className="intro-content-item-button">
                  <Link to={"/register"}>Claim your Linksheet</Link>
                </div>
              </div>
            </div>
            <div className="intro-content-right"></div>
          </div>
        </div>
      </div>
      <div className="faq">
        <Faq />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
