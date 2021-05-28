import {
  TextBlock,
  AdvancedDynamicTexture,
  Rectangle,
  Control,
  Container,
  Vector2WithInfo,
  Button,
  Ellipse,
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
import { ARController } from './Controller';

import ScanARIconLocation from '../../assets/images/AR_ScanFloor_Icon.png';
import SpinnerImageLocation from '../../assets/images/loading-spinner.png';
import { MicrophoneState } from './MicrophoneState';

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
   * XR GUI - debug.
   */
  private debugMessage: TextBlock = null;

  /**
   * Map of UI panels.
   */
  private uiPanels: Map<UIPanel, Container> = new Map();

  /**
   * Current Active panel.
   */
  private activePanel: Container;

  /**
   * The app.
   */
  private arController: ARController;

  /**
   * The scan icon for Kiosk mode.
   */
  private scanARIcon: Image;

  /**
   * The choice stack panel.
   */
  private choiceStack: StackPanel;

  /**
   * The microphone panel.
   */
  private microphonePanel: Rectangle;

  /**
   * The microphone panel.
   */
  private userInputPanel: Rectangle;

  /**
   * The microphone panel.
   */
  private callPanel: Rectangle;

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

    const submit: Button = Button.CreateSimpleButton('submit', i18next.t(arButtons[0].key));
    submit.width = 0.65;
    submit.background = '#0072c1';
    submit.color = 'white';
    submit.height = '120px';
    submit.fontWeight = 'bold';
    submit.cornerRadius = 30;
    submit.thickness = 0.05;
    submit.fontSize = '40pt';
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
    const userInputPanel: Rectangle = new Rectangle();
    userInputPanel.background = 'white';
    userInputPanel.width = 0.8;

    userInputPanel.height = 0.3;
    userInputPanel.top = '650px';
    userInputPanel.cornerRadius = 15;
    userInputPanel.color = 'grey';

    const input: TextBlock = new TextBlock();
    input.width = 0.85;
    input.height = 0.5;
    input.top = -90;
    input.text = i18next.t('input.field.placeholder');
    input.textWrapping = true;
    input.color = '#333333';
    input.fontSize = '32px';
    input.zIndex = 20;
    input.left = 10;
    input.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_LEFT;
    userInputPanel.addControl(input);

    // added temporarily because InputText crashes the app
    // creating this rect to make it look like a input field
    const inputBox_Fake: Rectangle = new Rectangle();
    inputBox_Fake.width = 0.85;
    inputBox_Fake.height = 0.5;
    inputBox_Fake.top = -90;
    inputBox_Fake.color = '#333333';
    inputBox_Fake.background = '#f8f8ff';
    userInputPanel.addControl(inputBox_Fake);

    return userInputPanel;
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
  private createMicrophonePanel(): Rectangle {
    const microphonePanel: Rectangle = new Rectangle('Microphone Panel');
    microphonePanel.thickness = 0;
    return microphonePanel;
  }
  /**
   * Updates the active microphone panel to have a mic button linked to the interaction
   * @param activeMicrophoneInteraction The interaction for the user input panel
   */
  private createActiveMicrophoneButton(): void {
    this.microphonePanel = new Rectangle();
    this.microphonePanel.thickness = 0;

    const activeMic: Button = Button.CreateSimpleButton('Mic', '');
    activeMic.width = '260px';
    activeMic.height = activeMic.width;
    activeMic.thickness = 0;
    activeMic.top = '30%';
    activeMic.alpha = 1;
    activeMic.onPointerDownObservable.add(function () {
      activeMic.alpha = 1;
      circle.background = 'white';
      micText.color = 'red';
      recordingText.text = i18next.t('microphone.text.pressed');
      ARController.getInstance().triggerMicrophoneEvent(MicrophoneState.STARTING);
    });
    activeMic.onPointerUpObservable.add(function () {
      //circle.background = 'red';
      //micText.color = 'white';
      activeMic.removeControl(circle);
      activeMic.removeControl(micText);
      activeMic.addControl(spinnerImage);
      recordingText.text = i18next.t('microphone.text.loading');
      ARController.getInstance().triggerMicrophoneEvent(MicrophoneState.REQUEST_FINISH);
    });

    const micText = new TextBlock();
    micText.text = '\uf130';
    micText.fontFamily = 'FontAwesome';
    micText.color = 'white';
    micText.fontSize = 70;
    micText.paddingTop = 10;
    micText.paddingLeft = -1;
    micText.fontWeight = 'bold';
    micText.zIndex = 2;

    const circle = new Ellipse();
    circle.width = 0.85;
    circle.height = 0.85;
    circle.color = 'white';
    circle.thickness = 6;
    circle.background = 'red';
    circle.shadowColor = 'black';
    circle.shadowBlur = 6;
    circle.shadowOffsetY = 3;
    circle.zIndex = 1;

    const recordingText = new TextBlock('recordingText');
    recordingText.text = i18next.t('microphone.text.static');
    recordingText.fontFamily = 'Montserrat';
    recordingText.fontSize = 70;
    recordingText.fontWeight = 'bold';
    recordingText.color = 'white';
    recordingText.shadowColor = 'black';
    recordingText.shadowBlur = 4;
    recordingText.top = '20%';

    // const spinner = new TextBlock();
    // spinner.text = '\uf110';
    // spinner.fontFamily = 'FontAwesome';
    // spinner.color = 'white';
    // spinner.fontSize = 240;
    // spinner.top = 11;
    // spinner.shadowColor = 'black';
    // spinner.shadowBlur = 4;
    // spinner.zIndex = 4;

    // const spinnerWrap  = new Rectangle();
    // spinnerWrap.width = 1;
    // spinnerWrap.height = 1;
    // spinnerWrap.thickness = 0;
    // spinnerWrap.rotation = 0;
    
    // spinnerWrap.addControl(spinner);
    
    const spinnerImage = new Image('loading-spinner', SpinnerImageLocation);
    spinnerImage.width = 1;
    spinnerImage.height = 1;
    spinnerImage.zIndex = 6;
    spinnerImage.rotation = 0;
    spinnerImage.alpha = 1;

    setInterval(() => {
      spinnerImage.rotation = spinnerImage.rotation + 0.015;
    }, 1);

    activeMic.addControl(circle);
    activeMic.addControl(micText);
    this.microphonePanel.addControl(recordingText);
    this.microphonePanel.addControl(activeMic);
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

    this.choiceStack = this.createStackedPanel('choice');
    this.choiceStack.name = ARUI.CHOICE_BUTTONS_STACK;
    choicePanel.addControl(this.choiceStack);

    this.createActiveMicrophoneButton();

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

    if (ARController.getInstance().isMicON === true && this.choiceStack) {
      this.activePanel.removeControl(this.choiceStack);
      this.activePanel.addControl(this.microphonePanel);
      return;
    } else {
      this.activePanel.addControl(this.choiceStack);
      this.activePanel.removeControl(this.microphonePanel);
    }
    if (ARController.getInstance().isMicON === true && this.userInputPanel) {
      this.activePanel.removeControl(this.userInputPanel);
      this.activePanel.addControl(this.microphonePanel);
      return;
    } else {
      this.activePanel.addControl(this.userInputPanel);
      this.activePanel.removeControl(this.microphonePanel);
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
      button.height = '120px';
      button.thickness = 6;
      button.cornerRadius = 20;
      button.color = '#0072c1';
      button.fontSize = '40pt';
      button.fontWeight = 'bold';
      button.background = 'white';
      button.shadowColor = 'black';
      button.shadowBlur = 12;
      button.shadowOffsetY = 6;
      button.name = messageKey;
      button.metadata = { interaction: arButtons[idx].interaction };
      choicesPanel.addControl(button);
      button.onPointerClickObservable.add(this.choiceSelectedEvent);
      paddingRect = new Rectangle();
      paddingRect.height = '15px';
      paddingRect.thickness = 0;
      choicesPanel.top = 700;
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

    const takePhoto: Button = Button.CreateSimpleButton('but1', i18next.t(arButtons[1].key));
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
    grid.addColumnDefinition(0.1);
    grid.addColumnDefinition(0.8);
    grid.addColumnDefinition(0.1);
    grid.addRowDefinition(0.2);
    grid.addRowDefinition(0.6);
    grid.addRowDefinition(0.2);
    cameraPanel.addControl(grid);

    cameraPanel.zIndex = 20;

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
    const textAbove: TextBlock = new TextBlock('aboveDialog', i18next.t('camera.message'));
    textAbove.color = 'white';
    textAbove.fontSize = '40pt';
    textAbove.textWrapping = true;
    textAbove.top = -850;
    cameraPanel.addControl(textAbove);

    return cameraPanel;
  }

  /**
   * Create the call panel.
   *
   * @returns a configured call panel
   */
  private createCallPanel(): Container {
    const callPanel: Rectangle = new Rectangle();
    const callPanelOverlay: Rectangle = new Rectangle();

    callPanel.zIndex = 20;

    callPanelOverlay.background = 'black';
    callPanelOverlay.width = 1;
    callPanelOverlay.height = 1;
    callPanelOverlay.alpha = 0.5;
    callPanelOverlay.thickness = 0;
    callPanel.addControl(callPanelOverlay);

    return callPanel;
  }
  /**
   * updateCallButtons
   * @param callOverlayInteraction expects the callOverlay Interaction
   */
  private updateCallButtons(callOverlayInteraction: Interaction): void {
    const panel = this.activePanel;
    const arButtons = callOverlayInteraction.metaData.arButtons as ARButton[];

    // START - caller image & info
    const caller_container: Rectangle = new Rectangle();
    caller_container.width = '460px';
    caller_container.height = caller_container.width;
    caller_container.thickness = 0;
    caller_container.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;
    caller_container.top = -320;

    const caller_icon = new TextBlock();
    caller_icon.text = '\uf007';
    caller_icon.fontFamily = 'FontAwesome';
    caller_icon.color = 'grey';
    caller_icon.fontSize = 220;
    caller_icon.paddingTop = 0;
    caller_icon.paddingLeft = -2;
    caller_icon.zIndex = 4;

    const caller_circle = new Ellipse();
    caller_circle.width = 0.8;
    caller_circle.height = 0.8;
    caller_circle.color = 'white';
    caller_circle.thickness = 0;
    caller_circle.background = 'white';
    caller_circle.zIndex = 3;

    const caller_bg01 = new Ellipse();
    caller_bg01.width = 0.9;
    caller_bg01.height = 0.9;
    caller_bg01.thickness = 0;
    caller_bg01.alpha = 0.3;
    caller_bg01.background = 'white';
    caller_bg01.zIndex = 2;

    const caller_bg02 = new Ellipse();
    caller_bg02.width = 1;
    caller_bg02.height = 1;
    caller_bg02.thickness = 0;
    caller_bg02.alpha = 0.3;
    caller_bg02.background = 'white';
    caller_bg02.zIndex = 1;

    caller_container.addControl(caller_circle);
    caller_container.addControl(caller_icon);
    caller_container.addControl(caller_bg01);
    caller_container.addControl(caller_bg02);
    panel.addControl(caller_container);

    const caller_name = new TextBlock();
    caller_name.text = 'Agent Carter';
    caller_name.fontFamily = 'Montserrat';
    caller_name.fontSize = 80;
    caller_name.color = 'white';
    caller_name.zIndex = 4;
    caller_name.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;

    panel.addControl(caller_name);

    const call_time = new TextBlock();
    call_time.text = '00:00:00';
    call_time.fontFamily = 'Montserrat';
    call_time.fontSize = 60;
    call_time.color = 'white';
    call_time.zIndex = 4;
    call_time.top = -650;
    call_time.verticalAlignment = Control.VERTICAL_ALIGNMENT_CENTER;

    panel.addControl(call_time);
    // END

    // START - endCall button
    const endCall_button: Button = Button.CreateSimpleButton('EndCall', '');
    endCall_button.width = '260px';
    endCall_button.height = endCall_button.width;
    endCall_button.thickness = 0;
    endCall_button.top = '30%';
    endCall_button.zIndex = 30;
    endCall_button.onPointerDownObservable.add(function () {
      endCall_circle.background = 'white';
      endCall_icon.color = 'red';
    });
    endCall_button.onPointerUpObservable.add(function () {
      endCall_circle.background = 'red';
      endCall_icon.color = 'white';
    });

    endCall_button.metadata = { interaction: arButtons[0].interaction };
    endCall_button.onPointerClickObservable.add(this.choiceSelectedEvent);

    const endCall_icon = new TextBlock();
    endCall_icon.text = '\uf095';
    endCall_icon.fontFamily = 'FontAwesome';
    endCall_icon.color = 'white';
    endCall_icon.fontSize = 140;
    endCall_icon.paddingTop = -4;
    endCall_icon.paddingLeft = -20;
    endCall_icon.fontWeight = 'bold';
    endCall_icon.zIndex = 2;
    endCall_icon.rotation = 2.35;

    const endCall_circle = new Ellipse();
    endCall_circle.width = 0.95;
    endCall_circle.height = 0.95;
    endCall_circle.color = 'white';
    endCall_circle.thickness = 0;
    endCall_circle.background = 'red';
    endCall_circle.shadowColor = 'black';
    endCall_circle.shadowBlur = 6;
    endCall_circle.shadowOffsetY = 3;
    endCall_circle.zIndex = 1;

    endCall_button.addControl(endCall_circle);
    endCall_button.addControl(endCall_icon);
    panel.addControl(endCall_button);
    // END - endCall Button
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
    this.uiPanels.set(UIPanel.CALL, this.createCallPanel());
    this.uiPanels.set(UIPanel.CHOICE, this.createChoicePanel());
    this.uiPanels.set(UIPanel.MAIN_MENU, this.createMainMenuPanel());
    this.uiPanels.set(UIPanel.MICROPHONE, this.createMicrophonePanel());
    this.uiPanels.set(UIPanel.USER_INPUT, this.createUserInputPanel());

    this.createAppMenu();
    this.createDebug();
  }

  /**
   * Create the debug window.
   */
  private createDebug(): void {
    const debugPanel: Rectangle = new Rectangle();
    debugPanel.thickness = 0;
    debugPanel.height = '10%';
    debugPanel.name = 'DebugPanel';
    debugPanel.zIndex = 9;
    debugPanel.verticalAlignment = Control.VERTICAL_ALIGNMENT_BOTTOM;

    this.debugMessage = new TextBlock();
    this.debugMessage.height = '100%';
    this.debugMessage.color = 'white';
    this.debugMessage.text = 'testing';

    if (ARController.getInstance().isDebugMode()) {
      debugPanel.addControl(this.debugMessage);
      this.xrGUI.addControl(debugPanel);
    }
  }

  /**
   * The debug message.
   *
   * @param message the message to show
   */
  public setDebugText(message: string): void {
    this.debugMessage.text = message;
  }

  /**
   * Create the application menu buttons.
   */
  private createAppMenu(): void {
    const maxWidthInPixel = 180;

    const menuPanel = new StackPanel('appMenu');
    menuPanel.width = maxWidthInPixel + 'px';
    menuPanel.height = '25%';
    menuPanel.horizontalAlignment = StackPanel.HORIZONTAL_ALIGNMENT_RIGHT;
    menuPanel.verticalAlignment = StackPanel.VERTICAL_ALIGNMENT_TOP;
    menuPanel.paddingTop = '5px';
    menuPanel.paddingRight = '5px';
    menuPanel.top = 50;
    menuPanel.left = -25;
    menuPanel.zIndex = 10;

    const exitButton = Button.CreateSimpleButton('exit', '\uf08b');
    this.configureMenuButton(exitButton, maxWidthInPixel);
    exitButton.onPointerClickObservable.add(this.exitEventHandler);
    menuPanel.addControl(exitButton);

    // Record icon
    const micButton = Button.CreateSimpleButton('mic', '\uf131');
    this.configureMenuButton(micButton, maxWidthInPixel);

    micButton.onPointerClickObservable.add(function () {
      if (ARController.getInstance().isMicON == true) {
        micButton.textBlock.text = '\uf131';
        ARController.getInstance().isMicON = false;
      } else {
        micButton.textBlock.text = '\uf130';
        ARController.getInstance().isMicON = true;
      }
      ARController.getInstance().refreshInteraction();
    });

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
    buttonText.color = '#0072c1';
    buttonText.fontSize = 48;
    buttonText.paddingTop = 10;
    buttonText.paddingLeft = -1;
    buttonText.fontWeight = 'bold';
    buttonText.zIndex = 100;

    const circle = new Ellipse();
    circle.width = 0.85;
    circle.height = 0.85;
    circle.color = '#0072c1';
    circle.thickness = 6;
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

    if (!show) {
      // Make sure we aren't already showing it.
      if (that.scanARIcon.metadata && that.scanARIcon.metadata.state) {
        return;
      }
      that.xrGUI.addControl(that.scanARIcon);
    } else {
      that.xrGUI.removeControl(that.scanARIcon);
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
      case UIPanel.CALL:
        this.updateCallButtons(currentInteraction);
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
