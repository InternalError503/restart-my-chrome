//Restart my fox now has a chrome version: restart my chrome.
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
chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.storage.sync.get({
        confirmRestart: false,
        confirmDataRestart: true,
		clearDataFrom: "hour",
        clearAllData: false
    }, function(key) {
        try {
            var RestartURI = "chrome://restart";
            var callback = function() {
                chrome.tabs.create({
                    url: RestartURI
                });
            };
            if (key.clearAllData === true) {
				
				var clearFrom;
				switch (key.clearDataFrom){
					case "hour": 
					clearFrom = (new Date()).setHours(new Date().getHours() - 1);
					break;
					case "day": 
					clearFrom = (new Date()).setHours(new Date().getHours() - 24);
					break;
					case "week": 
					clearFrom = (new Date()).setDate(new Date().getDate() - 7);
					break;
					case "month": 
					clearFrom = (new Date()).setDate(new Date().getDate() - 28);
					break;
					case "forever": 
					clearFrom = (new Date()).getTime() - (1000 * 60 * 60 * 24 * 7 * 52);
					break;					
				}	
				if (clearFrom === ""){return;}	
                clearAllData(true, callback, key.confirmDataRestart, clearFrom);
            } else if (key.confirmRestart === true) {
                if (confirm(chrome.i18n.getMessage("appRestartConfrim"))) {
                    chrome.tabs.create({
                        url: RestartURI
                    });
                }
            } else {
                chrome.tabs.create({
                    url: RestartURI
                });
            }
        } catch (e) {
            alert("An error was encountered while attempting to restart browser! " + e);
        }
    });
});

//Clear browser data
function clearAllData(aBoolean, aCallback, aConfirm, aFrom) {

    var clear = function() {
            //Get user settings for what to clear 
            chrome.storage.sync.get({
                clearAllData: false,
                clearAllDataAppCache: true,
                clearAllDataCache: true,
                clearAllDataCookies: true,
                clearAllDataDownloads: true,
                clearAllDataFileSystems: true,
                clearAllDataFormData: true,
                clearAllDataHistory: true,
                clearAllDataIndexedDB: true,
                clearAllDataLocalStorage: true,
                clearAllDataPluginData: true,
                clearAllDataPasswords: true,
                clearAllDatadataWebSQL: true
            }, function(key) {
                //Clear data based on user settings.
                chrome.browsingData.remove({
                    "since": aFrom
                }, {
                    "appcache": key.clearAllDataAppCache,
                    "cache": key.clearAllDataCache,
                    "cookies": key.clearAllDataCookies,
                    "downloads": key.clearAllDataDownloads,
                    "fileSystems": key.clearAllDataFileSystems,
                    "formData": key.clearAllDataFormData,
                    "history": key.clearAllDataHistory,
                    "indexedDB": key.clearAllDataIndexedDB,
                    "localStorage": key.clearAllDataLocalStorage,
                    "pluginData": key.clearAllDataPluginData,
                    "passwords": key.clearAllDataPasswords,
                    "webSQL": key.clearAllDatadataWebSQL
                }, aCallback);
            });
        }
        //Check if users want a confirmation	
    if (aConfirm === true) {
        if (aBoolean === true && confirm(chrome.i18n.getMessage("appRestartConfrimData"))) {
            clear();
        }
    } else {
        clear();
    }

}