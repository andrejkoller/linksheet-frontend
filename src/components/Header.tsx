import { Link } from "react-router-dom";

const Header = () => {
  return (
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
              <Link to={""}>Templates</Link>
            </div>
            <div className="header-left-content-item">
              <Link to={""}>Discover</Link>
            </div>
            <div className="header-left-content-item">
              <Link to={""}>Learn</Link>
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="header-right-content">
            <div className="header-right-content-item">
              <Link to={""}>Log in</Link>
            </div>
            <div className="header-right-content-item">
              <Link to={""}>Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
