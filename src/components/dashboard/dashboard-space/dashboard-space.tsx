import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUserLinks } from "../../../services/link-service";
import { getCurrentUserLinkSpace } from "../../../services/link-space-service";
import { getCurrentUser } from "../../../services/user-service";
import { toast } from "react-toastify";
import { useLinks } from "../../../context/links-context";
import { useLinkSpace } from "../../../context/link-space-context";
import { useCurrentUser } from "../../../context/current-user-context";
import "./dashboard-space.css";

function DashboardSpace() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const { links, setLinks } = useLinks();
  const { linkSpace, setLinkSpace } = useLinkSpace();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) {
          toast.error("User not found. Please log in again.");
          window.location.href = "/login";
        } else {
          setCurrentUser(user);
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        console.error("Error fetching current user:", err);
        toast.error("Failed to load user. Please try again later.");
      }
    };

    fetchUser();
  }, [setCurrentUser]);

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
        setIsLoading(false);
      }
    };

    fetchLinkSpace();
    fetchLinks();
  }, [setLinkSpace, setLinks]);

  return (
    <div className="dashboard-body-space-container">
      <div
        className="dashboard-body-space-content"
        style={{ backgroundColor: linkSpace?.linkPageBackgroundColor }}
      >
        <div className="dashboard-body-space-header">
          <div className="profile-banner">
            {currentUser?.username
              ? currentUser?.username.substring(0, 1).toUpperCase()
              : ""}
          </div>
          <h1
            className="profile-name"
            style={{ color: linkSpace?.linkPageFontColor }}
          >
            @{currentUser?.username}
          </h1>
          <span
            className="profile-description"
            style={{ color: linkSpace?.linkPageFontColor }}
          >
            {currentUser?.description ? currentUser?.description : ""}
          </span>
        </div>
        <div className="dashboard-body-space-link-items">
          {isLoading && (
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
          {!isLoading && !error && links.length === 0 && (
            <p
              className="notifications"
              style={{ color: linkSpace?.linkPageFontColor }}
            >
              Oops! Looks like you haven't added any links yet.
            </p>
          )}
          {!isLoading &&
            !error &&
            links
              .filter((link) => link.isActive)
              .map((link) => (
                <div
                  key={link.id}
                  className="dashboard-space-link-item"
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
                    borderStyle:
                      linkSpace?.linkBorderStyle === "Solid"
                        ? "solid"
                        : linkSpace?.linkBorderStyle === "Dotted"
                        ? "dotted"
                        : linkSpace?.linkBorderStyle === "Dashed"
                        ? "dashed"
                        : "solid",
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
                  onMouseEnter={() =>
                    link.id !== undefined && setHoveredLinkId(link.id)
                  }
                  onMouseLeave={() => setHoveredLinkId(null)}
                >
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
          to={"/dashboard/" + currentUser?.username}
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
}

export default DashboardSpace;
