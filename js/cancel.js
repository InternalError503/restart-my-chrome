	/*

					The MIT License (MIT)

					Copyright (c) 2015 8pecxstudios.com 

					Permission is hereby granted, free of charge, to any person obtaining a copy
					of this software and associated documentation files (the "Software"), to deal
					in the Software without restriction, including without limitation the rights
					to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
					copies of the Software, and to permit persons to whom the Software is
					furnished to do so, subject to the following conditions:

					The above copyright notice and this permission notice shall be included in
					all copies or substantial portions of the Software.

					THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
					IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
					FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
					AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
					LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
					OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
					THE SOFTWARE.

				*/
	var restartmychromecancel = {
	    init: function() {
	        try {
	            chrome.runtime.onMessage.addListener(
	                function(request, sender, sendResponse) {
	                    document.getElementById('remainingTime').textContent = request.aTime[0] + ":" + request.aTime[1];
	                }
	            );
	            document.getElementById('cancelTitle').textContent = chrome.i18n.getMessage("appCancelTitle");
	            document.getElementById('cancelRestartIn').textContent = chrome.i18n.getMessage("appCancelRestartIn");
	            document.getElementById('restartNowButton').textContent = chrome.i18n.getMessage("appCancelRestartNowButton");
	            document.getElementById('cancelButton').textContent = chrome.i18n.getMessage("appCancelButton");
	        } catch (e) {
	            alert("An error was encountered while initializing cancel.js " + e);
	        }
	    }
	};

	document.addEventListener('DOMContentLoaded', restartmychromecancel.init);
	document.getElementById('restartNow').addEventListener('click', function() {
	    try {
	        chrome.extension.getBackgroundPage().restartmychrome.browserRestart();
	    } catch (e) {
	        alert("An error was encountered while triggering the restart now button click event " + e);
	    }
	});
	document.getElementById('cancel').addEventListener('click', function() {
	    try {
	        chrome.extension.getBackgroundPage().restartmychrometimer.timedRestart("", false, 0);
	        chrome.browserAction.setBadgeText({
	            text: ""
	        });
	        window.close();
	    } catch (e) {
	        alert("An error was encountered while triggering the cancel button click event " + e);
	    }
	});