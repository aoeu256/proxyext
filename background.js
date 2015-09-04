// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * @fileoverview This file initializes the background page by loading a
 * ProxyErrorHandler, and resetting proxy settings if required.
 *
 * @author Mike West <mkwst@google.com>
 */

function get(url, callback){
	var http_request = new XMLHttpRequest();
	http_request.open("GET", url, true);
	http_request.onreadystatechange = function () {
	  var done = 4;
	  var ok = 200;
	  if (http_request.readyState === done && http_request.status === ok){
		callback(JSON.parse(http_request.responseText));
	  }
	};
	http_request.send();
}

function syncget(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, false);
	request.send(null);

	if (request.status === 200) {
	  return JSON.parse(request.responseText);
	} else {
	  console.log('error '+request);
	  return null;
	}
}

function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}
/*
chrome.webRequest.onBeforeSendHeaders.addListener(
function(details) {
  for (var i = 0; i < details.requestHeaders.length; ++i) {	
	if (details.requestHeaders[i].name === 'User-Agent') {
	  debugger;
	  details.requestHeaders.splice(i, 1);
	  break;
	}
  }syn
  return {requestHeaders: details.requestHeaders};
},{urls: ["<all_urls>"]},["blocking", "requestHeaders"]);
*/


document.addEventListener("DOMContentLoaded", function () {
	console.log('wtf');
	chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {	 	  
		if (request.greeting == "setproxy") {
			var sock = new WebSocket("ws://127.0.0.1:8081")
			sock.onmessage = function(event) { 
				var config = {
					mode: "fixed_servers",
					rules: {proxyForHttp: { scheme: protocol, host: ip }}
				};
				chrome.proxy.settings.set({value: config, scope: 'regular'},
				 function() {
					console.log('changing ip...');
					var keywords = ['brillimaco', 'love'];
					sendResponse({'f':'changed', 'keywords':keywords});
				});
			};
		}
	});
});