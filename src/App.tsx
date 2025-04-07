import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Templates from "./components/Templates";
import Discover from "./components/Discover";
import Learn from "./components/Learn";
import Dashboard from "./components/Dashboard";
import DashboardLink from "./components/DashboardLink";
import DashboardAppearance from "./components/DashboardAppearance";

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname === "/" && (
        <div className="header">
          <Header />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardLink />} />
          <Route path="appearance" element={<DashboardAppearance />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
