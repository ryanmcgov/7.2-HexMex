;(function() {

  var getJSON = function(url, callback) {
    var request = new XMLHttpRequest;
    request.open('GET', url);
    request.onload = callback;
    request.send();
    return;
  };

  getJSON('/palettes.json', renderPalettes);
})();