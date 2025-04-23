import { useEffect, useState } from "react";
import { User } from "../models/User";
import { getUsers } from "../services/UserService";
import { Button, Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Templates = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredLinkId, setHoveredLinkId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        toast.error("Failed to load templates. Please try again later.");
        console.error("Error fetching users:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="templates">
      <div className="templates-container">
        <div className="templates-content">
          <div className="templates-header">
            <h1>Some templates to spark your creativity</h1>
            <p>Click on any template to start creating your own.</p>
          </div>
          {isLoading ? (
            <div className="loading-screen">
              <Spinner
                className="loading-spinner"
                size="lg"
                color="purple"
              ></Spinner>
            </div>
          ) : (
            <>
              <div className="error">
                {error && <p className="notifications">Error: {error}</p>}
              </div>
              <div className="templates-list">
                {users.map((user) => (
                  <div className="template-card-button-wrapper" key={user.id}>
                    <div
                      className="template-card"
                      style={{
                        backgroundColor:
                          user.linkSpace?.linkPageBackgroundColor,
                      }}
                    >
                      <div className="template-card-header">
                        <div className="profile-banner">
                          {user.username.substring(0, 1).toUpperCase()}
                        </div>
                        <h2
                          style={{ color: user.linkSpace?.linkPageFontColor }}
                        >
                          @{user.username}
                        </h2>
                        <p style={{ color: user.linkSpace?.linkPageFontColor }}>
                          {user.description}
                        </p>
                      </div>
                      <div className="template-card-content">
                        <div className="template-card-links">
                          {user.links
                            ?.filter((link) => link.isActive)
                            .map((link) => (
                              <div
                                key={link.id}
                                className="template-card-link-item"
                                style={{
                                  borderRadius:
                                    user.linkSpace?.linkBorderRadius ===
                                    "NotRounded"
                                      ? "0px"
                                      : user.linkSpace?.linkBorderRadius ===
                                        "SlightlyRounded"
                                      ? "8px"
                                      : user.linkSpace?.linkBorderRadius ===
                                        "Rounded"
                                      ? "999px"
                                      : "0px",
                                  borderWidth: "2px",
                                  borderStyle: "solid",
                                  borderColor: user.linkSpace?.linkButtonColor,
                                  color:
                                    hoveredLinkId === link.id
                                      ? user.linkSpace.linkPageBackgroundColor
                                      : user.linkSpace.linkButtonFontColor,
                                  backgroundColor:
                                    hoveredLinkId === link.id
                                      ? user.linkSpace.linkButtonColor
                                      : "transparent",
                                }}
                                onMouseEnter={() => setHoveredLinkId(link.id)}
                                onMouseLeave={() => setHoveredLinkId(null)}
                              >
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {link.title}
                                </a>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="template-card-footer">
                      <Button
                        variant={"solid"}
                        onClick={() => navigate("/register")}
                      >
                        Get started
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Templates;
