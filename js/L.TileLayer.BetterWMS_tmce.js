L.TileLayer.BetterWMS = L.TileLayer.WMS.extend({
  
  onAdd: function (map) {
    // Triggered when the layer is added to a map.
    //   Register a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onAdd.call(this, map);
    map.on('click', this.getFeatureInfo, this);
  },
  
  onRemove: function (map) {
    // Triggered when the layer is removed from a map.
    //   Unregister a click listener, then do all the upstream WMS things
    L.TileLayer.WMS.prototype.onRemove.call(this, map);
    map.off('click', this.getFeatureInfo, this);
  },
  
  getFeatureInfo: function (evt) {
    // Wyślij żądanie AJAX do serwera
    var url = this.getFeatureInfoUrl(evt.latlng),
    showResults = L.Util.bind(this.showGetFeatureInfo, this);
    $.ajax({
      url: url,
      success: function (data, status, xhr) {
        var err = typeof data === 'string' ? null : data;
        // Poprawka pustego okna podręcznego
        var doc = (new DOMParser()).parseFromString(data, "text/html");

        if (doc.body.innerHTML.trim().length > 0) {
          // Znajdź tabelę z danymi cech
          var featureTable = doc.querySelector("table.featureInfo");
          const rows = featureTable.querySelectorAll('tr');
          const headerRow = rows[0];
          const headers = Array.from(headerRow.querySelectorAll('th')).map(th => th.textContent.trim());
          const data = [];
          for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.querySelectorAll('td');
            const rowData = {};
            for (let j = 0; j < cells.length; j++) {
              rowData[headers[j]] = cells[j].textContent.trim();
            }
            data.push(rowData);
          }
          const listaWartosci = Object.values(data[0]);

          // Możesz też użyć mapowania, aby utworzyć tablicę obiektów:
          const listaObiektow = listaWartosci.map((element, index) => {
            return { [Object.keys(data[0])[index]]: element };
          });
          //console.log(listaObiektow); // wypisze tablicę obiektów: [{ fid: "koscioly_poin.fid--45a3a8c7_18fbf4102a5_-7ff9", ... }, ...]
          
          var featureList = "<table><tbody>";
          for (const obiekt of listaObiektow) {
            for (const [klucz, wartosc] of Object.entries(obiekt)) {
             // console.log(`${klucz}: ${wartosc}`);
              if (wartosc.length >0){
                //featureList += "  - " + klucz + ": " + wartosc + "<br>";
                featureList += "<tr><td style='text-align: left;'>"+ klucz + "</td><td style='width: 5px;'></td><td style='text-align: left;'>"+ wartosc + "</td></tr>";
              }
            }
          }
          featureList +="</tbody></table>"
          showResults(err, evt.latlng, featureList);
        }
      },
      error: function (xhr, status, error) {
        showResults(error);
      }
    });
  },
    
  getFeatureInfoUrl: function (latlng) {
    // Construct a GetFeatureInfo request URL given a point
    var point = this._map.latLngToContainerPoint(latlng, this._map.getZoom()),
        size = this._map.getSize(),
        
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          styles: this.wmsParams.styles,
          transparent: this.wmsParams.transparent,
          version: this.wmsParams.version,      
          format: this.wmsParams.format,
          bbox: this._map.getBounds().toBBoxString(),
          feature_count: 10,
          height: size.y,
          width: size.x,
          layers: this.wmsParams.layers,
          query_layers: this.wmsParams.layers,
          info_format: 'text/html'
        };
    
    params[params.version === '1.3.0' ? 'i' : 'x'] = Math.round(point.x);
    params[params.version === '1.3.0' ? 'j' : 'y'] = Math.round(point.y);
    
    return this._url + L.Util.getParamString(params, this._url, true);
  },
  
  showGetFeatureInfo: function (err, latlng, content) {
    if (err) { console.log(err); return; } // do nothing if there's an error
    
    // Otherwise show the content in a popup, or something.
    L.popup({ maxWidth: 700, maxheigh: 400})
      .setLatLng(latlng)
      .setContent(content)
      .openOn(this._map);
  }
});

L.tileLayer.betterWms = function (url, options) {
  return new L.TileLayer.BetterWMS(url, options);  
};