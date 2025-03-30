//const wfsUrl='http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&'
console.log ({wfsUrl});
// Wybierz element HTML, i przypisz go do zmiennej
const menuAT = document.getElementById('menu_a_t');
const additionalImages = document.getElementById('additionalImages');
const lupa = document.getElementById('lupa');
const findPolygon = document.getElementById('find_polygon');
const findPlace = document.getElementById('find_place');
const findRound = document.getElementById('find_round');
const divWheelChair = document.getElementById('div_wheelchair');
const divCar = document.getElementById('div_car');
// Zdefiniuj zmienną polyline na początku pliku lub w odpowiednim zakresie
var polyline;

// zablokowanie powiększenia mapy po podwójnym kliknięciu na menu_a_t

// Dodaj nasłuchiwanie zdarzenia podwójnego kliknięcia
menuAT.addEventListener('dblclick', (event) => {
  // Zapobiegaj domyślnemu zachowaniu przeglądarki (powiększaniu)
  event.preventDefault();

  // Wyłącz powiększanie mapy przy podwójnym kliknięciu
  map.doubleClickZoom.disable();
  
});


// obsługa najechanaia na ikonę lupy rozwija menu
lupa.addEventListener('mouseover', () => {
  // Tutaj umieść kod, który ma się wykonać po kliknięciu
  // - Zmiana koloru tła diva
  additionalImages.style.display = 'flex';
  
});

// obsługa kliknięcia w ikonę lupy które zwija menu i ustawia podświetlenie wszystkich ikon w manu na biało 
lupa.addEventListener('click', () => {
  findPolygon.style.backgroundColor = 'white';
  findPlace.style.backgroundColor = 'white';
  findRound.style.backgroundColor = 'white';
  additionalImages.style.display = 'none';
  $( "#select-polygon" ).dialog( "close" );
  $( "#search-roud" ).dialog( "close" );
  $( "#search-place" ).dialog( "close" );
});


//++++++++++++++++++++++++

find_polygon.addEventListener("mouseover", function() {
  if (find_polygon.style.backgroundColor === "sandybrown") {
    ;
  } else {
    find_polygon.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});


find_polygon.addEventListener("mouseout", function() {
    if (find_polygon.style.backgroundColor === "sandybrown") {
      ;
    } else {
      find_polygon.style.backgroundColor = "white";
    }
});

find_place.addEventListener("mouseover", function() {
  if (find_place.style.backgroundColor === "sandybrown") {
    ;
  } else {
    find_place.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});


find_place.addEventListener("mouseout", function() {
    if (find_place.style.backgroundColor === "sandybrown") {
      ;
    } else {
      find_place.style.backgroundColor = "white";
    }
});

find_round.addEventListener("mouseover", function() {
  if (find_round.style.backgroundColor === "sandybrown") {
    ;
  } else {
    find_round.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});


find_round.addEventListener("mouseout", function() {
    if (find_round.style.backgroundColor === "sandybrown") {
      ;
    } else {
      find_round.style.backgroundColor = "white";
    }
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// obsługa kliknięcia w ikonę menu find_polygon do wyszukiwania obszarów na diecezji, parafji, itp.
findPolygon.addEventListener('click', () => {
    // Tutaj umieść kod, który ma się wykonać po kliknięciu
    // Przykładowe działania:
    // - Zmiana koloru tła diva
    findPolygon.style.backgroundColor = 'sandybrown';
    findPlace.style.backgroundColor = 'white';
    findRound.style.backgroundColor = 'white';
    additionalImages.style.display = 'flex';
    // - Wykonanie bardziej skomplikowanych operacji, np. pobranie danych z serwera
    // ...
});

// obsługa kliknięcia w ikonę menu find_place do wyszukiwania miejsca/adresu 
findPlace.addEventListener('click', () => {
    // Tutaj umieść kod, który ma się wykonać po kliknięciu
    // Przykładowe działania:
    // - Zmiana koloru tła diva
    findPolygon.style.backgroundColor = 'white';
    findPlace.style.backgroundColor = 'sandybrown';
    findRound.style.backgroundColor = 'white';
    
    additionalImages.style.display = 'flex';

    // - Wykonanie bardziej skomplikowanych operacji, np. pobranie danych z serwera
    // ...
});


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Wyszukiwanie
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Wyszukanie polygonu (pafafii, diecezji, itp.)
 $( function() {
   
    // Przygotowanie dialogu
    $( "#select-polygon" ).dialog({
      autoOpen: false,
      modal: true,
      width: 250,
      height: 130,
      draggable: true,
      position : { my: "center top", at: "center top",  of: "#okno_dialogowe" },
      
    });
  
    // Otwieranie dialogu po kliknięciu przycisku
    $( "#find_polygon" ).click(function() {
      $( "#search-place" ).dialog( "close" );
      $( "#search-roud" ).dialog( "close" );
      $( "#select-polygon" ).dialog( "open" );
    });
});

//PRG wyszukiwarka przez WFS
const akceptujDiecezjaEl=document.querySelector("#zoom_to_icon_diecezja");
const akceptujDekanatEl=document.querySelector("#zoom_to_icon_dekanat");
akceptujDiecezjaEl.addEventListener("click", getGeometryDiecezja);
akceptujDekanatEl.addEventListener("click", getGeometryDekanat);

//
const selectElDiecezja= document.querySelectorAll(".js-lista-diecazji");
const selectElDekanat=document.querySelector(".js-lista-dekanatow");

selectElDiecezja.forEach((item)=>{item.addEventListener("change", ()=>{
	(layerGeojson) ? layerGeojson.remove():null;
	selectElDekanat.removeAttribute("disabled");
	generateDekanatyOptionsHtml();
})});

generateDiecezjaOptionsHtml();

// funkcja do pobrania listy diecezji
async function generateDiecezjaOptionsHtml(){
	let urlWFSDiecezja=`${wfsUrl}typeName=PG_Portal_katolika:diecezje&sortBy=name&outputFormat=application%2Fjson&srsName=epsg:4326`;
	const response = await fetch(urlWFSDiecezja);
	const data = await response.json();
	
  const DiecezjeFromGeoserver=data.features.map((feature)=>feature.properties);
	let DiecezjaOptionsHtml='<option>Wybierz Decezję</option>';
	const selectElDiecezja= document.querySelectorAll(".js-lista-diecazji");
	for(const item of DiecezjeFromGeoserver){
		DiecezjaOptionsHtml+=`<option value="${item.name}">${item.name}</option>`
	};
	selectElDiecezja.forEach(item=>item.innerHTML=DiecezjaOptionsHtml);
}

// funkcja do pobrania listy dekanatów w oparciu o wybraną diecezję
async function generateDekanatyOptionsHtml(){
	const selectedDiecezja=document.querySelector('.js-lista-diecazji').value;
	const selectElDekanat= document.querySelector('.js-lista-dekanatow');
	let DekanatyOptionsHtml='<option>Wybierz Dekanat</option>';
	const urlWFSDekanat=`${wfsUrl}CQL_FILTER=diocese='${selectedDiecezja}'&typeName=PG_Portal_katolika%3Adekanaty&sortBy=name&outputFormat=application%2Fjson&srsName=epsg:4326`;
	const response= await fetch(urlWFSDekanat);
	const data= await response.json();
	const DekanatyFromGeoserver=data.features.map((feature)=>feature.properties);
	for(const item of DekanatyFromGeoserver){
    console.log({item});
		DekanatyOptionsHtml+=`<option value="${item.name}">${item.name}</option>`
	};
	selectElDekanat.innerHTML=DekanatyOptionsHtml;
}


//Funkcja do pobrania geometrii z WFS wybranej diecezji
async function getGeometryDiecezja(){
	let urlWFSDiecezja=`${wfsUrl}CQL_FILTER=name='${selectElDiecezja[0].value}'&typeName=PG_Portal_katolika%3Adiecezje&outputFormat=application%2Fjson&srsName=epsg:4326`;
	getFitGeometry(urlWFSDiecezja);
};

// funkcja do pobrania geomerii z WFS wybranego dekantu 
async function getGeometryDekanat(){
	let urlWFSDekanat=`${wfsUrl}CQL_FILTER=name='${selectElDekanat.value}'&typeName=PG_Portal_katolika%3Adekanaty&maxFeatures=5&outputFormat=application%2Fjson&srsName=epsg:4326`;
	getFitGeometry(urlWFSDekanat)
};


//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Wyszukiwanie miejscowości geoserwer
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let adresyJSON;
//Wyszukanie miejsca (Miejscowości)
$( function() {
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  
  // Przygotowanie dialogu
  $( "#search-place" ).dialog({
    autoOpen: false,
    modal: false,
    width: 300,
    height: 150,
    position : { my: "center top", at: "center top",  of: "#okno_dialogowe" },
    draggable: true,
    
    close: function() {
      usun_marker();
    }
  });

  const divGeoSerwer = document.getElementById("divGeoSerwer");
  const divAjax = document.getElementById("divAjax");
  const divAGoogle = document.getElementById("divAGoogle");
  

  // Otwieranie dialogu po kliknięciu przycisku
  $( "#find_place" ).click(function() {
    console.log("findPlace");
    console.log('findPlace.style.backgroundColor :' + findPlace.style.backgroundColor);
    if (findPlace.style.backgroundColor === "sandybrown") {
      console.log("w if findPlace");
      $( "#select-polygon" ).dialog( "close" );
      $( "#search-roud" ).dialog( "close" );
      $( "#search-place" ).dialog( "open" );

      divGeoSerwer.style.backgroundColor = "sandybrown";
      divAjax.style.backgroundColor = "white";
      divAGoogle.style.backgroundColor = "white";
      $("#search-input").val("");
      var aktualnaWysokosc = $("#search-place").dialog("option", "height");
      console.log({aktualnaWysokosc});
      if (aktualnaWysokosc === 130) {
        $("#search-place").dialog("option", "height", 150);
       // Tworzymy nowy element div, który będzie zawierał nasz HTML z lista województw
       dodajDivWojewodztwo();
       nowylayer();
      }
      generateWojewudztwoOptionsHtml();
    }

  });
});
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


divGeoSerwer.addEventListener("mouseover", function() {
  if (divGeoSerwer.style.backgroundColor === "sandybrown") {
    ;
  }  else {
    divGeoSerwer.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

divAjax.addEventListener("mouseover", function() {
  if (divAjax.style.backgroundColor === "sandybrown") {
    ;
  } else {
    divAjax.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

divAGoogle.addEventListener("mouseover", function() {
  if (divAGoogle.style.backgroundColor === "sandybrown") {
    ;
  } else {
    divAGoogle.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});


divGeoSerwer.addEventListener("mouseout", function() {
    if (divGeoSerwer.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divGeoSerwer.style.backgroundColor = "white";
    }
});

divAjax.addEventListener("mouseout", function() {
    if (divAjax.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divAjax.style.backgroundColor = "white";
    }
});

divAGoogle.addEventListener("mouseout", function() {
    if (divAGoogle.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divAGoogle.style.backgroundColor = "white";
    }
});

divGeoSerwer.addEventListener("click", function() {
  
  this.style.backgroundColor = "sandybrown";
  divAjax.style.backgroundColor = "white";
  divAGoogle.style.backgroundColor = "white";
  $("#search-input").val("");
  var aktualnaWysokosc = $("#search-place").dialog("option", "height");
  if (aktualnaWysokosc === 130) {
    $("#search-place").dialog("option", "height", 150);
   // Tworzymy nowy element div, który będzie zawierał nasz HTML z lista województw
   dodajDivWojewodztwo();
   nowylayer();
  }
  generateWojewudztwoOptionsHtml();
});

divAjax.addEventListener("click", function() {
   this.style.backgroundColor = "sandybrown";
  divGeoSerwer.style.backgroundColor = "white";
  divAGoogle.style.backgroundColor = "white";
  $("#search-input").val("");
  usunElement();
});



//-------------------------------------------------------------------------------------
//dynamiczne pobieranie z Geoserver wojewodztwa
async function generateWojewudztwoOptionsHtml(){
	// Znajdź element select po jego identyfikatorze
  const wojSel = document.getElementById("Woj_sel");

  // Ustaw właściwość disabled na true, aby wyłączyć element
  wojSel.disabled = true;
  
//let urlWFSWojewudztwo=`${wfsUrl}typeName=PG_Portal_katolika:PG_P_wojewodztwa&sortBy=jpt_nazwa_&outputFormat=application%2Fjson&srsName=epsg:4326`;
	let urlWFSWojewudztwo=`${wfsUrl}typeName=PG_Portal_katolika:PG_P_wojewodztwa&propertyName=jpt_nazwa_&sortBy=jpt_nazwa_&outputFormat=application/json&srsName=epsg:4326`;
	const response= await fetch(urlWFSWojewudztwo);
	const data= await response.json();
	const wojewodztwaFromGeoserver=data.features.map((feature)=>feature.properties);
	let wojewodztwoOptionsHtml='<option>Wybierz województwo</option>';
	const selectElWojewodztwo= document.querySelectorAll(".js-lista-wojewodztw");
	for(const item of wojewodztwaFromGeoserver){
		wojewodztwoOptionsHtml+=`<option value="${item.jpt_nazwa_}">${item.jpt_nazwa_}</option>`
	};
	selectElWojewodztwo.forEach(item=>item.innerHTML=wojewodztwoOptionsHtml);
  wojSel.disabled = false;
}

//-------------------------------------------------------------------------------------
function dodajDivWojewodztwo() {
    // Tworzymy nowy element div, który będzie zawierał nasz HTML z lista województw
       //const newDiv = document.createElement("div style='display: flex' class='Wojewodztwo'");
        const newDiv = document.createElement("div");
        newDiv.style.display = 'flex';
        newDiv.classList.add('Wojewodztwo');
  
       // Wypełniamy nowy div stworzonym HTML-em
           newDiv.innerHTML = `
           <p >Województwo:</p>
           <select id="Woj_sel" style="width:200px" class="js-lista-wojewodztw" onchange="nowylayer()">
           </select>`;    
       // Znajdujemy element, przed którym chcemy wstawić nowy div
       const divMiejscowc = document.getElementById("divMiejscowc");
    
       // Wstawiamy nowy div przed divMiejscowc
       divMiejscowc.parentNode.insertBefore(newDiv, divMiejscowc);
}
//-------------------------------------------------------------------------------------
const selectElWoj= document.querySelectorAll(".js-lista-wojewodztw");
let wybrane_woj="";
//-------------------------------------------------------------------------------------
function nowylayer(){
  wybrane_woj= '';
	switch (selectElWoj[0].value) {
		case "dolnośląskie":
			wybrane_woj= 'pa_dolnoslaskie';
		  // Kod do wykonania dla województwa dolnośląskiego
		  break;
		case "kujawsko-pomorskie":
			wybrane_woj= 'pa_kujawsko_pomorskie';
		  // Kod do wykonania dla województwa kujawsko-pomorskiego
		  break;
		case "lubelskie":
			wybrane_woj= 'pa_lubelskie';
		  // Kod do wykonania dla województwa lubelskiego
		  break;
		case "lubuskie":
			wybrane_woj= 'pa_lubuskie';
		  // Kod do wykonania dla województwa lubuskiego
		  break;
		case "łódzkie":
			wybrane_woj= 'pa_lodzkie';
		  // Kod do wykonania dla województwa łódzkiego
		  break;
		case "małopolskie":
			wybrane_woj= 'pa_malopolskie';
		  // Kod do wykonania dla województwa małopolskiego
		  break;
		case "mazowieckie":
			wybrane_woj= 'pa_mazowieckie';
		  // Kod do wykonania dla województwa mazowieckiego
		  break;
		case "opolskie":
			wybrane_woj= 'pa_opolskie';
		  // Kod do wykonania dla województwa opolskiego
		  break;
		case "podkarpackie":
			wybrane_woj= 'pa_podkarpacie';
		  // Kod do wykonania dla województwa podkarpackiego
		  break;
		case "pomorskie":
			wybrane_woj= 'pa_pomorskie';
		  // Kod do wykonania dla województwa pomorskiego
		  break;
	    case "śląskie":
			wybrane_woj= 'pa_slaskie';
		  // Kod do wykonania dla województwa śląskiego
		  break;
		case "świętokrzyskie":
			wybrane_woj= 'pa_swietokrzyskie';
		  // Kod do wykonania dla województwa świętokrzyskiego
		  break;
		case "warmińsko-mazurskie":
			wybrane_woj= 'pa_warminsko_mazurskie';
		  // Kod do wykonania dla województwa warmińsko-mazurskiego
		  break;
		case "wielkopolskie":
			wybrane_woj= 'pa_wielkopolskie';
		  // Kod do wykonania dla województwa wielkopolskiego
		  break;
		case "zachodniopomorskie":
			wybrane_woj= 'pa_zachodniopomorskie';
		  // Kod do wykonania dla województwa zachodniopomorskie
		  break;
		default:
		  // Kod do wykonania, gdy żadna z wartości case nie pasuje
	}
};


divAGoogle.addEventListener("click", function() {
  this.style.backgroundColor = "sandybrown";
  divGeoSerwer.style.backgroundColor = "white";
  divAjax.style.backgroundColor = "white";
  $("#search-input").val("");
  usunElement();
});


function usunElement() {
  var aktualnaWysokosc = $("#search-place").dialog("option", "height");
  if (aktualnaWysokosc === 150) {
    $("#search-place").dialog("option", "height", 130);
    // Znajdź element, który chcesz usunąć
    var elementToRemove = document.querySelector('.Wojewodztwo');
    if (elementToRemove) {
      elementToRemove.remove();
    }
  }
}

//-----------------------------------------------------------------------------------
//Funkcja do pobrania z geoservera danych do autocompleta
//-----------------------------------------------------------------------------------

$(document).ready(function() {
  // Pobranie danych z 
  let id_adresu;
  $("#search-input").on('keyup', function() {
    const searchTerm = $(this).val();
    // Dzielenie tekstu na podstawie spacji
    let podzielonyTekst = searchTerm.split(" ");
    let licz_part_tekst = podzielonyTekst.length;
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Wyszukiwanie miejscowości przez geoserwer
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (divGeoSerwer.style.backgroundColor === "sandybrown"){
      if (searchTerm.length >= 3) {
        if (licz_part_tekst === 1) {
          const url = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=(strConcat(strConcat(strConcat(kodpocztow, miejscowos),ulica),numerporza)%20like%20%27%25${podzielonyTekst[0]}%25%27)&typeName=PG_Portal_katolika%3A${wybrane_woj}&maxFeatures=5&outputFormat=application/json&srsName=epsg:4326`;
        
          $.getJSON(url, function(data) {
            if (data && data.features) {
                const suggestions = data.features.map(feature => ({
                    label: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                    value: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                    id: feature.properties.lokalnyid
                }));

                console.log('Suggestions:', suggestions); // Debugowanie
        
                if (suggestions.length > 0) {

                  // Sprawdź, czy element istnieje
                  if ($("#search-input").length) {
                      console.log('Element #search-input istnieje');
                              // Inicjalizacja autocomplete po pobraniu danych
                      $("#search-input").autocomplete({
                          source: suggestions,
                          minLength: 3,
                          // Dodatkowe opcje do debugowania
                          select: function(event, ui) {
                            // Pobranie wybranego adresu
                            const wybranyAdres = ui.item;
                            // Ustawienie wartości pola tekstowego
                            $("#search-input").val(wybranyAdres.label);
                            id_adresu = wybranyAdres.id;
                            let url_adresu = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&&CQL_FILTER=lokalnyid=%27${id_adresu}%27&typeName=PG_Portal_katolika%3A${wybrane_woj}&outputFormat=application/json&srsName=epsg:4326`
                            getFitGeometry(url_adresu);
                            // Zapobieganie domyślnej akcji
                            event.preventDefault();
                          },
                          response: function(event, ui) {
                              console.log('Otrzymano sugestie:', ui.content);
                          }
                      });

                  } else {
                      console.error('Element #search-input nie istnieje');
                  }
                }
            } else {
              console.error('Brak danych lub nieprawidłowy format odpowiedzi');
            }
          }).fail(function(jqXHR, textStatus, errorThrown) {
              console.error('Błąd pobierania danych:', textStatus, errorThrown);
          });
        }
  
        else if (licz_part_tekst === 2) {
          const url = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=(strConcat(strConcat(strConcat(kodpocztow, miejscowos),ulica),numerporza)%20like%20%27%25${podzielonyTekst[0]}%25${podzielonyTekst[1]}%25%27)&typeName=PG_Portal_katolika%3A${wybrane_woj}&maxFeatures=5&outputFormat=application/json&srsName=epsg:4326`;
    
          $.getJSON(url, function(data) {
            if (data && data.features) {
              const suggestions = data.features.map(feature => ({
                  label: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  value: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  id: feature.properties.lokalnyid
              }));
    
              console.log('Suggestions:', suggestions); // Debugowanie
    
              if (suggestions.length > 0) {
                console.log('suggestions.length:', suggestions.length); // Debugowanie
                // Sprawdź, czy element istnieje
                if ($("#search-input").length) {
                  console.log('Element #search-input istnieje');
      
                  // Inicjalizacja autocomplete po pobraniu danych
                  $("#search-input").autocomplete({
                    source: suggestions,
                    minLength: 0,
                        // Dodatkowe opcje do debugowania
                    select: function(event, ui) {
                      console.log('Wybrano:', ui.item);
                                          //***********
  
                      // Pobranie wybranego adresu
                      const wybranyAdres = ui.item;
                      // Ustawienie wartości pola tekstowego
                      $("#search-input").val(wybranyAdres.label);
                      console.log(wybranyAdres.id);
                      id_adresu = wybranyAdres.id
                      console.log({id_adresu});
                      let url_adresu = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&&CQL_FILTER=lokalnyid=%27${id_adresu}%27&typeName=PG_Portal_katolika%3A${wybrane_woj}&outputFormat=application/json&srsName=epsg:4326`
                      console.log({url_adresu});
                      getFitGeometry(url_adresu);
                      // Zapobieganie domyślnej akcji
                      event.preventDefault();
  
                      //***********
  
                    },
                    response: function(event, ui) {
                        console.log('Otrzymano sugestie:', ui.content);
                    }
                  });
                  console.log('Autocomplete zainicjalizowane');
                } else {
                    console.error('Element #search-input nie istnieje');
                }
              }
            } else {
                console.error('Brak danych lub nieprawidłowy format odpowiedzi');
            }
          }).fail(function(jqXHR, textStatus, errorThrown) {
              console.error('Błąd pobierania danych:', textStatus, errorThrown);
          });
        }
      
        else if (licz_part_tekst === 3) {
          const url = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=(strConcat(strConcat(strConcat(kodpocztow, miejscowos),ulica),numerporza)%20like%20%27%25${podzielonyTekst[0]}%25${podzielonyTekst[1]}%25${podzielonyTekst[2]}%25%27)&typeName=PG_Portal_katolika%3A${wybrane_woj}&maxFeatures=5&outputFormat=application/json&srsName=epsg:4326`;
    
          $.getJSON(url, function(data) {
            if (data && data.features) {
              const suggestions = data.features.map(feature => ({
                  label: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  value: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  id: feature.properties.lokalnyid
              }));
    
//              console.log('Suggestions:', suggestions); // Debugowanie
    
              if (suggestions.length > 0) {
//              console.log('suggestions.length:', suggestions.length); // Debugowanie
                // Sprawdź, czy element istnieje
                if ($("#search-input").length) {
                  console.log('Element #search-input istnieje');
      
                  // Inicjalizacja autocomplete po pobraniu danych
                  $("#search-input").autocomplete({
                    source: suggestions,
                    minLength: 0,
                        // Dodatkowe opcje do debugowania
                    select: function(event, ui) {
                      console.log('Wybrano:', ui.item);
  
                      //***********
  
                      // Pobranie wybranego adresu
                      const wybranyAdres = ui.item;
                      console.log(wybranyAdres.id);
                      // Ustawienie wartości pola tekstowego
                      $("#search-input").val(wybranyAdres.label);
                      id_adresu = wybranyAdres.id
                      console.log({id_adresu});
                      let url_adresu = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&&CQL_FILTER=lokalnyid=%27${id_adresu}%27&typeName=PG_Portal_katolika%3A${wybrane_woj}&outputFormat=application/json&srsName=epsg:4326`
                      console.log({url_adresu});
                      getFitGeometry(url_adresu);
                      // Zapobieganie domyślnej akcji
                      event.preventDefault();
  
                      //***********
  
                    },
                    response: function(event, ui) {
                        console.log('Otrzymano sugestie:', ui.content);
                    }
                  });
                  console.log('Autocomplete zainicjalizowane');
                } else {
                    console.error('Element #search-input nie istnieje');
                }
              }
            } else {
                console.error('Brak danych lub nieprawidłowy format odpowiedzi');
            }
          }).fail(function(jqXHR, textStatus, errorThrown) {
              console.error('Błąd pobierania danych:', textStatus, errorThrown);
          });
        }
        else if (licz_part_tekst === 4) {
          const url = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=(strConcat(strConcat(strConcat(kodpocztow, miejscowos),ulica),numerporza)%20like%20%27%25${podzielonyTekst[0]}%25${podzielonyTekst[1]}%25${podzielonyTekst[2]}%25${podzielonyTekst[3]}%25%27)&typeName=PG_Portal_katolika%3A${wybrane_woj}&maxFeatures=5&outputFormat=application/json&srsName=epsg:4326`;
    
          $.getJSON(url, function(data) {
            if (data && data.features) {
              const suggestions = data.features.map(feature => ({
                  label: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  value: `${feature.properties.miejscowos} ${feature.properties.ulica ? feature.properties.ulica : ''} ${feature.properties.numerporza}`,
                  id: feature.properties.lokalnyid
              }));
    
              console.log('Suggestions:', suggestions); // Debugowanie
    
              if (suggestions.length > 0) {
                console.log('suggestions.length:', suggestions.length); // Debugowanie
                // Sprawdź, czy element istnieje
                if ($("#search-input").length) {
                  console.log('Element #search-input istnieje');
      
                  // Inicjalizacja autocomplete po pobraniu danych
                  $("#search-input").autocomplete({
                    source: suggestions,
                    minLength: 0,
                        // Dodatkowe opcje do debugowania
                    select: function(event, ui) {
                      console.log('Wybrano:', ui.item);
  
                      //***********
  
                      // Pobranie wybranego adresu
                      const wybranyAdres = ui.item;
                      console.log(wybranyAdres.id);
                      // Ustawienie wartości pola tekstowego
                      $("#search-input").val(wybranyAdres.label);
                      id_adresu = wybranyAdres.id
                      console.log({id_adresu});
                      let url_adresu = `http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&&CQL_FILTER=lokalnyid=%27${id_adresu}%27&typeName=PG_Portal_katolika%3A${wybrane_woj}&outputFormat=application/json&srsName=epsg:4326`
                      console.log({url_adresu});
                      getFitGeometry(url_adresu);
                      // Zapobieganie domyślnej akcji
                      event.preventDefault();
  
                      //***********
  
                    },
                    response: function(event, ui) {
                        console.log('Otrzymano sugestie:', ui.content);
                    }
                  });
                  console.log('Autocomplete zainicjalizowane');
                } else {
                    console.error('Element #search-input nie istnieje');
                }
              }
            } else {
                console.error('Brak danych lub nieprawidłowy format odpowiedzi');
            }
          }).fail(function(jqXHR, textStatus, errorThrown) {
              console.error('Błąd pobierania danych:', textStatus, errorThrown);
          });
        }
      }
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Wyszukiwanie przez AJAX
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (divAjax.style.backgroundColor === "sandybrown"){
      if (searchTerm.length >= 3) {
        // Inicjalizacja biblioteki jQuery UI Autocomplete
        $(function() {
          // Wybór pola, dla którego ma być używane autouzupełnianie
          
          
            var input = $("#search-input");
            console.log({input});
            // Ustawienie opcji biblioteki jQuery UI Autocomplete
            console.log("Wyszukiwanie przez AJAX");
            input.autocomplete({
              // Źródło danych dla autouzupełniania
              source: function(request, response) {
              // Wysłanie zapytania do serwera
              $.ajax({
                url: "ajax/ajax_pobierz_punt_start_end.php",
                type: "POST",
                data: {
                CzescAdres: request.term
                },
                success: function(data) {
                // Przetworzenie danych z serwera
                var daneAdresowe = JSON.parse(data);
            
                // Zwrócenie listy wartości do autouzupełniania
                const listaDaneAdresowe = daneAdresowe.map((adres) => ({
                  /*label: `${adres.kodpocztow} ${adres.miejscowos} ${adres.ulica} ${adres.numerporza}`,
                  value: `${adres.kodpocztow} ${adres.miejscowos} ${adres.ulica} ${adres.numerporza}`,*/
                  label: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
                  value: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
                  x: `${adres.x}`,
                  y: `${adres.y}`
                }));
            
                // Zwrócenie listy wartości do autouzupełniania
                response(listaDaneAdresowe);
                }
              });
              },
            
              // Wybór wartości z autouzupełniania
              select: function(event, ui) {
              // Pobranie wybranego adresu
              const wybranyAdres = ui.item;
            
              // Ustawienie wartości pola tekstowego
              input.val(wybranyAdres.label);
              
              let x = wybranyAdres.x;
              let y = wybranyAdres.y;
              if (divAjax.style.backgroundColor === "sandybrown"){
              fitMapToCoordinates(x, y);
              // Zapobieganie domyślnej akcji
              event.preventDefault();
              }
              },
            
              // Wyświetlanie podpowiedzi w miarę wpisywania tekstu
              minLength: 3
            });
          
        });
      }
      input = "";
    }
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Wyszukiwanie przez API Google
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    if (divAGoogle.style.backgroundColor === "sandybrown"){
      console.log("Wyszukiwanie przez API Google");

      const searchInput = document.getElementById('search-input');

      searchInput.setAttribute('autocomplete', 'off');
      
      searchInput.addEventListener('keyup', (event) => {
        console.log("znaki w polu: " + searchInput.value.length);
        if (divAGoogle.style.backgroundColor === "sandybrown"){
          console.log("Wyszukiwanie przez API Google 2 ");
          if (event.key === 'Enter') {
            const query = searchInput.value;
            console.log("Wyszukiwanie: " + query);
            searchPlaces(query);
          }
        }
      });
    }
  });
  
});

function searchPlaces(query) {
  // Inicjalizacja usługi Places
  const service = new google.maps.places.PlacesService(document.createElement('div'));

  // Opcje wyszukiwania
  const request = {
      query: query,
      fields: ['name', 'geometry.location'],
  };

  // Wykonanie zapytania
  service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
          // Przetworzenie wyników
          console.log({results})
          for (let i = 0; i < results.length; i++) {
              const place = results[i];
              console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng());
              fitMapToCoordinates(place.geometry.location.lat(), place.geometry.location.lng());
          }
          
      } else {
          console.error('Błąd podczas wyszukiwania:', status);
      }
  });
}
let existingMarker;
// Pobieranie geometrii  fitowanie na mapie
async function getFitGeometry(urlLayer){
	const response= await fetch(urlLayer);
	const data=await response.json();
	(layerGeojson) ? layerGeojson.remove():null;
	layerGeojson=L.geoJson(data,{style: {color: "#f4a460"}}).addTo(map);	
  console.log ({layerGeojson});
  existingMarker=layerGeojson;
	map.fitBounds(layerGeojson.getBounds());	
  
    // Set the zoom level to 18
    map.setZoom(18);

}

// Pobieranie wspólrzędnych wyszukanego punktu i fitowanie na mapie
let marker_place;

async function fitMapToCoordinates(latitude, longitude) {
  // Jeśli istnieje już marker, usuwamy go
  if (existingMarker) {
    map.removeLayer(existingMarker);
  }

  // Tworzymy nowy marker
  marker_place = L.marker([latitude, longitude]).addTo(map);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // Dodanie obsługi zdarzenia kliknięcia do marker_place
  marker_place.on('contextmenu', function(e) {
    // Otwórz dialog jQuery po kliknięciu na marker
  //  $("#myDialog").dialog("open");
    console.log('Kliknięto na markerze marker_place');
  });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // Przypisujemy nowy marker do zmiennej, aby móc go usunąć później
  existingMarker = marker_place;

  // Ustawiamy widok mapy na nowy marker z odpowiednim poziomem zoomu
  map.setView(marker_place.getLatLng(), 18); 
}




//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//    Wyszukiwanie trasy
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const divGeoSerwer_roud = document.getElementById("divGeoSerwer_roud");
const divAjax_roud = document.getElementById("divAjax_roud");
const divAGoogle_roud = document.getElementById("divAGoogle_roud");

//-------------------------------------------------------------------------------------------------------------
// Zmiana koloru przycisku po najechaniu na niego myszką
//-------------------------------------------------------------------------------------------------------------

// Rodzaj wyszukiwarki tras 
divGeoSerwer_roud.addEventListener("mouseover", function() {
  if (divGeoSerwer_roud.style.backgroundColor === "sandybrown") {
    ;
  }  else {
    divGeoSerwer_roud.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

divAjax_roud.addEventListener("mouseover", function() {
  if (divAjax_roud.style.backgroundColor === "sandybrown") {
    ;
  } else {
    divAjax_roud.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

divAGoogle_roud.addEventListener("mouseover", function() {
  if (divAGoogle_roud.style.backgroundColor === "sandybrown") {
   ;
  }  else {
    divAGoogle_roud.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

// Rodzaj poruszania się po trasie
div_bike.addEventListener("mouseover", function() {
  if (div_bike.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_bike.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

div_walk.addEventListener("mouseover", function() {
  if (div_walk.style.backgroundColor === "sandybrown") {
    ;
  }  else {
    div_walk.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

div_car.addEventListener("mouseover", function() {
  if (div_car.style.backgroundColor === "sandybrown") {
    ;
  }  else {
    div_car.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

div_publicTransport.addEventListener("mouseover", function() {
  if (div_publicTransport.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_publicTransport.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

div_wheelchair.addEventListener("mouseover", function() {
  if (div_wheelchair.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_wheelchair.style.backgroundColor = "rgba(244, 165, 96, 0.6)";
  }
});

//-------------------------------------------------------------------------------------------------------------
// Zmiana koloru przycisku po zjechaniu z niego myszką
//-------------------------------------------------------------------------------------------------------------
divGeoSerwer_roud.addEventListener("mouseout", function() {
    if (divGeoSerwer_roud.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divGeoSerwer_roud.style.backgroundColor = "white";
    }
});

divAjax_roud.addEventListener("mouseout", function() {
    if (divAjax_roud.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divAjax_roud.style.backgroundColor = "white";
    }
});

divAGoogle_roud.addEventListener("mouseout", function() {
    if (divAGoogle_roud.style.backgroundColor === "sandybrown") {
      ;
    } else {
      divAGoogle_roud.style.backgroundColor = "white";
    }
});

div_bike.addEventListener("mouseout", function() {
  if (div_bike.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_bike.style.backgroundColor = "white";
  }
});

div_walk.addEventListener("mouseout", function() {
  if (div_walk.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_walk.style.backgroundColor = "white";
  }
});

div_car.addEventListener("mouseout", function() {
  if (div_car.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_car.style.backgroundColor = "white";
  }
});

div_publicTransport.addEventListener("mouseout", function() {
  if (div_publicTransport.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_publicTransport.style.backgroundColor = "white";
  }
});

div_wheelchair.addEventListener("mouseout", function() {
  if (div_wheelchair.style.backgroundColor === "sandybrown") {
    ;
  } else {
    div_wheelchair.style.backgroundColor = "white";
  }
});

//-------------------------------------------------------------------------------------------------------------
// Kliknięie w przcisk wyboru metody wyszukiwania trasy
//-------------------------------------------------------------------------------------------------------------
divGeoSerwer_roud.addEventListener("click", function() {
  this.style.backgroundColor = "sandybrown";
  divAjax_roud.style.backgroundColor = "white";
  divAGoogle_roud.style.backgroundColor = "white";
  $("#start-roud").val("");
  $("#end-roud").val("");
  wyzeruj_pola();
  usun_trase();
  // Ustaw style CSS, aby uczynić element nieaktywnym
  divWheelChair.style.pointerEvents = 'auto';
  divWheelChair.style.opacity = '1';


});

divAjax_roud.addEventListener("click", function() {
  this.style.backgroundColor = "sandybrown";
  divGeoSerwer_roud.style.backgroundColor = "white";
  divAGoogle_roud.style.backgroundColor = "white";
  $("#start-roud").val("");
  $("#end-roud").val("");
  wyzeruj_pola();
  usun_trase();

  // Ustaw style CSS, aby uczynić element nieaktywnym
  divWheelChair.style.pointerEvents = 'auto';
  divWheelChair.style.opacity = '1';
  
});

divAGoogle_roud.addEventListener("click", function() {
  this.style.backgroundColor = "sandybrown";
  divGeoSerwer_roud.style.backgroundColor = "white";
  divAjax_roud.style.backgroundColor = "white";
  $("#start-roud").val("");
  $("#end-roud").val("");
  wyzeruj_pola();
  usun_trase();
 
  // Ustaw style CSS, aby uczynić element nieaktywnym
  divWheelChair.style.pointerEvents = 'none';
  divWheelChair.style.opacity = '0.5';

  if (divWheelChair.style.backgroundColor === "sandybrown") {
    divWheelChair.style.backgroundColor = "white";
    divCar.style.backgroundColor = "sandybrown";
  }

});

//-------------------------------------------------------------------------------------------------------------
// Kliknięie w przcisk wyboru metody poruszania sie 
//-------------------------------------------------------------------------------------------------------------
let mode_move ='';

div_bike.addEventListener("click", function() {
	this.style.backgroundColor = "sandybrown";
	div_walk.style.backgroundColor = "white";
	div_car.style.backgroundColor = "white";
	div_publicTransport.style.backgroundColor = "white";
	div_wheelchair.style.backgroundColor = "white";
  //wyzeruj_pola();
  usun_trase();
  mode_move = 'bicycling';
  trasaPoModeMove();
});

div_walk.addEventListener("click", function() {
	this.style.backgroundColor = "sandybrown";
	div_bike.style.backgroundColor = "white";
	div_car.style.backgroundColor = "white";
	div_publicTransport.style.backgroundColor = "white";
	div_wheelchair.style.backgroundColor = "white";
  //wyzeruj_pola();
  usun_trase();
  mode_move = 'walking';
  trasaPoModeMove();
});

div_car.addEventListener("click", function() {
	this.style.backgroundColor = "sandybrown";
	div_bike.style.backgroundColor = "white";
	div_walk.style.backgroundColor = "white";
	div_publicTransport.style.backgroundColor = "white";
	div_wheelchair.style.backgroundColor = "white";
  //wyzeruj_pola();
  usun_trase();
  mode_move = 'driving';
  trasaPoModeMove()
});

div_publicTransport.addEventListener("click", function() {
	this.style.backgroundColor = "sandybrown";
	div_bike.style.backgroundColor = "white";
	div_walk.style.backgroundColor = "white";
	div_car.style.backgroundColor = "white";
	div_wheelchair.style.backgroundColor = "white";
  //wyzeruj_pola();
  usun_trase();
  mode_move = 'transit';
  trasaPoModeMove()
});

div_wheelchair.addEventListener("click", function() {
	this.style.backgroundColor = "sandybrown";
	div_bike.style.backgroundColor = "white";
	div_walk.style.backgroundColor = "white";
	div_car.style.backgroundColor = "white";
	div_publicTransport.style.backgroundColor = "white";
  //wyzeruj_pola();
  usun_trase();
  mode_move = 'wheelchair';
  trasaPoModeMove()
});

function trasaPoModeMove(){
  // Pobierz wartości z pól start-roud i end-roud
  var startRoud = document.getElementById('start-roud').value;
  var endRoud = document.getElementById('end-roud').value;
    // Sprawdź, czy pola nie są puste
  if (startRoud !== '' && endRoud !== '') {
    // Sprasznie jaki tryb wyboru trasy jest zaznaczony
    if (divGeoSerwer_roud.style.backgroundColor === "sandybrown") {
      // Wywołaj funkcję wyznacz_traseOSRM z odpowiednimi współrzędnymi
      if (x_start > 0 && x_end > 0 && y_start > 0 && y_end) {
        wyznacz_traseOSRM([x_start, y_start], [x_end, y_end]);
      }
    }
    if (divAjax_roud.style.backgroundColor === "sandybrown"){ 
      console.log('divAjax_roud.style.backgroundColor');
      if (x_start_g_o > 0 && x_end_g_o > 0 && y_start_g_o > 0 && y_end_g_o) {
        console.log('wyznacz_traseOSRM');
        wyznacz_traseOSRM(start, end);
      }
    }
    if (divAGoogle_roud.style.backgroundColor === "sandybrown"){ 
      console.log({divAGoogle_roud});
      wyznacz_trase_G(start_google_str, end_google_str);      
    }

  }
 }
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  zamienienie miejscami tekstu w polach start-roud i end-roud'
// Pobierz odnośniki do pól input i obrazka
const poleStartowe = document.getElementById('start-roud');
const poleKoncowe = document.getElementById('end-roud');
const obrazekZamiany = document.getElementById('menu_ico_swap');

// Dodaj nasłuchiwacz zdarzenia kliknięcia do obrazka

obrazekZamiany.addEventListener('click', () => {
  console.log('Kliknięto obrazek zamiany');
  // Zmień miejscami wartości pól input
  const tymczasowaWartosc = poleStartowe.value;
  poleStartowe.value = poleKoncowe.value;
  poleKoncowe.value = tymczasowaWartosc;

});

//----------------------------------------------------------------------
//wyszuaknie trasy
//----------------------------------------------------------------------

// Inicjalizacja okna dialogu
$( function() {
    
  // Przygotowanie dialogu
  $( "#search-roud" ).dialog({
    autoOpen: false,
    modal: false,
    width: 300,
    height: 200,
    position : { my: "center top", at: "center top",  of: "#okno_dialogowe" }/*,
    close: function() {
      usun_trase();
      if (polyline){
				polyline.remove();
			}
    }*/
  });

  // Otwieranie dialogu po kliknięciu przycisku
  $( "#find_round" ).click(function() {
    console.log('Find round');
    $( "#select-polygon" ).dialog( "close" );
    $( "#search-place" ).dialog( "close" );
    $( "#search-roud" ).dialog( "open" );

    findPolygon.style.backgroundColor = 'white';
    findPlace.style.backgroundColor = 'white';
    findRound.style.backgroundColor = 'sandybrown';
    additionalImages.style.display = 'flex';

    divGeoSerwer_roud.style.backgroundColor = "sandybrown";
    divAjax_roud.style.backgroundColor = "white";
    divAGoogle_roud.style.backgroundColor = "white";

    div_car.style.backgroundColor = "sandybrown";
    div_bike.style.backgroundColor = "white";
    div_walk.style.backgroundColor = "white";
    div_publicTransport.style.backgroundColor = "white";
    div_wheelchair.style.backgroundColor = "white";

    poleStartowe.value = "";
    poleKoncowe.value = "";
    poleStartowe.setAttribute('placeholder', 'Początek trasy');
    poleKoncowe.setAttribute('placeholder', 'Koniec trasy');
  });
});

console.log ('Zeruje przy deklaracji'); 
let x_start = 0;
let y_start = 0;
let x_end = 0;
let y_end = 0;

let x_start_g_o = 0;
let y_start_g_o = 0;
let x_end_g_o = 0;
let y_end_g_o = 0;

let x_start_g = 0;
let y_start_g = 0;
let x_end_g = 0;
let y_end_g = 0;

//**********************************************************************
//
//**********************************************************************

// Inicjalizacja biblioteki jQuery UI Autocomplete

$(document).ready(function() {

  $("#start-roud").on('keyup', function() {
    const input = $(this);
    
    /*
    console.log("divGeoSerwer_roud"+divGeoSerwer_roud.style.backgroundColor);
    console.log("divAjax_roud"+divAjax_roud.style.backgroundColor);
    console.log("divAGoogle_roud"+divGeoSerwer_roud.style.backgroundColor);
    */

    if (divGeoSerwer_roud.style.backgroundColor === "sandybrown") {
      let typingTimer;                // Timer do opóźnienia
      const doneTypingInterval = 1000; // Czas opóźnienia w milisekundach

      input.on('keyup', function() {
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
      });

      input.on('keydown', function() {
   //     console.log('key 1 - '+typingTimer);
        typingTimer
   //     console.log('key 2 - '+typingTimer);
      });

      function doneTyping() {
    //    console.log('done typ - '+typingTimer);
        input.autocomplete({
          
          // Źródło danych dla autouzupełniania
          source: function(request, response) {
            // Wysłanie zapytania do serwera
            $.ajax({
              url: "ajax/ajax_pobierz_punt_start_end.php",
              type: "POST",
              data: {
                  CzescAdres: request.term
              },
              success: function(data) {
                // Przetworzenie danych z serwera
                var daneAdresowe = JSON.parse(data);
                console.log({typingTimer});
                // Zwrócenie listy wartości do autouzupełniania
                const listaDaneAdresowe = daneAdresowe.map((adres) => ({
                  label: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
                  value: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
                  id: `${adres.lokalnyid}`,
                  x_start: `${adres.x}`,
                  y_start: `${adres.y}`,
                }));

                  // Zwrócenie listy wartości do autouzupełniania
                response(listaDaneAdresowe);
              },
              error: function(data) {
              console.log("Błąd pobrania danych");
              }
            });
          },

          // Wybór wartości z autouzupełniania
          select: function(event, ui) {
            // Pobranie wybranego adresu
            const wybranyAdres = ui.item;

            // Ustawienie wartości pola tekstowego
            input.val(wybranyAdres.label);
            id_adresu = wybranyAdres.id;

            x_start = wybranyAdres.x_start;
            y_start = wybranyAdres.y_start;

            if (x_start > 0 && x_end > 0 && y_start > 0 && y_end) {
              console.log("wywolanie wyznacz trase w Start");
              wyznacz_traseOSRM([x_start,y_start],[x_end,y_end]);
            }

            // Zapobieganie domyślnej akcji
            event.preventDefault();
          },

          // Wyświetlanie podpowiedzi w miarę wpisywania tekstu
          minLength: 3
        });
      }
    }

    if (divAjax_roud.style.backgroundColor === "sandybrown"){
      wyszukajPo3LiterachGoogleOSRM('start_g');
    }

    if (divAGoogle_roud.style.backgroundColor === "sandybrown"){
      wyszukajPo3LiterachGoogleGoogle('start_g');
    }
  });
});

  
// Inicjalizacja biblioteki jQuery UI Autocomplete

  $(document).ready(function() {
    $("#end-roud").on('keyup', function() {
	  // Wybór pola, dla którego ma być używane autouzupełnianie
	  var input = $("#end-roud");
//	  console.log({input});
//    console.log("divGeoSerwer_roud",divGeoSerwer_roud.style.backgroundColor);

    if (divGeoSerwer_roud.style.backgroundColor === "sandybrown"){
//    console.log("Po geoserwer end");
      const currentDate = new Date();
      const timestamp = currentDate.getTime();
//    console.log(timestamp);
      const tab_tmp = 'tmp_adr'+timestamp;
//    console.log(tab_tmp);

      // Ustawienie opcji biblioteki jQuery UI Autocomplete
      input.autocomplete({
        // Źródło danych dla autouzupełniania
        source: function(request, response) {
        // Wysłanie zapytania do serwera
        $.ajax({
          url: "ajax/ajax_pobierz_punt_start_end.php",
          type: "POST",
          data: {
          CzescAdres: request.term,
          tab_tmp: tab_tmp
          },
          success: function(data) {
          // Przetworzenie danych z serwera
          var daneAdresowe = JSON.parse(data);
      
          // Zwrócenie listy wartości do autouzupełniania
          const listaDaneAdresowe = daneAdresowe.map((adres) => ({
            label: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
            value: `${adres.miejscowos} ${adres.ulica ? adres.ulica : ''} ${adres.numerporza}`,
            id: `${adres.lokalnyid}`,
            x_end: `${adres.x}`,
            y_end: `${adres.y}`,
          }));
      
          // Zwrócenie listy wartości do autouzupełniania
          response(listaDaneAdresowe);
          }
        });
        },
      
        // Wybór wartości z autouzupełniania
        select: function(event, ui) {
        // Pobranie wybranego adresu
        const wybranyAdres = ui.item;
      
        // Ustawienie wartości pola tekstowego
        input.val(wybranyAdres.label);
        id_adresu = wybranyAdres.id;

        x_end = wybranyAdres.x_end;
        y_end = wybranyAdres.y_end;

        
        if (x_start > 0 &&  x_end > 0 &&  y_start > 0 &&  y_end){
          console.log("wywolanie wyznacz trase w End")
          wyznacz_traseOSRM([x_start,y_start],[x_end,y_end]);
        }

        // Zapobieganie domyślnej akcji
        event.preventDefault();
        },
      
        // Wyświetlanie podpowiedzi w miarę wpisywania tekstu
        minLength: 3
      });
    } 
    if (divAjax_roud.style.backgroundColor === "sandybrown"){
      wyszukajPo3LiterachGoogleOSRM('end_g');
    }
    if (divAGoogle_roud.style.backgroundColor === "sandybrown"){
      wyszukajPo3LiterachGoogleGoogle('end_g');
    }

//-------------------------------------------------------------------------------------------------



/*routingControl_G.onmouseover = function(e) {
        // Tutaj umieść kod, który ma być wykonany po najechaniu myszą na routingControl_G
        // Na przykład:
        console.log("Najechano na routingControl_G!");
      };*/
    });
  });


  var start='';
  var end ='';

  var start_google_str='';
  var end_google_str ='';
//-------------------------------------------------------------------------------------------------
document.getElementById('start-roud').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (x_start_g_o > 0 && x_end_g_o > 0 && y_start_g_o > 0 && y_end_g_o) {
      if (divAjax_roud.style.backgroundColor === "sandybrown"){ 
        wyznacz_traseOSRM(start, end);
      }
    }
    if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
      if ( divAGoogle_roud.style.backgroundColor === "sandybrown"){ 
        wyznacz_trase_G(start_google_str, end_google_str);
      }
    }
  }
});

document.getElementById('end-roud').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    if (x_start_g_o > 0 && x_end_g_o > 0 && y_start_g_o > 0 && y_end_g_o) {
      if ( divAjax_roud.style.backgroundColor === "sandybrown"){ 
        wyznacz_traseOSRM(start, end);
      }
    }
    if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
      if ( divAGoogle_roud.style.backgroundColor === "sandybrown"){ 
        wyznacz_trase_G(start_google_str, end_google_str);
      }
    }
  }
});

function wyszukajPo3LiterachGoogleOSRM(rodz_mark) {
    var address;
    if (rodz_mark === 'start_g') {
        address = $("#start-roud").val();
    } else {
        address = $("#end-roud").val();
    }

    if (address.length >= 3) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ address }, function(results, status) {
            if (status === 'OK') {
                var location = results[0].geometry.location;
                var lat = location.lat();
                var lng = location.lng();

                if (rodz_mark === 'end_g') {
                    map.eachLayer(function(layer) {
                        if (layer instanceof L.Marker && layer.options.title === "end_g") {
                            map.removeLayer(layer);
                        }
                    });
                } else {
                    map.eachLayer(function(layer) {
                        if (layer instanceof L.Marker && layer.options.title === "start_g") {
                            map.removeLayer(layer);
                        }
                    });
                }

                // Wyświetl nowy znacznik
                if (rodz_mark === 'start_g') {
                    start = [lat, lng];
                    x_start_g_o = lat;
                    y_start_g_o = lng;
                } else {
                    end = [lat, lng];
                    x_end_g_o = lat;
                    y_end_g_o = lng;
                }

                // Sprawdź, czy wszystkie współrzędne są ustawione i wywołaj funkcję wyznacz_traseOSRM
                if (x_start_g_o > 0 && x_end_g_o > 0 && y_start_g_o > 0 && y_end_g_o) {
                    // Funkcja wywołana w nasłuchiwaczu zdarzeń klawisza Enter
                }
            } else {
                console.error('Błąd wyszukiwania adresu:', status);
            }
        });
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function wyszukajPo3LiterachGoogleGoogle(rodz_mark) {

  var address;
  if (rodz_mark === 'start_g'){
    address = $("#start-roud").val();
    start_google_str = $("#start-roud").val();
  }
  else {
    address = $("#end-roud").val();
    end_google_str = $("#end-roud").val();
  }
  if (address.length >= 3) {

    var geocoder = new google.maps.Geocoder();
    
    geocoder.geocode({ address }, function(results, status) {
      console.log ({address});
      if (status === 'OK') {
        var location = results[0].geometry.location;
        var lat = location.lat();
        var lng = location.lng();
        
        if (rodz_mark === 'end_g'){ 
          map.eachLayer(function(layer) {
            if (layer instanceof L.Marker && layer.options.title === "end_g") {
              map.removeLayer(layer);
            }
          });
        }
        else {
          map.eachLayer(function(layer) {
            if (layer instanceof L.Marker && layer.options.title === "start_g") {
              map.removeLayer(layer);
            }
          });
        }
        
        if (rodz_mark === 'start_g'){
        //start = [lat, lng]; 
          x_start_g = lat;
          y_start_g = lng ;
          /*if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
            //wyznacz trasę przez API Google
            wyznacz_trase_G(start_google_str, end_google_str);
          } */ 
        } 
        else {
         // end = [lat, lng]; 
          x_end_g = lat;
          y_end_g = lng ;
          /*if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
            wyznacz_trase_G(start_google_str, end_google_str);
          }*/
        }
      }
      else {
        console.error('Błąd wyszukiwania adresu:', status);
      }
    });
  }
}

// ------------------------------------------------------------------------------------
// 
// ------------------------------------------------------------------------------------
function wyzeruj_pola(){
  console.log('Wyzeruj pola');
  x_start = 0;
  y_start = 0;
  x_end = 0;
  y_end = 0;
  x_start_g_o = 0;
  y_start_g_o = 0;
  x_end_g_o = 0;
  y_end_g_o = 0;
  x_start_g = 0;
  y_start_g = 0;
  x_end_g = 0;
  y_end_g = 0;
}

let routingControl; // Zmienna globalna do przechowywania referencji do obiektu L.polyline
let marker; // Zmienna globalna do przechowywania referencji do obiektu L.marker
let markers = []; // Tablica do przechowywania referencji do dodanych markerów

// Define the wyznacz_trase function
async function wyznacz_traseOSRM(start, end) {

  if (!start || !end || start.length < 2 || end.length < 2) {
    console.error('Invalid start or end coordinates');
    return;
  }
    
  const apiKey = '5b3ce3597851110001cf62481335047d13ce4e68a75637fdd0087684'; // Replace with your OpenRouteService API key
//  const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

  let url = '';
  let mode_move_ico = '';

  switch (mode_move) {
    case 'bicycling':
      url = `https://api.openrouteservice.org/v2/directions/cycling-regular`;
      mode_move_ico = 'BICYCLING';
      break;
    case 'walking':
      url = `https://api.openrouteservice.org/v2/directions/foot-walking`;
      mode_move_ico = 'WALKING';
      break;
    case 'driving':
      url = `https://api.openrouteservice.org/v2/directions/driving-car`;
      mode_move_ico = 'CAR';
      break;
    case 'transit':
      url = `https://api.openrouteservice.org/v2/directions/transit`;
      mode_move_ico = 'TRANSIT';
      break;
    case 'wheelchair':
      url = `https://api.openrouteservice.org/v2/directions/wheelchair`;
      mode_move_ico = 'WHEELCHAIR';
      break;
    default:
      url = `https://api.openrouteservice.org/v2/directions/driving-car`;
  }

  const params = {
    api_key: apiKey,
    start: `${start[1]},${start[0]}`, // Longitude, Latitude
    end: `${end[1]},${end[0]}`, // Longitude, Latitude
  };
    
  try {

    const response = await axios.get(url, { params });
  
    if (response.data && response.data.features && response.data.features.length > 0) {
      const route = response.data.features[0];
      console.log({ route });
  
      if (route) {
        // Usuń poprzednie trasy z mapy
        usun_trase();  
        if (polyline){
          polyline.remove();
        }
    
        marker = L.marker([start[0], start[1]], {
          title: 'StartO' // nazwa wyświetlana w popupie
        }).addTo(map);
        markers.push(marker); // Dodaj referencję do markera do tablicy

        marker = L.marker([end[0], end[1]], {
          title: 'EndO' // nazwa wyświetlana w popupie
        }).addTo(map);
        markers.push(marker); // Dodaj referencję do markera do tablicy

        const coordinates = route.geometry.coordinates.map(coord => [coord[1], coord[0]]); // Convert to [lat, lng]
        const distance = route.properties.segments[0].distance / 1000; // w kilometrach
        const duration = route.properties.segments[0].duration / 60; // w minutach
        
        // Utwórz polyline i dodaj ją do mapy
        routingControl = L.polyline(coordinates, { color: 'blue' }).addTo(map);
        
        // Dodaj tooltip z informacjami o trasie
        //routingControl.bindTooltip(`Odległość: ${distance.toFixed(2)} km<br>Czas: ${duration.toFixed(2)} min`).openTooltip();
   
        // Wybierz ikonę na podstawie trybu transportu
        var icon;
        switch (mode_move_ico) {
          case 'BICYCLING':
            icon = '<i class="material-icons">directions_bike</i>'; // Ikona roweru
            break;
          case 'WALKING':
            icon = '<i class="material-icons">directions_walk</i>'; // Ikona pieszego
            break;
          case 'DRIVING':
            icon = '<i class="material-icons">directions_car</i>'; // Ikona samochodu
            break;
          case 'TRANSIT':
            icon = '<i class="material-icons">directions_bus</i>'; // Ikona transportu publicznego
            break;
          case 'WHEELCHAIR':
            icon = '<i class="material-icons">accessible</i>'; // Ikona dla osób niepełnosprawnych  
            break;
          default:
            icon = '<i class="material-icons">directions_car</i>'; // Domyślna ikona samochodu
            break;
        }

        let duration_opis;

        const hours = Math.floor(duration / 60);
        const minutes = Math.round(duration % 60);
        if (hours > 0) {
          duration_opis = `${hours} godz ${minutes} min`;
        } else {
          duration_opis =`${minutes} min`;
        }
      
        let distance_opis=`${(distance).toFixed(2)} km`;
        

        let tooltipContent = `
                              <div style="display: grid;">
                                <div style="display: inline; height: 18px;">
                                  ${icon}
                                  <text class="tooltip_czas">${duration_opis}</text>
                                  </div>
                                <div style="display: inline; height: 15px; padding-top: 2px; padding-left: 2px;">
                                  <text class="tooltip_km">${distance_opis}</text>
                                </div>
                              </div>`;

//        routingControl.bindTooltip(`Odległość: ${distance.toFixed(2)} km<br>Czas: ${duration.toFixed(2)} min`).openTooltip();
        routingControl.bindTooltip(tooltipContent).openTooltip();

        var bounds = routingControl.getBounds();
        // Rozszerz granice o pewną wartość
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();

        console.log ('northEast.lat = '+northEast.lat);
        console.log ('northEast.lng = '+northEast.lng);

        let highMap = northEast.lat - southWest.lat;
        console.log ('highMap = '+ highMap);

        var extendedSouthWest = L.latLng(southWest.lat - (highMap/10) , southWest.lng - 0.005);
        var extendedNorthEast = L.latLng(northEast.lat + (highMap/20) , northEast.lng + 0.01);

        console.log ('extendedNorthEast.lat = '+extendedNorthEast.lat);
        console.log ('extendedNorthEast.lng = '+extendedNorthEast.lng);

        var extendedBounds = L.latLngBounds(extendedSouthWest, extendedNorthEast);

        // Wyśrodkuj mapę i ustaw odpowiedni zoom z rozszerzonymi granicami
        map.fitBounds(extendedBounds);

      }
  
    } else {
      console.error('No routes found in the response');
      console.log('Full response:', response.data);
    }
  } catch (error) {
    console.error('Error fetching route:', error);
  }
}

//--------------------------------------------------------------------------------------
// Wyznacz trasę przez Google API
//--------------------------------------------------------------------------------------
// Zmienna globalna do przechowywania referencji do obiektu L.polyline
let travelModeChoice = '';
 
 //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 // Funkcja wyszukiwania trasy z użyciem google api 
 function wyznacz_trase_G(start, end) {
  
	// Wywołanie Directions Service
	var directionsService = new google.maps.DirectionsService();
  
  console.log({mode_move})  ;
  switch (mode_move) {
    case 'bicycling':
      travelModeChoice = google.maps.TravelMode.BICYCLING;
      break;
    case 'walking':
      travelModeChoice = google.maps.TravelMode.WALKING;
      break;
    case 'driving':
      travelModeChoice = google.maps.TravelMode.DRIVING;
      break;
    case 'transit':
      console.log ('jest w trasit');
      travelModeChoice = google.maps.TravelMode.TRANSIT;
      break;
    default:
      travelModeChoice = google.maps.TravelMode.DRIVING;
  }

	directionsService.route({
		origin: start,
		destination: end,
		travelMode: travelModeChoice
	},
 
	function(response, status) {
    console.log({response});
		if (status === google.maps.DirectionsStatus.OK) {
			// Pobranie punktów trasy
			var route = response.routes[0].overview_path;
			
      // Usunięcie poprzedniej trasy z mapy
      usun_trase();
      
      console.log ('Dodanie trasy na mapę');
			polyline = L.polyline(route.map(point => [point.lat(), point.lng()]), {
				color: "red",
				weight: 5
			}).addTo(map);

////////////////////////////////////////////////
      // Wyznacz granice polyline
      var bounds = polyline.getBounds();
      // Rozszerz granice o pewną wartość
      let southWest = bounds.getSouthWest();
      let northEast = bounds.getNorthEast();
      let highMap = northEast.lat - southWest.lat;
      let extendedSouthWest = L.latLng(southWest.lat - (highMap/10) , southWest.lng - 0.005);
      let extendedNorthEast = L.latLng(northEast.lat + (highMap/20) , northEast.lng + 0.01);
      let extendedBounds = L.latLngBounds(extendedSouthWest, extendedNorthEast);
////////////////////////////////////////////////

      // Wyśrodkuj mapę i ustaw odpowiedni zoom z rozszerzonymi granicami
      map.fitBounds(extendedBounds);

      // Dodaj marker na początku trasy
      marker = L.marker([route[0].lat(), route[0].lng()], { title: "StartG" }).addTo(map);
      markers.push(marker); // Dodaj referencję do markera do tablicy
      // Dodaj marker na końcu trasy
      marker = L.marker([route[route.length - 1].lat(), route[route.length - 1].lng()], { title: "End" }).addTo(map);
      markers.push(marker); // Dodaj referencję do markera do tablicy

//////////////////////////////////////////////////////////////////////
// Toltip z informacjami o trasie

      var distance = response.routes[0].legs[0].distance.text;
      var duration = response.routes[0].legs[0].duration.text;

      // Wybierz ikonę na podstawie trybu transportu
      var icon;
      switch (travelModeChoice) {
        case google.maps.TravelMode.BICYCLING:
          icon = '<i class="material-icons">directions_bike</i>'; // Ikona roweru
          break;
        case google.maps.TravelMode.WALKING:
          icon = '<i class="material-icons">directions_walk</i>'; // Ikona pieszego
          break;
        case google.maps.TravelMode.DRIVING:
          icon = '<i class="material-icons">directions_car</i>'; // Ikona samochodu
          break;
        case google.maps.TravelMode.TRANSIT:
          icon = '<i class="material-icons">directions_bus</i>'; // Ikona transportu publicznego
          break;
        default:
          icon = '<i class="material-icons">directions_car</i>'; // Domyślna ikona samochodu
      }

      console.log ({distance});
      console.log ({duration});
      console.log ({icon});

      // Utwórz tooltip
      let tooltipContent = `
			<div style="display: grid;">
				<div style="display: inline; height: 18px;">
					${icon}
          <text class="tooltip_czas">${duration}</text>
          </div>
				<div style="display: inline; height: 15px; padding-top: 2px; padding-left: 2px;">
					<text class="tooltip_km">${distance}</text>
				</div>
			</div>`;

      polyline.bindTooltip(tooltipContent, {permanent: false, direction: 'center'}).openTooltip();

		} 
    else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
      alert("Nie znaleziono trasy. Brak dostępnego transportu.");
      console.error("Nie znaleziono trasy");
    }	else {
			console.error("Błąd pobierania danych trasy:", status);
		}
	});
}
//-----------------------------------------------------------------------------------------------------
// Usuwanie trasy
//-----------------------------------------------------------------------------------------------------
function usun_trase() {
  console.log('Usuwanie trasy z mapy');
  usun_markery();
  if (polyline){
    polyline.remove();
  }
  console.log({routingControl});
  // Sprawdź, czy routingControl jest zdefiniowany
  if (routingControl !== undefined) {
    console.log('Usuwam routingControl z mapy');
      // Usuń routingControl z mapy
      map.removeControl(routingControl);
      routingControl = undefined;
  }
  
  // Wyłącz grupy warstw
 /*
  toggleLayersGroup(buttonPRG, labelsPRG, false);
  toggleLayersGroup(buttonOBSAK, labelsOBSAK, false);
  toggleLayersGroup(buttonGEODEZJA, labelsGEODEZJA, false);
 */   
  console.log('Trasa została usunięta');
}
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcja do usunięcia markerów
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function usun_marker() {
  console.log({marker});
  if (marker !== undefined) {
    map.removeLayer(marker);
    marker = undefined;
    console.log('Marker został usunięty z mapy');
  } else {
    console.log('Brak markera do usunięcia');
  }
}

// Funkcja do usuwania wszystkich markerów
function usun_markery() {
  markers.forEach(marker => {
    map.removeLayer(marker); // Usuń marker z mapy
  });
  markers = []; // Wyczyść tablicę markerów
}
