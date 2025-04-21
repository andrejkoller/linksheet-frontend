import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardSpace from "./DashboardSpace";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <div className="dashboard-container">
          <div className="dashboard-content">
            <div className="dashboard-sidebar">
              <DashboardSidebar />
            </div>
            <div className="dashboard-header-body-wrapper">
              <div className="dashboard-header">
                <DashboardHeader />
              </div>
              <div className="dashboard-body">
                <Outlet />
                <div className="dashboard-space">
                  <DashboardSpace />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
