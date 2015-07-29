;(function() {

  var getJSON = function(url, callback) {
    request = new XMLHttpRequest;
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

  var renderPalettes = function() {
    localStorage["palettes"] = request.responseText;
    var palettes = JSON.parse(localStorage["palettes"]);

    var allPalettes = document.createElement('div');
    allPalettes.className = "all__palettes";

    palettes.forEach( function(palette){
      var paletteDiv = document.createElement('div');
      paletteDiv.className = "palette__section";

      var goToPalette = document.createElement('a');
      goToPalette.setAttribute('href', '/' + palette.id);
      goToPalette.className = 'palette__link';

      var title = document.createElement('h3');
      title.className = "palette__title";
      goToPalette.appendChild(title);

      title.innerText = palette.title;
      paletteDiv.appendChild(goToPalette);

      var category = document.createElement('p');
      category.className = "palette__category";
      category.innerText = palette.category;

      paletteDiv.appendChild(category);
      allPalettes.appendChild(paletteDiv);

      var p = new Palette();
      
      for(i = 0; i < artsyThings.length; i++) {
        p = palette.colors[artsyThings[i]];

        var h = artsyThings[i];
         
        var colorDiv = document.createElement('div');
        colorDiv.className = 'palette__color';
        colorDiv.style.background = p;

        // var colorSpan = document.createElement('span');
        // colorSpan.className = 'color__span';
        // // var goToPalette = document.createElement('a');
        // // goToPalette.setAttribute('href', '/' + palette.id);
        // // goToPalette.className = 'palette__link';
        
        // // goToPalette.innerText = p;
        // colorSpan.innerText = p;

        // var artsyThing = document.createElement('span');
        // artsyThing.className = 'artsy__span';
        // artsyThing.innerText = h;

        // colorDiv.appendChild(colorSpan);
        // colorDiv.appendChild(artsyThing);
        paletteDiv.appendChild(colorDiv);
      };
    });

    document.body.insertBefore(allPalettes, document.body.childNodes[0]);
  };

  getJSON('/palettes.json', renderPalettes);

})();