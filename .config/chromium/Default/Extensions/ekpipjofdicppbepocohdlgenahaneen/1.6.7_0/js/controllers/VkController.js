!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){!function(){"use strict";var b,c,d,e=a("../modules/SKLog.js"),f=a("MouseEventController"),g=a("../modules/SimpleMutationObserver.js");document.getElementById("top_notify_btn")?(e("[VK] New ui detected"),b={headerPlayer:"#top_audio_player",headerPlayerEnabled:"#top_audio_player.top_audio_player_enabled",headerPlayerIcon:"#top_audio",playerPanelPlay:".audio_page_player_play"},c=new f({siteName:"VK Music",playPause:"#top_audio_player.top_audio_player_enabled .top_audio_player_play",playNext:"#top_audio_player.top_audio_player_enabled .top_audio_player_next",playPrev:"#top_audio_player.top_audio_player_enabled .top_audio_player_prev",playState:"#top_audio_player.top_audio_player_enabled.top_audio_player_playing",song:"#top_audio_player.top_audio_player_enabled .top_audio_player_title"}),d=new g(c.doc()),c.playPause=function(){var a=this;return d.isEnabled(b.headerPlayerEnabled)?f.prototype.playPause.call(a):d.isEnabled(b.playerPanelPlay)?a.click({selectorButton:b.playerPanelPlay}):(d.once(b.playerPanelPlay,"inserted",function(){a.click({selectorButton:b.playerPanelPlay}),a.mousedown({selectorButton:b.headerPlayer})}),a.mouseover({selectorButton:b.headerPlayerIcon}),void a.mousedown({selectorButton:b.headerPlayerIcon}))}):(e("[VK] New ui not detected"),b={headerPlayButton:"#head_play_btn",playerPanel:"#gp",playerPanelInfo:"#gp_info",playerPanelNext:"#pd_next",playerPanelPrev:"#pd_prev"},c=new f({siteName:"VK Music",playPause:"#gp_play",playNext:b.playerPanelNext,playPrev:b.playerPanelPrev,playState:"#gp_play.playing",artist:"#gp_performer",song:"#gp_title"}),d=new g(c.doc()),c.initWaitAndClose=function(a,c,e){var f=this;a=a||b.playerPanelInfo,c=c||b.headerPlayButton,d.once(a,"inserted",function(){e&&f.click({selectorButton:a}),f.click({selectorButton:b.playerPanelInfo})}),f.click({selectorButton:c})},c.playPause=function(){var a=this;return d.isEnabled(b.playerPanel)?f.prototype.playPause.call(a):void a.initWaitAndClose()},c.playNext=function(){var a=this;return d.isEnabled(b.playerPanelNext)?f.prototype.playNext.call(a):void a.initWaitAndClose(b.playerPanelNext,b.playerPanelInfo,!0)},c.playPrev=function(){var a=this;return d.isEnabled(b.playerPanelPrev)?f.prototype.playPrev.call(a):void a.initWaitAndClose(b.playerPanelPrev,b.playerPanelInfo,!0)},c.getStateData=function(){var a=f.prototype.getStateData.call(this);return d.isEnabled(b.playerPanel)&&(a.canPlayPrev=!0,a.canPlayNext=!0),a})}()},{"../modules/SKLog.js":5,"../modules/SimpleMutationObserver.js":6,MouseEventController:3}],2:[function(a,b,c){!function(){"use strict";function c(a){this.siteName=a.siteName||null,this.selectors={playPause:a.playPause||null,play:a.play||null,pause:a.pause||null,playNext:a.playNext||null,playPrev:a.playPrev||null,mute:a.mute||null,like:a.like||null,dislike:a.dislike||null,iframe:a.iframe||null,playState:a.playState||null,song:a.song||null,artist:a.artist||null},this.oldState={},this.buttonSwitch=a.buttonSwitch||!1,this.attachListeners(),this.hidePlayer=a.hidePlayer||!1,this.overridePlayPrev=a.overridePlayPrev||!1,this.overridePlayPause=a.overridePlayPause||!1,this.overridePlayNext=a.overridePlayNext||!1,chrome.runtime.sendMessage({created:!0},function(){d("SK content script loaded")})}var d=a("../modules/SKLog.js");c.prototype.doc=function(){var a=this.selectors.iframe&&"IFRAME"===document.querySelector(this.selectors.iframe).tagName;return a?document.querySelector(this.selectors.iframe).contentWindow.document:document},c.prototype.injectScript=function(a){var b=document.createElement("script");b.setAttribute("type","text/javascript"),a.url&&b.setAttribute("src",chrome.extension.getURL(a.url)),a.script&&(b.innerHTML=a.script),(document.head||document.documentElement).appendChild(b)},c.prototype.click=function(a){if(a=a||{},null===a.selectorButton)return void d("disabled",a.action);try{this.doc().querySelector(a.selectorButton).click(),d(a.action)}catch(b){d("Element not found for click.",a.selectorButton,!0)}this.updatePlayerState()},c.prototype.playPause=function(){null!==this.selectors.play&&null!==this.selectors.pause?this.isPlaying()?this.click({action:"playPause",selectorButton:this.selectors.pause,selectorFrame:this.selectors.iframe}):this.click({action:"playPause",selectorButton:this.selectors.play,selectorFrame:this.selectors.iframe}):this.click({action:"playPause",selectorButton:this.selectors.playPause,selectorFrame:this.selectors.iframe})},c.prototype.playNext=function(){this.click({action:"playNext",selectorButton:this.selectors.playNext,selectorFrame:this.selectors.iframe})},c.prototype.playPrev=function(){this.click({action:"playPrev",selectorButton:this.selectors.playPrev,selectorFrame:this.selectors.iframe})},c.prototype.stop=function(){this.isPlaying()&&this.playPause()},c.prototype.mute=function(){this.click({action:"mute",selectorButton:this.selectors.mute,selectorFrame:this.selectors.iframe})},c.prototype.like=function(){this.click({action:"like",selectorButton:this.selectors.like,selectorFrame:this.selectors.iframe})},c.prototype.dislike=function(){this.click({action:"dislike",selectorButton:this.selectors.dislike,selectorFrame:this.selectors.iframe})},c.prototype.isPlaying=function(){var a=this.doc().querySelector(this.selectors.play),b=!1;if(this.buttonSwitch)b=null===a;else if(this.selectors.playState){var c=this.doc().querySelector(this.selectors.playState);b=!(!c||"none"===window.getComputedStyle(c,null).getPropertyValue("display"))}else a&&(b="none"===window.getComputedStyle(a,null).getPropertyValue("display"));return b},c.prototype.updatePlayerState=function(){this.checkPlayer&&this.checkPlayer();var a=this.getStateData();JSON.stringify(a)!==JSON.stringify(this.oldState)&&(d("Player state change"),this.oldState=a,chrome.runtime.sendMessage({action:"update_player_state",stateData:a}))},c.prototype.getStateData=function(){return{song:this.getSongData(this.selectors.song),artist:this.getSongData(this.selectors.artist),isPlaying:this.isPlaying(),siteName:this.siteName,canDislike:!(!this.selectors.dislike||!this.doc().querySelector(this.selectors.dislike)),canPlayPrev:this.overridePlayPrev||!(!this.selectors.playPrev||!this.doc().querySelector(this.selectors.playPrev)),canPlayPause:this.overridePlayPause||!!(this.selectors.playPause&&this.doc().querySelector(this.selectors.playPause)||this.selectors.play&&this.doc().querySelector(this.selectors.play)||this.selectors.pause&&this.doc().querySelector(this.selectors.pause)),canPlayNext:this.overridePlayNext||!(!this.selectors.playNext||!this.doc().querySelector(this.selectors.playNext)),canLike:!(!this.selectors.like||!this.doc().querySelector(this.selectors.like)),hidePlayer:this.hidePlayer}},c.prototype.getSongData=function(a){if(!a)return null;var b=this.doc().querySelector(a);return b&&b.textContent?b.textContent:null},c.prototype.doRequest=function(a,b,c){if("undefined"!=typeof a&&("playPause"===a.action&&this.playPause(),"playNext"===a.action&&this.playNext(),"playPrev"===a.action&&this.playPrev(),"stop"===a.action&&this.stop(),"mute"===a.action&&this.mute(),"like"===a.action&&this.like(),"dislike"===a.action&&this.dislike(),"getPlayerState"===a.action)){var d=this.getStateData();this.oldState=d,c(d)}},c.prototype.attachListeners=function(){chrome.runtime.onMessage.addListener(this.doRequest.bind(this)),setInterval(this.updatePlayerState.bind(this),200),d("Attached listener for ",this)},b.exports=c}()},{"../modules/SKLog.js":5}],3:[function(a,b,c){!function(){"use strict";function c(){d.apply(this,arguments)}var d=a("BaseController"),e=a("../modules/MouseEventDispatcher.js"),f=a("../modules/SKLog.js");c.prototype=Object.create(d.prototype),c.prototype.constructor=c,e.eachTypes(function(a){d.prototype.hasOwnProperty(a)||(c.prototype[a]=function(b,c){if(b=b||{},null===b.selectorButton)return void f("disabled",b.action);try{var d=this.doc().querySelector(b.selectorButton);e.dispatch(d,a,c),b.action&&f(b.action)}catch(g){f("Element not found for "+a+".",b.selectorButton,!0)}this.updatePlayerState()})}),b.exports=c}()},{"../modules/MouseEventDispatcher.js":4,"../modules/SKLog.js":5,BaseController:2}],4:[function(a,b,c){!function(){"use strict";function a(){throw"MouseEventDispatcher cannot be instantiated."}a.eventTypes=["mouseclick","dblclick","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup"],a.dispatch=function(a,b,c){"string"==typeof a&&(a=document.querySelector(a)),"mouseclick"===b&&(b="click"),c=c||{};var d=document.createEvent("MouseEvents");d.initMouseEvent(b,c.canBubble||!0,c.cancelable||!0,c.view||window,c.detail||1,c.screenX||0,c.screenY||0,c.clientX||0,c.clientY||0,c.ctrlKey||!1,c.altKey||!1,c.shiftKey||!1,c.metaKey||!1,c.button||0,c.relatedTarget||null),a.dispatchEvent(d)},a.eachTypes=function(a){for(var b=0;b<this.eventTypes.length;b++)a(this.eventTypes[b])},a.eachTypes(function(b){a[b]=function(c,d){a.dispatch(c,b,d)}}),b.exports=a}()},{}],5:[function(a,b,c){!function(){"use strict";b.exports=function(a,b,c){a&&(b=b||"",c?(console.error("STREAMKEYS-ERROR: "+a,b),a="ERROR: "+a):console.log("STREAMKEYS-INFO: "+a,b))}}()},{}],6:[function(a,b,c){!function(){"use strict";var a=function(a){var b=this;b.node=a,b.selectors={},b.handlers={},b.observer=new MutationObserver(function(){for(var a in b.selectors){var c=b.isEnabled(a),d=b.checkEnabled(a);b.selectors[a]=d,c!=d&&b.deferredTrigger(a,d?"inserted":"removed")}}),b.observer.observe(b.node,{childList:!0,subtree:!0,attributes:!0})};a.prototype.trigger=function(a,b){var c=this;if(!b||!c.handlers[a]||!c.handlers[a][b])return!1;var d=c.handlers[a][b].filter(function(a){var b=!1;try{b=a()}catch(c){b=!1}return b!==!1});c.handlers[a][b]=d},a.prototype.deferredTrigger=function(a,b){var c=this;setTimeout(function(){c.trigger(a,b)},0)},a.prototype.on=function(a,b,c){a&&b&&c&&(this.handlers[a]=this.handlers[a]||{},this.handlers[a][b]=this.handlers[a][b]||[],this.handlers[a][b].push(c))},a.prototype.once=function(a,b,c){a&&b&&c&&this.on(a,b,function(){return c(),!1})},a.prototype.checkEnabled=function(a){return Boolean(this.node.querySelector(a))},a.prototype.addSelector=function(a){this.selectors.hasOwnProperty(a)||(this.selectors[a]=this.checkEnabled(a))},a.prototype.removeSelector=function(a){this.selectors.hasOwnProperty(a)&&(delete this.selectors[a],delete this.handlers[a])},a.prototype.isEnabled=function(a){return this.addSelector(a),this.selectors[a]},b.exports=a}()},{}]},{},[1]);