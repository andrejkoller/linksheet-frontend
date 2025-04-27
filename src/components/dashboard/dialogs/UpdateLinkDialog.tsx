import {
  Button,
  CloseButton,
  Dialog,
  Input,
  Portal,
  Switch,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateLink } from "../../../services/LinkService";
import { Link } from "../../../models/Link";
import { useLinks } from "../../../context/LinksContext";

interface UpdateLinkDialogHandleProps {
  isOpen: boolean;
  onClose: () => void;
  link: Link | null;
}

const UpdateLinkDialog = ({
  isOpen,
  onClose,
  link,
}: UpdateLinkDialogHandleProps) => {
  const { setLinks } = useLinks();
  const [, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    isActive: true,
    description: "",
  });

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        url: link.url,
        isActive: link.isActive,
        description: link.description,
      });
    }
  }, [link]);

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
    if (!formData.title || !formData.url) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      if (!link?.id) {
        toast.error("Invalid link ID.");
        return;
      }

      const updatedLink = await updateLink(link.id, formData);
      toast.success("Link updated!");
      setLinks((prevLinks) =>
        prevLinks.map((l) => (l.id === updatedLink.id ? updatedLink : l))
      );
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
      console.error("Error updating link:", err);
      toast.error("Failed to update link. Please try again later.");
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header className="dialog-header">
              <Dialog.Title>Update Link</Dialog.Title>
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
                  onCheckedChange={({ checked }) => handleSwitchChange(checked)}
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
                  <i className="fa-solid fa-pencil"></i>
                  <span>Update</span>
                </Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size={"sm"} onClick={onClose} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default UpdateLinkDialog;
