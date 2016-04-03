// ==UserScript==
// @name        	      Facebook_script
// @namespac           http://tampermonkey.net/
// @version     	      0.1
// @description 	      try to take over the world!
// @author      	      Majkel
// @match       	      https://www.facebook.com/
// @require     	      https://code.jquery.com/jquery-2.1.4.min.js
// @domain      	      facebook.com
// @domain      	      www.facebook.com
// @include     	      http://www.facebook.com/*
// @include     	      www.facebook.com/*
// @include     	      https://www.facebook.com/*
// @include     	      https://www.facebook.com/?ref=logo
// @include      		  htt*://*.facebook.com/*
// @include      		  htt*://*.facebook.com/*/*
// @run-at      	      document-idle
// @grant       	      GM_getValue
// @grant       	      GM_setValue
// @grant       	      GM_xmlhttpRequest
// @grant       	      GM_log
// @grant       	      GM_registerMenuCommand
// @grant       	      unsafeWindow
// @priority        	      9001
// ==/UserScript==

var current_window = "https://www.facebook.com/";

if(window.location.href != current_window ){
	console.log("a");
}
 
(function (){
	scrollRightPane();
	layoutFixes();
	deleteLeftList();
	deleteRightMidSuggestions();
	//layoutFixes();
	//chatExpand();
	//centerContent();

})();

  
function deleteLeftList(){
	var u = document.getElementById("sideNav").children[0].children;
	for (var i = u.length-1; i != 1; i--){
	u[i].remove();
	}
}

function deleteRightMidSuggestions(){
	if(document.getElementById("rightCol") !== null ){
		document.getElementById("rightCol").remove();
	}
	else {
		setTimeout(deleteRightMidSuggestions, 2000);
	}
	if(window.location.href.indexOf("groups") > -1 ) {
		if(document.getElementById("rightCol") !== null ){
		document.getElementById("rightCol").remove();
		}
	}
	else {
		setTimeout(deleteRightMidSuggestions, 2000);
	}
}

function centerContent(){
	
	var vid_links = document.getElementsByClassName("mtm");

	for (var i=0; i<vid_links.length; i++){
		vid_links[i].style.marginLeft = "17%";
		vid_links[i].style.paddingRight = "110px";
	}
    setTimeout(centerContent, 2000);
}

function layoutFixes(){
	document.getElementById("contentArea").style.width = "720px";
	document.getElementsByClassName("_4f7n _1s4v _26aw _hdd _xxp fixed_elem")[0].style.backgroundImage = "none";
	document.getElementsByClassName("_4f7n _1s4v _26aw _hdd _xxp fixed_elem")[0].style.backgroundColor = "#EC8400";

}

function scrollRightPane() {
	document.getElementById("leftCol").style.position="fixed";
	document.getElementById("leftCol").style.top = "40px";
}

function chatExpand () {
	document.getElementsByClassName("fbChatSidebarBody")[0].style.position = "absolute";
	document.getElementsByClassName("fbChatSidebarBody")[0].style.top = "50px";
	document.getElementsByClassName("fbChatSidebarBody")[0].style.right = "200px";
	document.getElementsByClassName("fbChatSidebarBody")[0].style.height = "80% !important";
	document.getElementById("pagelet_ticker").style.height = "90% !important";
}
















