import { ARConstants } from '../../Constants';
import { UIPanel } from '../UIPanel';
import { Choice } from './Choice';
import { Interaction } from './Interaction';

/**
 * Configures all the interactions.
 */
export class InteractionConfigurations {
  /**
   * Configuration.
   */
  private static CONFIGURATION: Map<string, Interaction>;

  /**
   * Place kiosk interaction.
   *
   * @returns configured interaction
   */
  private static placeKioskInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_KIOSK,
      uiPanel: UIPanel.MESSAGE,
    };
  }

  /**
   * Welcome interaction.
   *
   * @returns configured interaction
   */
  private static welcomeInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_WELCOME,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'Hello',
      nextInteraction: ARConstants.INTERACTION_SERVICE_CHOICE,
    };
  }

  /**
   * Service Return interaction.
   *
   * @returns configured interaction
   */
  private static serviceReturnInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SERVICE_RETURN,
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_SERVICE_CHOICE,
    };
  }

  /**
   * Select Research service interaction.
   *
   * @returns configured interaction
   */
  private static selectReserachInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SELECT_RESEARCH,
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_RESEARCH_CHOICE,
    };
  }

  /**
   * Select ETMS service interaction.
   *
   * @returns configured interaction
   */
  private static selectETMSInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SELECT_ETMS,
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_ETMS_CHOICE,
    };
  }

  /**
   * Select solution prototyping service interaction.
   *
   * @returns configured interaction
   */
  private static selectSPInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SELECT_SP,
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_SP_CHOICE,
    };
  }

  /**
   * Select technology prototyping service interaction.
   *
   * @returns configured interaction
   */
  private static selectTPInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SELECT_TP,
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_TP_CHOICE,
    };
  }

  /**
   * Return ETMS interaction.
   *
   * @returns configured interaction
   */
  private static etmsServiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_ETMS_CHOICE,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        choices: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Return technology prototyping interaction.
   *
   * @returns configured interaction
   */
  private static tpServiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_TP_CHOICE,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        choices: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Return solution protoyting interaction.
   *
   * @returns configured interaction
   */
  private static spServiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SP_CHOICE,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        choices: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Return interaction.
   *
   * @returns configured interaction
   */
  private static researchServiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_RESEARCH_CHOICE,
      animationKey: 'Wave',
      uiPanel: UIPanel.CHOICE,
      metaData: {
        choices: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Service Choice interaction.
   *
   * @returns configured interaction
   */
  private static serviceChoiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SERVICE_CHOICE,
      animationKey: 'Talk',
      uiPanel: UIPanel.CHOICE,
      metaData: {
        choices: [
          {
            key: 'etms',
            interaction: 'service.select.etms',
          },
          {
            key: 'research',
            interaction: 'service.select.research',
          },
          {
            key: 'tp',
            interaction: 'service.select.tp',
          },
          {
            key: 'sp',
            interaction: 'service.select.sp',
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Main Menu interaction.
   *
   * @returns configured interaction
   */
  private static mainMenuInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_MAIN_MENU,
      uiPanel: UIPanel.MAIN_MENU,
      metaData: {
        choices: [
          {
            key: 'resume',
            interaction: 'resume',
          },
          {
            key: 'audio',
            interaction: 'audio',
          },
          {
            key: 'exit',
            interaction: 'exit',
          },
        ] as Choice[],
      },
    };
  }

  /**
   * Get the configurations.
   */
  public static getConfiguration(): Map<string, Interaction> {
    if (InteractionConfigurations.CONFIGURATION === undefined) {
      InteractionConfigurations.CONFIGURATION = new Map<string, Interaction>();

      // Add the interactions.
      InteractionConfigurations.addInteraction(this.placeKioskInteraction());
      InteractionConfigurations.addInteraction(this.welcomeInteraction());
      InteractionConfigurations.addInteraction(this.serviceChoiceInteraction());
      InteractionConfigurations.addInteraction(this.selectETMSInteraction());
      InteractionConfigurations.addInteraction(this.etmsServiceInteraction());
      InteractionConfigurations.addInteraction(this.selectReserachInteraction());
      InteractionConfigurations.addInteraction(this.researchServiceInteraction());
      InteractionConfigurations.addInteraction(this.serviceReturnInteraction());
      InteractionConfigurations.addInteraction(this.selectTPInteraction());
      InteractionConfigurations.addInteraction(this.tpServiceInteraction());
      InteractionConfigurations.addInteraction(this.selectSPInteraction());
      InteractionConfigurations.addInteraction(this.spServiceInteraction());
      InteractionConfigurations.addInteraction(this.mainMenuInteraction());
    }

    return InteractionConfigurations.CONFIGURATION;
  }

  /**
   * Add interaction (helper method).
   *
   * @param interaction interaction method.
   */
  private static addInteraction(interaction: Interaction): void {
    InteractionConfigurations.CONFIGURATION.set(interaction.name, interaction);
  }
}