function Aa(x,H){for(var T=0;T<H.length;T++){const b=H[T];if(typeof b!="string"&&!Array.isArray(b)){for(const L in b)if(L!=="default"&&!(L in x)){const O=Object.getOwnPropertyDescriptor(b,L);O&&Object.defineProperty(x,L,O.get?O:{enumerable:!0,get:()=>b[L]})}}}return Object.freeze(Object.defineProperty(x,Symbol.toStringTag,{value:"Module"}))}var _n={};(function(){var x=tinymce.util.Tools.resolve("tinymce.PluginManager"),H=function(e){var n=typeof e;return e===null?"null":n==="object"&&(Array.prototype.isPrototypeOf(e)||e.constructor&&e.constructor.name==="Array")?"array":n==="object"&&(String.prototype.isPrototypeOf(e)||e.constructor&&e.constructor.name==="String")?"string":n},T=function(e){return function(n){return H(n)===e}},b=function(e){return function(n){return typeof n===e}},L=T("string"),O=T("object"),jn=T("array"),Fn=b("boolean"),Hn=b("function"),zn=b("number"),Be=function(){},f=function(e){return function(){return e}},Vn=function(e){return e},qn=function(e,n){return e===n},Ie=function(e){return function(n){return!e(n)}},z=f(!1),ne=f(!0),V=function(){return re},re=function(){var e=function(t){return t()},n=Vn,r={fold:function(t,a){return t()},isSome:z,isNone:ne,getOr:n,getOrThunk:e,getOrDie:function(t){throw new Error(t||"error: getOrDie called on none.")},getOrNull:f(null),getOrUndefined:f(void 0),or:n,orThunk:e,map:V,each:Be,bind:V,exists:z,forall:ne,filter:function(){return V()},toArray:function(){return[]},toString:f("none()")};return r}(),te=function(e){var n=f(e),r=function(){return a},t=function(i){return i(e)},a={fold:function(i,o){return o(e)},isSome:ne,isNone:z,getOr:n,getOrThunk:n,getOrDie:n,getOrNull:n,getOrUndefined:n,or:r,orThunk:r,map:function(i){return te(i(e))},each:function(i){i(e)},bind:t,exists:t,forall:t,filter:function(i){return i(e)?a:re},toArray:function(){return[e]},toString:function(){return"some("+e+")"}};return a},Kn=function(e){return e==null?re:te(e)},v={some:te,none:V,from:Kn},Wn=Array.prototype.slice,Qn=Array.prototype.push,y=function(e,n){for(var r=e.length,t=new Array(r),a=0;a<r;a++){var i=e[a];t[a]=n(i,a)}return t},g=function(e,n){for(var r=0,t=e.length;r<t;r++){var a=e[r];n(a,r)}},A=function(e,n){for(var r=[],t=0,a=e.length;t<a;t++){var i=e[t];n(i,t)&&r.push(i)}return r},Xn=function(e,n){if(e.length===0)return[];for(var r=n(e[0]),t=[],a=[],i=0,o=e.length;i<o;i++){var s=e[i],u=n(s);u!==r&&(t.push(a),a=[]),r=u,a.push(s)}return a.length!==0&&t.push(a),t},ae=function(e,n,r){return g(e,function(t,a){r=n(r,t,a)}),r},q=function(e,n,r){for(var t=0,a=e.length;t<a;t++){var i=e[t];if(n(i,t))return v.some(i);if(r(i,t))break}return v.none()},K=function(e,n){return q(e,n,z)},Yn=function(e){for(var n=[],r=0,t=e.length;r<t;++r){if(!jn(e[r]))throw new Error("Arr.flatten item "+r+" was not an array, input: "+e);Qn.apply(n,e[r])}return n},Pe=function(e,n){return Yn(y(e,n))},ie=function(e){var n=Wn.call(e,0);return n.reverse(),n},xe=function(e,n){return n>=0&&n<e.length?v.some(e[n]):v.none()},oe=function(e){return xe(e,0)},W=function(e){return xe(e,e.length-1)},Zn=function(e,n){for(var r=0;r<e.length;r++){var t=n(e[r],r);if(t.isSome())return t}return v.none()},se=function(){return se=Object.assign||function(n){for(var r,t=1,a=arguments.length;t<a;t++){r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(n[i]=r[i])}return n},se.apply(this,arguments)};function Gn(e,n,r){if(r||arguments.length===2)for(var t=0,a=n.length,i;t<a;t++)(i||!(t in n))&&(i||(i=Array.prototype.slice.call(n,0,t)),i[t]=n[t]);return e.concat(i||Array.prototype.slice.call(n))}var Jn=function(e){var n=!1,r;return function(){for(var t=[],a=0;a<arguments.length;a++)t[a]=arguments[a];return n||(n=!0,r=e.apply(null,t)),r}},er=function(e,n,r,t){var a=e.isiOS()&&/ipad/i.test(r)===!0,i=e.isiOS()&&!a,o=e.isiOS()||e.isAndroid(),s=o||t("(pointer:coarse)"),u=a||!i&&o&&t("(min-device-width:768px)"),c=i||o&&!u,l=n.isSafari()&&e.isiOS()&&/safari/i.test(r)===!1,p=!c&&!u&&!l;return{isiPad:f(a),isiPhone:f(i),isTablet:f(u),isPhone:f(c),isTouch:f(s),isAndroid:e.isAndroid,isiOS:e.isiOS,isWebView:f(l),isDesktop:f(p)}},nr=function(e,n){for(var r=0;r<e.length;r++){var t=e[r];if(t.test(n))return t}},rr=function(e,n){var r=nr(e,n);if(!r)return{major:0,minor:0};var t=function(a){return Number(n.replace(r,"$"+a))};return ue(t(1),t(2))},tr=function(e,n){var r=String(n).toLowerCase();return e.length===0?Ee():rr(e,r)},Ee=function(){return ue(0,0)},ue=function(e,n){return{major:e,minor:n}},E={nu:ue,detect:tr,unknown:Ee},ar=function(e,n){return Zn(n.brands,function(r){var t=r.brand.toLowerCase();return K(e,function(a){var i;return t===((i=a.brand)===null||i===void 0?void 0:i.toLowerCase())}).map(function(a){return{current:a.name,version:E.nu(parseInt(r.version,10),0)}})})},$e=function(e,n){var r=String(n).toLowerCase();return K(e,function(t){return t.search(r)})},ir=function(e,n){return $e(e,n).map(function(r){var t=E.detect(r.versionRegexes,n);return{current:r.name,version:t}})},or=function(e,n){return $e(e,n).map(function(r){var t=E.detect(r.versionRegexes,n);return{current:r.name,version:t}})},m=function(e,n){return e.indexOf(n)!==-1},sr=function(e){return function(n){return n.replace(e,"")}},ur=sr(/^\s+|\s+$/g),cr=function(e){return e.length>0},fr=function(e){return!cr(e)},ce=/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,C=function(e){return function(n){return m(n,e)}},lr=[{name:"Edge",versionRegexes:[/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],search:function(e){return m(e,"edge/")&&m(e,"chrome")&&m(e,"safari")&&m(e,"applewebkit")}},{name:"Chrome",brand:"Chromium",versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/,ce],search:function(e){return m(e,"chrome")&&!m(e,"chromeframe")}},{name:"IE",versionRegexes:[/.*?msie\ ?([0-9]+)\.([0-9]+).*/,/.*?rv:([0-9]+)\.([0-9]+).*/],search:function(e){return m(e,"msie")||m(e,"trident")}},{name:"Opera",versionRegexes:[ce,/.*?opera\/([0-9]+)\.([0-9]+).*/],search:C("opera")},{name:"Firefox",versionRegexes:[/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],search:C("firefox")},{name:"Safari",versionRegexes:[ce,/.*?cpu os ([0-9]+)_([0-9]+).*/],search:function(e){return(m(e,"safari")||m(e,"mobile/"))&&m(e,"applewebkit")}}],vr=[{name:"Windows",search:C("win"),versionRegexes:[/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]},{name:"iOS",search:function(e){return m(e,"iphone")||m(e,"ipad")},versionRegexes:[/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,/.*cpu os ([0-9]+)_([0-9]+).*/,/.*cpu iphone os ([0-9]+)_([0-9]+).*/]},{name:"Android",search:C("android"),versionRegexes:[/.*?android\ ?([0-9]+)\.([0-9]+).*/]},{name:"OSX",search:C("mac os x"),versionRegexes:[/.*?mac\ os\ x\ ?([0-9]+)_([0-9]+).*/]},{name:"Linux",search:C("linux"),versionRegexes:[]},{name:"Solaris",search:C("sunos"),versionRegexes:[]},{name:"FreeBSD",search:C("freebsd"),versionRegexes:[]},{name:"ChromeOS",search:C("cros"),versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/]}],Re={browsers:f(lr),oses:f(vr)},Me="Edge",Ue="Chrome",_e="IE",je="Opera",Fe="Firefox",He="Safari",dr=function(){return ze({current:void 0,version:E.unknown()})},ze=function(e){var n=e.current,r=e.version,t=function(a){return function(){return n===a}};return{current:n,version:r,isEdge:t(Me),isChrome:t(Ue),isIE:t(_e),isOpera:t(je),isFirefox:t(Fe),isSafari:t(He)}},Ve={unknown:dr,nu:ze,edge:f(Me),chrome:f(Ue),ie:f(_e),opera:f(je),firefox:f(Fe),safari:f(He)},qe="Windows",Ke="iOS",We="Android",Qe="Linux",Xe="OSX",Ye="Solaris",Ze="FreeBSD",Ge="ChromeOS",mr=function(){return Je({current:void 0,version:E.unknown()})},Je=function(e){var n=e.current,r=e.version,t=function(a){return function(){return n===a}};return{current:n,version:r,isWindows:t(qe),isiOS:t(Ke),isAndroid:t(We),isOSX:t(Xe),isLinux:t(Qe),isSolaris:t(Ye),isFreeBSD:t(Ze),isChromeOS:t(Ge)}},en={unknown:mr,nu:Je,windows:f(qe),ios:f(Ke),android:f(We),linux:f(Qe),osx:f(Xe),solaris:f(Ye),freebsd:f(Ze),chromeos:f(Ge)},pr=function(e,n,r){var t=Re.browsers(),a=Re.oses(),i=n.bind(function(u){return ar(t,u)}).orThunk(function(){return ir(t,e)}).fold(Ve.unknown,Ve.nu),o=or(a,e).fold(en.unknown,en.nu),s=er(o,i,e,r);return{browser:i,os:o,deviceType:s}},gr={detect:pr},hr=function(e){return window.matchMedia(e).matches},yr=Jn(function(){return gr.detect(navigator.userAgent,v.from(navigator.userAgentData),hr)}),Sr=function(){return yr()},br=function(e,n,r){return(e.compareDocumentPosition(n)&r)!==0},Cr=function(e,n){return br(e,n,Node.DOCUMENT_POSITION_CONTAINED_BY)},nn=1,Lr=function(e,n){var r=n||document,t=r.createElement("div");if(t.innerHTML=e,!t.hasChildNodes()||t.childNodes.length>1)throw console.error("HTML does not have a single root node",e),new Error("HTML must have a single root node");return $(t.childNodes[0])},Or=function(e,n){var r=n||document,t=r.createElement(e);return $(t)},Nr=function(e,n){var r=n||document,t=r.createTextNode(e);return $(t)},$=function(e){if(e==null)throw new Error("Node cannot be null or undefined");return{dom:e}},Tr=function(e,n,r){return v.from(e.dom.elementFromPoint(n,r)).map($)},d={fromHtml:Lr,fromTag:Or,fromText:Nr,fromDom:$,fromPoint:Tr},wr=function(e,n){var r=e.dom;if(r.nodeType!==nn)return!1;var t=r;if(t.matches!==void 0)return t.matches(n);if(t.msMatchesSelector!==void 0)return t.msMatchesSelector(n);if(t.webkitMatchesSelector!==void 0)return t.webkitMatchesSelector(n);if(t.mozMatchesSelector!==void 0)return t.mozMatchesSelector(n);throw new Error("Browser lacks native selectors")},rn=function(e,n){return e.dom===n.dom},Dr=function(e,n){var r=e.dom,t=n.dom;return r===t?!1:r.contains(t)},kr=function(e,n){return Cr(e.dom,n.dom)},Ar=function(e,n){return Sr().browser.isIE()?kr(e,n):Dr(e,n)},Br=wr,tn=tinymce.util.Tools.resolve("tinymce.dom.RangeUtils"),Ir=tinymce.util.Tools.resolve("tinymce.dom.TreeWalker"),Q=tinymce.util.Tools.resolve("tinymce.util.VK"),Pr=Object.keys,fe=function(e,n){for(var r=Pr(e),t=0,a=r.length;t<a;t++){var i=r[t],o=e[i];n(o,i)}},xr=function(e){return function(n,r){e[r]=n}},Er=function(e,n,r,t){var a={};return fe(e,function(i,o){(n(i,o)?r:t)(i,o)}),a},$r=function(e,n){var r={};return Er(e,n,xr(r),Be),r};typeof window<"u"||Function("return this;")();var le=function(e){var n=e.dom.nodeName;return n.toLowerCase()},Rr=function(e){return e.dom.nodeType},Mr=function(e){return function(n){return Rr(n)===e}},an=Mr(nn),on=function(e){return function(n){return an(n)&&le(n)===e}},Ur=function(e,n,r){if(L(r)||Fn(r)||zn(r))e.setAttribute(n,r+"");else throw console.error("Invalid call to Attribute.set. Key ",n,":: Value ",r,":: Element ",e),new Error("Attribute value was not simple")},R=function(e,n){var r=e.dom;fe(n,function(t,a){Ur(r,a,t)})},ve=function(e){return ae(e.dom.attributes,function(n,r){return n[r.name]=r.value,n},{})},de=function(e){return v.from(e.dom.parentNode).map(d.fromDom)},me=function(e){return y(e.dom.childNodes,d.fromDom)},sn=function(e,n){var r=e.dom.childNodes;return v.from(r[n]).map(d.fromDom)},un=function(e){return sn(e,0)},cn=function(e){return sn(e,e.dom.childNodes.length-1)},fn=function(e,n){var r=de(e);r.each(function(t){t.dom.insertBefore(n.dom,e.dom)})},X=function(e,n){e.dom.appendChild(n.dom)},_r=function(e,n){g(n,function(r){fn(e,r)})},pe=function(e,n){g(n,function(r){X(e,r)})},ln=function(e){var n=e.dom;n.parentNode!==null&&n.parentNode.removeChild(n)},jr=function(e,n){return d.fromDom(e.dom.cloneNode(n))},Fr=function(e){return jr(e,!0)},Hr=function(e,n){var r=d.fromTag(n),t=ve(e);return R(r,t),r},ge=function(e,n){var r=Hr(e,n);fn(e,r);var t=me(e);return pe(r,t),ln(e),r},he=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),S=tinymce.util.Tools.resolve("tinymce.util.Tools"),vn=function(e){return function(n){return n&&n.nodeName.toLowerCase()===e}},M=function(e){return function(n){return n&&e.test(n.nodeName)}},B=function(e){return e&&e.nodeType===3},h=M(/^(OL|UL|DL)$/),zr=M(/^(OL|UL)$/),dn=vn("ol"),mn=M(/^(LI|DT|DD)$/),Vr=M(/^(DT|DD)$/),qr=M(/^(TH|TD)$/),w=vn("br"),Kr=function(e){return e.parentNode.firstChild===e},ye=function(e,n){return n&&!!e.schema.getTextBlockElements()[n.nodeName]},pn=function(e,n){return e&&e.nodeName in n},Wr=function(e,n){return w(n)?e.isBlock(n.nextSibling)&&!w(n.previousSibling):!1},D=function(e,n,r){var t=e.isEmpty(n);return r&&e.select("span[data-mce-type=bookmark]",n).length>0?!1:t},gn=function(e,n){return e.isChildOf(n,e.getRoot())},Qr=function(e){return e.getParam("lists_indent_on_tab",!0)},Xr=function(e){var n=e.getParam("forced_root_block","p");return n===!1?"":n===!0?"p":n},Yr=function(e){return e.getParam("forced_root_block_attrs",{})},hn=function(e,n){var r=e.dom,t=e.schema.getBlockElements(),a=r.createFragment(),i=Xr(e),o,s,u;if(i&&(s=r.create(i),s.tagName===i.toUpperCase()&&r.setAttribs(s,Yr(e)),pn(n.firstChild,t)||a.appendChild(s)),n)for(;o=n.firstChild;){var c=o.nodeName;!u&&(c!=="SPAN"||o.getAttribute("data-mce-type")!=="bookmark")&&(u=!0),pn(o,t)?(a.appendChild(o),s=null):i?(s||(s=r.create(i),a.appendChild(s)),s.appendChild(o)):a.appendChild(o)}return i?u||s.appendChild(r.create("br",{"data-mce-bogus":"1"})):a.appendChild(r.create("br")),a},N=he.DOM,Zr=function(e,n,r){var t=function(c){S.each(a,function(l){c.parentNode.insertBefore(l,r.parentNode)}),N.remove(c)},a=N.select('span[data-mce-type="bookmark"]',n),i=hn(e,r),o=N.createRng();o.setStartAfter(r),o.setEndAfter(n);for(var s=o.extractContents(),u=s.firstChild;u;u=u.firstChild)if(u.nodeName==="LI"&&e.dom.isEmpty(u)){N.remove(u);break}e.dom.isEmpty(s)||N.insertAfter(s,n),N.insertAfter(i,n),D(e.dom,r.parentNode)&&t(r.parentNode),N.remove(r),D(e.dom,n)&&N.remove(n)},Gr=on("dd"),yn=on("dt"),Jr=function(e,n){Gr(n)?ge(n,"dt"):yn(n)&&de(n).each(function(r){return Zr(e,r.dom,n.dom)})},et=function(e){yn(e)&&ge(e,"dd")},nt=function(e,n,r){n==="Indent"?g(r,et):g(r,function(t){return Jr(e,t)})},Sn=function(e,n){if(B(e))return{container:e,offset:n};var r=tn.getNode(e,n);return B(r)?{container:r,offset:n>=e.childNodes.length?r.data.length:0}:r.previousSibling&&B(r.previousSibling)?{container:r.previousSibling,offset:r.previousSibling.data.length}:r.nextSibling&&B(r.nextSibling)?{container:r.nextSibling,offset:0}:{container:e,offset:n}},Y=function(e){var n=e.cloneRange(),r=Sn(e.startContainer,e.startOffset);n.setStart(r.container,r.offset);var t=Sn(e.endContainer,e.endOffset);return n.setEnd(t.container,t.offset),n},bn=tinymce.util.Tools.resolve("tinymce.dom.DomQuery"),I=function(e,n){var r=n||e.selection.getStart(!0);return e.dom.getParent(r,"OL,UL,DL",k(e,r))},rt=function(e,n){return e&&n.length===1&&n[0]===e},tt=function(e){return A(e.querySelectorAll("ol,ul,dl"),h)},at=function(e){var n=I(e),r=e.selection.getSelectedBlocks();return rt(n,r)?tt(n):A(r,function(t){return h(t)&&n!==t})},it=function(e,n){var r=S.map(n,function(t){var a=e.dom.getParent(t,"li,dd,dt",k(e,t));return a||t});return bn.unique(r)},Se=function(e){var n=e.selection.getSelectedBlocks();return A(it(e,n),mn)},ot=function(e){return A(Se(e),Vr)},k=function(e,n){var r=e.dom.getParents(n,"TD,TH");return r.length>0?r[0]:e.getBody()},Cn=function(e,n){var r=e.dom.getParents(n,"ol,ul",k(e,n));return W(r)},st=function(e){var n=Cn(e,e.selection.getStart()),r=A(e.selection.getSelectedBlocks(),zr);return n.toArray().concat(r)},ut=function(e){var n=st(e);return ct(e,n)},ct=function(e,n){var r=y(n,function(t){return Cn(e,t).getOr(t)});return bn.unique(r)},Ln=function(e,n,r){return r===void 0&&(r=qn),e.exists(function(t){return r(t,n)})},On=function(e,n,r){return e.isSome()&&n.isSome()?v.some(r(e.getOrDie(),n.getOrDie())):v.none()},ft=function(e,n){var r=n||document,t=r.createDocumentFragment();return g(e,function(a){t.appendChild(a.dom)}),d.fromDom(t)},U=function(e,n,r){return e.fire("ListMutation",{action:n,element:r})},lt=function(e){return e.style!==void 0&&Hn(e.style.getPropertyValue)},vt=function(e,n,r){if(!L(r))throw console.error("Invalid call to CSS.set. Property ",n,":: Value ",r,":: Element ",e),new Error("CSS value must be a string: "+r);lt(e)&&e.style.setProperty(n,r)},dt=function(e,n,r){var t=e.dom;vt(t,n,r)},Nn=function(e,n){X(e.item,n.list)},mt=function(e){for(var n=1;n<e.length;n++)Nn(e[n-1],e[n])},pt=function(e,n){On(W(e),oe(n),Nn)},gt=function(e,n){var r={list:d.fromTag(n,e),item:d.fromTag("li",e)};return X(r.list,r.item),r},ht=function(e,n,r){for(var t=[],a=0;a<r;a++)t.push(gt(e,n.listType));return t},yt=function(e,n){for(var r=0;r<e.length-1;r++)dt(e[r].item,"list-style-type","none");W(e).each(function(t){R(t.list,n.listAttributes),R(t.item,n.itemAttributes),pe(t.item,n.content)})},St=function(e,n){le(e.list)!==n.listType&&(e.list=ge(e.list,n.listType)),R(e.list,n.listAttributes)},bt=function(e,n,r){var t=d.fromTag("li",e);return R(t,n),pe(t,r),t},Ct=function(e,n){X(e.list,n),e.item=n},Lt=function(e,n,r){var t=n.slice(0,r.depth);return W(t).each(function(a){var i=bt(e,r.itemAttributes,r.content);Ct(a,i),St(a,r)}),t},Ot=function(e,n,r){var t=ht(e,r,r.depth-n.length);return mt(t),yt(t,r),pt(n,t),n.concat(t)},Nt=function(e,n){var r=ae(n,function(t,a){return a.depth>t.length?Ot(e,t,a):Lt(e,t,a)},[]);return oe(r).map(function(t){return t.list})},_=function(e){return Br(e,"OL,UL")},Tn=function(e){return un(e).exists(_)},Tt=function(e){return cn(e).exists(_)},wn=function(e){return e.depth>0},wt=function(e){return e.isSelected},Dt=function(e){var n=me(e),r=Tt(e)?n.slice(0,-1):n;return y(r,Fr)},kt=function(e,n,r){return de(e).filter(an).map(function(t){return{depth:n,dirty:!1,isSelected:r,content:Dt(e),itemAttributes:ve(e),listAttributes:ve(t),listType:le(t)}})},At=function(e,n){switch(e){case"Indent":n.depth++;break;case"Outdent":n.depth--;break;case"Flatten":n.depth=0}n.dirty=!0},Bt=function(e,n){e.listType=n.listType,e.listAttributes=se({},n.listAttributes)},It=function(e){e.listAttributes=$r(e.listAttributes,function(n,r){return r!=="start"})},Pt=function(e,n){var r=e[n].depth,t=function(i){return i.depth===r&&!i.dirty},a=function(i){return i.depth<r};return q(ie(e.slice(0,n)),t,a).orThunk(function(){return q(e.slice(n+1),t,a)})},Dn=function(e){return g(e,function(n,r){Pt(e,r).fold(function(){n.dirty&&It(n)},function(t){return Bt(n,t)})}),e},xt=function(e){var n=e,r=function(){return n},t=function(a){n=a};return{get:r,set:t}},Et=function(e,n,r,t){return un(t).filter(_).fold(function(){n.each(function(o){rn(o.start,t)&&r.set(!0)});var a=kt(t,e,r.get());n.each(function(o){rn(o.end,t)&&r.set(!1)});var i=cn(t).filter(_).map(function(o){return Z(e,n,r,o)}).getOr([]);return a.toArray().concat(i)},function(a){return Z(e,n,r,a)})},Z=function(e,n,r,t){return Pe(me(t),function(a){var i=_(a)?Z:Et,o=e+1;return i(o,n,r,a)})},$t=function(e,n){var r=xt(!1),t=0;return y(e,function(a){return{sourceList:a,entries:Z(t,n,r,a)}})},Rt=function(e,n){var r=Dn(n);return y(r,function(t){var a=ft(t.content);return d.fromDom(hn(e,a.dom))})},Mt=function(e,n){var r=Dn(n);return Nt(e.contentDocument,r).toArray()},Ut=function(e,n){return Pe(Xn(n,wn),function(r){var t=oe(r).exists(wn);return t?Mt(e,r):Rt(e,r)})},_t=function(e,n){g(A(e,wt),function(r){return At(n,r)})},jt=function(e){var n=y(Se(e),d.fromDom);return On(K(n,Ie(Tn)),K(ie(n),Ie(Tn)),function(r,t){return{start:r,end:t}})},Ft=function(e,n,r){var t=$t(n,jt(e));g(t,function(a){_t(a.entries,r);var i=Ut(e,a.entries);g(i,function(o){U(e,r==="Indent"?"IndentList":"OutdentList",o.dom)}),_r(a.sourceList,i),ln(a.sourceList)})},be=function(e,n){var r=y(ut(e),d.fromDom),t=y(ot(e),d.fromDom),a=!1;if(r.length||t.length){var i=e.selection.getBookmark();Ft(e,r,n),nt(e,n,t),e.selection.moveToBookmark(i),e.selection.setRng(Y(e.selection.getRng())),e.nodeChanged(),a=!0}return a},kn=function(e){return be(e,"Indent")},Ce=function(e){return be(e,"Outdent")},G=function(e){return be(e,"Flatten")},Ht=tinymce.util.Tools.resolve("tinymce.dom.BookmarkManager"),P=he.DOM,j=function(e){var n={},r=function(t){var a=e[t?"startContainer":"endContainer"],i=e[t?"startOffset":"endOffset"];if(a.nodeType===1){var o=P.create("span",{"data-mce-type":"bookmark"});a.hasChildNodes()?(i=Math.min(i,a.childNodes.length-1),t?a.insertBefore(o,a.childNodes[i]):P.insertAfter(o,a.childNodes[i])):a.appendChild(o),a=o,i=0}n[t?"startContainer":"endContainer"]=a,n[t?"startOffset":"endOffset"]=i};return r(!0),e.collapsed||r(),n},F=function(e){var n=function(t){var a,i=function(u){for(var c=u.parentNode.firstChild,l=0;c;){if(c===u)return l;(c.nodeType!==1||c.getAttribute("data-mce-type")!=="bookmark")&&l++,c=c.nextSibling}return-1},o=a=e[t?"startContainer":"endContainer"],s=e[t?"startOffset":"endOffset"];o&&(o.nodeType===1&&(s=i(o),o=o.parentNode,P.remove(a),!o.hasChildNodes()&&P.isBlock(o)&&o.appendChild(P.create("br"))),e[t?"startContainer":"endContainer"]=o,e[t?"startOffset":"endOffset"]=s)};n(!0),n();var r=P.createRng();return r.setStart(e.startContainer,e.startOffset),e.endContainer&&r.setEnd(e.endContainer,e.endOffset),Y(r)},J=function(e){switch(e){case"UL":return"ToggleUlList";case"OL":return"ToggleOlList";case"DL":return"ToggleDLList"}},An=function(e){return/\btox\-/.test(e.className)},Le=function(e,n,r){var t=function(i){var o=q(i.parents,h,qr).filter(function(s){return s.nodeName===n&&!An(s)}).isSome();r(o)},a=e.dom.getParents(e.selection.getNode());return t({parents:a}),e.on("NodeChange",t),function(){return e.off("NodeChange",t)}},zt=function(e,n,r){var t=r["list-style-type"]?r["list-style-type"]:null;e.setStyle(n,"list-style-type",t)},Bn=function(e,n){S.each(n,function(r,t){e.setAttribute(t,r)})},Vt=function(e,n,r){Bn(n,r["list-attributes"]),S.each(e.select("li",n),function(t){Bn(t,r["list-item-attributes"])})},ee=function(e,n,r){zt(e,n,r),Vt(e,n,r)},qt=function(e,n,r){S.each(r,function(t){var a;return e.setStyle(n,(a={},a[t]="",a))})},In=function(e,n,r,t){var a=n[r?"startContainer":"endContainer"],i=n[r?"startOffset":"endOffset"];for(a.nodeType===1&&(a=a.childNodes[Math.min(i,a.childNodes.length-1)]||a),!r&&w(a.nextSibling)&&(a=a.nextSibling);a.parentNode!==t;){if(ye(e,a)||/^(TD|TH)$/.test(a.parentNode.nodeName))return a;a=a.parentNode}return a},Kt=function(e,n,r){for(var t=[],a=e.dom,i=In(e,n,!0,r),o=In(e,n,!1,r),s,u=[],c=i;c&&(u.push(c),c!==o);c=c.nextSibling);return S.each(u,function(l){if(ye(e,l)){t.push(l),s=null;return}if(a.isBlock(l)||w(l)){w(l)&&a.remove(l),s=null;return}var p=l.nextSibling;if(Ht.isBookmarkNode(l)&&(h(p)||ye(e,p)||!p&&l.parentNode===r)){s=null;return}s||(s=a.create("p"),l.parentNode.insertBefore(s,l),t.push(s)),s.appendChild(l)}),t},Wt=function(e,n,r){var t=e.getStyle(n,"list-style-type"),a=r?r["list-style-type"]:"";return a=a===null?"":a,t===a},Oe=function(e,n,r){var t=e.selection.getRng(),a="LI",i=k(e,e.selection.getStart(!0)),o=e.dom;if(o.getContentEditable(e.selection.getNode())!=="false"){n=n.toUpperCase(),n==="DL"&&(a="DT");var s=j(t),u=Kt(e,t,i);S.each(u,function(c){var l,p=c.previousSibling,ka=c.parentNode;mn(ka)||(p&&h(p)&&p.nodeName===n&&Wt(o,p,r)?(l=p,c=o.rename(c,a),p.appendChild(c)):(l=o.create(n),c.parentNode.insertBefore(l,c),l.appendChild(c),c=o.rename(c,a)),qt(o,c,["margin","margin-right","margin-bottom","margin-left","margin-top","padding","padding-right","padding-bottom","padding-left","padding-top"]),ee(o,l,r),Ne(e.dom,l))}),e.selection.setRng(F(s))}},Qt=function(e,n){return e&&n&&h(e)&&e.nodeName===n.nodeName},Xt=function(e,n,r){var t=e.getStyle(n,"list-style-type",!0),a=e.getStyle(r,"list-style-type",!0);return t===a},Yt=function(e,n){return e.className===n.className},Pn=function(e,n,r){return Qt(n,r)&&Xt(e,n,r)&&Yt(n,r)},Ne=function(e,n){var r,t;if(r=n.nextSibling,Pn(e,n,r)){for(;t=r.firstChild;)n.appendChild(t);e.remove(r)}if(r=n.previousSibling,Pn(e,n,r)){for(;t=r.lastChild;)n.insertBefore(t,n.firstChild);e.remove(r)}},Zt=function(e,n,r,t){if(n.nodeName!==r){var a=e.dom.rename(n,r);ee(e.dom,a,t),U(e,J(r),a)}else ee(e.dom,n,t),U(e,J(r),n)},Gt=function(e,n,r,t,a){var i=h(n);if(i&&n.nodeName===t&&!xn(a))G(e);else{Oe(e,t,a);var o=j(e.selection.getRng()),s=i?Gn([n],r,!0):r;S.each(s,function(u){Zt(e,u,t,a)}),e.selection.setRng(F(o))}},xn=function(e){return"list-style-type"in e},Jt=function(e,n,r,t){if(n!==e.getBody())if(n)if(n.nodeName===r&&!xn(t)&&!An(n))G(e);else{var a=j(e.selection.getRng());ee(e.dom,n,t);var i=e.dom.rename(n,r);Ne(e.dom,i),e.selection.setRng(F(a)),Oe(e,r,t),U(e,J(r),i)}else Oe(e,r,t),U(e,J(r),n)},Te=function(e,n,r){var t=I(e),a=at(e),i=O(r)?r:{};a.length>0?Gt(e,t,a,n,i):Jt(e,t,n,i)},En=he.DOM,ea=function(e,n){var r=n.parentNode;if(r.nodeName==="LI"&&r.firstChild===n){var t=r.previousSibling;t&&t.nodeName==="LI"?(t.appendChild(n),D(e,r)&&En.remove(r)):En.setStyle(r,"listStyleType","none")}if(h(r)){var t=r.previousSibling;t&&t.nodeName==="LI"&&t.appendChild(n)}},na=function(e,n){var r=S.grep(e.select("ol,ul",n));S.each(r,function(t){ea(e,t)})},$n=function(e,n,r,t){var a=n.startContainer,i=n.startOffset;if(B(a)&&(r?i<a.data.length:i>0))return a;var o=e.schema.getNonEmptyElements();a.nodeType===1&&(a=tn.getNode(a,i));var s=new Ir(a,t);for(r&&Wr(e.dom,a)&&s.next();a=s[r?"next":"prev2"]();)if(a.nodeName==="LI"&&!a.hasChildNodes()||o[a.nodeName]||B(a)&&a.data.length>0)return a},Rn=function(e,n){var r=n.childNodes;return r.length===1&&!h(r[0])&&e.isBlock(r[0])},ra=function(e,n){Rn(e,n)&&e.remove(n.firstChild,!0)},ta=function(e,n,r){var t,a=Rn(e,r)?r.firstChild:r;if(ra(e,n),!D(e,n,!0))for(;t=n.firstChild;)a.appendChild(t)},we=function(e,n,r){var t,a=n.parentNode;if(!(!gn(e,n)||!gn(e,r))){h(r.lastChild)&&(t=r.lastChild),a===r.lastChild&&w(a.previousSibling)&&e.remove(a.previousSibling);var i=r.lastChild;i&&w(i)&&n.hasChildNodes()&&e.remove(i),D(e,r,!0)&&e.$(r).empty(),ta(e,n,r),t&&r.appendChild(t);var o=Ar(d.fromDom(r),d.fromDom(n)),s=o?e.getParents(n,h,r):[];e.remove(n),g(s,function(u){D(e,u)&&u!==e.getRoot()&&e.remove(u)})}},aa=function(e,n,r){e.dom.$(r).empty(),we(e.dom,n,r),e.selection.setCursorLocation(r,0)},ia=function(e,n,r,t){var a=e.dom;if(a.isEmpty(t))aa(e,r,t);else{var i=j(n);we(a,r,t),e.selection.setRng(F(i))}},oa=function(e,n,r,t){var a=j(n);we(e.dom,r,t);var i=F(a);e.selection.setRng(i)},sa=function(e,n){var r=e.dom,t=e.selection,a=t.getStart(),i=k(e,a),o=r.getParent(t.getStart(),"LI",i);if(o){var s=o.parentNode;if(s===e.getBody()&&D(r,s))return!0;var u=Y(t.getRng()),c=r.getParent($n(e,u,n,i),"LI",i);if(c&&c!==o)return e.undoManager.transact(function(){n?ia(e,u,c,o):Kr(o)?Ce(e):oa(e,u,o,c)}),!0;if(!c&&!n&&u.startOffset===0&&u.endOffset===0)return e.undoManager.transact(function(){G(e)}),!0}return!1},ua=function(e,n,r){var t=e.getParent(n.parentNode,e.isBlock,r);e.remove(n),t&&e.isEmpty(t)&&e.remove(t)},ca=function(e,n){var r=e.dom,t=e.selection.getStart(),a=k(e,t),i=r.getParent(t,r.isBlock,a);if(i&&r.isEmpty(i)){var o=Y(e.selection.getRng()),s=r.getParent($n(e,o,n,a),"LI",a);if(s)return e.undoManager.transact(function(){ua(r,i,a),Ne(r,s.parentNode),e.selection.select(s,!0),e.selection.collapse(n)}),!0}return!1},fa=function(e,n){return sa(e,n)||ca(e,n)},la=function(e){var n=e.selection.getStart(),r=k(e,n),t=e.dom.getParent(n,"LI,DT,DD",r);return t||Se(e).length>0?(e.undoManager.transact(function(){e.execCommand("Delete"),na(e.dom,e.getBody())}),!0):!1},De=function(e,n){return e.selection.isCollapsed()?fa(e,n):la(e)},va=function(e){e.on("keydown",function(n){n.keyCode===Q.BACKSPACE?De(e,!1)&&n.preventDefault():n.keyCode===Q.DELETE&&De(e,!0)&&n.preventDefault()})},da=function(e){return{backspaceDelete:function(n){De(e,n)}}},ma=function(e,n){var r=I(e);e.undoManager.transact(function(){O(n.styles)&&e.dom.setStyles(r,n.styles),O(n.attrs)&&fe(n.attrs,function(t,a){return e.dom.setAttrib(r,a,t)})})},Mn=function(e){var n=ie(ur(e).split("")),r=y(n,function(t,a){var i=t.toUpperCase().charCodeAt(0)-"A".charCodeAt(0)+1;return Math.pow(26,a)*i});return ae(r,function(t,a){return t+a},0)},ke=function(e){if(e--,e<0)return"";var n=e%26,r=Math.floor(e/26),t=ke(r),a=String.fromCharCode("A".charCodeAt(0)+n);return t+a},pa=function(e){return/^[A-Z]+$/.test(e)},ga=function(e){return/^[a-z]+$/.test(e)},ha=function(e){return/^[0-9]+$/.test(e)},ya=function(e){return ha(e)?2:pa(e)?0:ga(e)?1:fr(e)?3:4},Sa=function(e){switch(ya(e)){case 2:return v.some({listStyleType:v.none(),start:e});case 0:return v.some({listStyleType:v.some("upper-alpha"),start:Mn(e).toString()});case 1:return v.some({listStyleType:v.some("lower-alpha"),start:Mn(e).toString()});case 3:return v.some({listStyleType:v.none(),start:""});case 4:return v.none()}},ba=function(e){var n=parseInt(e.start,10);return Ln(e.listStyleType,"upper-alpha")?ke(n):Ln(e.listStyleType,"lower-alpha")?ke(n).toLowerCase():e.start},Ca=function(e){var n=I(e);dn(n)&&e.windowManager.open({title:"List Properties",body:{type:"panel",items:[{type:"input",name:"start",label:"Start list at number",inputMode:"numeric"}]},initialData:{start:ba({start:e.dom.getAttrib(n,"start","1"),listStyleType:v.some(e.dom.getStyle(n,"list-style-type"))})},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:function(r){var t=r.getData();Sa(t.start).each(function(a){e.execCommand("mceListUpdate",!1,{attrs:{start:a.start==="1"?"":a.start},styles:{"list-style-type":a.listStyleType.getOr("")}})}),r.close()}})},Ae=function(e,n){return function(){var r=I(e);return r&&r.nodeName===n}},Un=function(e){e.addCommand("mceListProps",function(){Ca(e)})},La=function(e){e.on("BeforeExecCommand",function(n){var r=n.command.toLowerCase();r==="indent"?kn(e):r==="outdent"&&Ce(e)}),e.addCommand("InsertUnorderedList",function(n,r){Te(e,"UL",r)}),e.addCommand("InsertOrderedList",function(n,r){Te(e,"OL",r)}),e.addCommand("InsertDefinitionList",function(n,r){Te(e,"DL",r)}),e.addCommand("RemoveList",function(){G(e)}),Un(e),e.addCommand("mceListUpdate",function(n,r){O(r)&&ma(e,r)}),e.addQueryStateHandler("InsertUnorderedList",Ae(e,"UL")),e.addQueryStateHandler("InsertOrderedList",Ae(e,"OL")),e.addQueryStateHandler("InsertDefinitionList",Ae(e,"DL"))},Oa=function(e){e.on("keydown",function(n){n.keyCode!==Q.TAB||Q.metaKeyPressed(n)||e.undoManager.transact(function(){(n.shiftKey?Ce(e):kn(e))&&n.preventDefault()})})},Na=function(e){Qr(e)&&Oa(e),va(e)},Ta=function(e){var n=function(r){return function(){return e.execCommand(r)}};e.hasPlugin("advlist")||(e.ui.registry.addToggleButton("numlist",{icon:"ordered-list",active:!1,tooltip:"Numbered list",onAction:n("InsertOrderedList"),onSetup:function(r){return Le(e,"OL",r.setActive)}}),e.ui.registry.addToggleButton("bullist",{icon:"unordered-list",active:!1,tooltip:"Bullet list",onAction:n("InsertUnorderedList"),onSetup:function(r){return Le(e,"UL",r.setActive)}}))},wa=function(e){var n={text:"List properties...",icon:"ordered-list",onAction:function(){return e.execCommand("mceListProps")},onSetup:function(r){return Le(e,"OL",function(t){return r.setDisabled(!t)})}};e.ui.registry.addMenuItem("listprops",n),e.ui.registry.addContextMenu("lists",{update:function(r){var t=I(e,r);return dn(t)?["listprops"]:[]}})};function Da(){x.add("lists",function(e){return e.hasPlugin("rtc",!0)===!1?(Na(e),La(e)):Un(e),Ta(e),wa(e),da(e)})}Da()})();const Ba=Aa({__proto__:null,default:_n},[_n]);export{Ba as i};
