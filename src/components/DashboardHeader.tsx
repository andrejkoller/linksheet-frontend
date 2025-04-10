import { Button, Menu, MenuRoot, MenuTrigger, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("user") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout successful!");
  };

  return (
    <div className="dashboard-header-container">
      <div className="dashboard-header-content">
        <div className="dashboard-header-left">
          <div className="dashboard-header-title">
            <h1>My Linksheet</h1>
          </div>
        </div>
        <div className="dashboard-header-right">
          <div className="dashboard-header-profile">
            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant={"outline"}>
                  <span>{currentUser}</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </Button>
              </MenuTrigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item
                      value="account"
                      onClick={() => navigate("/dashboard/account")}
                    >
                      <i className="fa-regular fa-user"></i>
                      <span>Account</span>
                    </Menu.Item>
                    <Menu.Item value="logout" onClick={handleLogout}>
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      <span>Logout</span>
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </MenuRoot>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
