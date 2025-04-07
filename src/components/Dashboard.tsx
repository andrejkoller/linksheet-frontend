import DashboardBody from "./DashboardBody";
import DashboardHeader from "./DashboardHeader";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <DashboardHeader />
          </div>
          <div className="dashboard-body">
            <DashboardBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
