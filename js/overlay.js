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
    restartmychrome.browserRestart();
});

var restartmychrome = {
	
	init : function(){
		 chrome.storage.sync.get({
			restarted: false,
			openStartPage: false,
			openStartPageURL: "",
		}, function(key) {
			if (key.restarted === true && key.openStartPage === true){
				chrome.storage.sync.set({
					restarted: false
				});
				if (key.openStartPageURL != ""){
					chrome.tabs.create({
						url: key.openStartPageURL
					 });
				}
			}
		});
			chrome.contextMenus.create({
				  title: chrome.i18n.getMessage("appCancelRestartNowButton"),
				  id: "contextRestartNow",
				  contexts: ["browser_action"],
				  onclick: function() {
					restartmychrome.browserRestart();
				  }
			});
			chrome.contextMenus.create({
				  title: chrome.i18n.getMessage("appCancelStartButton"),
				  id: "contextStart",
				  contexts: ["browser_action"],
				  onclick: function() {
					restartmychrometimer.onChange();
				  }
			});
			chrome.contextMenus.create({
				  title: chrome.i18n.getMessage("appCancelStopButton"),
				  id: "contextCancel",
				  contexts: ["browser_action"],
				  onclick: function() {
					restartmychrometimer.timedRestart("", false, 0);
					chrome.browserAction.setBadgeText({
						text: ""
					});
				  }
			});
	},	

    //Restart event
    browserRestart: function() {
        chrome.storage.sync.get({
            confirmRestart: false,
            confirmDataRestart: true,
            clearDataFrom: "hour",
            clearAllData: false,
            timedRestart: false
        }, function(key) {
            try {
                var RestartURI = "chrome://restart";
                var callback = function() {
					chrome.storage.sync.set({
						restarted: true
					});
                    chrome.tabs.create({
                        url: RestartURI
                    });
                };

                if (key.timedRestart === true) {
                    chrome.storage.sync.set({
                        confirmRestart: false,
                        confirmDataRestart: false
                    });
                }

                if (key.clearAllData === true) {

                    var clearFrom;
                    switch (key.clearDataFrom) {
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
                    if (clearFrom === "") {
                        return;
                    }
                    restartmychrome.clearAllData(true, callback, key.confirmDataRestart, clearFrom);
                } else if (key.confirmRestart === true) {
                    if (confirm(chrome.i18n.getMessage("appRestartConfrim"))) {
						chrome.storage.sync.set({
							restarted: true
						});
                        chrome.tabs.create({
                            url: RestartURI
                        });
                    }
                } else {
					chrome.storage.sync.set({
						restarted: true
					});
                    chrome.tabs.create({
                        url: RestartURI
                    });
                }
            } catch (e) {
                alert("An error was encountered while attempting to restart browser! " + e);
            }
        });
    },
    //Clear browser data
    clearAllData: function(aBoolean, aCallback, aConfirm, aFrom) {
        try {
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
        } catch (e) {
            alert("An error was encountered while attempting to clear data! " + e);
        }
    }
};

var restartmychrometimer = {
    restartTimer: undefined,

    init: function() {
        try {
            chrome.storage.onChanged.addListener(function() {
                restartmychrometimer.onChange();
            });

            chrome.runtime.onMessage.addListener(
                function(request, sender, sendResponse) {
                    sendResponse.aTime;
                }
            );
            restartmychrometimer.setup();
        } catch (e) {
            alert("An error was encountered while initializing restartTimer! " + e);
        }
    },

    setup: function() {
        try {
            chrome.storage.sync.get({
                timedRestart: false,
                timedRestartFromType: 2,
                timedRestartFrom: 1
            }, function(key) {

                if (key.timedRestart === true) {
                    chrome.storage.sync.set({
                        confirmRestart: false,
                        confirmDataRestart: false
                    });
                }

                var timeFilter = "";

                if (key.timedRestartFromType == 1) {
                    timeFilter = 60 * 60 * key.timedRestartFrom;
                } else if (key.timedRestartFromType == 2) {
                    timeFilter = 60 * key.timedRestartFrom;
                }

                if (key.timedRestart === true) {
                    restartmychrometimer.timedRestart(timeFilter, key.timedRestart, key.timedRestartFromType);
                } else {
                    restartmychrometimer.timedRestart(timeFilter, key.timedRestart, key.timedRestartFromType);
                }
                //Set badge background color.
                chrome.browserAction.setBadgeBackgroundColor({
                    color: [218, 0, 0, 230]
                });
                chrome.browserAction.setBadgeText({
                    text: ""
                });
            });
        } catch (e) {
            alert("An error was encountered in setup timer event! " + e);
        }
    },

    onChange: function() {
        try {
            chrome.storage.sync.get({
                timedRestart: false,
                timedRestartFromType: 2,
                timedRestartFrom: 1
            }, function(key) {

                if (key.timedRestart === false) {
                    restartmychrometimer.timedRestart("", false, 0);
                    return;
                } else {
                    restartmychrometimer.timedRestart("", false, 0);
                }

                if (key.timedRestartFromType == 1) {
                    restartmychrometimer.timedRestart("", false, 0);
                    restartmychrometimer.setup();
                } else if (key.timedRestartFromType == 2) {
                    restartmychrometimer.timedRestart("", false, 0);
                    restartmychrometimer.setup();
                }

            });
        } catch (e) {
            alert("An error was encountered in onChange event! " + e);
        }
    },

    genWarning: function(aBoolean) {
        try {
            if (aBoolean === true) {
                chrome.tabs.query({
                    currentWindow: true,
                    active: true
                }, function(tabs) {
                    chrome.browserAction.setPopup({
                        popup: 'cancel.html'
                    });
                });
            } else {
                chrome.browserAction.setPopup({
                    popup: ""
                });
            }
        } catch (e) {
            alert("An error was encountered in genWarning! " + e);
        }
    },

    timedRestart: function(aDuration, aEnabled, aFilter) {
        try {
            var timer = aDuration,
                minutes, seconds;

            switch (aEnabled) {

                case true:
                    restartTimer = setInterval(function() {

                        minutes = parseInt(timer / 60, 10);
                        seconds = parseInt(timer % 60, 10);

                        minutes = minutes < 10 ? "0" + minutes : minutes;
                        seconds = seconds < 10 ? "0" + seconds : seconds;

                        //If using hours show badge in last 5 minutes.
                        if (timer <= 300 && aFilter == 1) {
                            chrome.browserAction.setBadgeText({
                                text: minutes + ":" + seconds
                            });
                            restartmychrometimer.genWarning(true);
                        }
                        //If using minute show badge in last 45 seconds.
                        if (timer <= 45 && aFilter == 2) {
                            chrome.browserAction.setBadgeText({
                                text: seconds.toString()
                            });
                            restartmychrometimer.genWarning(true);
                        }

                        chrome.runtime.sendMessage({
                            aTime: [minutes, seconds]
                        });

                        if (--timer < 0) {
                            clearInterval(restartTimer);
                            chrome.browserAction.setBadgeText({
                                text: ""
                            });
                            restartmychrome.browserRestart();
                        }
                    }, 1000);
                    break;

                case false:
                    if (aEnabled === false && typeof(restartTimer) != "undefined") {
                        clearInterval(restartTimer);
                        restartmychrometimer.genWarning(false);
                        return;
                    }
                    break;

            }
        } catch (e) {
            alert("An error was encountered in timedRestart! " + e);
        }
    }

};

document.addEventListener('DOMContentLoaded', function() {
    document.removeEventListener('DOMContentLoaded');
	restartmychrome.init();
    restartmychrometimer.init();
});