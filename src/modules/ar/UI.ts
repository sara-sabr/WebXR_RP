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
} from 'babylonjs-gui';
import { EventState } from 'babylonjs/Misc/observable';
import i18next from 'i18next';
import { ARConstants } from '../Constants';
import { Choice } from './interaction/Choice';
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
    const choices = currentInteraction.metaData.choices as Choice[];
    if (choices === undefined) {
      throw new Error('Interaction does not have defined metaData.choices or check your spelling.');
    }

    let button: Button;
    let key: string;
    let messageKey: string;
    let paddingRect: Rectangle;

    for (let idx = 0; idx < choices.length; idx++) {
      messageKey = currentInteraction.name + ARConstants.CHOICE_I18N_PATTTERN + choices[idx].key;

      if (!i18next.exists(messageKey)) {
        // Use key as is.
        messageKey = choices[idx].key;
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
      button.metadata = { interaction: choices[idx].interaction };
      choicesPanel.addControl(button);
      button.onPointerClickObservable.add(this.choiceSelectedEvent);
      paddingRect = new Rectangle();
      paddingRect.height = '1px';
      paddingRect.thickness = 0;
      choicesPanel.addControl(paddingRect);
    }
  }

  /**
   * Create the camera panel.
   *
   * @returns a configured camera panel
   */
  private createCameraPanel(): StackPanel {
    const cameraPanel: StackPanel = this.createStackedPanel('camera');
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

    this.createAppMenu();
  }

  /**
   * Create the application menu buttons.
   */
  private createAppMenu(): void {
    const menuPanel = new StackPanel('appMenu');
    menuPanel.width = '150px';
    menuPanel.height = '25%';
    menuPanel.background = 'black';
    menuPanel.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_RIGHT;
    menuPanel.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;
    menuPanel.paddingTop = '5px';
    menuPanel.paddingRight = '5px';

    // Record icon



    this.xrGUI.addControl(menuPanel);
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

    this.xrGUI.addControl(this.activePanel);

    // Update the message.
    this.updateDialogMessage(currentInteraction);
  }
}
