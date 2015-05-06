//Restart my fox now has a chrome version: restart my chrome.
	/*

		The MIT License (MIT)

		Copyright (c) 2014 8pecxstudios.com 

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
	chrome.browserAction.onClicked.addListener(function(activeTab){
		chrome.storage.sync.get({
				confirmRestart: true,
				clearAllData: true
		}, function(key) {
		try{			
			var RestartURI = "chrome://restart";
			var callback = function(){
				chrome.tabs.create({ url: RestartURI });
			};
			if (key.clearAllData === true){
				clearAllData(true, callback);
			}else if (key.confirmRestart === true){			
					if (confirm("Do you really want to restart?")){
							chrome.tabs.create({ url: RestartURI });
					}	
				}else{
						chrome.tabs.create({ url: RestartURI });
				}
		}catch (e){
			alert("An error was encountered while attempting to restart browser! " + e);					
		}		
	});			
});

//Clear browser data
function clearAllData(aBoolean, aCallback){
		
	if (aBoolean === true && confirm("Do you really want clear all data & restart?")){	
		var clear = function () {
			  //Set time to 365 days so it clears from forever, ToDo add option to select when to clear from.
			  var clearFrom = (new Date()).getTime() - (1000 * 60 * 60 * 24 * 7 * 52);
			  var beginingOfTime = (new Date()).getTime() - clearFrom;
			 //Get user settings for what to clear 
			chrome.storage.sync.get({
					confirmRestart: true,
					clearAllData: true,
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
				    chrome.browsingData.remove({ "since": beginingOfTime }, {
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
		clear();
	}
}	
