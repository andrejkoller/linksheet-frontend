import { useEffect, useState } from "react";
import { getCurrentUser, updateUser } from "../../../services/user-service";
import { Button, Card, Input, Spinner } from "@chakra-ui/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/use-current-user";
import "./dashboard-account.css";

function DashboardAccount() {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const data = await getCurrentUser();
        setCurrentUser(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
        console.error("Error fetching current user:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, [setCurrentUser]);

  const handleEditProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        username: currentUser.username,
        email: currentUser.email,
        description: currentUser.description,
      };
      updateUser(currentUser.id, updatedUser)
        .then(() => {
          setCurrentUser(updatedUser);
          toast.success("Profile updated!");
          if (
            currentUser.username !== updatedUser.username ||
            currentUser.email !== updatedUser.email ||
            !currentUser.description
          ) {
            toast.info("Please log in again with your new username.");
            navigate("/login");
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
          toast.error("Failed to update profile. Please try again later.");
          console.error("Error updating user:", err);
        });
    }
  };

  return (
    <div className="dashboard-account-container">
      <div className="dashboard-account-content">
        <div className="dashboard-account-header">
          <h1 className="dashboard-account-title">Account Settings</h1>
        </div>
        <div className="dashboard-account-body">
          <p className="dashboard-account-description">
            Manage your account settings and preferences here.
          </p>
          {isLoading ? (
            <div className="loading-screen">
              <Spinner
                className="loading-spinner"
                size="lg"
                color="purple"
              ></Spinner>
            </div>
          ) : (
            <div className="dashboard-account-info">
              {error && <p className="notifications">Error: {error}</p>}
              {!error && currentUser && (
                <form onSubmit={handleEditProfile}>
                  <div className="dashboard-account-info-details">
                    <Card.Root>
                      <Card.Body className="dashboard-account-info-body">
                        <div className="dashboard-account-info-item">
                          <div className="dashboard-account-info-username-email-wrapper">
                            <Card.Description className="dashboard-account-info-name">
                              <label className="dashboard-account-info-label">
                                Username
                              </label>
                              <Input
                                className="dashboard-account-info-username"
                                variant={"outline"}
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={currentUser.username}
                                onChange={(e) =>
                                  setCurrentUser({
                                    ...currentUser,
                                    username: e.target.value,
                                  })
                                }
                              />
                            </Card.Description>
                            <Card.Description className="dashboard-account-info-email">
                              <label className="dashboard-account-info-label">
                                Email
                              </label>
                              <Input
                                className="dashboard-account-info-email"
                                variant={"outline"}
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={currentUser.email}
                                onChange={(e) =>
                                  setCurrentUser({
                                    ...currentUser,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </Card.Description>
                          </div>
                          <div className="dashboard-account-info-description-wrapper">
                            <Card.Description className="dashboard-account-info-description">
                              <label className="dashboard-account-info-label">
                                Description
                              </label>
                              <Input
                                className="dashboard-account-info-description"
                                variant={"outline"}
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Enter your description"
                                value={currentUser.description}
                                onChange={(e) =>
                                  setCurrentUser({
                                    ...currentUser,
                                    description: e.target.value,
                                  })
                                }
                              />
                            </Card.Description>
                          </div>
                        </div>
                        <Card.Footer className="dashboard-account-info-footer">
                          <Button
                            className="dashboard-account-edit-button"
                            variant={"solid"}
                            type="submit"
                          >
                            Edit Profile
                          </Button>
                        </Card.Footer>
                      </Card.Body>
                    </Card.Root>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardAccount;
