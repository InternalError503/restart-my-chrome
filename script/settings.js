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

// Saves options.
function rmc_save_options() {
	try{	
			chrome.storage.sync.set({
				confirmRestart: document.getElementById('enableConfirm').checked,
				clearAllData: document.getElementById('enableClearingData').checked,
				clearAllDataAppCache: document.getElementById('dataAppCache').checked,
				clearAllDataCache: document.getElementById('dataCache').checked,
				clearAllDataCookies: document.getElementById('dataCookies').checked,
				clearAllDataDownloads: document.getElementById('dataDownloads').checked,
				clearAllDataFileSystems: document.getElementById('dataFileSystems').checked,
				clearAllDataFormData: document.getElementById('dataFormData').checked,
				clearAllDataHistory: document.getElementById('dataHistory').checked,
				clearAllDataIndexedDB: document.getElementById('dataIndexedDB').checked,
				clearAllDataLocalStorage: document.getElementById('dataLocalStorage').checked,
				clearAllDataPluginData: document.getElementById('dataPluginData').checked,
				clearAllDataPasswords: document.getElementById('dataPasswords').checked,
				clearAllDatadataWebSQL: document.getElementById('dataWebSQL').checked
		}, function() {
		// Update status to let user know options were saved.
		var status = document.getElementById('status');
		status.textContent = 'Updated';
		setTimeout(function() {
			status.textContent = '';
			window.close();
		}, 550);
	  });
	}catch (e){
		alert("An error was encountered while attempting to save settings! " + e);					
	} 
}

// Restores saved options.
function rmc_restore_options() {
	try{		
		chrome.storage.sync.get({
			confirmRestart: false,
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
			document.getElementById('enableConfirm').checked = key.confirmRestart;
			document.getElementById('enableClearingData').checked = key.clearAllData;			
			document.getElementById('dataAppCache').checked = key.clearAllDataAppCache;
			document.getElementById('dataCache').checked = key.clearAllDataCache;
			document.getElementById('dataCookies').checked = key.clearAllDataCookies;
			document.getElementById('dataDownloads').checked = key.clearAllDataDownloads;
			document.getElementById('dataFileSystems').checked = key.clearAllDataFileSystems;
			document.getElementById('dataFormData').checked = key.clearAllDataFormData;
			document.getElementById('dataHistory').checked = key.clearAllDataHistory;
			document.getElementById('dataIndexedDB').checked = key.clearAllDataIndexedDB;
			document.getElementById('dataLocalStorage').checked = key.clearAllDataLocalStorage;
			document.getElementById('dataPluginData').checked = key.clearAllDataPluginData;
			document.getElementById('dataPasswords').checked = key.clearAllDataPasswords;		
			document.getElementById('dataWebSQL').checked = key.clearAllDatadataWebSQL;	
	  });
	}catch (e){
		alert("An error was encountered while attempting to restore settings! " + e);					
	}   
}

//lets check for change
function rmc_showdata_options() {
	try{		 
       var toggle = document.getElementById('browserDataList');
       if(toggle.hidden === true){
          toggle.hidden = false;
		  document.getElementById('showDataOptions').textContent = "Hide Options";
       }else{
          toggle.hidden = true;
		  document.getElementById('showDataOptions').textContent = "Show Options";		  
	   }	
	}catch (e){
		alert("An error was encountered while to show browserDataList! " + e);					
	}
}	

document.addEventListener('DOMContentLoaded', rmc_restore_options);
document.getElementById('save').addEventListener('click', rmc_save_options);
document.getElementById('showDataOptions').addEventListener('click', rmc_showdata_options);