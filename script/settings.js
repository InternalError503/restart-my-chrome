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
	//Load up localised content	
	function init() {
	        document.getElementById('confirmHeading').textContent = chrome.i18n.getMessage("appOptionsConfirmations");
	        document.getElementById('confirmLabel').textContent = chrome.i18n.getMessage("appOptionsEnableConfirm");
	        document.getElementById('browsingDataHeading').textContent = chrome.i18n.getMessage("appOptionsClearData");
	        document.getElementById('clearDataLabel').textContent = chrome.i18n.getMessage("appOptionsEnableClearData");
	        document.getElementById('confirmDataLabel').textContent = chrome.i18n.getMessage("appOptionsEnableConfirmData");
	        document.getElementById('showDataOptions').textContent = chrome.i18n.getMessage("appOptionsShowOptions");
	        document.getElementById('save').textContent = chrome.i18n.getMessage("appOptionsSave");
	        document.getElementById('dataAppCacheLabel').textContent = chrome.i18n.getMessage("appOptionsAppCache");
	        document.getElementById('dataCacheLabel').textContent = chrome.i18n.getMessage("appOptionsCache");
	        document.getElementById('dataCookiesLabel').textContent = chrome.i18n.getMessage("appOptionsCookies");
	        document.getElementById('dataDownloadsLabel').textContent = chrome.i18n.getMessage("appOptionsDownloads");
	        document.getElementById('dataFileSystemsLabel').textContent = chrome.i18n.getMessage("appOptionsFileSystems");
	        document.getElementById('dataFormDataLabel').textContent = chrome.i18n.getMessage("appOptionsFormData");
	        document.getElementById('dataHistoryLabel').textContent = chrome.i18n.getMessage("appOptionsHistory");
	        document.getElementById('dataIndexedDBLabel').textContent = chrome.i18n.getMessage("appOptionsIndexedDB");
	        document.getElementById('dataLocalStorageLabel').textContent = chrome.i18n.getMessage("appOptionsLocalStorage");
	        document.getElementById('dataPluginDataLabel').textContent = chrome.i18n.getMessage("appOptionsPluginData");
	        document.getElementById('dataPasswordsLabel').textContent = chrome.i18n.getMessage("appOptionsPasswords");
	        document.getElementById('dataWebSQLLabel').textContent = chrome.i18n.getMessage("appOptionsWebSQL");
	        document.getElementById('learnMore').textContent = chrome.i18n.getMessage("appOptionsLearnMore");
	        document.getElementById('disclaimer').textContent = chrome.i18n.getMessage("appOptionsDisclaimer");
	        rmc_restore_options();
	    }
	    // Saves options.
	function rmc_save_options() {
	    try {
	        chrome.storage.sync.set({
	            confirmRestart: document.getElementById('enableConfirm').checked,
	            confirmDataRestart: document.getElementById('enableConfirmData').checked,
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
	            document.getElementById('status').textContent = chrome.i18n.getMessage("appOptionsStatus");
	            setTimeout(function() {
	                status.textContent = '';
	                window.close();
	            }, 550);
	        });
	    } catch (e) {
	        alert("An error was encountered while attempting to save settings! " + e);
	    }
	}

	// Restores saved options.
	function rmc_restore_options() {

	    try {
	        chrome.storage.sync.get({
	            confirmRestart: false,
	            confirmDataRestart: true,
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
	            document.getElementById('enableConfirmData').checked = key.confirmDataRestart;
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
	    } catch (e) {
	        alert("An error was encountered while attempting to restore settings! " + e);
	    }
	}

	//lets check for change
	function rmc_showdata_options() {
	    try {
	        var toggle = document.getElementById('browserDataList');
	        if (toggle.hidden === true) {
	            toggle.hidden = false;
	            document.getElementById('showDataOptions').textContent = chrome.i18n.getMessage("appOptionsHideOptions");
	        } else {
	            toggle.hidden = true;
	            document.getElementById('showDataOptions').textContent = chrome.i18n.getMessage("appOptionsShowOptions");
	        }
	    } catch (e) {
	        alert("An error was encountered while to show browserDataList! " + e);
	    }
	}

	document.addEventListener('DOMContentLoaded', init);
	document.getElementById('save').addEventListener('click', rmc_save_options);
	document.getElementById('showDataOptions').addEventListener('click', rmc_showdata_options);