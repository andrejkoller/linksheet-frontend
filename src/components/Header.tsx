import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import Menu from "./Menu";

const Header = () => {
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
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
                <div
                  id="menuButton"
                  className="header-menu-icon"
                  onClick={handleMenuOpen}
                >
                  <i className="fa-solid fa-bars" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={menuOverlayRef}
        className={`menu-overlay ${isMenuOpen ? "menu-overlay-open" : ""}`}
        style={{
          backgroundColor: isMenuOpen ? "rgba(0, 0, 0, 0.5)" : "transparent",
          zIndex: isMenuOpen ? 1000 : -1,
          height: isMenuOpen ? "100vh" : "0vh",
        }}
        onClick={handleMenuClose}
      >
        <div
          ref={menuRef}
          className={`menu ${isMenuOpen ? "menu-open" : "menu-close"}`}
        >
          <Menu />
        </div>
      </div>
    </>
  );
};

export default Header;
