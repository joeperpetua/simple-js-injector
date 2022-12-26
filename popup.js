// Storage Documentation: https://developer.chrome.com/extensions/storage
document.addEventListener('DOMContentLoaded', function() {
  var urlTextarea = document.getElementById('url');
  var codeTextarea = document.getElementById('jscode');
  var injectButton = document.getElementById('inject');

  chrome.tabs.query({active: true},function(tab) {
    var tabURL = tab[0].url;

    chrome.storage.sync.get(null, function(theValue) {
      var url = getLongestURLMatch(theValue, tabURL);
      urlTextarea.value = url;
      if (url.length > 0) {
        urlTextarea.value = url;
        codeTextarea.value = theValue[url];
      } else {
        urlTextarea.value = tabURL;
        codeTextarea.value = '';
      }
    });

    injectButton.addEventListener('click', function() {
      var theValue = codeTextarea.value;
      if (!theValue) {
        chrome.storage.sync.remove(urlTextarea.value, function() {
          // Notify that we saved.
          console.log('REMOVED script for ' + urlTextarea.value);
        });
        window.close();
        return;
      }

      chrome.tabs.executeScript({
        code: theValue
      });

      // Save it using the Chrome extension storage API.
      var keypair = {};
      keypair[urlTextarea.value] = theValue;
      chrome.storage.sync.set(keypair, function() {
        // Notify that we saved.
        console.log('SAVED ' + JSON.stringify(keypair));
      });
      window.close();
    });
  });
});
