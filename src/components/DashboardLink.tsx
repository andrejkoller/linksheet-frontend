import { Button, Switch } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "../models/Link";
import { getLinks } from "../services/LinkService";
import { toast } from "react-toastify";
import { deleteLink } from "../services/LinkService";

const DashboardLink = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
  }, []);

  const handleDeleteLink = async (linkId: number) => {
    try {
      await deleteLink(linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
      toast.success("Link deleted successfully.");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      console.error("Error deleting link:", err);
      toast.error("Failed to delete link. Please try again later.");
    }
  };

  return (
    <div className="dashboard-link-container">
      <div className="dashboard-link-content">
        <div className="dashboard-link-control">
          <div className="dashboard-link-control-item">
            <Button variant={"solid"} className="dashboard-link-control-button">
              <i className="fa-solid fa-plus"></i>
              <span>Add</span>
            </Button>
          </div>
        </div>
        <div className="dashboard-link-list">
          {loading && <p>Loading links...</p>}
          {error && <p>Error: {error}</p>}
          {!loading && !error && links.length === 0 && (
            <p>Oops! Looks like you haven't added any links yet.</p>
          )}
          {!loading &&
            !error &&
            links.map((link) => (
              <div key={link.id} className="dashboard-link-item">
                <div className="dashboard-link-item-content">
                  <div className="dashboard-link-item-info">
                    <h3>{link.title}</h3>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.url}
                    </a>
                  </div>
                  <div className="dashboard-link-item-activation">
                    <Switch.Root
                      colorPalette={"green"}
                      size="lg"
                      defaultChecked={link.isActive}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control />
                    </Switch.Root>
                  </div>
                </div>
                <div className="dashboard-link-item-actions">
                  <Button
                    variant={"outline"}
                    className="dashboard-link-item-button"
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </Button>
                  <Button
                    variant={"outline"}
                    className="dashboard-link-item-button"
                    onClick={() => handleDeleteLink(link.id)}
                  >
                    <i className="fa-regular fa-trash-can"></i>
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardLink;
