;(function() {

  var getJSON = function(url, callback) {
    var request = new XMLHttpRequest;
    request.open('GET', url);
    request.onload = callback;
    request.send();
    return;
  };

  var Palette = function() {
    this.dominant = null;
    this.contrastingDominant = null;
    this.subDominant = null;
    this.contrastingSubDominant = null;
    this.pop = null;
  };

  var artsyThings = [
    "dominant",
    "contrastingDominant",
    "subDominant",
    "contrastingSubDominant",
    "pop"
  ];

  var renderPalettes = function(e) {
    var palettes = JSON.parse(e.target.responseText);
    var allPalettes = document.createElement('div');
    allPalettes.className = "allPalettes";

    palettes.forEach( function(palette){
      var paletteDiv = document.createElement('div');
      paletteDiv.className = "palette__section";
      var title = document.createElement('h3');
      title.className = "palette__title";
      title.innerText = palette.title;
      paletteDiv.appendChild(title);
      var keyword = document.createElement('p');
      keyword.className = "palette__keyword";
      keyword.innerText = palette.keyword;
      paletteDiv.appendChild(keyword);
      allPalettes.appendChild(paletteDiv);

      var p = new Palette();
      
      for(i = 0; i < artsyThings.length; i++) {
        p = palette.colors[artsyThings[i]];
          console.log(p);

        var h = artsyThings[i];
         
        var colorDiv = document.createElement('div');
        colorDiv.className = 'palette__color';
        colorDiv.style.background = p;

        var colorSpan = document.createElement('span');
        colorSpan.className = 'color__span';
        colorSpan.innerText = p;

        var artsyThing = document.createElement('span');
        artsyThing.className = 'artsy__span';
        artsyThing.innerText = h;

        colorDiv.appendChild(colorSpan);
        colorDiv.appendChild(artsyThing);
        paletteDiv.appendChild(colorDiv);
      };
    });
    document.body.insertBefore(allPalettes, document.body.childNodes[0]);
  };

  getJSON('/palettes.json', renderPalettes);

})();