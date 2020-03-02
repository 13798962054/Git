+function(t,e,i,o){"use strict";var n="undefined",a=0,s=function(e,i){this.$=t(e),this.options=this.getOptions(i),this.lang=this.getLang(),this.data=this.options.data,this.dirtyData=!0,this.offsetX=0,this.offsetY=0,this.init()};s.DEFAULTS={hotkeyEnable:!0,hotkeys:{selectPrev:"Up",selectNext:"Down",selectLeft:"left",selectRight:"right",deleteNode:"del backspace",addBorther:"return",addChild:"tab insert",centerCanvas:"space"},lang:"zh_cn",langs:{zh_cn:{defaultName:"灵光闪现",defaultSubName:"灵光",defaultNodeName:"闪现",readonlyTip:"该节点已被设置为只读，无法进行编辑。",hotkeyDisabled:'快捷键不可用，需要 <a target="_blank" href="https://github.com/jeresig/jquery.hotkeys">jquery.hotkeys</a> 插件支持。'}},data:{text:"New Project",type:"root",expand:!0,theme:"default",caption:"",id:t.uuid()+""},nodeTeamplate:"<div id='node-{id}' class='mindmap-node expand-{expand}' data-type='{type}' data-id='{id}' data-parent='{parent}'><div class='wrapper'><div class='text'>{text}</div><div class='caption'>{caption}</div></div></div>",hSpace:100,vSpace:10,canvasPadding:20,removingNodeTip:null,lineCurvature:60,subLineWidth:4,lineColor:"rainbow",lineOpacity:1,lineSaturation:90,lineLightness:40,nodeLineWidth:2},s.prototype.getOptions=function(i){s.DEFAULTS.data.text=s.DEFAULTS.langs.zh_cn.defaultName,i=t.extend({},s.DEFAULTS,this.$.data(),i);var o=typeof t.hotkeys!=n;return!o&&i.hotkeyEnable&&e.messager.danger(this.lang.hotkeyDisabled),i.hotkeyEnable=i.hotkeyEnable&&o,i},s.prototype.getLang=function(){var i=this.options;if(!i.lang){if("undefined"!=typeof e.config&&e.config.clientLang)i.lang=config.clientLang;else{var o=t("html").attr("lang");i.lang=o?o:"en"}i.lang=i.lang.replace(/-/,"_").toLowerCase()}var n=i.langs[i.lang]||i.langs[s.DEFAULTS.lang];return i.defaultSubName&&(n.defaultSubName=i.defaultSubName),i.defaultNodeName&&(n.defaultNodeName=i.defaultNodeName),n},s.prototype.init=function(){this.initDom(),this.initSize(),this.bindEvents(),this.render()},s.prototype.initDom=function(){var e=this.$;e.attr("id")||e.attr("id","mindmap-"+t.uuid()),this.id=e.attr("id"),this.$container=e.children(".mindmap-container"),this.$container.length||(e.prepend("<div class='mindmap-container'></div>"),this.$container=e.children(".mindmap-container")),this.$canvas=this.$container.children("canvas"),this.$canvas.length||(this.$container.prepend("<canvas class='mindmap-bg'></canvas>".format(this.options.canvasSize)),this.$canvas=this.$container.children("canvas")),this.$desktop=this.$container.children(".mindmap-desktop"),this.$desktop.length||(this.$container.append("<div class='mindmap-desktop'></div>"),this.$desktop=this.$container.children(".mindmap-desktop")),this.$desktop.attr("unselectable","on");var i=e.children(".shadow");i.length||e.append("<div class='mindmap-shadow shadow-top'></div><div class='mindmap-shadow shadow-right'></div><div class='mindmap-shadow shadow-bottom'></div><div class='mindmap-shadow shadow-left'></div>")},s.prototype.initSize=function(){var t=this.$;this.winWidth=t.width(),this.winHeight=t.height(),this.centerX=o.floor(this.winWidth/2),this.centerY=o.floor(this.winHeight/2),this.dirtyData||this.display()},s.prototype.callEvent=function(e,i){return t.callEvent(this.options[e],i,this)},s.prototype.computePosition=function(t,e){var i=e?-1:1;return typeof t.left!=n&&(t.left-=(this.left-this.options.canvasPadding)*i),typeof t.top!=n&&(t.top-=this.top*i),typeof t.x!=n&&(t.x-=(this.left-this.options.canvasPadding)*i),typeof t.y!=n&&(t.y-=this.top*i),t},s.prototype.computeColor=function(t,e){return"hsla({h}, {s}%, {l}%, {a})".format({h:t,s:this.options.lineSaturation,l:this.options.lineLightness,a:e||this.options.lineOpacity})},s.prototype.getNodeData=function(e,i){if("number"==typeof e&&(e=e.toString()),i||(i=this.data),e==i.id)return i;if(t.isArray(i.children)&&i.children.length>0)for(var o in i.children){var n=this.getNodeData(e,i.children[o]);if(n)return n}return null},s.prototype.createDefaultNodeData=function(e){var i={expand:!0,id:t.uuid()+"",parent:e.id};return"root"===e.type?(i.type="sub",i.text=this.lang.defaultSubName):(i.type="node",i.text=this.lang.defaultNodeName),i},s.prototype.getNode=function(t){return"string"==typeof t?this.$desktop.children('[data-id="'+t+'"]'):typeof t.id!=n?t.ui.element:void 0},s.prototype.removeNode=function(t){if(this.getNode(t).remove(),t.count>0)for(var e in t.children)this.removeNode(t.children[e])},s.prototype.update=function(e,i,o){var a=!1;if(this.options,t.isPlainObject(e)&&(e=[e]),t.isArray(e))for(var s in e){var r=e[s],d=r.data;if(d||(d=this.getNodeData(r.id)),!d)return;var l=r.action||"update";if("remove"===l||"delete"===l){var h=this.getNodeData(d.parent);h&&(h.children.splice(d.index,1),this.removeNode(d),this.clearNodeStatus(),"add"!=d.changed&&(t.isArray(h.deletions)?h.deletions.push(d):h.deletions=[d],d.changed="delete",h.changed="delete children"),o=!0,i=!0,a=!0)}else if("add"===l)t.isArray(d.children)?d.children.push(r.newData):d.children=[r.newData],d.count+=1,r.newData.index=d.count,r.newData.changed="add",o=!0,i=!0,a=!0;else if("move"===l){if(r.newParent!=d.parent){var c=this.getNodeData(r.newParent),h=this.getNodeData(d.parent);h&&c&&("root"===c.type?("node"===d.type&&(d.colorHue=null),d.type="sub",d.subSide=null):(d.type="node",d.subSide=c.subSide),h.children.splice(d.index,1),h.count-=1,t.isArray(c.children)?c.children.push(d):c.children=[d],c.count+=1,d.index=c.count,o=!0,i=!0,a=!0,"add"!=d.changed&&(d.changed="move"))}}else if("sort"===l){if(d.count>1){d.children.sort(r.func);for(var s in d.children){var p=d.children[s];p.index!=s&&(p.index=s,"add"!=p.changed&&(p.changed="sort"),o=!0,i=!0,a=!0)}}}else typeof r.text!=n&&r.text!=d.text&&(d.text=r.text,i=!0,a=!0),typeof r.subSide!=n&&r.subSide!=d.subSide&&(d.subSide=r.subSide,o=!0,i=!0,a=!0),a&&"add"!=d.changed&&(d.changed="edit")}o&&this.loadNode(),i&&this.showNode(),a&&this.callEvent("onChange",{changes:e,data:this.data})},s.prototype.clearChangeFlag=function(t){if(typeof t===n&&(t=this.data),t.changed&&(t.changed=null),t.children)for(var e in t.children)this.clearChangeFlag(t.children[e])},s.prototype.export=function(){var e=t.extend({},this.data);return this.fixExport(e),e},s.prototype.exportJSON=function(){return JSON.stringify(this.export())},s.prototype.exportArray=function(e,i){typeof e===n&&(e=this.data),typeof i===n&&(i=[]);var o=t.extend({},e);if(delete o.ui,delete o.children,delete o.subSide,i.push(o),e.children)for(var a in e.children)this.exportArray(e.children[a],i);return i},s.prototype.fixExport=function(t){if(delete t.ui,t.children)for(var e in t.children)this.fixExport(t.children[e])},s.prototype.load=function(t){this.data=t,this.render(t)},s.prototype.render=function(){this.loadNode(),this.showNode()},s.prototype.loadNode=function(e,i){e||(e=this.data);var s=this.options,r=this.$desktop,d="object"==typeof i?i.id?i.id:"":"";typeof e.expand===n&&(e.expand=!0),typeof e.data===n&&(e.data={}),typeof e.type===n&&(e.type="node"),typeof e.id===n&&(e.id=t.uuid()+""),typeof e.readonly===n&&(e.readonly=!1),typeof e.ui===n&&(e.ui={}),e.parent=d;var l=r.children('.mindmap-node[data-id="'+e.id+'"]');if(l.length?(l.toggleClass("expand-false",!e.expand).toggleClass("expand-true",e.expand).attr("data-type",e.type).attr("data-parent",d||"root"),l.children(".text").html(e.text),l.children(".caption").html(e.caption)):(l=t(s.nodeTeamplate.format({type:e.type||"node",expand:e.expand,caption:e.caption||"",id:e.id,parent:d||"root",text:e.text})).appendTo(r),this.bindNodeEvents(l),e.ui.element=l),"root"===e.type)e.ui.subLeftSide=0,e.ui.subRightSide=0,e.ui.vLeftSpan=0,e.ui.vRightSpan=0;else if("sub"===e.type){var h=e.subSide;h||(h=i.ui.subRightSide>i.ui.subLeftSide?"left":"right"),"left"===h?i.ui.subLeftSide++:i.ui.subRightSide++,e.subSide=h,typeof e.colorHue===n&&(e.colorHue=o.floor(55*a++%360))}else e.subSide=i.subSide;l.data("origin-text",e.text),l.toggleClass("readonly",e.readonly);var c=1;if(e.count=0,t.isArray(e.children)&&e.children.length>0){e.ui.topSpanTemp="root"===e.type?{left:0,right:0}:0;var p=0,u=0,f=null;c=0,e.children.sort(function(t,e){return t.index-e.index});for(var v in e.children){var g=e.children[v];typeof g.ui===n&&(g.ui={}),"sub"!=g.type&&(g.colorHue=e.colorHue),g.ui.nextBorther=null,f?(g.ui.prevBorther=f.id,f.ui.nextBorther=g.id):g.ui.prevBorther=null,f=g,this.loadNode(g,e,v),g.index=e.count++,"undifined"==typeof g.order&&(g.order=g.index),c+=g.ui.vSpan,"sub"===g.type?"left"===g.subSide?(p+=g.ui.vSpan,g.ui.topSpan=e.ui.topSpanTemp.left,e.ui.topSpanTemp.left+=g.ui.vSpan):(u+=g.ui.vSpan,g.ui.topSpan=e.ui.topSpanTemp.right,e.ui.topSpanTemp.right+=g.ui.vSpan):(g.ui.topSpan=e.ui.topSpanTemp,e.ui.topSpanTemp+=g.ui.vSpan)}"root"===e.type&&(e.ui.vLeftSpan=p,e.ui.vRightSpan=u)}"root"!=e.type&&(e.ui.vSpan=c),this.dirtyData=!1,"root"===e.type&&this.callEvent("afterLoad",{data:e})},s.prototype.showNode=function(e,i){e||(e=this.data);var n=this.options,a=e.ui,s=e.ui.element;if(a.width=s.outerWidth(),a.height=s.outerHeight(),"root"===e.type)a.left=0-o.floor(a.width/2),a.top=0-o.floor(a.height/2),this.left=0-o.floor(o.max(a.width+n.canvasPadding,this.winWidth)/4),this.right=0-this.left,this.top=0-o.floor(o.max(a.height+n.canvasPadding,this.winHeight)/4),this.bottom=0-this.top;else if(t.isPlainObject(a.dragPos))a.left=a.dragPos.left,a.top=a.dragPos.top;else{if("sub"===e.type){var r=0;"left"===e.subSide?(a.left=i.ui.left-n.hSpace-20-a.width,r=i.ui.vLeftSpan):(a.left=i.ui.left+i.ui.width+n.hSpace+20,r=i.ui.vRightSpan);var d=r*a.height+(r-1)*n.vSpace,l=0-o.floor(d/2),h=a.topSpan*a.height+a.topSpan*n.vSpace,c=a.vSpan*a.height+(a.vSpan-1)*n.vSpace;a.top=l+h+o.floor((c-a.height)/2)}else{a.left="left"===e.subSide?i.ui.left-n.hSpace-a.width:i.ui.left+i.ui.width+n.hSpace;var d=i.ui.vSpan*a.height+(i.ui.vSpan-1)*n.vSpace,l=i.ui.top+o.floor(i.ui.height/2)-o.floor(d/2),h=a.topSpan*a.height+a.topSpan*n.vSpace,c=a.vSpan*a.height+(a.vSpan-1)*n.vSpace;a.top=l+h+o.floor((c-a.height)/2)}"left"===e.subSide?this.left=o.min(this.left,a.left):this.right=o.max(this.right,a.left+a.width),this.top=o.min(this.top,a.top),this.bottom=o.max(this.bottom,a.top+a.height)}if(t.isArray(e.children)&&e.children.length>0)for(var p in e.children)this.showNode(e.children[p],e);if("root"===e.type){var u=this.options.canvasPadding;this.left-=u,this.top-=u,this.right+=2*u,this.bottom+=u,this.width=this.right-this.left,this.height=this.bottom-this.top,this.display(),this.draw(),this.callEvent("afterShow",{data:e})}},s.prototype.display=function(t,e,i){"number"==typeof t&&"number"==typeof e&&(i&&(t+=this.offsetX,e+=this.offsetY),this.offsetX=t,this.offsetY=e),this.x=this.centerX+this.left+this.offsetX,this.y=this.centerY+this.top+this.offsetY,this.$container.css({width:this.width,height:this.height,top:this.y,left:this.x});var o=this.options.canvasPadding;this.$.toggleClass("shadow-left",this.x<0-o).toggleClass("shadow-right",this.x+this.width>this.winWidth+o).toggleClass("shadow-top",this.y<0-o).toggleClass("shadow-bottom",this.y+this.height>this.winHeight+o)},s.prototype.makeNodeVisble=function(t){var e=this.getNodeData(t.data("id"));if(e){var i=e.ui.left-this.left+this.x,o=e.ui.top-this.top+this.y,n=this.options.canvasPadding;if(0>i)this.offsetX+=0-i;else{var a=i+e.ui.width-(this.winWidth+n);a>0&&(this.offsetX+=0-a-80)}if(0>o)this.offsetY+=0-o;else{var a=o+e.ui.height-(this.winWidth+n);a>0&&(this.offsetY+=0-a-80)}this.display()}},s.prototype.clearCanvasArea=function(){this.$canvas[0].getContext("2d").clearRect(0,0,this.width,this.height)},s.prototype.draw=function(e,i){if(e||(e=this.data),"root"===e.type&&(this.$canvas.attr({width:this.width,height:this.height}),this.clearCanvasArea()),i){var n="left"===e.subSide,a=this.options,s=this.$canvas[0].getContext("2d"),r={x:i.ui.left+("root"===i.type?o.floor(i.ui.width/2):n?0:i.ui.width),y:i.ui.top+o.floor(i.ui.height/2)},d={x:e.ui.left+(n?e.ui.width:0),y:e.ui.top+o.floor(e.ui.height/2)},l={x:r.x+(n?-1:1)*a.lineCurvature,y:r.y},h={x:d.x+(n?1:-1)*a.lineCurvature,y:d.y};r=this.computePosition(r),d=this.computePosition(d),l=this.computePosition(l),h=this.computePosition(h),s.beginPath(),s.strokeStyle=this.computeColor(e.colorHue,e.ui.canDrop?".25":"1"),s.lineCap="round",s.lineWidth="sub"===e.type?a.subLineWidth:a.nodeLineWidth,s.moveTo(r.x,r.y),s.bezierCurveTo(l.x,l.y,h.x,h.y,d.x,d.y),s.stroke()}if(e.ui.element.css(this.computePosition({left:e.ui.left,top:e.ui.top})),t.isArray(e.children)&&e.children.length>0)for(var c in e.children)this.draw(e.children[c],e)},s.prototype.bindNodeEvents=function(t){var e,i=this;t.on("click",function(e){i.onNodeClick(e,t)}).mousedown(function(t){t.stopPropagation()}),t.find(".text").on("keyup paste blur",function(e){i.onNodeTextChanged(e,t)}).on("keydown",function(){}),"root"!=t.data("type")&&t.droppable({container:i.$,target:"#"+i.id+' .mindmap-node:not([data-id="'+t.data("id")+'"]',before:function(o){return i.callEvent("beforeDrag",{node:t})?o.element.hasClass("focus")?!1:(e=i.getNodeData(o.element.data("id")),e?void 0:!1):!1},start:function(e){i.callEvent("startDrag",{node:t}),e.element.hasClass("active")||(i.clearNodeStatus(),i.activeNode(t))},drag:function(t){t.pos.left-=i.x,t.pos.top-=i.y,e.ui.dragPos=i.computePosition(t.pos,!0),e.ui.canDrop=t.isIn,i.showNode()},beforeDrop:function(o){if(o.isIn){if(o.target.data("id")==e.parent)return!1}else{if(!i.callEvent("beforeSort",{node:t,event:o}))return;var n=e.subSide;"sub"===e.type&&(e.ui.left<-30?n="left":e.ui.left>30&&(n="right")),i.update([{action:"sort",data:i.getNodeData(e.parent),func:function(t,e){return t.ui.top-e.ui.top}},{data:e,subSide:n}]),i.callEvent("afterSort",{node:t,event:o})}},drop:function(t){i.callEvent("beforeMove",{node:e,event:t})&&(i.update({action:"move",data:e,newParent:t.target.data("id")}),i.callEvent("afterMove",{node:e,event:t}))},finish:function(){e.ui.dragPos=null,e.ui.canDrop=!1,i.showNode()}}),this.callEvent("onBindEvents",{node:t})},s.prototype.onNodeClick=function(t,e){e.hasClass("active")?this.focusNode(e):(this.clearNodeStatus(),this.activeNode(e)),this.callEvent("onNodeClick",{node:e}),t.stopPropagation()},s.prototype.onNodeTextChanged=function(t,e){var i=e.find(".text").text();i!=e.data("origin-text")&&(""==i&&e.find(".text").text(""),e.data("origin-text",i),this.update({id:e.data("id"),text:i}),this.callEvent("onTextChanged",{node:e,text:i}))},s.prototype.activeNode=function(t){typeof t===n&&(t=this.$desktop.children('.mindmap-node[data-type="sub"]').first()),t.length||(t=this.$desktop.children(".mindmap-node").first()),this.callEvent("beforeNodeActive",{node:t})&&(t.addClass("active"),this.makeNodeVisble(t),this.activedNode=t,this.isActive=!0,this.callEvent("onNodeActive",{node:t}))},s.prototype.focusNode=function(t,i){if(t.hasClass("readonly"))return e.messager.show(this.lang.readonlyTip),void 0;if(t.hasClass("active")&&this.callEvent("beforeNodeFocus",{node:t})){var o=t.addClass("focus").find(".text");o.attr("contenteditable","true"),this.makeNodeVisble(t),o.focus(),(i||typeof i===n)&&o.selectText(),this.isFocus=!0}},s.prototype.clearActiveNode=function(t){typeof t===n&&(t=this.$desktop.children(".mindmap-node.active")),t.removeClass("active"),this.isActive=!1,this.activedNode=null},s.prototype.clearFocusNode=function(t){typeof t===n&&(t=this.$desktop.children(".mindmap-node.focus")),t.removeClass("focus").find(".text").attr("contenteditable","false").blur(),this.isFocus=!1},s.prototype.bindEvents=function(){var e=this.$,i=this;e.resize(t.proxy(this.initSize,this)).click(t.proxy(this.onDesktopClick,this)),this.bindGlobalHotkeys(),this.$container.draggable({before:function(){return i.callEvent("beforeMoveCanvas")?void 0:!1},finish:function(t){i.display(t.smallOffset.x,t.smallOffset.y,!0)},drag:function(t){i.display(t.smallOffset.x,t.smallOffset.y,!0)}})},s.prototype.bindGlobalHotkeys=function(){var e=this.options;if(e.hotkeyEnable){var o=this,n=e.hotkeys;t(i).on("keydown",null,n.selectPrev,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.selectPrev})&&o.selectNode("prev")}).on("keydown",null,n.selectNext,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.selectNext})&&o.selectNode("next")}).on("keydown",null,n.selectLeft,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.selectLeft})&&o.selectNode("left")}).on("keydown",null,n.selectRight,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.selectRight})&&o.selectNode("right")}).on("keydown",null,n.deleteNode,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.deleteNode})&&(o.deleteNode(),8!=event.keyCode||o.isFocus||event.preventDefault())}).on("keydown",null,n.addBorther,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.addBorther})&&o.addBortherNode()}).on("keydown",null,n.addChild,function(t){o.callEvent("beforeHotkey",{event:t,hotkey:n.addChild})&&(o.addChildNode(),9==t.keyCode&&t.preventDefault())}).on("keydown",function(){if(o.callEvent("beforeHotkey",{event:event,type:"keydown"})&&event.keyCode>=48&&event.keyCode<=111&&o.isActive&&!o.isFocus){var t=o.activedNode;t&&(t.find(".text").text(""),o.focusNode(t))}}).on("keydown",null,n.centerCanvas,function(){o.callEvent("beforeHotkey",{event:event,hotkey:n.centerCanvas})&&o.display(0,0)})}},s.prototype.addBortherNode=function(){if(this.isActive){var t=this.getNodeData(this.activedNode.data("id"));if(t){var e="root"===t.type?t:this.getNodeData(t.parent),i=this.createDefaultNodeData(e);if(!this.callEvent("beforeAdd",{node:e,newNode:i}))return;this.update({action:"add",data:e,newData:i}),this.clearNodeStatus();var o=this.getNode(i.id);this.activeNode(o),this.focusNode(o,!0),this.callEvent("afterAdd",{node:e,newNode:i})}}},s.prototype.addChildNode=function(){if(this.isActive){var t=this.getNodeData(this.activedNode.data("id"));if(t){var e=this.createDefaultNodeData(t);if(!this.callEvent("beforeAdd",{node:t,newNode:e}))return;this.update({action:"add",data:t,newData:e}),this.clearNodeStatus();var i=this.getNode(e.id);this.activeNode(i),this.focusNode(i,!0),this.callEvent("afterAdd",{node:t,newNode:e})}}},s.prototype.deleteNode=function(){if(!this.isFocus&&this.isActive){var t=this.getNodeData(this.activedNode.data("id"));if(t){if(!this.callEvent("beforeDelete",{node:t}))return;this.update({action:"remove",data:t}),this.callEvent("afterDelete",{node:t})}}},s.prototype.selectNode=function(t){if(!this.isFocus){if(!this.isActive)return this.activeNode(),void 0;var e=null,i=this.getNodeData(this.activedNode.data("id")),o=null;switch("root"===i.type?t="prev"===t||"left"===t?"left":"right":"left"===t?t="left"==i.subSide?"child":"parent":"right"===t&&(t="right"==i.subSide?"child":"parent"),t){case"prev":o=i.ui.prevBorther;break;case"next":o=i.ui.nextBorther;break;case"parent":o=i.parent;break;case"child":i.count>0&&(o=i.children[0].id);break;case"left":if(i.count>0){o=i.children[0].id;for(var n in i.children){var a=i.children[n];if("left"==a.subSide){o=a.id;break}}}break;case"right":if(i.count>0){o=i.children[0].id;for(var n in i.children){var a=i.children[n];if("right"==a.subSide){o=a.id;break}}}}o&&(e=this.getNodeData(o)),e&&(this.clearNodeStatus(),this.activeNode(e.ui.element))}},s.prototype.selectNext=function(){if(!this.isFocus){var t=null;this.isActive||this.activeNode();var e=this.getNodeData(this.activedNode.data("id"));null!=e.ui.nextBorther&&(t=this.getNodeData(e.ui.nextBorther)),t&&(this.clearNodeStatus(),this.activeNode(t.ui.element))}},s.prototype.selectLeft=function(){if(!this.isFocus){var t=null;this.isActive||this.activeNode();var e=this.getNodeData(this.activedNode.data("id"));null!=e.ui.leftBorther&&(t=this.getNodeData(e.ui.leftBorther)),t&&(this.clearNodeStatus(),this.activeNode(t.ui.element))}},s.prototype.onDesktopClick=function(){this.$desktop,this.clearNodeStatus()},s.prototype.clearNodeStatus=function(){this.clearActiveNode(),this.clearFocusNode()},t.fn.mindmap=function(e){return this.each(function(){var i=t(this),o=i.data("zui.mindmap"),n="object"==typeof e&&e;o||i.data("zui.mindmap",o=new s(this,n)),"string"==typeof e&&o[e]()})},t.fn.mindmap.Constructor=s}(jQuery,window,document,Math);