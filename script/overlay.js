// Copyright (c) 2014 8pecxstudios.com 
//Restart My Fox Now Has A Chrome Version: Restart My Chrome.

	//Add Button Click Function.
	chrome.browserAction.onClicked.addListener(function(activeTab){
	
	try{
		//Set Restart URI
		var RestartURI = "chrome://restart";
			//Now The Restart Call
			chrome.tabs.create({ url: RestartURI });
			
	}catch (e){
				//Catch Any Nasty Errors & Output To Dialogue Message.
				alert("An error was encountered while attempting to restart browser! " + e);					
		}			
			
});