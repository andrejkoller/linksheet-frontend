import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <div className="header-left-content">
              <div className="header-left-content-item">
                <div className="header-logo">
                  <h1>
                    <Link to={"/"}>Linksheet</Link>
                  </h1>
                </div>
              </div>
              <div className="header-left-content-item">
                <Link to={"/templates"}>Templates</Link>
              </div>
              <div className="header-left-content-item">
                <Link to={"/discover"}>Discover</Link>
              </div>
              <div className="header-left-content-item">
                <Link to={"/learn"}>Learn</Link>
              </div>
            </div>
          </div>
          <div className="header-right">
            <div className="header-right-content">
              <div className="header-right-content-item">
                <Link to={"/login"}>Log in</Link>
              </div>
              <div className="header-right-content-item">
                <Link to={"/register"}>Sign up free</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
