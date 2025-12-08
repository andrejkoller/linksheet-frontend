import "./App.css";
import Home from "./components/home/home";
import Header from "./components/header/header";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/authentication/register/register";
import Login from "./components/authentication/login/login";
import Templates from "./components/templates/templates";
import Discover from "./components/discover/discover";
import Learn from "./components/learn/learn";
import Dashboard from "./components/dashboard/dashboard";
import DashboardLink from "./components/dashboard/dashboard-link/dashboard-link";
import DashboardAppearance from "./components/dashboard/dashboard-appearance/dashboard-appearance";
import { ToastContainer } from "react-toastify";
import DashboardAccount from "./components/dashboard/dashboard-account/dashboard-account";
import Username from "./components/dashboard/username/username";
import { LinkSpaceProvider } from "./context/link-space-context";
import { LinksProvider } from "./context/links-context";
import { UserProvider } from "./context/current-user-context";

function App() {
  const location = useLocation();
  const headerPathNames = ["/", "/templates", "/discover", "/learn"];

  return (
    <UserProvider>
      <LinkSpaceProvider>
        <LinksProvider>
          <div className="app">
            {headerPathNames.includes(location.pathname) && (
              <div className="header">
                <Header />
              </div>
            )}
            <div className="body">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/templates" element={<Templates />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/dashboard/:username" element={<Username />} />
                <Route path="/dashboard/*" element={<Dashboard />}>
                  <Route index element={<DashboardLink />} />
                  <Route path="appearance" element={<DashboardAppearance />} />
                  <Route path="account" element={<DashboardAccount />} />
                </Route>
              </Routes>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              toastStyle={{ backgroundColor: "#ededeb", color: "#000000" }}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              style={{ zIndex: 1000 }}
            ></ToastContainer>{" "}
          </div>
        </LinksProvider>
      </LinkSpaceProvider>
    </UserProvider>
  );
}

export default App;
