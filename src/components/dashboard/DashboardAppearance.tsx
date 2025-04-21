import {
  Button,
  Card,
  ColorPicker,
  HStack,
  parseColor,
  Portal,
} from "@chakra-ui/react";

const DashboardAppearance = () => {
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
          <div className="appearance-settings">
            <label className="appearance-setting-label">Background</label>
            <Card.Root className="appearance-setting-card">
              <Card.Body className="appearance-setting-body">
                <div className="appearance-button-color">
                  <ColorPicker.Root
                    defaultValue={parseColor("#eb5e41")}
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
                            <ColorPicker.EyeDropper size="xl" variant="solid" />
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
                      defaultValue={parseColor("#eb5e41")}
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
                      defaultValue={parseColor("#eb5e41")}
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
                    defaultValue={parseColor("#eb5e41")}
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
                            <ColorPicker.EyeDropper size="xl" variant="solid" />
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
      </div>
    </div>
  );
};

export default DashboardAppearance;
