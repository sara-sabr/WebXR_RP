import {
  TextBlock,
  AdvancedDynamicTexture,
  Rectangle,
  Control,
  ToggleButton,
  Container,
  Vector2WithInfo,
  Button,
  Ellipse,
  Image,
  StackPanel,
  Grid,
  InputText,
} from 'babylonjs-gui';
import { EventState } from 'babylonjs/Misc/observable';
import i18next from 'i18next';
import { ARConstants } from '../Constants';
import { ARButton } from './interaction/ARButton';
import { Interaction } from './interaction/Interaction';
import { UIPanel } from './UIPanel';
import { ToggleSwitch } from './ToggleSwitch';
import { ARController } from './Controller';

import ScanARIconLocation from '../../assets/images/AR_ScanFloor_Icon.png';

/**
 * UI Singleton.
 */
export class ARUI {
  /**
   * Singleton reference.
   */
  private static INSTANCE: ARUI;

  /**
   * Name of choice stack panel.
   */
  private static readonly CHOICE_BUTTONS_STACK = 'choiceButtons';
  /**
   * XR GUI
   */
  private xrGUI: AdvancedDynamicTexture = null;

  /**
   * XR GUI - "Dialog"
   */
  private message: TextBlock = null;

  /**
   * Map of UI panels.
   */
  private uiPanels: Map<UIPanel, Container> = new Map();

  /**
   * Current Active panel.
   */
  private activePanel: Container;

  /**
   * Mic mode.
   */
  private micToggle: ToggleSwitch;

  /**
   * The app.
   */
  private arController: ARController;

  /**
   * The scan icon for Kiosk mode.
   */
  private scanARIcon: Image;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  private constructor() {
    // Empty on purpose.
  }

  /**
   * Get the singleton instance.
   */
  public static getInstance(): ARUI {
    if (!ARUI.INSTANCE) {
      ARUI.INSTANCE = new ARUI();
    }

    return ARUI.INSTANCE;
  }

  /**
   * Create a panel.
   *
   * @param name name of the panel.
   * @returns a panel
   */
  private createStackedPanel(name: string): StackPanel {
    const panel: StackPanel = new StackPanel();
    panel.name = name;
    return panel;
  }
  /**
   * Updates the user input panel to have a submit button linked to the interaction
   * @param userInputInteraction The interaction for the user input panel
   */
  private updateUserInputPanel(userInputInteraction: Interaction): void {
    const arButtons = userInputInteraction.metaData.arButtons as ARButton[];
    const panel = this.activePanel;

    const submit: Button = Button.CreateSimpleButton('submit', 'Submit');
    submit.width = 0.8;
    submit.background = '#0072c1';
    submit.color = 'white';
    submit.height = '100px';
    submit.fontWeight = 'bold';
    submit.cornerRadius = 30;
    submit.thickness = 0.05;
    submit.fontSize = '32pt';
    submit.top = '200px';
    submit.metadata = { interaction: arButtons[0].interaction };
    submit.onPointerClickObservable.add(this.choiceSelectedEvent);
    panel.addControl(submit);
  }
  /**
   * Setup the user input panel
   * @returns The configured user input panel
   */
  private createUserInputPanel(): Container {
    const panel: Rectangle = new Rectangle();
    panel.background = 'white';
    panel.width = 0.8;
    panel.height = 0.3;
    panel.top = '300px';
    panel.cornerRadius = 15;
    panel.color = 'grey';

    const input: InputText = new InputText();
    input.width = 0.85;
    input.height = 0.5;
    input.top = -90;
    input.text = 'Enter request here.';
    input.color = '#333333';
    input.background = '#f8f8ff';
    input.fontSize = "32px";
    panel.addControl(input);

    return panel;
  }
  /**
   * Setup the message panel.
   *
   * @returns the configured message panel.
   */
  private createMessagePanel(): Container {
    const messagePanel: Rectangle = new Rectangle();
    messagePanel.thickness = 0;
    messagePanel.name = 'MessagePanel';

    // Transparent dialog window
    const messageTransparentLayer = new Rectangle();
    messageTransparentLayer.width = 1;
    messageTransparentLayer.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;
    messageTransparentLayer.height = '20%';
    messageTransparentLayer.alpha = 0.65;
    messageTransparentLayer.thickness = 0;
    messageTransparentLayer.background = 'black';
    messageTransparentLayer.zIndex = 100;
    messageTransparentLayer.name = 'transparentMessagePanel';
    messagePanel.addControl(messageTransparentLayer);

    // Actual text
    this.message = new TextBlock();
    this.message.width = messageTransparentLayer.width;
    this.message.textWrapping = true;
    this.message.setPadding(5, 5, 5, 5);
    this.message.verticalAlignment = messageTransparentLayer.verticalAlignment;
    this.message.height = messageTransparentLayer.height;
    this.message.zIndex = 200;
    this.message.text = '';
    this.message.color = 'white';
    this.message.fontSize = '2%';
    this.message.name = 'messageText';
    messagePanel.addControl(this.message);

    return messagePanel;
  }

  /**
   * Setup the microphone panel.
   *
   * @returns the configured microphone panel
   */
  private createMicrophonePanel(): StackPanel {
    const microphonePanel: StackPanel = this.createStackedPanel('microphone');

    const toggleMic = new ToggleButton('Mic');
    const toggleText = new TextBlock();
    toggleText.text = 'Activate Mic';
    toggleText.color = 'white';
    toggleText.fontSize = '24';
    toggleMic.addControl(toggleText);
    toggleMic.width = 0.3;
    toggleMic.height = 0.06;
    toggleMic.background = 'blue';
    toggleMic.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    toggleMic.onPointerDownObservable.add(() => {
      microphonePanel.addControl(toggleMic);
    });
    return microphonePanel;
  }

  /**
   * The choice panel.
   *
   * @returns the configured choice panel
   */
  private createChoicePanel(): Rectangle {
    const choicePanel: Rectangle = new Rectangle();
    choicePanel.thickness = 0;
    choicePanel.name = 'choicePanel';

    const choiceStack: StackPanel = this.createStackedPanel('choice');
    choiceStack.name = ARUI.CHOICE_BUTTONS_STACK;
    choicePanel.addControl(choiceStack);

    return choicePanel;
  }

  /**
   * Triggered when an option is selected.
   *
   * @param eventData the touch location
   * @param eventState what triggered the event
   */
  private choiceSelectedEvent(eventData: Vector2WithInfo, eventState: EventState): void {
    if (eventState.target instanceof Button) {
      ARUI.getInstance().arController.executeInteraction(eventState.target.metadata.interaction);
    }
  }

  /**
   * Configured the main menu panel.
   *
   * @returns main menu options.
   */
  private createMainMenuPanel(): StackPanel {
    const mainMenuPanel: StackPanel = this.createStackedPanel('mainMenu');
    // Use Grid layout 1 column
    // https://doc.babylonjs.com/divingDeeper/gui/gui#grid

    const buttons: Button[] = [
      Button.CreateSimpleButton('resume', 'Resume'),
      Button.CreateSimpleButton('audio', 'Audio Mode'),
      Button.CreateSimpleButton('exit', 'Exit XR'),
    ];

    for (const b of buttons) {
      b.onPointerClickObservable.add(this.choiceSelectedEvent);
      mainMenuPanel.addControl(b);
    }

    // Add the grid control.
    return mainMenuPanel;
  }

  /**
   * Update the choice panel options.
   *
   * @param currentInteraction the current interaction
   */
  private updateChoicePanelOptions(currentInteraction: Interaction): void {
    if (!this.activePanel || this.activePanel.name === ARUI.CHOICE_BUTTONS_STACK) {
      // No active panel or not a choice panel, so skip.
      return;
    }

    const choicesPanel: StackPanel = this.activePanel.getChildByName(
      ARUI.CHOICE_BUTTONS_STACK
    ) as StackPanel;

    // Remove existing options.
    for (const choiceButtons of choicesPanel.getDescendants(true)) {
      choiceButtons.dispose();
    }

    // Add the new options.
    const arButtons = currentInteraction.metaData.arButtons as ARButton[];
    if (arButtons === undefined) {
      throw new Error(
        'Interaction does not have defined metaData.arButtons or check your spelling.'
      );
    }

    let button: Button;
    let key: string;
    let messageKey: string;
    let paddingRect: Rectangle;

    for (let idx = 0; idx < arButtons.length; idx++) {
      messageKey = currentInteraction.name + ARConstants.CHOICE_I18N_PATTTERN + arButtons[idx].key;

      if (!i18next.exists(messageKey)) {
        // Use key as is.
        messageKey = arButtons[idx].key;
      }

      button = Button.CreateSimpleButton(key, i18next.t(messageKey));
      button.width = 0.6;
      button.height = '100px';
      button.thickness = 0.05;
      button.cornerRadius = 30;
      button.color = 'white';
      button.fontSize = '32pt';
      button.fontWeight = 'bold';
      button.background = '#0072c1';
      button.name = messageKey;
      button.metadata = { interaction: arButtons[idx].interaction };
      choicesPanel.addControl(button);
      button.onPointerClickObservable.add(this.choiceSelectedEvent);
      paddingRect = new Rectangle();
      paddingRect.height = '1px';
      paddingRect.thickness = 0;
      choicesPanel.addControl(paddingRect);
    }
  }

  /**
   * updateCameraButtons
   * @param cameraOverlayInteraction expects the cameraOverlay Interaction
   */
  private updateCameraButtons(cameraOverlayInteraction: Interaction): void {
    const arButtons = cameraOverlayInteraction.metaData.arButtons as ARButton[];
    const grid: Grid = this.activePanel.getChildByName('cameraGrid') as Grid;

    const cancelButton: Button = Button.CreateSimpleButton('return', i18next.t(arButtons[0].key));
    cancelButton.width = '150px';
    cancelButton.height = '40px';
    cancelButton.thickness = 0;
    cancelButton.top = 40;
    cancelButton.color = 'white';
    cancelButton.fontSize = '40pt';
    cancelButton.fontWeight = 'bold';
    cancelButton.metadata = { interaction: arButtons[0].interaction };
    cancelButton.onPointerClickObservable.add(this.choiceSelectedEvent);
    grid.addControl(cancelButton, 2, 1);

    const takePhoto: Button = Button.CreateSimpleButton('but1', 'Take Photo');
    takePhoto.width = 0.65;
    takePhoto.height = '120px';
    takePhoto.color = 'white';
    takePhoto.background = '#0072c1';
    takePhoto.top = -80;
    takePhoto.cornerRadius = 15;
    takePhoto.fontWeight = 'bold';
    takePhoto.fontSize = '40pt';
    takePhoto.shadowBlur = 3;
    takePhoto.shadowColor = 'black';
    takePhoto.shadowOffsetY = 3;
    takePhoto.thickness = 0.05;
    takePhoto.metadata = { interaction: arButtons[1].interaction };
    takePhoto.onPointerClickObservable.add(this.choiceSelectedEvent);

    grid.addControl(takePhoto, 2, 1);
  }
  /**
   * Create the camera panel.
   *
   * @returns a configured camera panel
   */
  private createCameraPanel(): Container {
    const cameraPanel: Rectangle = new Rectangle('cameraPanel');
    const grid: Grid = new Grid('cameraGrid');
    grid.addColumnDefinition(0.2);
    grid.addColumnDefinition(0.6);
    grid.addColumnDefinition(0.2);
    grid.addRowDefinition(0.2);
    grid.addRowDefinition(0.6);
    grid.addRowDefinition(0.2);
    cameraPanel.addControl(grid);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
          const rectangleButton: Rectangle = new Rectangle();
          rectangleButton.thickness = 4;
          grid.addControl(rectangleButton, 1, 1);
        } else {
          const rect: Rectangle = new Rectangle();
          rect.background = 'black';
          rect.thickness = 0;
          rect.alpha = 0.5;
          grid.addControl(rect, i, j);
        }
      }
    }
    const textAbove: TextBlock = new TextBlock(
      'aboveDialog',
      'Place the document in the scanning area.'
    );
    textAbove.color = 'white';
    textAbove.fontSize = '40pt';
    textAbove.top = -850;
    cameraPanel.addControl(textAbove);

    return cameraPanel;
  }

  /**
   * Setup the GUI.
   */
  async setup(arController: ARController): Promise<void> {
    this.arController = arController;
    // Initialize the GUI
    this.xrGUI = AdvancedDynamicTexture.CreateFullscreenUI('UI');

    // Add all panels.
    this.uiPanels.set(UIPanel.MESSAGE, this.createMessagePanel());
    this.uiPanels.set(UIPanel.CAMERA, this.createCameraPanel());
    this.uiPanels.set(UIPanel.CHOICE, this.createChoicePanel());
    this.uiPanels.set(UIPanel.MAIN_MENU, this.createMainMenuPanel());
    this.uiPanels.set(UIPanel.MICROPHONE, this.createMicrophonePanel());
    this.uiPanels.set(UIPanel.USER_INPUT, this.createUserInputPanel());

    this.createAppMenu();
  }

  /**
   * Create the application menu buttons.
   */
  private createAppMenu(): void {
    const maxWidthInPixel = 150;

    const menuPanel = new StackPanel('appMenu');
    menuPanel.width = maxWidthInPixel + 'px';
    menuPanel.height = '25%';
    menuPanel.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_RIGHT;
    menuPanel.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;
    menuPanel.paddingTop = '5px';
    menuPanel.paddingRight = '5px';
    menuPanel.top = 50;
    menuPanel.left = -25;

    const exitButton = Button.CreateSimpleButton('exit', '\uf08b');
    this.configureMenuButton(exitButton, maxWidthInPixel);
    exitButton.onPointerClickObservable.add(this.exitEventHandler);
    menuPanel.addControl(exitButton);

    // Record icon
    const micButton = Button.CreateSimpleButton('mic', '\uf130');
    this.configureMenuButton(micButton, maxWidthInPixel);
    menuPanel.addControl(micButton);

    this.xrGUI.addControl(menuPanel);
  }

  /**
   * Exit event handler;
   */
  private exitEventHandler(): void {
    ARUI.getInstance().arController.exit();
  }

  /**
   * Configure a menu button
   * @param button the button
   * @param maxWidthInPixel the maximum width
   */
  private configureMenuButton(button: Button, maxWidthInPixel: number): void {
    button.width = maxWidthInPixel - 20 + 'px';
    button.height = button.width;
    button.color = 'white';
    button.thickness = 0;

    const buttonText = button.textBlock;
    buttonText.fontFamily = 'FontAwesome';
    buttonText.color = 'black';
    buttonText.fontSize = 38;
    buttonText.paddingTop = 8;
    buttonText.fontWeight = 'bold';
    buttonText.zIndex = 100;

    const circle = new Ellipse();
    circle.width = 0.85;
    circle.height = 0.85;
    circle.color = 'white';
    circle.thickness = 0;
    circle.background = 'white';
    circle.shadowColor = 'black';
    circle.shadowBlur = 6;
    circle.zIndex = 1;
    circle.shadowOffsetY = 3;
    button.addControl(circle);
  }

  /**
   * Scan AR Icon.
   *
   * @param show - show the icon or hide
   */
  public async toggleKioskMode(show: boolean): Promise<void> {
    const that = ARUI.getInstance();

    if (!that.xrGUI) {
      // Handle the case where event fires before GUI is fully
      // initialized. As this method pretty much called every time, it
      // is safe to skip the ones that are too early.
      return;
    }

    if (!that.scanARIcon) {
      that.scanARIcon = new Image('scanARIcon', ScanARIconLocation);
      that.scanARIcon.width = 0.65;
      that.scanARIcon.height = 0.15;
    }

    if (show) {
      // Make sure we aren't already showing it.
      if (that.scanARIcon.metadata && that.scanARIcon.metadata.state) {
        return;
      }

      that.xrGUI.removeControl(that.scanARIcon);
    } else {
      that.xrGUI.addControl(that.scanARIcon);
    }

    that.scanARIcon.metadata = { state: show };
  }

  /**
   * Update the dialog message and if present show the message.
   *
   * @param currentInteraction the current interaction
   */
  public updateDialogMessage(currentInteraction: Interaction): void {
    if (currentInteraction === undefined || this.message === undefined) {
      // We're in a state where initialization is still happening.
      return;
    }

    const messageKey = currentInteraction.name + ARConstants.SUFFIX_I18N_MESSAGE;

    if (i18next.exists(messageKey)) {
      this.message.text = i18next.t(messageKey);
    } else {
      this.message.text = '';
    }
  }

  /**
   * Update the GUI and dialog message.
   *
   * @param currentInteraction the current interaction
   */
  public async updateGUI(currentInteraction: Interaction): Promise<void> {
    if (this.activePanel) {
      this.xrGUI.removeControl(this.activePanel);
    }

    this.activePanel = this.uiPanels.get(currentInteraction.uiPanel);

    switch (currentInteraction.uiPanel) {
      case UIPanel.CHOICE:
        this.updateChoicePanelOptions(currentInteraction);
        break;
      case UIPanel.CAMERA:
        this.updateCameraButtons(currentInteraction);
        break;
      case UIPanel.USER_INPUT:
        this.updateUserInputPanel(currentInteraction);
        break;
    }

    this.xrGUI.addControl(this.activePanel);

    // Update the message.
    this.updateDialogMessage(currentInteraction);
  }
}
