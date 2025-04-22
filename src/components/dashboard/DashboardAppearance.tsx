import {
  Button,
  Card,
  ColorPicker,
  HStack,
  parseColor,
  Portal,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getCurrentUserLinkSpace,
  createLinkSpace,
  updateLinkSpace,
} from "../../services/LinkSpaceService";
import { toast } from "react-toastify";
import { LinkSpace } from "../../models/LinkSpace";

const DashboardAppearance = () => {
  const [linkSpace, setLinkSpace] = useState<LinkSpace | null>(null);
  const [formData, setFormData] = useState({
    backgroundColor: "#ffffff",
    buttonColor: "#000000",
    buttonFontColor: "#ffffff",
    fontColor: "#000000",
  });

  useEffect(() => {
    if (linkSpace) {
      setFormData({
        backgroundColor: linkSpace.linkPageBackgroundColor,
        buttonColor: linkSpace.linkButtonColor,
        buttonFontColor: linkSpace.linkButtonFontColor,
        fontColor: linkSpace.linkPageFontColor,
      });
    }
  }, [linkSpace]);

  useEffect(() => {
    const fetchLinkSpace = async () => {
      try {
        const response = await getCurrentUserLinkSpace();
        setLinkSpace(response);
        if (response) {
          setFormData({
            backgroundColor: response.linkPageBackgroundColor,
            buttonColor: response.linkButtonColor,
            buttonFontColor: response.linkButtonFontColor,
            fontColor: response.linkPageFontColor,
          });
        }
        console.log("Link space fetched:", response);
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error: " + error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchLinkSpace();
  }, []);

  const handleColorChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.backgroundColor ||
      formData.buttonColor ||
      formData.buttonFontColor ||
      formData.fontColor
    ) {
      const linkSpace: LinkSpace = {
        id: 0,
        linkPageBackgroundColor: formData.backgroundColor,
        linkButtonColor: formData.buttonColor,
        linkButtonFontColor: formData.buttonFontColor,
        linkPageFontColor: formData.fontColor,
      };

      try {
        const response = await getCurrentUserLinkSpace();

        if (response) {
          await updateLinkSpace(response.id, linkSpace);
          toast.success("Link space updated successfully!");
        } else {
          await createLinkSpace(linkSpace);
          toast.success("Link space created successfully!");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error: " + error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    } else {
      toast.warn("Please fill in at least one field before saving.");
    }
  };

  return (
    <div className="dashboard-appearance-container">
      <div className="dashboard-appearance-content">
        <div className="dashboard-appearance-header">
          <h1 className="dashboard-appearance-title">Custom appearance</h1>
        </div>
        <div className="dashboard-appearance-body">
          <p className="dashboard-appearance-description">
            Completely customize your Linksheet profile. Change your background
            with colors and gradients. Choose a button style, change the
            typeface and more.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="appearance-settings">
              <label className="appearance-setting-label">Background</label>
              <Card.Root className="appearance-setting-card">
                <Card.Body className="appearance-setting-body">
                  <div className="appearance-button-color">
                    <ColorPicker.Root
                      value={parseColor(formData.backgroundColor)}
                      onValueChange={(value) =>
                        handleColorChange(
                          "backgroundColor",
                          value.valueAsString
                        )
                      }
                      maxW="200px"
                    >
                      <ColorPicker.HiddenInput />
                      <ColorPicker.Label>Color</ColorPicker.Label>
                      <ColorPicker.Control>
                        <ColorPicker.Input />
                        <ColorPicker.Trigger />
                      </ColorPicker.Control>
                      <Portal>
                        <ColorPicker.Positioner>
                          <ColorPicker.Content>
                            <ColorPicker.Area />
                            <HStack>
                              <ColorPicker.EyeDropper
                                size="xl"
                                variant="solid"
                              />
                              <ColorPicker.Sliders />
                            </HStack>
                          </ColorPicker.Content>
                        </ColorPicker.Positioner>
                      </Portal>
                    </ColorPicker.Root>
                  </div>
                </Card.Body>
                <Card.Footer className="dashboard-appearance-footer">
                  <Button
                    className="dashboard-appearance-edit-button"
                    variant={"solid"}
                    type="submit"
                  >
                    Save
                  </Button>
                </Card.Footer>
              </Card.Root>
            </div>
            <div className="appearance-settings">
              <label className="appearance-setting-label">Buttons</label>
              <div className="button-color">
                <Card.Root className="appearance-setting-card">
                  <Card.Body className="appearance-setting-body">
                    <div className="appearance-background-color">
                      <ColorPicker.Root
                        value={parseColor(formData.buttonColor)}
                        onValueChange={(value) =>
                          handleColorChange("buttonColor", value.valueAsString)
                        }
                        maxW="200px"
                      >
                        <ColorPicker.HiddenInput />
                        <ColorPicker.Label>Button color</ColorPicker.Label>
                        <ColorPicker.Control>
                          <ColorPicker.Input />
                          <ColorPicker.Trigger />
                        </ColorPicker.Control>
                        <Portal>
                          <ColorPicker.Positioner>
                            <ColorPicker.Content>
                              <ColorPicker.Area />
                              <HStack>
                                <ColorPicker.EyeDropper
                                  size="xl"
                                  variant="solid"
                                />
                                <ColorPicker.Sliders />
                              </HStack>
                            </ColorPicker.Content>
                          </ColorPicker.Positioner>
                        </Portal>
                      </ColorPicker.Root>
                      <ColorPicker.Root
                        value={parseColor(formData.buttonFontColor)}
                        onValueChange={(value) =>
                          handleColorChange(
                            "buttonFontColor",
                            value.valueAsString
                          )
                        }
                        maxW="200px"
                      >
                        <ColorPicker.HiddenInput />
                        <ColorPicker.Label>Button font color</ColorPicker.Label>
                        <ColorPicker.Control>
                          <ColorPicker.Input />
                          <ColorPicker.Trigger />
                        </ColorPicker.Control>
                        <Portal>
                          <ColorPicker.Positioner>
                            <ColorPicker.Content>
                              <ColorPicker.Area />
                              <HStack>
                                <ColorPicker.EyeDropper
                                  size="xl"
                                  variant="solid"
                                />
                                <ColorPicker.Sliders />
                              </HStack>
                            </ColorPicker.Content>
                          </ColorPicker.Positioner>
                        </Portal>
                      </ColorPicker.Root>
                    </div>
                  </Card.Body>
                  <Card.Footer className="dashboard-appearance-footer">
                    <Button
                      className="dashboard-appearance-edit-button"
                      variant={"solid"}
                      type="submit"
                    >
                      Save
                    </Button>
                  </Card.Footer>
                </Card.Root>
              </div>
            </div>
            <div className="appearance-settings">
              <label className="appearance-setting-label">Fonts</label>
              <Card.Root className="appearance-setting-card">
                <Card.Body className="appearance-setting-body">
                  <div className="appearance-background-color">
                    <ColorPicker.Root
                      value={parseColor(formData.fontColor)}
                      onValueChange={(value) =>
                        handleColorChange("fontColor", value.valueAsString)
                      }
                      maxW="200px"
                    >
                      <ColorPicker.HiddenInput />
                      <ColorPicker.Label>Color</ColorPicker.Label>
                      <ColorPicker.Control>
                        <ColorPicker.Input />
                        <ColorPicker.Trigger />
                      </ColorPicker.Control>
                      <Portal>
                        <ColorPicker.Positioner>
                          <ColorPicker.Content>
                            <ColorPicker.Area />
                            <HStack>
                              <ColorPicker.EyeDropper
                                size="xl"
                                variant="solid"
                              />
                              <ColorPicker.Sliders />
                            </HStack>
                          </ColorPicker.Content>
                        </ColorPicker.Positioner>
                      </Portal>
                    </ColorPicker.Root>
                  </div>
                </Card.Body>
                <Card.Footer className="dashboard-appearance-footer">
                  <Button
                    className="dashboard-appearance-edit-button"
                    variant={"solid"}
                    type="submit"
                  >
                    Save
                  </Button>
                </Card.Footer>
              </Card.Root>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DashboardAppearance;
