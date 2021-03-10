(self.webpackChunkesdc_itrp_xr_prototype=self.webpackChunkesdc_itrp_xr_prototype||[]).push([[826],{315:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var o=n(645),r=n.n(o)()((function(e){return e[1]}));r.push([e.id,"\nhtml, body {\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n    background-color: #fff;\n    font-family: 'Montserrat', sans-serif;\n    font-size: 11pt;\n    text-align: center;\n}\n#renderCanvas {\n    width: 0%;\n    height: 0%;\n    touch-action: none;\n}\n#versionBanner {\n    background-color:#0072c1;\n    padding: 5px;\n}\n#versionText {\n    font-size: 10pt;\n    color: white;\n}\n#rp-logo {\n    width: 100%;\n    max-width: 700px;\n    height: auto;\n}\n.wrapper {\n    margin-right: auto; \n    margin-left:  auto;\n    max-width: 960px;\n    padding: 20px;\n    background-color: #ffffff;\n    /*border: solid 1px #e0e0e0;*/\n    text-align: center;\n}\n/* see babylon.max.js line 19901 for VR button original initializaion */\n.xr-button-overlay {\n    position: static !important;\n    left: 0 !important;\n    right: 0 !important;\n    bottom: 10% !important;\n    margin: auto !important;\n    display: inline-block !important;\n    padding-top: 0px !important;\n}\n\n.babylonVRicon { \n    margin-left: 0px !important;\n    /*\n    position: fixed !important;\n    left: 0 !important;\n    right: 0 !important;\n    bottom: 20% !important;\n    margin: auto !important;\n    height: 100px !important; \n    width: 160px !important; \n    background-color: rgba(51,51,51,0.7); \n    border: none; \n    outline: none;\n    display: inline-block !important;\n    */\n} \n.babylonVRicon:hover { \n    transform: scale(1.05) \n} \n.babylonVRicon:active {\n    background-color: rgba(51,51,51,1) \n} \n.babylonVRicon:focus {\n    background-color: rgba(51,51,51,1) \n}\n\n.container {\n    display: flex;\n    flex-flow: row wrap;\n  }\n.section {\n    flex: 1; /*grow*/\npadding: 5px;\n}\n@media (max-width: 768px) { /*breakpoint*/\n    .container {\n        flex-direction: column;\n    }\n}   \n\n.card-wrap {\n    flex: 0 0 33.333%;\n    display: flex;\n    padding: 10px; /* gutter width */\n}\n\n.card {\n    box-shadow: 0 1px 1px 0 rgba(0,0,0,0.1);\n    height: 100%;\n    border-radius: 5px; /* 5px rounded corners */\n    border: solid 1px #ddd;\n}\n\n.card-title {\n    background-color:#efefef;\n    font-size: 14pt;\n    font-weight: 400;\n    padding: 10px;\n    border-radius: 5px 5px 0 0;\n    border-bottom: solid 1px #ddd;\n}\n  \n/* Add some padding inside the card container */\n.card-container {\n    padding: 10px;\n}",""]);const i=r},645:e=>{"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=e(t);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var i=0;i<this.length;i++){var a=this[i][0];null!=a&&(r[a]=!0)}for(var l=0;l<e.length;l++){var s=[].concat(e[l]);o&&r[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},379:(e,t,n)=>{"use strict";var o,r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function a(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},o=[],r=0;r<e.length;r++){var l=e[r],s=t.base?l[0]+t.base:l[0],c=n[s]||0,d="".concat(s," ").concat(c);n[s]=c+1;var u=a(d),p={css:l[1],media:l[2],sourceMap:l[3]};-1!==u?(i[u].references++,i[u].updater(p)):i.push({identifier:d,updater:m(p,t),references:1}),o.push(d)}return o}function s(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var i=n.nc;i&&(o.nonce=i)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var a=r(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var c,d=(c=[],function(e,t){return c[e]=t,c.filter(Boolean).join("\n")});function u(e,t,n,o){var r=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=d(t,r);else{var i=document.createTextNode(r),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(i,a[t]):e.appendChild(i)}}function p(e,t,n){var o=n.css,r=n.media,i=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),i&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var g=null,h=0;function m(e,t){var n,o,r;if(t.singleton){var i=h++;n=g||(g=s(t)),o=u.bind(null,n,i,!1),r=u.bind(null,n,i,!0)}else n=s(t),o=p.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var r=a(n[o]);i[r].references--}for(var s=l(e,t),c=0;c<n.length;c++){var d=a(n[c]);0===i[d].references&&(i[d].updater(),i.splice(d,1))}n=s}}}},598:(e,t,n)=>{"use strict";e.exports=n.p+"6989601fcd56d740fc01.mp3"},449:(e,t,n)=>{"use strict";e.exports=n.p+"d9883fbf06944254179a.mp3"},80:(e,t,n)=>{"use strict";e.exports=n.p+"62b4aa4938aa199117ee.mp3"},267:(e,t,n)=>{"use strict";e.exports=n.p+"a6cf90fa7662a5b659b4.mp3"},983:(e,t,n)=>{"use strict";e.exports=n.p+"b7f8b0dd6120a67c1c21.mp3"},909:(e,t,n)=>{"use strict";e.exports=n.p+"59011f8012fb43a55db9.mp3"},304:(e,t,n)=>{"use strict";e.exports=n.p+"2cd14f00822b10f29243.mp3"},122:(e,t,n)=>{"use strict";e.exports=n.p+"f4c17ef97033bec3d0d9.mp3"},538:(e,t,n)=>{"use strict";e.exports=n.p+"01816bdc01cde91a496a.mp3"},843:(e,t,n)=>{"use strict";e.exports=n.p+"efa1db4c2a9977e5aeb1.mp3"},702:(e,t,n)=>{"use strict";e.exports=n.p+"31d6cfe0d16ae931b73c.mp3"},440:(e,t,n)=>{"use strict";e.exports=n.p+"e5afc10924e42f3cada8.mp3"},905:(e,t,n)=>{"use strict";e.exports=n.p+"60aec94e8f612ff90a19.png"},452:(e,t,n)=>{"use strict";e.exports=n.p+"e66142d52efa897eecf8.png"},731:(e,t,n)=>{"use strict";e.exports=n.p+"4ed30e412412c8987582.gltf"},66:(e,t,n)=>{"use strict";e.exports=n.p+"c62b43bed40c40f87656.gltf"},805:(e,t,n)=>{"use strict";var o=n(181),r=n(385),i=n(290),a=(n(793),n(66)),l=n(731);function s(){const e=document.getElementById("renderCanvas");let t=null,n=null,s=null,c=null,d=null,u=null,p=null,g=null,h=null,m=null,f=null,b=null,v=null;const x={intro:{dialog:"intro.dialog"},welcome:{audioPath:"agent.welcome.audio",soundObj:null,animation:"Hello",dialog:"agent.welcome.dialog"},service_ETMS:{audioPath:"agent.service.etms.audio",soundObj:null,animation:"Talk",dialog:"agent.service.etms.dialog"},service_Research:{audioPath:"agent.service.research.audio",soundObj:null,animation:"Talk",dialog:"agent.service.research.dialog"},service_TP:{audioPath:"agent.service.tp.audio",soundObj:null,animation:"Talk",dialog:"agent.service.tp.dialog"},service_SP:{audioPath:"agent.service.sp.audio",soundObj:null,animation:"Talk",dialog:"agent.service.sp.dialog"},wave:{audioPath:"agent.service.return.audio",soundObj:null,animation:"Hello",dialog:"agent.service.return.dialog"}},w=async function(e){let t=1;!0===e?(t=.1,b.removeControl(C)):b.addControl(C);for(const e of d.getChildMeshes())e.visibility=t},y=async function(){b=i.AdvancedDynamicTexture.CreateFullscreenUI("UI");const e=new i.Rectangle;e.width=1,e.verticalAlignment=i.Control._VERTICAL_ALIGNMENT_BOTTOM,e.height="20%",e.alpha=.65,e.thickness=1,e.background="black",e.zIndex=21,b.addControl(e),v=new i.TextBlock,v.width=e.width,v.verticalAlignment=e.verticalAlignment,v.height=e.height,v.zIndex=100,v.text="",v.color="white",v.fontSize="2%",b.addControl(v),b.addControl(C)},C=new i.Image("icon1","/src/assets/images/AR_ScanFloor_Icon.png");C.width=.65,C.height=.15;const T=i.Button.CreateSimpleButton("but1",o.Z.t("gui.button.etms.dialog"));T.top="16%",T.left="18%",T.horizontalAlignment=i.Control.HORIZONTAL_ALIGNMENT_LEFT,T.width=.3,T.height=.06,T.cornerRadius=30,T.color="white",T.fontSize="2%",T.fontWeight="bold",T.background="#0072c1",T.onPointerDownObservable.add((()=>{j("service_ETMS"),b.removeControl(T),b.removeControl(R),b.removeControl(k),b.removeControl(A),b.addControl(I)}));const R=i.Button.CreateSimpleButton("but2",o.Z.t("gui.button.research.dialog"));R.top="16%",R.left="-18%",R.horizontalAlignment=i.Control.HORIZONTAL_ALIGNMENT_RIGHT,R.width=.3,R.height=.06,R.cornerRadius=30,R.color="white",R.fontSize="2%",R.fontWeight="bold",R.background="#0072c1",R.onPointerDownObservable.add((()=>{j("service_Research"),b.removeControl(T),b.removeControl(R),b.removeControl(k),b.removeControl(A),b.addControl(I)}));const k=i.Button.CreateSimpleButton("but3",o.Z.t("gui.button.tp.dialog"));k.top="24%",k.left="18%",k.horizontalAlignment=i.Control.HORIZONTAL_ALIGNMENT_LEFT,k.width=.3,k.height=.06,k.cornerRadius=30,k.color="white",k.fontSize="2%",k.fontWeight="bold",k.background="#0072c1",k.onPointerDownObservable.add((()=>{j("service_TP"),b.removeControl(T),b.removeControl(R),b.removeControl(k),b.removeControl(A),b.addControl(I)}));const A=i.Button.CreateSimpleButton("but4",o.Z.t("gui.button.sp.dialog"));A.top="24%",A.left="-18%",A.horizontalAlignment=i.Control.HORIZONTAL_ALIGNMENT_RIGHT,A.width=.3,A.height=.06,A.cornerRadius=30,A.color="white",A.fontSize="2%",A.fontWeight="bold",A.background="#0072c1",A.onPointerDownObservable.add((()=>{j("service_SP"),b.removeControl(T),b.removeControl(R),b.removeControl(k),b.removeControl(A),b.addControl(I)}));const I=i.Button.CreateSimpleButton("but5",o.Z.t("gui.button.return.dialog"));I.top="24%",I.width=.3,I.height=.06,I.cornerRadius=30,I.color="white",I.fontSize="2%",I.fontWeight="bold",I.background="#0072c1",I.onPointerDownObservable.add((()=>{j("wave"),b.addControl(T),b.addControl(R),b.addControl(k),b.addControl(A),b.removeControl(I)}));const E=new i.ToggleButton("Mic"),S=new i.TextBlock;S.text="Activate Mic",S.color="white",S.fontSize="24",E.addControl(S),E.width=.3,E.height=.06,E.background="blue",E.verticalAlignment=i.Control.VERTICAL_ALIGNMENT_TOP,E.onPointerDownObservable.add((()=>{b.addControl(E),console.log("toggle button")}));const O=function(e){""===e||void 0===e?(v.text="",v.parent.isVisible=!1):(v.text=e,v.parent.isVisible=!0)},M=async function(e){!0===e?(null===h&&(h=g.onHitTestResultObservable.add(P)),null===m&&(m=n.onPointerObservable.add(B))):!1===e&&(null!==h&&(g.onHitTestResultObservable.remove(h),h=null),null!==m&&(n.onPointerObservable.remove(m),m=null))},B=function(e,t){"pointerdown"===e.event.type&&f&&p.baseExperience.state===r.WebXRState.IN_XR&&(w(!1),u.setEnabled(!0),j("welcome"),b.removeControl(C),b.addControl(T),b.addControl(R),b.addControl(k),b.addControl(A),b.addControl(E),f.transformationMatrix.decompose(void 0,d.rotationQuaternion,d.position),f.transformationMatrix.decompose(void 0,u.rotationQuaternion,u.position),M(!1))},P=function(e){e.length?(d.setEnabled(!0),w(!0),f=e[0],f.transformationMatrix.decompose(void 0,d.rotationQuaternion,d.position)):(d.setEnabled(!1),f=void 0,w(!1))},L=async function(){for(const e in x)Object.prototype.hasOwnProperty.call(x,e)&&x[e].audioPath&&(x[e].soundObj&&x[e].soundObj.dispose(),x[e].soundObj=new r.Sound(e,o.Z.t(x[e].audioPath),n))},j=async function(e){r.Engine.audioEngine.audioContext.resume();const t=x[e];if(t.soundObj&&t.soundObj.play(),t.dialog?O(o.Z.t(t.dialog)):O(""),t.animation){const t=n.getAnimationGroupByName(x[e].animation);t.start(!1,1,t.from,t.to,!1)}};this.updateLanguageCallback=function(){L()},(async()=>{!async function(){try{t=new r.Engine(e,!0,{preserveDrawingBuffer:!0,stencil:!0,disableWebGL2Support:!1})}catch(e){console.error("Cannot create the engine. "),console.error(e)}await async function(){n=new r.Scene(t),s=new r.FreeCamera("camera1",new r.Vector3(0,1,-5),n),s.setTarget(r.Vector3.Zero()),s.attachControl(e,!0),new r.HemisphericLight("light",new r.Vector3(0,1,0),n).intensity=.7,new r.DirectionalLight("directionalLight",new r.Vector3(0,0,1),n).position=new r.Vector3(0,5,-5),p=await n.createDefaultXRExperienceAsync({uiOptions:{sessionMode:"immersive-ar",referenceSpaceType:"local-floor",onError:e=>{alert(e)}},optionalFeatures:!0}),c=p.baseExperience.featuresManager}(),await async function(){d=(await r.SceneLoader.ImportMeshAsync(null,a,"")).meshes[0],d.scaling.x=.3,d.scaling.y=.3,d.scaling.z=-.3,d.id="myKiosk",d.setEnabled(!1),w(!0),d.rotationQuaternion=new r.Quaternion,u=(await r.SceneLoader.ImportMeshAsync(null,l,"")).meshes[0],u.scaling.x=20,u.scaling.y=20,u.scaling.z=-20,u.id="myHero",u.setEnabled(!1),u.rotationQuaternion=new r.Quaternion,u.rotation;const e=n.getAnimationGroupByName("Idle");e.start(!0,1,e.from,e.to,!1)}(),await async function(){g=c.enableFeature(r.WebXRHitTest,"latest"),await y(),await L(),await M(!0)}(),t.runRenderLoop((function(){n.render()})),window.addEventListener("resize",(function(){t.resize()})),j("intro")}()})()}var c=n(71),d=n(909),u=n(598),p=n(449),g=n(983),h=n(267),m=n(80);const f=JSON.parse('{"x":{"t4":"Scan the floor to place the kiosk","GA":"Welcome to ITRP AR. \\n\\nI\'m Simon, your virtual agent. \\n\\nHow can I help you?","Dh":"You have selected monitoring emerging technologies","RO":"You have selected research","B4":"You have selected technology prototyping","rP":"You have selected solution prototyping","H2":"What other service would you like to get help with?","A6":"ETMS","H3":"Research","Th":"Technology Prototype","M4":"Solution Prototype","X6":"Return"}}'),b={translation:{"intro.dialog":f.x.t4,"agent.welcome.dialog":f.x.GA,"agent.welcome.audio":d,"agent.service.etms.dialog":f.x.Dh,"agent.service.etms.audio":u,"agent.service.research.dialog":f.x.RO,"agent.service.research.audio":p,"agent.service.tp.dialog":f.x.B4,"agent.service.tp.audio":g,"agent.service.sp.dialog":f.x.rP,"agent.service.sp.audio":h,"agent.service.return.dialog":f.x.H2,"agent.service.return.audio":m,"gui.button.etms.dialog":f.x.A6,"gui.button.research.dialog":f.x.H3,"gui.button.tp.dialog":f.x.Th,"gui.button.sp.dialog":f.x.M4,"gui.button.return.dialog":f.x.X6,"t-header":"R&P WebAR Prototype","t-blurb":"This is a prototype and does not imply any possibility of a future ESDC service where augmented/mixed reality is available/offered. The purpose of this prototype is to push the boundaries and see what a given technology could do.","t-device":"Minimum device requirements","t-install":'Install <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',"t-desktop":"Desktop","t-pcInstall":'<strong>Chrome 87+</strong> with <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=en">WebXR API Emulator</a></strong> installed and configured.',"t-preBtn":"Select the button below to launch the AR application!"}};var v=n(440),x=n(304),w=n(122),y=n(702),C=n(843),T=n(538);const R=JSON.parse('{"x":{"t4":"Visez le plancher pour faire apparaitre le kiosque.","GA":"Bienvenue au prototype RA de l’équipe recherche et prototypage. Je m\'appelle Simon, vôtre agent virtuel. Comment puis-je vous aider?","Dh":"Vous aviez sélectionné le service de surveillances des technologies émergentes.","RO":"Vous aviez sélectionné le service de recherche.","B4":"Vous avez sélectionné le service de prototypage technologique.","rP":"Vous avez sélectionné le service de prototypage de solutions.","H2":"Pour quel autre service aimerez-vous obtenir de l\'aide?","A6":"SSTE","H3":"Recherche","Th":"Prototypage technologique","M4":"Prototypage de solutions","X6":"Retour"}}'),k={translation:{"intro.dialog":R.x.t4,"agent.welcome.dialog":R.x.GA,"agent.welcome.audio":v,"agent.service.etms.dialog":R.x.Dh,"agent.service.etms.audio":x,"agent.service.research.dialog":R.x.RO,"agent.service.research.audio":w,"agent.service.tp.dialog":R.x.B4,"agent.service.tp.audio":y,"agent.service.sp.dialog":R.x.rP,"agent.service.sp.audio":C,"agent.service.return.dialog":R.x.H2,"agent.service.return.audio":T,"gui.button.etms.dialog":R.x.A6,"gui.button.research.dialog":R.x.H3,"gui.button.tp.dialog":R.x.Th,"gui.button.sp.dialog":R.x.M4,"gui.button.return.dialog":R.x.X6,"t-header":"Recherche & prototypage - Prototype WebXR","t-blurb":"Il s'agit d'un prototype et n'implique en aucune façon qu'un tel service à EDSC sera offert où la réalité augmentée est disponible.\n\n L'objectif de ce prototype est de faire évoluer les limites et de voir ce qu'une technologie donnée pourrait faire.","t-device":"Exigences minimales de l'appareil","t-install":'Installer <strong><a href="https://apps.apple.com/us/app/webxr-viewer/id1295998056">WebXR Viewer</a></strong>',"t-desktop":"Ordinateur de bureau","t-pcInstall":'<strong>Chrome 87+</strong> avec <strong><a href="https://chrome.google.com/webstore/detail/webxr-api-emulator/mjddjgeghkdijejnciaefnkjmkafnnje?hl=fr">WebXR API Emulator</a></strong> installé et configuré.',"t-preBtn":"Sélectionnez le bouton ci-dessous pour lancer l'application de RA!"}};var A=n(379),I=n.n(A),E=n(315);I()(E.Z,{insert:"head",singleton:!1}),E.Z.locals,n(905),n(452);const S={keySeparator:!1,detection:{order:["querystring","navigator","htmlTag"],lookupQuerystring:"lang",debug:!0,excludeCacheFor:["cimode"],htmlTag:document.documentElement},resources:{en:b,fr:k}};let O=null;o.Z.use(c.Z).init(S,(function(){O=new s,document.getElementById("t-header").innerHTML=o.Z.t("t-header"),document.getElementById("t-blurb").innerHTML=o.Z.t("t-blurb"),document.getElementById("t-device").innerHTML=o.Z.t("t-device"),document.getElementById("t-install").innerHTML=o.Z.t("t-install"),document.getElementById("t-desktop").innerHTML=o.Z.t("t-desktop"),document.getElementById("t-pcInstall").innerHTML=o.Z.t("t-pcInstall"),document.getElementById("t-preBtn").innerHTML=o.Z.t("t-preBtn")})),o.Z.on("languageChanged",(function(e){O.updateLanguageCallback()}))}},0,[[805,666,874,580]]]);