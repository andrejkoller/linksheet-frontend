import { useEffect, useState } from "react";
import { Link } from "../../models/Link";
import { getCurrentUserLinks } from "../../services/LinkService";
import { getCurrentUserLinkSpace } from "../../services/LinkSpaceService";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { LinkSpace } from "../../models/LinkSpace";

const Username = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [linkSpace, setLinkSpace] = useState<LinkSpace>({} as LinkSpace);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);

  const currentUser = localStorage.getItem("user") || "Guest";

  useEffect(() => {
    const fetchLinkSpace = async () => {
      try {
        const data = await getCurrentUserLinkSpace();
        setLinkSpace(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        console.error("Error fetching link space:", err);
        toast.error("Failed to load link space. Please try again later.");
      }
    };

    const fetchLinks = async () => {
      try {
        const data = await getCurrentUserLinks();
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
    fetchLinkSpace();
  }, []);

  return (
    <div
      className="username-container"
      style={{ backgroundColor: linkSpace?.linkPageBackgroundColor }}
    >
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
          <h1
            className="username-title"
            style={{ color: linkSpace?.linkPageFontColor }}
          >
            @{currentUser}
          </h1>
        </div>
        <div className="username-links">
          {loading && (
            <p
              className="notifications"
              style={{ color: linkSpace?.linkPageFontColor }}
            >
              Loading links...
            </p>
          )}
          {error && (
            <p
              className="notifications"
              style={{ color: linkSpace?.linkPageFontColor }}
            >
              Error: {error}
            </p>
          )}
          {!loading && !error && links.length === 0 && (
            <p
              className="notifications"
              style={{ color: linkSpace?.linkPageFontColor }}
            >
              Oops! Looks like you haven't added any links yet.
            </p>
          )}
          {!loading &&
            !error &&
            links
              .filter((link) => link.isActive)
              .map((link) => (
                <div
                  key={link.id}
                  className="username-link-item"
                  style={{
                    borderRadius:
                      linkSpace?.linkBorderRadius === "NotRounded"
                        ? "0px"
                        : linkSpace?.linkBorderRadius === "SlightlyRounded"
                        ? "8px"
                        : linkSpace?.linkBorderRadius === "Rounded"
                        ? "999px"
                        : "0px",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: linkSpace?.linkButtonColor,
                    color:
                      hoveredLinkId === link.id
                        ? linkSpace?.linkPageBackgroundColor
                        : linkSpace?.linkButtonFontColor,
                    backgroundColor:
                      hoveredLinkId === link.id
                        ? linkSpace?.linkButtonColor
                        : "transparent",
                  }}
                  onMouseEnter={() => setHoveredLinkId(link.id)}
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
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
