import { Button, Menu, MenuRoot, MenuTrigger, Portal } from "@chakra-ui/react";

const DashboardHeader = () => {
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
              <MenuTrigger>
                <Button variant={"outline"} colorScheme="teal">
                  <span>andrejkoller</span>
                  <i className="fa-solid fa-chevron-down"></i>
                </Button>
              </MenuTrigger>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item value="new-txt">
                      <i className="fa-regular fa-user"></i>
                      <span>Account</span>
                    </Menu.Item>
                    <Menu.Item value="export">
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
