"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[320],{9320:(e,n,t)=>{t.r(n),t.d(n,{getIconClasses:()=>f});var o,i=t(4405),c=t(6474),a=t(4673),s=t(6696);!function(e){e[e.FILE=0]="FILE",e[e.FOLDER=1]="FOLDER",e[e.ROOT_FOLDER=2]="ROOT_FOLDER"}(o||(o={}));var r=t(7824);const l=/(?:\/|^)(?:([^\/]+)\/)?([^\/]+)$/;function f(e,n,t,f,h){if(r.L.isThemeIcon(h))return["codicon-".concat(h.id),"predefined-file-icon"];if(a.r.isUri(h))return[];const L=f===o.ROOT_FOLDER?["rootfolder-icon"]:f===o.FOLDER?["folder-icon"]:["file-icon"];if(t){let a;if(t.scheme===i.ny.data){a=c.B6.parseMetaData(t).get(c.B6.META_DATA_LABEL)}else{const e=t.path.match(l);e?(a=u(e[2].toLowerCase()),e[1]&&L.push("".concat(u(e[1].toLowerCase()),"-name-dir-icon"))):a=u(t.authority.toLowerCase())}if(f===o.ROOT_FOLDER)L.push("".concat(a,"-root-name-folder-icon"));else if(f===o.FOLDER)L.push("".concat(a,"-name-folder-icon"));else{if(a){if(L.push("".concat(a,"-name-file-icon")),L.push("name-file-icon"),a.length<=255){const e=a.split(".");for(let n=1;n<e.length;n++)L.push("".concat(e.slice(n).join("."),"-ext-file-icon"))}L.push("ext-file-icon")}const o=function(e,n,t){if(!t)return null;let o=null;if(t.scheme===i.ny.data){const e=c.B6.parseMetaData(t).get(c.B6.META_DATA_MIME);e&&(o=n.getLanguageIdByMimeType(e))}else{const n=e.getModel(t);n&&(o=n.getLanguageId())}if(o&&o!==s.vH)return o;return n.guessLanguageIdByFilepathOrFirstLine(t)}(e,n,t);o&&L.push("".concat(u(o),"-lang-file-icon"))}}return L}function u(e){return e.replace(/[\s]/g,"/")}}}]);
//# sourceMappingURL=320.9ce0e2b6.chunk.js.map