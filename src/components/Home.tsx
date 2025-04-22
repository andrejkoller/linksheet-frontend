import { Button, Input } from "@chakra-ui/react";
import Faq from "./Faq";
import Footer from "./Footer";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
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
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="linksheet/yourname"
                  ></Input>
                </div>
                <div className="intro-content-item-button">
                  <Button variant={"solid"} onClick={handleClaimLinksheet}>
                    Claim your Linksheet
                  </Button>
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
