(self.webpackChunkesdc_itrp_xr_prototype=self.webpackChunkesdc_itrp_xr_prototype||[]).push([[826],{315:(e,n,t)=>{"use strict";t.d(n,{Z:()=>a});var o=t(645),r=t.n(o)()((function(e){return e[1]}));r.push([e.id,"html, body {\n    overflow: hidden;\n    width: 100%;\n    height: 100%;\n    margin: 0;\n    padding: 0;\n}\n#renderCanvas {\n    width: 75%;\n    height: 75%;\n    touch-action: none;\n}",""]);const a=r},645:e=>{"use strict";e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t=e(n);return n[2]?"@media ".concat(n[2]," {").concat(t,"}"):t})).join("")},n.i=function(e,t,o){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(o)for(var a=0;a<this.length;a++){var i=this[a][0];null!=i&&(r[i]=!0)}for(var s=0;s<e.length;s++){var c=[].concat(e[s]);o&&r[c[0]]||(t&&(c[2]?c[2]="".concat(t," and ").concat(c[2]):c[2]=t),n.push(c))}},n}},379:(e,n,t)=>{"use strict";var o,r=function(){var e={};return function(n){if(void 0===e[n]){var t=document.querySelector(n);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}e[n]=t}return e[n]}}(),a=[];function i(e){for(var n=-1,t=0;t<a.length;t++)if(a[t].identifier===e){n=t;break}return n}function s(e,n){for(var t={},o=[],r=0;r<e.length;r++){var s=e[r],c=n.base?s[0]+n.base:s[0],l=t[c]||0,u="".concat(c," ").concat(l);t[c]=l+1;var d=i(u),f={css:s[1],media:s[2],sourceMap:s[3]};-1!==d?(a[d].references++,a[d].updater(f)):a.push({identifier:u,updater:m(f,n),references:1}),o.push(u)}return o}function c(e){var n=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var a=t.nc;a&&(o.nonce=a)}if(Object.keys(o).forEach((function(e){n.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(n);else{var i=r(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(n)}return n}var l,u=(l=[],function(e,n){return l[e]=n,l.filter(Boolean).join("\n")});function d(e,n,t,o){var r=t?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=u(n,r);else{var a=document.createTextNode(r),i=e.childNodes;i[n]&&e.removeChild(i[n]),i.length?e.insertBefore(a,i[n]):e.appendChild(a)}}function f(e,n,t){var o=t.css,r=t.media,a=t.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),a&&"undefined"!=typeof btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var p=null,h=0;function m(e,n){var t,o,r;if(n.singleton){var a=h++;t=p||(p=c(n)),o=d.bind(null,t,a,!1),r=d.bind(null,t,a,!0)}else t=c(n),o=f.bind(null,t,n),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)};return o(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap)return;o(e=n)}else r()}}e.exports=function(e,n){(n=n||{}).singleton||"boolean"==typeof n.singleton||(n.singleton=(void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o));var t=s(e=e||[],n);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<t.length;o++){var r=i(t[o]);a[r].references--}for(var c=s(e,n),l=0;l<t.length;l++){var u=i(t[l]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}t=c}}}},665:(e,n,t)=>{"use strict";e.exports=t.p+"ed8237c831504fa9f5ec.mp3"},731:(e,n,t)=>{"use strict";e.exports=t.p+"4ed30e412412c8987582.gltf"},897:(e,n,t)=>{"use strict";e.exports=t.p+"46105b0d396dec9c92c3.gltf"},241:(e,n,t)=>{"use strict";var o=t(385),r=t(290),a=(t(793),t(897)),i=t(665),s=t(731),c=t(379),l=t.n(c),u=t(315);l()(u.Z,{insert:"head",singleton:!1}),u.Z.locals,new function(e){let n;const t=function(e){let t=n;for(;e>1;)e--,t=t.parentNode;return t};this.subscribe=function(e,n,o){t(n).addEventListener(e,o)},this.unsubscribe=function(e,n,o){t(n).remove.off(e,listener)},this.emit=function(e,t){n.dispatchEvent(new CustomEvent(e,{bubbles:!0,details:t}))},function(e){let t;for(let e=0;e<3;e++)t=n||document.body,n=document.createElement("div"),t.appendChild(n)}()}(3).subscribe("test",1,(function(){console.log({data}),console.log({data})})),new function(){const e=document.getElementById("renderCanvas");let n=null,t=null,c=null,l=null,u=null,d=null,f=null,p=null,h=null,m=null,b=null,v=null,g=null,w=null;const y={welcome:{audioPath:i,soundObj:null,animation:"Hello"}},E=async function(){g=r.AdvancedDynamicTexture.CreateFullscreenUI("UI");const e=new r.Rectangle;e.width=1,e.verticalAlignment=r.Control._VERTICAL_ALIGNMENT_BOTTOM,e.height="200px",e.color="white",e.alpha=.4,e.thickness=1,e.background="black",g.addControl(e),w=new r.TextBlock,w.text="",w.color="white",w.fontSize=24,e.addControl(w)},C=function(e){""===e||void 0===e?(w.text="",w.parent.isVisible=!1):(w.text=e,w.parent.isVisible=!0)},x=async function(e){!0===e?(null===m&&(C("Welcome to Service Canada AR \n\n Scan the floor to place your kiosk"),m=h.onHitTestResultObservable.add(M)),null===b&&(b=t.onPointerObservable.add(S))):!1===e&&(null!==m&&(C(""),h.onHitTestResultObservable.remove(m),m=null),null!==b&&(t.onPointerObservable.remove(b),b=null))},S=function(e,n){"pointerdown"===e.event.type&&v&&p.baseExperience.state===o.WebXRState.IN_XR&&(u.setEnabled(!0),f.setEnabled(!0),O("welcome"),v.transformationMatrix.decompose(void 0,u.rotationQuaternion,u.position),v.transformationMatrix.decompose(void 0,f.rotationQuaternion,f.position),x(!1))},M=function(e){e.length?(u.setEnabled(!1),d.setEnabled(!0),v=e[0],v.transformationMatrix.decompose(void 0,d.rotationQuaternion,d.position)):(d.setEnabled(!1),u.setEnabled(!1),v=void 0)},T=async function(){for(const e in y)Object.prototype.hasOwnProperty.call(y,e)&&(y[e].soundObj=new o.Sound(e,y[e].audioPath,t))},O=async function(e){y[e].soundObj.play();const n=t.getAnimationGroupByName(y[e].animation);n.start(!1,1,n.from,n.to,!1)};(async()=>{console.log("Init"),async function(){try{n=new o.Engine(e,!0,{preserveDrawingBuffer:!0,stencil:!0,disableWebGL2Support:!1})}catch(e){console.error("Cannot create the engine. "),console.error(e)}await async function(){t=new o.Scene(n),c=new o.FreeCamera("camera1",new o.Vector3(0,1,-5),t),c.setTarget(o.Vector3.Zero()),c.attachControl(e,!0),new o.HemisphericLight("light",new o.Vector3(0,1,0),t).intensity=.7,new o.DirectionalLight("directionalLight",new o.Vector3(0,0,1),t).position=new o.Vector3(0,5,-5),p=await t.createDefaultXRExperienceAsync({uiOptions:{sessionMode:"immersive-ar",referenceSpaceType:"local-floor",onError:e=>{alert(e)}},optionalFeatures:!0}),l=p.baseExperience.featuresManager}(),await async function(){u=(await o.SceneLoader.ImportMeshAsync(null,a,"")).meshes[0],u.scaling.x=.3,u.scaling.y=.3,u.scaling.z=-.3,u.id="myKiosk",u.setEnabled(!0),u.rotationQuaternion=new o.Quaternion,f=(await o.SceneLoader.ImportMeshAsync(null,s,"")).meshes[0],f.scaling.x=20,f.scaling.y=20,f.scaling.z=-20,f.id="myHero",f.setEnabled(!1),f.rotationQuaternion=new o.Quaternion,f.rotation;const e=t.getAnimationGroupByName("Idle");e.start(!0,1,e.from,e.to,!1)}(),await async function(){h=l.enableFeature(o.WebXRHitTest,"latest"),d=u.clone("ghost"),console.log(d);for(const e of d.getChildMeshes())e.material=new BABYLON.StandardMaterial("mat"),e.material.alpha=.25;d.rotationQuaternion=new o.Quaternion,d.setEnabled(!1),await E(),await T(),await x(!0)}(),n.runRenderLoop((function(){t.render()})),window.addEventListener("resize",(function(){n.resize()}))}()})()}}},0,[[241,666,874]]]);