// ==UserScript==
// @name         Facebook_script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Majkel
// @match        https://www.facebook.com/
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @domain       facebook.com
// @domain       www.facebook.com
// @include      http://www.facebook.com/*
// @include      www.facebook.com/*
// @include      https://www.facebook.com/*
// @run-at       document-idle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        unsafeWindow
// @priority        9001
// ==/UserScript==


	
window.onload = function(){
    'use strict';

try {
	scrollRightPane();
	layoutFixes();
	deleteLeftList();
	deleteRightMidSuggestions();
	layoutFixes();
	
}catch(e){
	console.log("some errors");
}

}();


function deleteLeftList(){
	var u = document.getElementById("sideNav").children[0].children;
	for (var i = u.length-1; i != 1; i--){
	u[i].remove();
	}
}

function deleteRightMidSuggestions(){
	if(document.getElementById("rightCol").children.length > 0){
	document.getElementById("rightCol").remove();
	}
}

function layoutFixes(){
	document.getElementById("contentArea").style.width = "720px";
}

function scrollRightPane() {
	document.getElementById("leftCol").style.position="fixed";
	document.getElementById("leftCol").style.top = "40px";
}



















