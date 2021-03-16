import { Sound } from 'babylonjs/Audio/sound';
import { UIPanel } from '../UIPanel';

/**
 * An interaction that happens.
 */
export class Interaction {
  /**
   * The interaction key.
   *
   * Prefix lookup that will activate if set in I18N:
   * - [name].audio: Path to audio file
   * - [name].message: Dialog message to appear
   */
  name: string;

  /**
   * Sound object.
   */
  soundObject?: Sound;

  /**
   * Animation key to play.
   */
  animationKey?: string;

  /**
   * The next interaction to play.
   */
  nextInteraction?: string;

  /**
   * UI panel to show for this interaction.
   */
  uiPanel: UIPanel;

  /**
   * Additional injection point - before interaction starts.
   *
   * @param the interaction executing this event
   */
  beforeInteraction?: (target: Interaction) => void;

  /**
   * Additional injection point - after interaction finishes.
   *
   * @param the interaction executing this event
   */
  afterInteraction?: (target: Interaction) => void;

  /**
   * Additional injection point - before transition to next state.
   *
   * @param the interaction executing this event
   */
  beforeNextTransition?: (target: Interaction) => void;

  /**
   * Meta-data that can be used to pass data around.
   */
  metaData?: Record<string, unknown>;
}
