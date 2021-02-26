(self.webpackChunkesdc_itrp_xr_prototype=self.webpackChunkesdc_itrp_xr_prototype||[]).push([[826],{315:(e,n,t)=>{"use strict";t.d(n,{Z:()=>r});var o=t(645),i=t.n(o)()((function(e){return e[1]}));i.push([e.id,"\nhtml, body {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    background-color: #fff;\n    font-family: 'Montserrat', sans-serif;\n    font-size: 11pt;\n    text-align: center;\n}\n#renderCanvas {\n    width: 0%;\n    height: 0%;\n    touch-action: none;\n}\n#versionBanner {\n    background-color:#0072c1;\n    padding: 5px;\n}\n#versionText {\n    font-size: 10pt;\n    color: white;\n}\n#rp-logo {\n    width: 100%;\n    max-width: 700px;\n    height: auto;\n}\n.wrapper {\n    margin-right: auto; \n    margin-left:  auto;\n    max-width: 960px;\n    padding: 20px;\n    background-color: #ffffff;\n    /*border: solid 1px #e0e0e0;*/\n    text-align: center;\n}\n/* see babylon.max.js line 19901 for VR button original initializaion */\n.xr-button-overlay {\n    position: static !important;\n    left: 0 !important;\n    right: 0 !important;\n    bottom: 10% !important;\n    margin: auto !important;\n    display: inline-block !important;\n    padding-top: 0px !important;\n}\n\n.babylonVRicon { \n    margin-left: 0px !important;\n    /*\n    position: fixed !important;\n    left: 0 !important;\n    right: 0 !important;\n    bottom: 20% !important;\n    margin: auto !important;\n    height: 100px !important; \n    width: 160px !important; \n    background-color: rgba(51,51,51,0.7); \n    border: none; \n    outline: none;\n    display: inline-block !important;\n    */\n} \n.babylonVRicon:hover { \n    transform: scale(1.05) \n} \n.babylonVRicon:active {\n    background-color: rgba(51,51,51,1) \n} \n.babylonVRicon:focus {\n    background-color: rgba(51,51,51,1) \n}\n\n.container {\n    display: flex;\n    flex-flow: row wrap;\n  }\n.section {\n    flex: 1; /*grow*/\npadding: 5px;\n}\n@media (max-width: 768px) { /*breakpoint*/\n    .container {\n        flex-direction: column;\n    }\n}   \n\n.card-wrap {\n    flex: 0 0 33.333%;\n    display: flex;\n    padding: 10px; /* gutter width */\n}\n\n.card {\n    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);\n    height: 100%;\n    border-radius: 5px; /* 5px rounded corners */\n    border: solid 1px #ddd;\n}\n\n.card-title {\n    background-color:#efefef;\n    font-size: 14pt;\n    font-weight: 400;\n    padding: 10px;\n    border-radius: 5px 5px 0 0;\n    border-bottom: solid 1px #ddd;\n}\n  \n/* Add some padding inside the card container */\n.card-container {\n    padding: 10px;\n}",""]);const r=i},645:e=>{"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,o){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(o)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(i[a]=!0)}for(var l=0;l<e.length;l++){var s=[].concat(e[l]);o&&i[s[0]]||(t&&(s[2]?s[2]="".concat(t," and ").concat(s[2]):s[2]=t),n.push(s))}},n}},379:(e,n,t)=>{"use strict";var o,i=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),r=[];function a(e){for(var n=-1,t=0;t<r.length;t++)if(r[t].identifier===e){n=t;break}return n}function l(e,n){for(var t={},o=[],i=0;i<e.length;i++){var l=e[i],s=n.base?l[0]+n.base:l[0],c=t[s]||0,d="".concat(s," ").concat(c);t[s]=c+1;var u=a(d),p={css:l[1],media:l[2],sourceMap:l[3]};-1!==u?(r[u].references++,r[u].updater(p)):r.push({identifier:d,updater:f(p,n),references:1}),o.push(d)}return o}function s(e){var n=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var r=t.nc;r&&(o.nonce=r)}if(Object.keys(o).forEach((function(e){n.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(n);else{var a=i(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(n)}return n}var c,d=(c=[],function(e,n){return c[e]=n,c.filter(Boolean).join("\n")});function u(e,n,t,o){var i=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=d(n,i);else{var r=document.createTextNode(i),a=e.childNodes;a[n]&&e.removeChild(a[n]),a.length?e.insertBefore(r,a[n]):e.appendChild(r)}}function p(e,n,t){var o=t.css,i=t.media,r=t.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),r&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var g=null,m=0;function f(e,n){var t,o,i;if(n.singleton){var r=m++;t=g||(g=s(n)),o=u.bind(null,t,r,!1),i=u.bind(null,t,r,!0)}else t=s(n),o=p.bind(null,t,n),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return o(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;o(e=n)}else i()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var t=l(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<t.length;o++){var i=a(t[o]);r[i].references--}for(var s=l(e,n),c=0;c<t.length;c++){var d=a(t[c]);0===r[d].references&&(r[d].updater(),r.splice(d,1))}t=s}}}},665:(e,n,t)=>{"use strict";e.exports=t.p+"ed8237c831504fa9f5ec.mp3"},731:(e,n,t)=>{"use strict";e.exports=t.p+"4ed30e412412c8987582.gltf"},66:(e,n,t)=>{"use strict";e.exports=t.p+"c62b43bed40c40f87656.gltf"},945:(e,n,t)=>{"use strict";var o=t(181),i=t(385),r=t(290),a=(t(793),t(66)),l=t(731);function s(){const e=document.getElementById("renderCanvas");let n=null,t=null,s=null,c=null,d=null,u=null,p=null,g=null,m=null,f=null,h=null,b=null,v=null;const w={intro:{dialog:"intro.dialog"},welcome:{audioPath:"agent.welcome.audio",soundObj:null,animation:"Hello",dialog:"agent.welcome.dialog"}},y=async function(e){let n=1;!0===e&&(n=.1);for(const e of d.getChildMeshes())e.visibility=n},x=async function(){b=r.AdvancedDynamicTexture.CreateFullscreenUI("UI");const e=new r.Rectangle;e.width=1,e.verticalAlignment=r.Control._VERTICAL_ALIGNMENT_BOTTOM,e.height="30%",e.alpha=.4,e.thickness=1,e.background="black",e.zIndex=121,b.addControl(e);const n=new r.Rectangle;n.width=e.width,n.verticalAlignment=e.verticalAlignment,n.height=e.height,e.zIndex=100,b.addControl(n),v=new r.TextBlock,v.text="",v.color="white",v.fontSize="20vw",v.zIndex=100,n.addControl(v)},k=function(e){""===e||void 0===e?(v.text="",v.parent.isVisible=!1):(v.text=e,v.parent.isVisible=!0)},E=async function(e){!0===e?(null===m&&(m=g.onHitTestResultObservable.add(C)),null===f&&(f=t.onPointerObservable.add(I))):!1===e&&(null!==m&&(g.onHitTestResultObservable.remove(m),m=null),null!==f&&(t.onPointerObservable.remove(f),f=null))},I=function(e,n){"pointerdown"===e.event.type&&h&&p.baseExperience.state===i.WebXRState.IN_XR&&(y(!1),u.setEnabled(!0),R("welcome"),h.transformationMatrix.decompose(void 0,d.rotationQuaternion,d.position),h.transformationMatrix.decompose(void 0,u.rotationQuaternion,u.position),E(!1))},C=function(e){e.length?(d.setEnabled(!0),y(!0),h=e[0],h.transformationMatrix.decompose(void 0,d.rotationQuaternion,d.position)):(d.setEnabled(!1),h=void 0,y(!1))},T=async function(){for(const e in w)Object.prototype.hasOwnProperty.call(w,e)&&w[e].audioPath&&(w[e].soundObj&&w[e].soundObj.dispose(),w[e].soundObj=new i.Sound(e,o.Z.t(w[e].audioPath),t))},R=async function(e){i.Engine.audioEngine.unlock();const n=w[e];if(n.soundObj&&n.soundObj.play(),n.dialog?k(o.Z.t(n.dialog)):k(""),n.animation){const n=t.getAnimationGroupByName(w[e].animation);n.start(!1,1,n.from,n.to,!1)}};this.updateLanguageCallback=function(){T()},(async()=>{!async function(){try{n=new i.Engine(e,!0,{preserveDrawingBuffer:!0,stencil:!0,disableWebGL2Support:!1})}catch(e){console.error("Cannot create the engine. "),console.error(e)}await async function(){t=new i.Scene(n),s=new i.FreeCamera("camera1",new i.Vector3(0,1,-5),t),s.setTarget(i.Vector3.Zero()),s.attachControl(e,!0),new i.HemisphericLight("light",new i.Vector3(0,1,0),t).intensity=.7,new i.DirectionalLight("directionalLight",new i.Vector3(0,0,1),t).position=new i.Vector3(0,5,-5),p=await t.createDefaultXRExperienceAsync({uiOptions:{sessionMode:"immersive-ar",referenceSpaceType:"local-floor",onError:e=>{alert(e)}},optionalFeatures:!0}),c=p.baseExperience.featuresManager}(),await async function(){d=(await i.SceneLoader.ImportMeshAsync(null,a,"")).meshes[0],d.scaling.x=.3,d.scaling.y=.3,d.scaling.z=-.3,d.id="myKiosk",d.setEnabled(!1),y(!0),d.rotationQuaternion=new i.Quaternion,u=(await i.SceneLoader.ImportMeshAsync(null,l,"")).meshes[0],u.scaling.x=20,u.scaling.y=20,u.scaling.z=-20,u.id="myHero",u.setEnabled(!1),u.rotationQuaternion=new i.Quaternion,u.rotation;const e=t.getAnimationGroupByName("Idle");e.start(!0,1,e.from,e.to,!1)}(),await async function(){g=c.enableFeature(i.WebXRHitTest,"latest"),await x(),await T(),await E(!0)}(),n.runRenderLoop((function(){t.render()})),window.addEventListener("resize",(function(){n.resize()})),R("intro")}()})()}var c=t(71),d=t(665);const u={translation:{"intro.dialog":"Scan the floor to place the kiosk","agent.welcome.dialog":"Welcome to ITRP AR. \n\nI'm Simon, your virtual agent. \n\nHow can I help you?","agent.welcome.audio":d,"agent.service.etms.dialog":"You have selected monitoring emerging technologies","t-header":"R&P WebAR Prototype","t-blurb":"This is a prototype and does not imply any possibility of a future ESDC service where augmented/mixed reality is available/offered. The purpose of this prototype is to push the boundaries and see what a given technology could do.","t-device":"Minimum device requirements","t-install":'Install <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',"t-desktop":"Desktop","t-pcInstall":'<strong>Chrome 87+</strong> with <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en">WebXR API Emulator</a></strong> installed and configured.',"t-preBtn":"Select the button below to launch the AR application!"}},p={translation:{"intro.dialog":"Visez le plancher pour faire apparaitre le kiosque.","agent.welcome.dialog":"Bienvenue au prototype RA de l’équipe recherche et prototypage. Je m'appelle Simon, vôtre agent virtuel. Comment puis-je vous aider?","agent.welcome.audio":d,"agent.service.etms.dialog":"Vous aviez sélectionné le service de surveillances des technologies émergentes.","t-header":"Recherce & Prototypage - Prototype WebXR","t-blurb":"Il s'agit d'un prototype et n'implique aucune possibilité d'un tel service à EDSC où la réalité augmentée est disponible ou offerte.\n\n L'objectif de ce prototype est de faire évoluer les limites et de voir ce qu'une technologie donnée pourrait faire.","t-device":"Exigences minimales de l'appareil","t-install":'Installer <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',"t-desktop":"Ordinateur de bureau","t-pcInstall":'<strong>Chrome 87+</strong> avec <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=fr">WebXR API Emulator</a></strong> installé et configuré.',"t-preBtn":"Sélectionnez le bouton ci-dessous pour lancer l'application RA !"}};var g=t(379),m=t.n(g),f=t(315);m()(f.Z,{insert:"head",singleton:!1}),f.Z.locals;const h={keySeparator:!1,detection:{order:["querystring","navigator","htmlTag"],lookupQuerystring:"lang",debug:!0,excludeCacheFor:["cimode"],htmlTag:document.documentElement},resources:{en:u,fr:p}};let b=null;o.Z.use(c.Z).init(h,(function(){b=new s,document.getElementById("t-header").innerHTML=o.Z.t("t-header"),document.getElementById("t-blurb").innerHTML=o.Z.t("t-blurb"),document.getElementById("t-device").innerHTML=o.Z.t("t-device"),document.getElementById("t-install").innerHTML=o.Z.t("t-install"),document.getElementById("t-desktop").innerHTML=o.Z.t("t-desktop"),document.getElementById("t-pcInstall").innerHTML=o.Z.t("t-pcInstall"),document.getElementById("t-preBtn").innerHTML=o.Z.t("t-preBtn")})),o.Z.on("languageChanged",(function(e){b.updateLanguageCallback()}))}},0,[[945,666,874,580]]]);