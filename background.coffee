# Copyright (c) 2011 The Chromium Authors. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.

###
@fileoverview This file initializes the background page by loading a
ProxyErrorHandler, and resetting proxy settings if required.

@author Mike West <mkwst@google.com>
###
get = (url, callback) ->
  http_request = new XMLHttpRequest()
  http_request.open "GET", url, true
  http_request.onreadystatechange = ->
    done = 4
    ok = 200
    callback JSON.parse(http_request.responseText)  if http_request.readyState is done and http_request.status is ok

  http_request.send()
syncget = (url) ->
  request = new XMLHttpRequest()
  request.open "GET", url, false
  request.send null
  if request.status is 200
    JSON.parse request.responseText
  else
    console.log "error " + request
    null
choose = (choices) ->
  index = Math.floor(Math.random() * choices.length)
  choices[index]

#
#chrome.webRequest.onBeforeSendHeaders.addListener(
#function(details) {
#  for (var i = 0; i < details.requestHeaders.length; ++i) {	
#	if (details.requestHeaders[i].name === 'User-Agent') {
#	  debugger;
#	  details.requestHeaders.splice(i, 1);
#	  break;
#	}
#  }syn
#  return {requestHeaders: details.requestHeaders};
#},{urls: ["<all_urls>"]},["blocking", "requestHeaders"]);
#
doYahooTab = ->
  chrome.tabs.create {url: "www.yahoo.co.jp"}, (tab) ->
	

document.addEventListener "DOMContentLoaded", ->
  chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
    if request.greeting is "setproxy"
      sock = new WebSocket("ws://127.0.0.1:8081")
      sock.onmessage = (event) ->
        config =
          mode: "fixed_servers"
          rules:
            proxyForHttp:
              scheme: protocol
              host: ip

        chrome.proxy.settings.set
          value: config
          scope: "regular"
        , ->
          console.log "changing ip..."
          keywords = [ "brillimaco", "love" ]
          sendResponse
            f: "changed"
            keywords: keywords