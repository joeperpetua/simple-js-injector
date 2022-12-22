chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete') {
    chrome.tabs.get(tabId, function(tab) {
      chrome.storage.sync.get(null, function(theValue) {
        var url = getLongestURLMatch(theValue, tab.url);
        if (url.length > 0) {
          chrome.tabs.executeScript(tabId, {code: theValue[url]});
        }
      });
    });
  }
})
