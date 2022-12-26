function getLongestURLMatch(map, url) {
  // In 'map' we receive an associative array mapping URLs onto code strings.
  // Now find the entry for the longest (= most exact) URL matching the input URL.
  // There are no assuptions about the alignment of the search string (begin or end).
  var longestMatchedURL = "";
  for (var key in map) {
    var startIndex = url.indexOf(key);
    if (startIndex >= 0 && key.length > longestMatchedURL.length) {
      longestMatchedURL = key;
    }
  }
  return longestMatchedURL;
}
