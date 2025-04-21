import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Spinner,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "../models/Link";
import { getLinks, createLink, deleteLink } from "../services/LinkService";
import { toast } from "react-toastify";

const DashboardLink = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    url: "",
    isActive: true,
    description: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, isActive: checked }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newLink = await createLink(formData);
      setLinks((prevLinks) => [...prevLinks, newLink]);
      toast.success("Link created successfully.");
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      console.error("Error creating link:", err);
      toast.error("Failed to create link. Please try again later.");
    }
  };

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
          {error && <p>Error: {error}</p>}
          {!isLoading && !error && links.length === 0 && (
            <p>Oops! Looks like you haven't added any links yet.</p>
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

      <Dialog.Root open={open} onOpenChange={onClose}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header className="dialog-header">
                <Dialog.Title>Create a new link</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body className="dialog-body">
                <div className="dialog-form-item">
                  <Input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter link title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="dialog-form-item">
                  <Input
                    type="url"
                    id="url"
                    name="url"
                    placeholder="Enter link URL"
                    value={formData.url}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="dialog-form-item">
                  <label htmlFor="isActive">Activate Link</label>
                  <Switch.Root
                    colorPalette={"green"}
                    size="lg"
                    defaultChecked={true}
                    checked={formData.isActive}
                    onCheckedChange={({ checked }) =>
                      handleSwitchChange(checked)
                    }
                  >
                    <Switch.HiddenInput />
                    <Switch.Control />
                  </Switch.Root>
                </div>
                <div className="dialog-form-item">
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter link description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </Dialog.Body>
              <Dialog.Footer className="dialog-footer">
                <Dialog.ActionTrigger asChild>
                  <Button variant={"outline"} onClick={onClose}>
                    Cancel
                  </Button>
                </Dialog.ActionTrigger>
                <Dialog.ActionTrigger asChild>
                  <Button variant={"solid"} onClick={handleFormSubmit}>
                    <i className="fa-solid fa-plus"></i>
                    <span>Add</span>
                  </Button>
                </Dialog.ActionTrigger>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size={"sm"} />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </div>
  );
};

export default DashboardLink;
