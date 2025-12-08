import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";

function Menu() {
  const location = useLocation();

  const handleMenuClose = () => {
    const menuOverlay = document.getElementById("menuOverlay");
    const menu = document.getElementById("menu");

    if (menuOverlay && menu) {
      menuOverlay.style.backgroundColor = "transparent";
      menuOverlay.style.zIndex = "-1";
      menuOverlay.style.height = "0vh";
      menu.classList.remove("menu-open");
      menu.classList.add("menu-close");
    }
  };

  useEffect(() => {
    handleMenuClose();
  }, [location.pathname]);

  return (
    <div className="menu-container">
      <div className="menu-content">
        <div className="menu-header">
          <div className="menu-title">
            <h1>Menu</h1>
          </div>
          <div
            className="menu-close-icon"
            id="menuCloseIcon"
            onClick={handleMenuClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="menu-items">
          <div className="menu-links">
            <div className="menu-item">
              <Link to={"/"}>Home</Link>
            </div>
            <div className="menu-item">
              <Link to={"/templates"}>Templates</Link>
            </div>
            <div className="menu-item">
              <Link to={"/discover"}>Discover</Link>
            </div>
            <div className="menu-item">
              <Link to={"/learn"}>Learn</Link>
            </div>
          </div>
          <div className="menu-auth">
            <div className="menu-item">
              <Link to={"/login"}>Log in</Link>
            </div>
            <div className="menu-item">
              <Link to={"/register"}>Sign up free</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
