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
		var getConfirm = document.getElementById('enableConfirm').checked;
			chrome.storage.sync.set({
				confirmRestart: getConfirm
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
			confirmRestart: true
		}, function(key) {	  
			document.getElementById('enableConfirm').checked = key.confirmRestart;
	  });
	}catch (e){
		alert("An error was encountered while attempting to restore settings! " + e);					
	}   
}

document.addEventListener('DOMContentLoaded', rmc_restore_options);
document.getElementById('save').addEventListener('click', rmc_save_options);