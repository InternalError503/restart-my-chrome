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
	var restartmychromeoptions = {

	    //Load up localised content	
	    init: function() {
	        document.getElementById('confirmHeading').textContent = chrome.i18n.getMessage("appOptionsConfirmations");
	        document.getElementById('confirmLabel').textContent = chrome.i18n.getMessage("appOptionsEnableConfirm");
	        document.getElementById('browsingDataHeading').textContent = chrome.i18n.getMessage("appOptionsClearData");
	        document.getElementById('clearDataLabel').textContent = chrome.i18n.getMessage("appOptionsEnableClearData");
	        document.getElementById('confirmDataLabel').textContent = chrome.i18n.getMessage("appOptionsEnableConfirmData");
	        document.getElementById('clearDataFromHeading').textContent = chrome.i18n.getMessage("appOptionsclearDataFromHeading");
	        document.getElementById('hour').textContent = chrome.i18n.getMessage("appOptionsDataFromHour");
	        document.getElementById('day').textContent = chrome.i18n.getMessage("appOptionsDataFromDay");
	        document.getElementById('week').textContent = chrome.i18n.getMessage("appOptionsDataFromWeek");
	        document.getElementById('month').textContent = chrome.i18n.getMessage("appOptionsDataFromMonth");
	        document.getElementById('forever').textContent = chrome.i18n.getMessage("appOptionsDataFromForever");
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
	        document.getElementById('sAll').textContent = chrome.i18n.getMessage("appOptionsSelectAll");
	        document.getElementById('dAll').textContent = chrome.i18n.getMessage("appOptionsDeSelectAll");
	        document.getElementById('learnMore').textContent = chrome.i18n.getMessage("appOptionsLearnMore");
	        document.getElementById('disclaimer').textContent = chrome.i18n.getMessage("appOptionsDisclaimer");
	        document.getElementById('enableTimedRestartLabel').textContent = chrome.i18n.getMessage("appOptionsEnableTimedRestart");
	        document.getElementById('restartTimeHourLabel').textContent = chrome.i18n.getMessage("appOptionsRestartTimeHour");
	        document.getElementById('restartTimeMinuteLabel').textContent = chrome.i18n.getMessage("appOptionsRestartMinuteTime");
	        document.getElementById('timedRestartTimeLabel').textContent = chrome.i18n.getMessage("appOptionsRestartTime");
	        document.getElementById('restartInLabel').textContent = chrome.i18n.getMessage("appOptionsRestartIn");
	        document.getElementById('restartInMinutesLabel').textContent = chrome.i18n.getMessage("appOptionsRestartInMinutes");
	        document.getElementById('supportTitle').textContent = chrome.i18n.getMessage("appOptionsSupportTitle");
	        document.getElementById('contact-us').textContent = chrome.i18n.getMessage("appOptionsContactUs");
	        document.getElementById('changelog').textContent = chrome.i18n.getMessage("appOptionsChangeLog");
	        restartmychromeoptions.rmc_restore_options();

	        $('#timedRestartHour, #timedRestartMinute').change(function() {
	            //For hours limit to 24h as maximum.
	            if (document.getElementById('timedRestartHour').checked === true) {
	                document.getElementById('setRestartTime').setAttribute("max", "24");
	            } else if (document.getElementById('timedRestartMinute').checked === true) {
	                document.getElementById('setRestartTime').setAttribute("max", "60");
	            }
	        });

	        $('#enableTimedRestart').change(function() {
	            if (document.getElementById('enableTimedRestart').checked === true) {
	                document.getElementById('enableConfirm').disabled = true;
	                document.getElementById('enableConfirmData').disabled = true;
	                document.getElementById('enableConfirm').checked = false;
	                document.getElementById('enableConfirmData').checked = false;
	                document.getElementById('confirmLabel').className = "uk-text-muted";
	                document.getElementById('confirmDataLabel').className = "uk-text-muted";
	            } else {
	                document.getElementById('enableConfirm').disabled = false;
	                document.getElementById('enableConfirmData').disabled = false;
	                document.getElementById('confirmLabel').className = "";
	                document.getElementById('confirmDataLabel').className = "";
	            }
                chrome.browserAction.setBadgeText({
                    text: ""
                });
	        });

	        //Save settings as they are changed.	
	        $("#enableConfirm, #enableConfirmData, \
			#clearDataFrom, #enableClearingData, \
			#dataAppCache, #dataCache, \
			#dataCookies, #dataDownloads, \
			#dataFileSystems, #dataFormData, \
			#dataHistory, #dataIndexedDB, \
			#dataLocalStorage, #dataPluginData, \
			#dataPasswords, #dataWebSQL, \
			#enableTimedRestart, #timedRestartHour, \
			#timedRestartMinute, #timedRestartTime, \
			#setRestartTime").change(function() {
	            restartmychromeoptions.rmc_save_options();
	        });

	        chrome.runtime.onMessage.addListener(
	            function(request, sender, sendResponse) {
	                document.getElementById('remainingTime').textContent = request.aTime[0] + ":" + request.aTime[1];
	            }
	        );

	    },
	    // Saves options.
	    rmc_save_options: function() {
	        try {
	            chrome.storage.sync.set({
	                confirmRestart: document.getElementById('enableConfirm').checked,
	                confirmDataRestart: document.getElementById('enableConfirmData').checked,
	                clearDataFrom: document.getElementById('clearDataFrom').value,
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
	                clearAllDatadataWebSQL: document.getElementById('dataWebSQL').checked,
	                timedRestart: document.getElementById('enableTimedRestart').checked,
	                timedRestartFromType: $('input:radio[name=timedRestartTime]:checked').val(),
	                timedRestartFrom: document.getElementById('setRestartTime').value
	            });
				restartmychromeoptions.sendNotification("success", "Saved", "<i class='uk-icon-check'></i>", true);
	        } catch (e) {
	            alert("An error was encountered while attempting to save settings! " + e);
	        }
	    },

	    // Restores saved options.
	    rmc_restore_options: function() {

	        try {
	            chrome.storage.sync.get({
	                confirmRestart: false,
	                confirmDataRestart: true,
	                clearDataFrom: "hour",
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
	                clearAllDatadataWebSQL: true,
	                timedRestart: false,
	                timedRestartFromType: 2,
	                timedRestartFrom: 1
	            }, function(key) {
	                document.getElementById('enableConfirm').checked = key.confirmRestart;
	                document.getElementById('enableConfirmData').checked = key.confirmDataRestart;
	                document.getElementById('clearDataFrom').value = key.clearDataFrom;
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
	                document.getElementById('enableTimedRestart').checked = key.timedRestart;
	                $('input:radio[name="timedRestartTime"]').filter('[value="' + key.timedRestartFromType + '"]').attr('checked', true);
	                //For hours limit to 24h as maximum.
	                if (key.timedRestartFromType == 1) {
	                    document.getElementById('setRestartTime').setAttribute("max", "24");
	                }
	                document.getElementById('setRestartTime').value = key.timedRestartFrom;

	                if (document.getElementById('enableTimedRestart').checked === true) {
	                    document.getElementById('enableConfirm').disabled = true;
	                    document.getElementById('enableConfirmData').disabled = true;
	                    document.getElementById('enableConfirm').checked = false;
	                    document.getElementById('enableConfirmData').checked = false;
	                    document.getElementById('confirmLabel').className = "uk-text-muted";
	                    document.getElementById('confirmDataLabel').className = "uk-text-muted";
	                } else {
	                    document.getElementById('enableConfirm').disabled = false;
	                    document.getElementById('enableConfirmData').disabled = false;
	                    document.getElementById('confirmLabel').className = "";
	                    document.getElementById('confirmDataLabel').className = "";
	                }

	            });
	        } catch (e) {
	            alert("An error was encountered while attempting to restore settings! " + e);
	        }
	    },

	    //lets select or deselect all clear data items
	    rmc_toggledata_options: function(aToggle) {
	        try {
	            document.getElementById('dataAppCache').checked = aToggle;
	            document.getElementById('dataCache').checked = aToggle;
	            document.getElementById('dataCookies').checked = aToggle;
	            document.getElementById('dataDownloads').checked = aToggle;
	            document.getElementById('dataFileSystems').checked = aToggle;
	            document.getElementById('dataFormData').checked = aToggle;
	            document.getElementById('dataHistory').checked = aToggle;
	            document.getElementById('dataIndexedDB').checked = aToggle;
	            document.getElementById('dataLocalStorage').checked = aToggle;
	            document.getElementById('dataPluginData').checked = aToggle;
	            document.getElementById('dataPasswords').checked = aToggle;
	            document.getElementById('dataWebSQL').checked = aToggle;
	        } catch (e) {
	            alert("An error was encountered while toggling all data options! " + e);
	        }
	    },
		
		sendNotification : function (aType, aMessage, aIcon, aUseIcon){
			if (aUseIcon === true){
				UIkit.notify(aIcon + " "+ aMessage, {status:aType, timeout : 1000});
			}else{
				UIkit.notify(aMessage, {status:aType, timeout : 1000});
			}	
		}	

	};

	document.addEventListener('DOMContentLoaded', restartmychromeoptions.init);
	document.getElementById('sAll').addEventListener('click', function() {
	    restartmychromeoptions.rmc_toggledata_options(true);
	});
	document.getElementById('dAll').addEventListener('click', function() {
	    restartmychromeoptions.rmc_toggledata_options(false);
	});