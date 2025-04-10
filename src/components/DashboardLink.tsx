import { Button } from "@chakra-ui/react";

const DashboardLink = () => {
  return (
    <div className="dashboard-link-container">
      <div className="dashboard-link-content">
        <div className="dashboard-link-control">
          <div className="dashboard-link-control-item">
            <Button variant={"solid"} className="dashboard-link-control-button">
              <i className="fa-solid fa-plus"></i>
              <span>Add</span>
            </Button>
          </div>
        </div>
        <div className="dashboard-link-list">
          <span className="link-list-notification">
            Oops! Looks like you haven't added any links yet.
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardLink;
