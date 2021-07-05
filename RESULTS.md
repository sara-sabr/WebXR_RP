# DRAFT Report on the Results of the WebXR AR Prototype

## Introduction
The purpose of this prototype is to find out how much of a physical Service Centre visit can be recreated in a WebXR AR world. WebXR was selected since it can easily be developed for and deployed to any web stack for any device and browser combination that supports it, rather than have to develop and maintain native apps for both Android and Apple. 

Below in Table 1 are some of the expected services you could get from a physical visit contrasted against what can be done in AR. 


| Operation | Service Centre | AR Prototype |
|-----------|----------------|--------------|
| See an agent | Yes | Yes (using 3D model with animations) |
| Authenticate a user using government identification | Yes | No |
| Sending forms and documents | Yes | No |
| Conversation with an agent | Yes | Yes (using Speech to Text and Text to Speech) |
| Access to a knowledge database to respond to frequently asked questions | Yes | Yes |

Table 1: Expected Services Physical vs WebXR Prototype

## Technologies Used
### WebXR
WebXR was used to test out the capabilities of this technology, as well as to reduce the need to maintain multiple versions of the same application for different Mobile Operating Systems. 

In order to use WebXR it required an engine to implement the standard and after some experimenting we found a list of functionalities that would be required in the engine for the prototype. Table 2 shows a breakdown of the required functionality. Please note that this table is only accurate as of the initial assessement (May 2020) and features lists may change. 

| Functionality | A-Frame | BabylonJS | ThreeJS |
|---------------|---------|-----------|---------|
| Plane detection / Hit-test functionality | Yes | Yes | No |
| Animation Support for Models | Needs an external plugin | **Yes** | Yes |
| Ability to load in GLTF files | Yes | Yes | Yes |
| Support for Lighting in the AR World | Yes | Yes | Yes |
| Access to Front Facing Camera | No | No | No | 
| Access to Microphone | Not in the engine, can be requested from browser | Not in the engine, can be requested from browser | Not in the engine, can be requested from browser |
| Device Support | Same as WebXR | Same as WebXR | Same as WebXR | 
| GUI Elements for Text Input | Needs an external plugin | **Yes** | No | 
| Audio Playback | Yes | Yes | Yes | 
| Video streaming to a texture | Yes | Yes | Yes |

Table 2: Comparison of 3 WebXR Platforms With the Desired Functionality for the Prototype.

#### BabylonJS
Since all three of the considered options in Table 2 are relatively similar, BabylonJS was chosen as it allowed for GUI elements to be created and animation support for models natively in the framework. 

### Azure Cognitive Services 
Azure Cognitive Services were used in development to allow for the dynamic processing of Text to Speech and Speech to Text services. This allowed at first the application to dynamically generate it's own audio assets through text to speech based on the locale data in both official language. 

Later the Speech to Text functionality was integrated in order to allow the user to speak a question to the AR world's agent which would recognize the text. This let the application integrate with an external chatbot in order to receive an answer to the user's question and using text to speech again the AR world could verbally answer the question using the answer that was retrieved.

## Journey Map

As a starting point the team created a Journey Map planning out how the user would interact with the application. This aided in communicating to the development team what interaction chains a user would expect when using the application. 

![Figure 1: Image of Journey Map](docs/AR%20Prototype%20Journey%20Map.png)
Figure 1: Image of Initial Journey Map

Figure 1 shows the entire process for one operation end-to-end from the user's perspective. First the arrows/chevrons point in the direction that the user will experience these screens, starting from the "Place Kiosk" screen in the top left of the Journey Map until the "Request Submitted" screen in the bottom left. 

The colours of the journey map blocks signify if it is a screen that users will interact with (orange) or if it just a confirmation/informational screen (blue). As well the icons in the top right of the screens themselves indicate whether or not that screen was implemented sucessfully (green checkmark), In Progress (grey clock icon) or unsuccessful implementation (red "X"). 
If there is a red "X" you will find the reason for the unsuccessful implementation in the following "Findings" section.

The Journey Map blocks also describe what the user should expect depending on which "mode" the application is. The two available modes are "Conversation mode ON" which indicates that the user is speaking using the microphone to navigate the application (the screen on the left represents the layout for this mode), or "Conversation Mode OFF" which uses the buttons presented on the screen to navigate the application (the screen on the right represents the layout for this mode).

The final component of a Journey Map block is the "Technical Considerations" section, this outlines the technical considerations and if they were achieved or not. Like with the above screens these too have an icon depicting if the implementation of the technical components were successful or unsuccesful. 


## Findings

### WebXR
1. WebXR is currently a Work in Progress standard, but working towards standardization. Due to this the support for WebXR in Operating Systems and mainstream browsers is limited. 
2. Full support of the features in the prototype was only available on Android devices with ARCore and with Chrome version 87+. 
3. Limited support of the features in the prototype were offerred to iOS users using the WebXR Viewer application released by Mozilla. As well as for development Mozilla released an extension that could be installed in Chrome and Firefox to simulate the WebXR environment. However both of these applications were limited in that they could not interact with the BabylonJS GUI elements.
 
### BabylonJS
1. Due to Security policies in Chrome, the AudioContext is not allowed to start until user input/interaction is done with the webpage. This meant that the prototype could not speak an initial welcome message, and was remedied by manually unlocking the AudioContext engine before the welcome message was played.
2. GUI Text Input does not function properly on a mobile. This is a currently known issue within the BabylonJS documentation, the Text Input element cannot invoke the onscreen keyboard so as a workaround it sends an alert window to get the input. This however causes the AR world to freeze as on mobile this prompt window does not get sent to the front above the AR world. 
4. Unable to take a screenshot of the AR world including the video stream. In an attempt to satisfy the requirement in Table 1 to verify documents in order to validate a user, there was an attempt to use the internal BabylonJS tools to take a screenshot through a makeshift viewfinder. This failed as detailed in a GitHub issue where the screenshot tools could only access and take a screenshot of the AR world but not the underlying video stream.

### Azure Cognitive Services
1. The neural trained voices provided in the Azure Cognitive services still sound robotic and unnatural. There is no workaround for this. 
2. Input only accepted in WAV file format. This was an issue since most browser MediaRecorders do not export to the WAVE/WAV file codecs, the solution to this was to use the "audiobuffer-to-wav" library in order to insert the codec headers into the file to make it compatible with the Azure Cognitive Services file upload process. 

## Considerations
### Current Limitations
Since the WebXR standard at the moment is a work in progress, it is expected that the functionality and widespread use of this technology will be possible when version 1 is released. At this time the technology and its adoption is too limited to make a widespread application as the full features are limited to Android OS and the Chrome browser.

### Possible Improvements to Prototype
Quality of life improvements could be made to the prototype in its current state such as performance increases on a response from the server. This would allow for the time spent processing a request to be diminished but not by much since most of the delay in introduced waiting for a response from the cloud services rather than the API and WebXR itself. 

Another improvement could be the addition of a skip button, which would allow users to skip the response if they know that the response is not what they are looking for, similar to interrupting an agent in a service centre to clarify a question. This would avoid a user being stuck listening to a response that they know is irrelevant for the entirity of the text to speech response.

## References
TODO: Link the issues as references and the babylonjs documentation.