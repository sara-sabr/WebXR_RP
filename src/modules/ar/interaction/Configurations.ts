import { ARConstants } from '../../Constants';
import { UIPanel } from '../UIPanel';
import { ARButton } from './ARButton';
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
      metaData: {
        nextInteraction: ARConstants.INTERACTION_PILOT
      }
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
      nextInteraction: ARConstants.INTERACTION_MAIN_OPTIONS,
    };
  }

  /**
   * Main Choice interaction.
   *
   * @returns configured interaction
   */
   private static mainChoiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_MAIN_OPTIONS,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: 'msca',
            interaction: ARConstants.INTERACTION_MAIN_CHOICE_MSCA,
          },
        ] as ARButton[],
      },
    };
  }

  /**
   * MSCA Register interaction.
   *
   * @returns configured interaction
   */
   private static mscaChoiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_MAIN_CHOICE_MSCA,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'Talk',
      nextInteraction: ARConstants.INTERACTION_SERVICE_CHOICE,
    };
  }

  /**
   * Notice interaction.
   *
   * @returns configured interaction
   */
   private static noticeInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_PILOT,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'Hello',
      nextInteraction: ARConstants.INTERACTION_WELCOME,
    };
  }

  /**
   * Camera overlay interaction
   * @returns configured interaction
   */
  private static cameraOverlayInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_CAMERA_OVERLAY,
      uiPanel: UIPanel.CAMERA,
      metaData: {
        arButtons: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
          {
            key: 'camera.button',
            interaction: ARConstants.INTERACTION_VERIFICATION,
          },
        ] as ARButton[],
      },
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
      animationKey: 'Talk',
      nextInteraction: ARConstants.INTERACTION_SERVICE_CHOICE,
    };
  }

  /**
   * Select Research service interaction.
   *
   * @returns configured interaction
   */
  private static selectResearchInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SELECT_RESEARCH,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'Talk',
      nextInteraction: ARConstants.INTERACTION_RESEARCH_REQUEST_SUBMIT,
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
      animationKey: 'Talk',
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
      animationKey: 'Talk',
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
      animationKey: 'Talk',
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
        arButtons: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as ARButton[],
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
        arButtons: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as ARButton[],
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
        arButtons: [
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as ARButton[],
      },
    };
  }

  /**
   * Submit Research interaction.
   *
   * @returns configured interaction
   */
  private static researchServiceInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_RESEARCH_CHOICE,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: 'submit.request',
            interaction: ARConstants.INTERACTION_RESEARCH_REQUEST_SUBMIT,
          },
          {
            key: 'common.choice.return',
            interaction: ARConstants.INTERACTION_SERVICE_RETURN,
          },
        ] as ARButton[],
      },
    };
  }

  /**
   * Submit Research Request message interaction
   *
   * @returns configured interaction
   */

  private static submitResearchRequestMsg(): Interaction {
    return {
      name: ARConstants.INTERACTION_RESEARCH_REQUEST_SUBMIT,
      animationKey: 'TalkLong',
      uiPanel: UIPanel.MESSAGE,
      nextInteraction: ARConstants.INTERACTION_CAMERA_OVERLAY,
    };
  }

  /**
   * Input Confirmation Message Interaction
   *
   * @returns Configured interaction
   */
  private static inputConfirmationMsg(): Interaction {
    return {
      name: ARConstants.INTERACTION_INPUT_CONFIRMATION,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_USER_INIT,
    };
  }
  /**
   * Initializing the user call button
   *
   * @returns Configured interaction
   */
  private static userInitCall(): Interaction {
    return {
      name: ARConstants.INTERACTION_USER_INIT,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: 'call.agent',
            interaction: ARConstants.INTERACTION_CALL_OVERLAY,
          },
        ] as ARButton[],
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
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: 'etms',
            interaction: ARConstants.INTERACTION_SELECT_ETMS,
          },
          {
            key: 'research',
            interaction: ARConstants.INTERACTION_SELECT_RESEARCH,
          },
          {
            key: 'tp',
            interaction: ARConstants.INTERACTION_SELECT_TP,
          },
          {
            key: 'sp',
            interaction: ARConstants.INTERACTION_SELECT_SP,
          },
        ] as ARButton[],
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
        arButtons: [
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
        ] as ARButton[],
      },
    };
  }

  private static userInputInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_USER_INPUT,
      uiPanel: UIPanel.USER_INPUT,
      metaData: {
        arButtons: [
          {
            key: 'common.submit',
            interaction: ARConstants.INTERACTION_INPUT_CONFIRMATION,
          },
        ] as ARButton[],
      },
    };
  }
  /**
   * Definition of the verification interaction
   * @returns verification of identity interaction
   */
  private static verifyIDInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_VERIFICATION,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_USER_INPUT,
    };
  }

  /**
   * Definition of the Request Submitted Interaction
   * @returns Configured Request Submitted Interaction
   */
  private static requestSubmittedInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_REQUEST_SENT,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'Talk',
      nextInteraction: ARConstants.INTERACTION_USER_INIT,
    };
  }
  /**
   * Definition of the Active Microphone Interaction
   * @returns Configured Active Microphone Interaction
   */
  private static activeMicrophoneInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_ACTIVE_MICROPHONE,
      uiPanel: UIPanel.MICROPHONE,
    };
  }
  /**
   * Call overlay interaction
   * @returns configured interaction
   */
  private static callOverlayInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_CALL_OVERLAY,
      uiPanel: UIPanel.CALL,
      metaData: {
        arButtons: [
          {
            key: 'call.end',
            interaction: ARConstants.INTERACTION_CALL_END,
          },
        ] as ARButton[],
      },
    };
  }

  /**
   * Select technology prototyping service interaction.
   *
   * @returns configured interaction
   */
  private static callEndInterction(): Interaction {
    return {
      name: ARConstants.INTERACTION_CALL_END,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_SURVEY_Q1,
    };
  }

  /**
   * Select survey question 1 interaction.
   *
   * @returns configured interaction
   */
   private static requestSurveyQ1Interaction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SURVEY_Q1,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_SURVEY_Q1_SELECT,
    };
  }

  /**
   * Survey Q1 Select interaction.
   *
   * @returns configured interaction
   */
   private static requestSurveyQ1SelectInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SURVEY_Q1_SELECT,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: '1',
            interaction: ARConstants.INTERACTION_SURVEY_Q2,
          },
          {
            key: '2',
            interaction: ARConstants.INTERACTION_SURVEY_Q2,
          },
          {
            key: '3',
            interaction: ARConstants.INTERACTION_SURVEY_Q2,
          },
          {
            key: '4',
            interaction: ARConstants.INTERACTION_SURVEY_Q2,
          },
          {
            key: '5',
            interaction: ARConstants.INTERACTION_SURVEY_Q2,
          },
        ] as ARButton[],
      },
    };
  }

  /**
   * Select survey question 2 interaction.
   *
   * @returns configured interaction
   */
   private static requestSurveyQ2Interaction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SURVEY_Q2,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_SURVEY_Q2_SELECT,
    };
  }

  /**
   * End interaction.
   *
   * @returns configured interaction
   */
   private static thankyouInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_THANKYOU,
      uiPanel: UIPanel.MESSAGE,
      animationKey: 'TalkLong',
      nextInteraction: ARConstants.INTERACTION_MAIN_OPTIONS,
    };
  }

  /**
   * Survey Q2 Select interaction.
   *
   * @returns configured interaction
   */
   private static requestSurveyQ2SelectInteraction(): Interaction {
    return {
      name: ARConstants.INTERACTION_SURVEY_Q2_SELECT,
      uiPanel: UIPanel.CHOICE,
      metaData: {
        arButtons: [
          {
            key: 'yes',
            interaction: ARConstants.INTERACTION_THANKYOU,
          },
          {
            key: 'no',
            interaction: ARConstants.INTERACTION_THANKYOU,
          },
        ] as ARButton[],
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
      InteractionConfigurations.addInteraction(this.noticeInteraction());
      InteractionConfigurations.addInteraction(this.mainChoiceInteraction());
      InteractionConfigurations.addInteraction(this.mscaChoiceInteraction());
      InteractionConfigurations.addInteraction(this.welcomeInteraction());
      InteractionConfigurations.addInteraction(this.serviceChoiceInteraction());
      InteractionConfigurations.addInteraction(this.selectETMSInteraction());
      InteractionConfigurations.addInteraction(this.etmsServiceInteraction());
      InteractionConfigurations.addInteraction(this.selectResearchInteraction());
      InteractionConfigurations.addInteraction(this.researchServiceInteraction());
      InteractionConfigurations.addInteraction(this.submitResearchRequestMsg());
      InteractionConfigurations.addInteraction(this.serviceReturnInteraction());
      InteractionConfigurations.addInteraction(this.selectTPInteraction());
      InteractionConfigurations.addInteraction(this.tpServiceInteraction());
      InteractionConfigurations.addInteraction(this.selectSPInteraction());
      InteractionConfigurations.addInteraction(this.spServiceInteraction());
      InteractionConfigurations.addInteraction(this.mainMenuInteraction());
      InteractionConfigurations.addInteraction(this.cameraOverlayInteraction());
      InteractionConfigurations.addInteraction(this.verifyIDInteraction());
      InteractionConfigurations.addInteraction(this.requestSubmittedInteraction());
      InteractionConfigurations.addInteraction(this.userInputInteraction());
      InteractionConfigurations.addInteraction(this.activeMicrophoneInteraction());
      InteractionConfigurations.addInteraction(this.callOverlayInteraction());
      InteractionConfigurations.addInteraction(this.inputConfirmationMsg());
      InteractionConfigurations.addInteraction(this.userInitCall());
      InteractionConfigurations.addInteraction(this.callEndInterction());
      InteractionConfigurations.addInteraction(this.requestSurveyQ1Interaction());
      InteractionConfigurations.addInteraction(this.requestSurveyQ2Interaction());
      InteractionConfigurations.addInteraction(this.requestSurveyQ1SelectInteraction());
      InteractionConfigurations.addInteraction(this.requestSurveyQ2SelectInteraction());
      InteractionConfigurations.addInteraction(this.thankyouInteraction());
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
