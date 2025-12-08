import {
  Button,
  Card,
  ColorPicker,
  HStack,
  parseColor,
  Portal,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getCurrentUserLinkSpace,
  createLinkSpace,
  updateLinkSpace,
} from "../../../services/link-space-service";
import { toast } from "react-toastify";
import {
  LinkBorderRadiusType,
  LinkBorderStyleType,
  LinkSpace,
} from "../../../models/link-space";
import { useLinkSpace } from "../../../hooks/use-link-space";
import "./dashboard-appearance.css";

function DashboardAppearance() {
  const { linkSpace, setLinkSpace } = useLinkSpace();
  const [formData, setFormData] = useState({
    description: "",
    backgroundColor: "#ffffff",
    buttonColor: "#000000",
    buttonFontColor: "#ffffff",
    fontColor: "#000000",
    borderRadiusType: LinkBorderRadiusType.NotRounded,
    borderStyleType: LinkBorderStyleType.Solid,
  });

  useEffect(() => {
    if (linkSpace) {
      setFormData({
        description: linkSpace.description,
        backgroundColor: linkSpace.linkPageBackgroundColor,
        buttonColor: linkSpace.linkButtonColor,
        buttonFontColor: linkSpace.linkButtonFontColor,
        fontColor: linkSpace.linkPageFontColor,
        borderRadiusType: linkSpace.linkBorderRadius,
        borderStyleType: linkSpace.linkBorderStyle,
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
            description: response.description,
            backgroundColor: response.linkPageBackgroundColor,
            buttonColor: response.linkButtonColor,
            buttonFontColor: response.linkButtonFontColor,
            fontColor: response.linkPageFontColor,
            borderRadiusType: response.linkBorderRadius,
            borderStyleType: response.linkBorderStyle,
          });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error("Error: " + error.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchLinkSpace();
  }, [setLinkSpace]);

  const handleColorChange = (name: string, value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBorderRadiusChange = (type: LinkBorderRadiusType) => {
    setFormData((prevState) => ({
      ...prevState,
      borderRadiusType: type,
    }));
  };

  const handleBorderStyleChange = (type: LinkBorderStyleType) => {
    setFormData((prevState) => ({
      ...prevState,
      borderStyleType: type,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      formData.backgroundColor ||
      formData.buttonColor ||
      formData.buttonFontColor ||
      formData.fontColor ||
      formData.borderRadiusType ||
      formData.description !== "" ||
      formData.borderStyleType
    ) {
      const linkSpace: LinkSpace = {
        id: 0,
        description: formData.description,
        linkPageBackgroundColor: formData.backgroundColor,
        linkButtonColor: formData.buttonColor,
        linkButtonFontColor: formData.buttonFontColor,
        linkPageFontColor: formData.fontColor,
        linkBorderRadius: formData.borderRadiusType,
        linkBorderStyle: formData.borderStyleType,
      };

      try {
        const response = await getCurrentUserLinkSpace();

        if (response) {
          await updateLinkSpace(response.id, linkSpace);
          toast.success("Linkspace updated!");
          setLinkSpace({
            ...linkSpace,
          });
        } else {
          await createLinkSpace(linkSpace);
          toast.success("Linkspace created!");
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

  const formatEnumString = (enumString: string) => {
    return enumString.replace(/([a-z])([A-Z])/g, "$1 $2");
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
            <div className="appearance-setting">
              <label className="appearance-setting-label">
                Template Description
              </label>
              <Card.Root className="appearance-setting-card">
                <Card.Body className="appearance-setting-body">
                  <div className="appearance-description-container">
                    <div className="appearance-description">
                      <Textarea
                        className="appearance-description-input"
                        variant={"outline"}
                        id="description"
                        name="description"
                        placeholder="Tells us about your Linksheet"
                        autoresize={true}
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="appearance-button-container">
                      <Button
                        className="dashboard-appearance-edit-button"
                        variant={"solid"}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card.Root>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="appearance-setting">
              <label className="appearance-setting-label">Background</label>
              <Card.Root className="appearance-setting-card">
                <Card.Body className="appearance-setting-body">
                  <div className="appearance-background-color-container">
                    <div className="appearance-background-color">
                      <ColorPicker.Root
                        value={
                          formData.backgroundColor
                            ? parseColor(formData.backgroundColor)
                            : parseColor("#ffffff")
                        }
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
                    <div className="appearance-button-container">
                      <Button
                        className="dashboard-appearance-edit-button"
                        variant={"solid"}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card.Root>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="appearance-setting">
              <label className="appearance-setting-label">Buttons</label>
              <div className="button-color">
                <Card.Root className="appearance-setting-card">
                  <Card.Body className="appearance-setting-body">
                    <div className="appearance-button-color">
                      <div className="appearance-button-style-wrapper">
                        <label className="appearance-button-color-label">
                          Button style
                        </label>
                        <div className="appearance-button-style-grid">
                          {Object.values(LinkBorderStyleType).map((type) => (
                            <Button
                              key={type}
                              variant={"outline"}
                              className="dashboard-appearance-button"
                              onClick={() => handleBorderStyleChange(type)}
                              style={{
                                backgroundColor:
                                  formData.borderStyleType === type
                                    ? "#000000"
                                    : "#ffffff",
                                color:
                                  formData.borderStyleType === type
                                    ? "#ffffff"
                                    : "#000000",
                              }}
                            >
                              {formatEnumString(type)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="appearance-button-type-wrapper">
                        <label className="appearance-button-color-label">
                          Button type
                        </label>
                        <div className="appearance-button-type-grid">
                          {Object.values(LinkBorderRadiusType).map((type) => (
                            <Button
                              key={type}
                              variant={"outline"}
                              className="dashboard-appearance-button"
                              onClick={() => handleBorderRadiusChange(type)}
                              style={{
                                backgroundColor:
                                  formData.borderRadiusType === type
                                    ? "#000000"
                                    : "#ffffff",
                                color:
                                  formData.borderRadiusType === type
                                    ? "#ffffff"
                                    : "#000000",
                              }}
                            >
                              {formatEnumString(type)}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="appearance-button-color-wrapper">
                        <div className="appearance-button-c-picker-wrapper">
                          <div className="appearance-button-c-picker-container">
                            <ColorPicker.Root
                              value={
                                formData.buttonColor
                                  ? parseColor(formData.buttonColor)
                                  : parseColor("#000000")
                              }
                              onValueChange={(value) =>
                                handleColorChange(
                                  "buttonColor",
                                  value.valueAsString
                                )
                              }
                              maxW="200px"
                            >
                              <ColorPicker.HiddenInput />
                              <ColorPicker.Label>
                                Button color
                              </ColorPicker.Label>
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
                              value={
                                formData.buttonFontColor
                                  ? parseColor(formData.buttonFontColor)
                                  : parseColor("#ffffff")
                              }
                              onValueChange={(value) =>
                                handleColorChange(
                                  "buttonFontColor",
                                  value.valueAsString
                                )
                              }
                              maxW="200px"
                            >
                              <ColorPicker.HiddenInput />
                              <ColorPicker.Label>
                                Button font color
                              </ColorPicker.Label>
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
                          <div className="appearance-button">
                            <Button
                              className="dashboard-appearance-edit-button"
                              variant={"solid"}
                              type="submit"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card.Body>
                </Card.Root>
              </div>
            </div>
          </form>
          <form onSubmit={handleSubmit}>
            <div className="appearance-setting">
              <label className="appearance-setting-label">Fonts</label>
              <Card.Root className="appearance-setting-card">
                <Card.Body className="appearance-setting-body">
                  <div className="appearance-font-color-container">
                    <div className="appearance-font-color">
                      <ColorPicker.Root
                        value={
                          formData.fontColor
                            ? parseColor(formData.fontColor)
                            : parseColor("#000000")
                        }
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
                    <div className="appearance-button-container">
                      <Button
                        className="dashboard-appearance-edit-button"
                        variant={"solid"}
                        type="submit"
                      >
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card.Root>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DashboardAppearance;
