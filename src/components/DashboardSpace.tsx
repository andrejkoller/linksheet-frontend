import { NavLink } from "react-router-dom";
import { Link } from "../models/Link";
import { useEffect, useState } from "react";
import { getLinks } from "../services/LinkService";
import { toast } from "react-toastify";

const DashboardSpace = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUser = localStorage.getItem("user") || "Guest";

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const data = await getLinks();
        setLinks(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        console.error("Error fetching links:", err);
        toast.error("Failed to load links. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  return (
    <div className="dashboard-body-space-container">
      <div className="dashboard-body-space-content">
        <div className="dashboard-body-space-header">
          <div className="profile-banner">
            {currentUser.substring(0, 1).toUpperCase()}
          </div>
          <h1 className="profile-name">@{currentUser}</h1>
        </div>
        <div className="dashboard-body-space-link-items">
          {isLoading && <p>Loading links...</p>}
          {error && <p>Error: {error}</p>}
          {!isLoading && !error && links.length === 0 && (
            <p>Oops! Looks like you haven't added any links yet.</p>
          )}
          {!isLoading &&
            !error &&
            links.map((link) => (
              <div key={link.id} className="dashboard-space-link-item">
                <div className="dashboard-space-link-item-content">
                  <div className="dashboard-space-link-item-info">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="dashboard-body-space-link">
        <NavLink
          to={"/dashboard/" + currentUser}
          target="_blank"
          rel="noopener noreferrer"
          className="dashboard-body-space-link-item"
        >
          <span>Visit your space</span>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </NavLink>
      </div>
    </div>
  );
};

export default DashboardSpace;
