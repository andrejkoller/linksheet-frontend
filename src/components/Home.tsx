import { Input } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-content">
          <div className="home-content-left">
            <div className="home-content-item">
              <div className="home-content-item-title">
                <h2>Welcome to Linksheet</h2>
              </div>
              <div className="home-content-item-subtitle">
                <p>
                  Effortlessly organize, share, and track your links—all in one
                  place. Simplify your digital life with seamless link
                  management. 🚀
                </p>
              </div>
            </div>
            <div className="home-content-item">
              <div className="home-content-item-input">
                <Input placeholder="linksheet/yourname"></Input>
              </div>
              <div className="home-content-item-button">
                <Link to={"/register"}>Claim your Linksheet</Link>
              </div>
            </div>
          </div>
          <div className="home-content-right"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
