function l(c,i){for(var r=0;r<i.length;r++){const t=i[r];if(typeof t!="string"&&!Array.isArray(t)){for(const n in t)if(n!=="default"&&!(n in c)){const a=Object.getOwnPropertyDescriptor(t,n);a&&Object.defineProperty(c,n,a.get?a:{enumerable:!0,get:()=>t[n]})}}}return Object.freeze(Object.defineProperty(c,Symbol.toStringTag,{value:"Module"}))}var s={};(function(){var c=tinymce.util.Tools.resolve("tinymce.PluginManager"),i=function(e,o){e.focus(),e.undoManager.transact(function(){e.setContent(o)}),e.selection.setCursorLocation(),e.nodeChanged()},r=function(e){return e.getContent({source_view:!0})},t=function(e){var o=r(e);e.windowManager.open({title:"Source Code",size:"large",body:{type:"panel",items:[{type:"textarea",name:"code"}]},buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],initialData:{code:o},onSubmit:function(u){i(e,u.getData().code),u.close()}})},n=function(e){e.addCommand("mceCodeEditor",function(){t(e)})},a=function(e){var o=function(){return e.execCommand("mceCodeEditor")};e.ui.registry.addButton("code",{icon:"sourcecode",tooltip:"Source code",onAction:o}),e.ui.registry.addMenuItem("code",{icon:"sourcecode",text:"Source code",onAction:o})};function d(){c.add("code",function(e){return n(e),a(e),{}})}d()})();const f=l({__proto__:null,default:s},[s]);export{f as i};