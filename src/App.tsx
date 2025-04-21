import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/authentication/Register";
import Login from "./components/authentication/Login";
import Templates from "./components/Templates";
import Discover from "./components/Discover";
import Learn from "./components/Learn";
import Dashboard from "./components/dashboard/Dashboard";
import DashboardLink from "./components/dashboard/DashboardLink";
import DashboardAppearance from "./components/dashboard/DashboardAppearance";
import { ToastContainer } from "react-toastify";
import DashboardAccount from "./components/dashboard/DashboardAccount";
import Username from "./components/dashboard/Username";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname === "/" && (
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
  );
}

export default App;
