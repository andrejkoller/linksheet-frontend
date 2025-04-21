import { useEffect, useState } from "react";
import { Link } from "../../models/Link";
import { getLinks } from "../../services/LinkService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";

const Username = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      }
    };

    fetchLinks();
  });

  return (
    <div className="username-container">
      <div className="username-panel-header">
        <div className="username-panel-title">
          <h2>This is your Linksheet</h2>
        </div>
        <div className="username-panel-link">
          <NavLink to={"/dashboard"} style={{ backgroundColor: "transparent" }}>
            Edit
          </NavLink>
        </div>
      </div>
      <div className="username-content">
        <div className="username-header">
          <div className="username-banner">
            {currentUser.substring(0, 1).toUpperCase()}
          </div>
          <h1 className="username-title">@{currentUser}</h1>
        </div>
        <div className="username-links">
          {loading && <p>Loading links...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && links.length === 0 && (
            <p>Oops! Looks like you haven't added any links yet.</p>
          )}
          {!loading &&
            !error &&
            links.map((link) => (
              <div key={link.id} className="username-link-item">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </div>
            ))}
        </div>
        <div className="username-footer">
          <NavLink to={"/register"}>Join {currentUser} on Linksheet!</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Username;
