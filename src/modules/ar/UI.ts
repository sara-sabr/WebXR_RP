import {
  TextBlock,
  AdvancedDynamicTexture,
  Rectangle,
  Control,
  ToggleButton,
  Container,
  Vector2WithInfo,
  Button,
  Image,
  StackPanel,
  Grid,
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
      throw new Error('Interaction does not have defined metaData.arButtons or check your spelling.');
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
      let arButtons = cameraOverlayInteraction.metaData.arButtons as ARButton[];
      let grid: Grid = this.activePanel.getChildByName("cameraGrid") as Grid;

      let cancelButton: Button = Button.CreateSimpleButton("return", i18next.t(arButtons[0].key));
      cancelButton.width = "150px";
      cancelButton.height = "40px";
      cancelButton.thickness = 0;
      cancelButton.top = 35;
      cancelButton.color = "white";
      cancelButton.metadata = {interaction: arButtons[0].interaction};
      cancelButton.onPointerClickObservable.add(this.choiceSelectedEvent);
      grid.addControl(cancelButton, 2, 1);

      let takePhoto: Button = Button.CreateSimpleButton("but1", "Take Photo");
      takePhoto.width = "150px"
      takePhoto.height = "40px";
      takePhoto.color = "white";
      takePhoto.background = "#0072c1";
      takePhoto.top = -25;
      takePhoto.cornerRadius = 10;
      takePhoto.fontWeight = "bold";
      takePhoto.shadowBlur = 3;
      takePhoto.shadowColor = "black";
      takePhoto.shadowOffsetY = 3;
      takePhoto.thickness = 0;
      takePhoto.metadata = {interaction: arButtons[1].interaction};
      takePhoto.onPointerClickObservable.add(this.choiceSelectedEvent);

      grid.addControl(takePhoto, 2 , 1);
      
    }
  /**
   * Create the camera panel.
   *
   * @returns a configured camera panel
   */
  private createCameraPanel(): Container {
    const cameraPanel: Rectangle = new Rectangle("cameraPanel");
    let grid: Grid = new Grid("cameraGrid");
    grid.addColumnDefinition(0.20);
    grid.addColumnDefinition(0.6);
    grid.addColumnDefinition(0.2);
    grid.addRowDefinition(0.2);
    grid.addRowDefinition(0.6);
    grid.addRowDefinition(0.2);
    cameraPanel.addControl(grid);

    for (let i = 0; i <3 ; i++){
        for (let j = 0; j<3; j++){
            if (i==1 && j==1){
                let rectangleButton: Rectangle = new Rectangle();
                rectangleButton.thickness = 4;
                grid.addControl(rectangleButton, 1, 1);
            }
            else {
                let rect: Rectangle = new Rectangle();
                rect.background = "black";
                rect.thickness = 0;
                rect.alpha = 0.5;
                grid.addControl(rect, i, j)
            }
            
        }

    }
    let textAbove: TextBlock = new TextBlock("aboveDialog", "Place the document in the scanning area.");
    textAbove.color = "white";
    grid.addControl(textAbove, 0,1);

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

    //    this.createMicSwitch();
  }

  /**
   * Scan AR Icon.
   *
   * @param show - show the icon or hide
   */
  public toggleKioskMode(show: boolean): void {
    if (!this.scanARIcon) {
      this.scanARIcon = new Image('scanARIcon', ScanARIconLocation);
      this.scanARIcon.width = 0.65;
      this.scanARIcon.height = 0.15;
    }

    if (show) {
      // Make sure we aren't already showing it.
      if (this.scanARIcon.metadata && this.scanARIcon.metadata.state) {
        return;
      }

      this.xrGUI.addControl(this.scanARIcon);
    } else {
      this.xrGUI.removeControl(this.scanARIcon);
    }

    this.scanARIcon.metadata = { state: show };
  }

  /**
   * Create the mic switch.
   */
  private createMicSwitch(): void {
    this.micToggle = new ToggleSwitch('micMode', 'common.mic');
    this.micToggle.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.micToggle.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.xrGUI.addControl(this.micToggle);
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

    if (currentInteraction.uiPanel === UIPanel.CHOICE) {
      this.updateChoicePanelOptions(currentInteraction);
    }

    if (currentInteraction.uiPanel === UIPanel.CAMERA){
      this.updateCameraButtons(currentInteraction);
    }

    this.xrGUI.addControl(this.activePanel);

    // Update the message.
    this.updateDialogMessage(currentInteraction);
  }
}
