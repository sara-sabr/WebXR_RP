# ESDC WebAR Prototype

## Disclaimer
This is a prototype and does not imply any possibility of a future ESDC service where augmented/mixed reality is
available/offered. The purpose of this prototype is to push the boundaries and see what a given technology could
do.

## Requirements to run prototype hosted
The following are the minimum requirements depending on the device.
- Android: Chrome 87+
- iOS: Install [WebXR Viewer][1]
- Desktop: Chrome 87+ with the following extension installed and configured
    - [WebXR API Emulator][2]
    - Hit F12
    - Switch to WebXR Tab
    - Change device to Samsung Galaxy S8+ (AR)


## How to Run

The following commands are available after running ```npm install```:

- ```npm run build```
Builds the source code and packages it into the ```dist``` folder which then can be served by any server.
- ```npm run lint```
Cleans up the code and the formatting.
- ```npm run start```
Brings up a server at https://localhost:8080 . You will need to accept the unsigned certificate before proceeding.

[1]: https://apps.apple.com/us/app/webxr-viewer/id1295998056
[2]: https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en