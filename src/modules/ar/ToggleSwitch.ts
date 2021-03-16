import { Rectangle, Button, TextBlock } from 'babylonjs-gui';
import { Vector2WithInfo } from 'babylonjs-gui/2D/math2D';
import { EventState } from 'babylonjs/Misc/observable';
import i18next from 'i18next';
import { ITranslate } from '../translation/ITranslate';
import { Interaction } from './interaction/Interaction';

export class ToggleSwitch extends Rectangle implements ITranslate {
  /**
   * The on button.
   */
  private onButton: Button;

  /**
   * The off button.
   */
  private offButton: Button;

  /**
   * The label control.
   */
  private label: TextBlock;

  /**
   * The label string key;
   */
  private labelKey: string;

  /**
   * Width of the button, which impacts the layout.
   */
  private static BUTTON_WIDTH = 70;

  /**
   * Constructor.
   *
   * @param name the name of the widget
   * @param labelKey the label key for the switch.
   */
  constructor(name: string, labelKey: string) {
    super(name);
    this.setup(labelKey);
  }

  /**
   * Setup this control.
   *
   * @param labelKey the label key
   */
  private setup(labelKey: string): void {
    this.labelKey = labelKey;
    this.width = ToggleSwitch.BUTTON_WIDTH * 3 + 'px';
    this.thickness = 0;

    // Label
    this.label = new TextBlock('Audio', 'Audio');
    this.label.width = '60px';
    this.addControl(this.label);

    // Section group.
    const toggleSwitchSelection = new Rectangle(labelKey + '.select');
    toggleSwitchSelection.height = '10px';
    toggleSwitchSelection.thickness = 0;
    toggleSwitchSelection.width = ToggleSwitch.BUTTON_WIDTH * 2 + 'px';
    toggleSwitchSelection.background = 'gray';
    toggleSwitchSelection.cornerRadius = 30;
    toggleSwitchSelection.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
    this.addControl(toggleSwitchSelection);

    this.onButton = this.createBaseButtons(labelKey + '.onButton', 'On', 'green', true);
    this.onButton.left = (ToggleSwitch.BUTTON_WIDTH / 2) * -1 + 'px';
    toggleSwitchSelection.addControl(this.onButton);

    this.offButton = this.createBaseButtons(labelKey + '.offButton', 'Off', 'red', true);
    this.offButton.left = ToggleSwitch.BUTTON_WIDTH / 2 + 'px';
    toggleSwitchSelection.addControl(this.offButton);

    this.translate();
  }

  /**
   * Create a button for the toggle switch.
   *
   * @param labelKey  the label key
   * @param defaultText the default text for the button
   * @param background the background color
   * @param active whether initially active or not
   * @returns a button styled.
   */
  createBaseButtons(
    labelKey: string,
    defaultText: string,
    background: string,
    active: boolean
  ): Button {
    const button = Button.CreateSimpleButton(labelKey, defaultText);
    button.cornerRadius = 30;
    button.thickness = 0;
    button.textBlock.paddingLeftInPixels = 0;
    button.paddingLeftInPixels = 0;
    button.width = '70px';
    button.color = 'white';
    button.metadata = { color: background };
    button.textBlock.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
    button.background = active ? background : 'gray';
    button.onPointerClickObservable.add(ToggleSwitch.pointerClickObservableHandler);
    return button;
  }

  /**
   * Event for state changes.
   *
   * @param state the current state of the button (on/off)
   * @param target the target of the event
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onStateChange(state: boolean, target: ToggleSwitch): void {
    // Empty for hook
  }

  /**
   * Fired when an interaction changes.
   *
   * @param currentInteraction the current interaction.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onInteractionChange(currentInteraction: Interaction): void {
    // Empty.
  }

  /**
   * Handle a click event.
   *
   * @param eventData the event data
   * @param eventState the state
   */
  static pointerClickObservableHandler(eventData: Vector2WithInfo, eventState: EventState): void {
    const parent = eventState.target.parent;
    parent.metadata.buttonState = !parent.metadata.buttonState;

    const activeButton: Button = parent.metadata.buttonState
      ? parent.metadata.onButton
      : parent.metadata.offButton;
    const inActiveButton: Button = parent.metadata.buttonState
      ? parent.metadata.offButton
      : parent.metadata.onButton;

    activeButton.background = activeButton.metadata.color;
    activeButton.isEnabled = false;
    inActiveButton.background = 'gray';
    inActiveButton.isEnabled = true;

    if (
      eventState.target &&
      eventState.target instanceof ToggleSwitch &&
      eventState.target.onStateChange
    ) {
      eventState.target.onStateChange(parent.metadata.buttonState, eventState.target);
    }
  }

  translate(): void {
    this.label.text = i18next.t(this.labelKey);
    this.offButton.textBlock.text = i18next.t('common.switch.off');
    this.onButton.textBlock.text = i18next.t('common.switch.on');
  }
}
