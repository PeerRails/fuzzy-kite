const ba = chrome.browserAction;
const omck_url = 'http://omck.tv';
var live_data;

// RATE: how frequently the dashboard API is polled (in milliseconds)
const RATE = 1000*60;

ba.onClicked.addListener(function(tab) {
  chrome.tabs.getAllInWindow(undefined, function(tabs) {
  
    chrome.tabs.create({url: omck_url});

  });
});

function checkLiveStatus(){
  $.getJSON("http://www.omck.tv/status", function(data) {
    live_data = data;
    var count = 0;
    for (var i = 0; i >= data.length - 1; i++) {
      if (live_data[i].live === true) {count++;}
    };
		if (count !== 0) {ba.setBadgeText({text:'LIVE'});} else {ba.setBadgeText({text:'OFF'});};
	});
}

checkLiveStatus();
var interval = setInterval(checkLiveStatus, RATE);

