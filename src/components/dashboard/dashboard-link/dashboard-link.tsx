import { Button, Spinner, Switch, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "../../../models/link";
import {
  getCurrentUserLinks,
  deleteLink,
  updateLinkVisibility,
} from "../../../services/link-service";
import { toast } from "react-toastify";
import AddLinkDialog from "../dialogs/add-link-dialog/add-link-dialog";
import UpdateLinkDialog from "../dialogs/update-link-dialog/update-link-dialog";
import { useLinks } from "../../../context/links-context";
import "./dashboard-link.css";

function DashboardLink() {
  const { links, setLinks } = useLinks();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open, onOpen, onClose } = useDisclosure();
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  useEffect(() => {
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

    fetchLinks();
  }, [setLinks]);

  const handleDeleteLink = async (linkId: number) => {
    try {
      await deleteLink(linkId);
      setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
      toast.success("Link deleted!");
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

  const openUpdateDialog = (link: Link) => {
    setSelectedLink(link);
    setIsUpdateDialogOpen(true);
  };

  const handleSwitchChange = (linkId: number) => {
    const link = links.find((link) => link.id === linkId);
    if (link) {
      const updatedLink = { ...link, isActive: !link.isActive };
      updateLinkVisibility(linkId, updatedLink)
        .then(() => {
          setLinks((prevLinks) =>
            prevLinks.map((l) => (l.id === linkId ? updatedLink : l))
          );
          toast.success("Link visibility updated!");
        })
        .catch((err) => {
          console.error("Error updating link visibility:", err);
          toast.error(
            "Failed to update link visibility. Please try again later."
          );
        });
    }
  };

  return (
    <>
      <AddLinkDialog isOpen={open} onClose={onClose} />
      <UpdateLinkDialog
        isOpen={isUpdateDialogOpen}
        onClose={() => setIsUpdateDialogOpen(false)}
        link={selectedLink}
      />

      <div className="dashboard-link-container">
        <div className="dashboard-link-content">
          <div className="dashboard-link-control">
            <div className="dashboard-link-control-item">
              <Button
                variant={"solid"}
                className="dashboard-link-control-button"
                onClick={onOpen}
              >
                <i className="fa-solid fa-plus"></i>
                <span>Add</span>
              </Button>
            </div>
          </div>
          <div className="dashboard-link-list">
            {isLoading && (
              <div className="loading-screen">
                <Spinner
                  className="loading-spinner"
                  size="lg"
                  color="purple"
                ></Spinner>
              </div>
            )}
            {error && <p className="notifications">Error: {error}</p>}
            {!isLoading && !error && links.length === 0 && (
              <p className="notifications">
                Oops! Looks like you haven't added any links yet.
              </p>
            )}
            {!isLoading &&
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
                        {link.url.length > 50
                          ? link.url.substring(0, 50) + "..."
                          : link.url}
                      </a>
                    </div>
                    <div className="dashboard-link-item-activation">
                      <Switch.Root
                        colorPalette={"green"}
                        size="lg"
                        onChange={() =>
                          link.id !== undefined && handleSwitchChange(link.id)
                        }
                        checked={link.isActive}
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
                      onClick={() => openUpdateDialog(link)}
                    >
                      <i className="fa-solid fa-pencil"></i>
                    </Button>
                    <Button
                      variant={"outline"}
                      className="dashboard-link-item-button"
                      onClick={() =>
                        link.id !== undefined && handleDeleteLink(link.id)
                      }
                    >
                      <i className="fa-regular fa-trash-can"></i>
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardLink;
