const map = L.map('map',{
	zoomSnap: 1,	
	/*zoomDelta: 0.25,*/
	/*wheelPxPerZoomLevel: 120*/
	zoomControl: false,
	measureControl: true,
	maxZoom:19
});

	
map.setView([52.05, 19], 7);
map.setMaxBounds(map.getBounds());
		
var zoom_bar = new L.Control.ZoomBar({position: 'topleft'}).addTo(map);//zoom, mapa startowa,powiekszanie zasiegiem
	
L.easyButton('<img src="css/images/coffe.png" title="Wpadnij do nas na kawę">', function(btn, map){
			map.flyTo([50.02658, 19.929859],19);
			}).addTo(map);

L.easyButton('<img src="css/images/window_pdf.png" title="Drukuj do PDF">', function(btn, map) {
			window.print()}).addTo(map);

L.control.measure().addTo(map);//pomair odleglosci powierzchni



const wfsUrl='http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&'
const OrtoGugikURL="ORTOFOTO_GUGIK/{z}/{x}/{y}.jpg";
const wmsUrlKatolik='http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/wms?';

const wojewodztwo = L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:PG_P_wojewodztwa',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 5,
	maxZoom: 9,
	}).addTo(map);

const diecezja= L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:diecezje',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 5,
	maxZoom: 9,
	}).addTo(map);

const dekanat = L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:dekanaty',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 5,
	maxZoom: 9,
}).addTo(map);
const parafie= L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:PG_P_parafie',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 10,
	maxZoom: 19,
}).addTo(map);

const koscioly_GR= L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:koscioly_GR',
	format: 'image/png8',
	transparent: true,
	opacity: 1,
	minZoom: 9,
	maxZoom: 19,
	}).addTo(map);

const kaplica= L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:kaplica',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 9,
	maxZoom: 19,
}).addTo(map);

const cmentarzBdot=L.tileLayer.wms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:ot_kusc_a',
	format: 'image/png8',
	transparent: true,
	opacity: 0.8,
	minZoom: 9,
	maxZoom: 19,
}).addTo(map);

//************* 
const pa_dolnoslaskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_dolnoslaskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_kujawsko_pomorskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_kujawsko_pomorskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_lubelskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_lubelskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_lubuskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_lubuskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_lodzkie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_lodzkie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_malopolskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_malopolskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_mazowieckie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_mazowieckie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_opolskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_opolskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_podkarpacie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_podkarpacie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_pomorskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_pomorskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_slaskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_slaskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_swietokrzyskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_swietokrzyskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_warminsko_mazurskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_warminsko_mazurskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
})

const pa_wielkopolskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_wielkopolskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});

const pa_zachodniopomorskie=L.tileLayer.betterWms(wmsUrlKatolik, {
	layers: 'PG_Portal_katolika:pa_zachodniopomorskie',
	format: 'image/png',
	transparent: true,
	opacity: 0.8,
	minZoom: 16,
	maxZoom: 19,
});



//-------------------------------------------------------------------------------------
let cornerone=L.latLng(50.18, 19.32);
let cornertwo=L.latLng(50.47, 19.93);
let layerGeojson;

						
const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	attribution: '&copy; <a href="https://www.google.com">Google 2024</a>'
});
const googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
	maxZoom: 20,
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
	attribution: '&copy; <a href="https://www.google.com">Google 2024</a>'
});
		
const googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
		maxZoom: 22,
		subdomains:['mt0','mt1','mt2','mt3'],
		attribution: '&copy; <a href="https://www.google.com">Google 2024</a>'
		});
		
const openStreet=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 20,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//-------------------------------------------------------------------------------------


const TMCEicon = L.icon({
	iconUrl: 'css/images/logoTMCE min.png',
	iconSize: [20, 30],
	iconAnchor: [20, 20],
	popupAnchor: [0, -20],	
});

const beztla = L.tileLayer('',{maxZoom: 20});	
const TMCEmarker = L.marker([50.02658, 19.929859], {
	icon: TMCEicon})
	.addTo(map)
	.bindPopup("<h3>Już za niedługo to będzie najlepszy portal mapowy na świecie;)</h3> <center><img src='./css/images/champions2.jpg'/><center>");

//komponenty skali mapy
L.control.scale({
  imperial: false,
	})
	.addTo(map);
	
map.addControl(new L.Control.SwitchScaleControl({
    updateWhenIdle: true,
    scales: [1000, 2000, 5000, 10000, 25000, 50000, 100000, 200000, 500000]
        }));
      
var baseLayers = {
 	"Google Hybryda": googleHybrid,
	"Google Streets": googleStreets,
	"OpenStreet": openStreet,
	"Brak": beztla
};

//-----------------------------------------------------------------------------------------------------------------
/*var baseLayers = {
	"Google Hybryda": googleHybrid,
	"Google Streets": googleStreets,
    "OpenStreet": openStreet,
    "Brak": beztla
};
*/
var groupedOverlays= {
   "TMCE": {
		   "<img src='legenda/TMCE_pinezka.png' align='center' style='margin:3px'>Pinezka TMCE</img>": TMCEmarker},
   "GRANICE ADMINISTRACYJNE": {
		   "<img src='legenda/wojewodztwa.png'  style='margin:3px;vertical-align:middle'>Wojwództwa</img>": wojewodztwo,
		   "<img src='legenda/gminy.png'  style='margin:3px;vertical-align:middle'>Diecezje</img>": diecezja,
		   "<img src='legenda/powiat.png'  style='margin:3px;vertical-align:middle'>Dekanaty</img>": dekanat,
		   "<img src='legenda/parafia.png' style='margin:3px;vertical-align:middle'>Parafie</img>": parafie,
		   },
   "OBIEKTY SAKRALNE":{
	   "<img src='legenda/kosciol.png' style='margin:3px;vertical-align:middle'>Kościoly</img>": koscioly_GR,
	   "<img src='legenda/kosciol.png' style='margin:3px;vertical-align:middle'>Cmentarz</img>": cmentarzBdot,
	   "<img src='legenda/kosciol.png' style='margin:3px;vertical-align:middle'>Kaplice</img>": kaplica
	   
   },
   "GEODEZJA":{
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>dolnośląskie</img>":pa_dolnoslaskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>kujawsko-pomorskie</img>":pa_kujawsko_pomorskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>lubelskie</img>":pa_lubelskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>lubuskie</img>":pa_lubuskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>łódzkie</img>":pa_lodzkie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>małopolskie</img>":pa_malopolskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>mazowieckie</img>":pa_mazowieckie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>opolskie</img>":pa_opolskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>podkarpackie</img>":pa_podkarpacie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>pomorskie</img>":pa_pomorskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>śląskie</img>":pa_slaskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>świętokrzyskie</img>":pa_swietokrzyskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>warmińsko-mazurskie</img>":pa_warminsko_mazurskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>wielkopolskie</img>":pa_wielkopolskie,
		"<img src='legenda/adresy.png' style='margin:3px;vertical-align:middle'>zachodniopomorskie</img>":pa_zachodniopomorskie
   }
};
L.control.groupedLayers(baseLayers, groupedOverlays).addTo(map);

function LayerTMCE(){
   let group_1=document.querySelector("#leaflet-control-layers-group-1 > label.leaflet-control-layers-group-label > input");
   group_1.setAttribute("checked","true");
};
//-----------------------------------------------------------------------------------------------------------------

function LayerTMCE(){
	let group_1=document.querySelector("#leaflet-control-layers-group-1 > label.leaflet-control-layers-group-label > input");
	group_1.setAttribute("checked","true");
};

//--------------------------------------------------------------------------------------------------------

function LayerAdministrationDisabled() {
	let group_2 = document.getElementById("leaflet-control-layers-group-2");
	let groupLabel = document.querySelector("#leaflet-control-layers-group-2 > label.leaflet-control-layers-group-label > input");
	
	let labelwoj = document.querySelector("#leaflet-control-layers-group-2 > label:nth-child(2) > input");
	let labeldiec = document.querySelector("#leaflet-control-layers-group-2 > label:nth-child(3) > input");
	let labeldek = document.querySelector("#leaflet-control-layers-group-2 > label:nth-child(4) > input");
	let labelpar = document.querySelector("#leaflet-control-layers-group-2 > label:nth-child(5) > input");
	
	groupLabel.checked=false;
	
	labelwoj.checked=false;
	labeldiec.checked=false;
	labeldek.checked=false;
	labelpar.checked=false;

	labelwoj.setAttribute("disabled", "true");
	labeldiec.setAttribute("disabled", "true");
	labeldek.setAttribute("disabled", "true");
	//labelpar.setAttribute("disabled", "false");
	group_2.style.color=("#999");
	//labelObreb.style.color=("#333");
};

function LayerAdministrationEnabled() {
	let group_2 = document.getElementById("leaflet-control-layers-group-2");
	const labels=document.querySelectorAll("#leaflet-control-layers-group-2>label>input");
	console.log({labels})
	labels.forEach(label=>{
		label.removeAttribute("disabled", "true");
		if (label.checked!=true) {
			label.click()};
		//label.checked=true;
		label.style.color=("#333");
	});
	group_2.style.color=("#333");
	};

//--------------------------------------------------------------------------------------------------------	
	function LayerOBSAKDisabled() {
		let group_3 = document.getElementById("leaflet-control-layers-group-3");
		let labels = document.querySelectorAll("#leaflet-control-layers-group-3 > label > input");
		labels.forEach(label =>{
			if(label.checked!=false){
				label.click()
			};
			label.setAttribute("disabled","true")
		})
		group_3.style.color=("#999");
	};
	
	function LayerOBSAKEnabled() {
		let group_3 = document.getElementById("leaflet-control-layers-group-3");
		const labels = document.querySelectorAll("#leaflet-control-layers-group-3 >label>input");
		labels.forEach((label) =>{
			label.removeAttribute("disabled","true");	
			if(label.checked===false){label.click()};
					
		});
		group_3.style.color=("#333");
	};
//---------------------------------------------------------------------------------------------------------
function LayerGEODEZJADisabled() {
	let group_4 = document.getElementById("leaflet-control-layers-group-4");
	let labels = document.querySelectorAll("#leaflet-control-layers-group-4 > label > input");
	labels.forEach(label =>{
		if(label.checked!=false){
			label.click()
		};
		label.setAttribute("disabled","true")
	})
	group_4.style.color=("#999");
};

function LayerGEODEZJAEnabled() {
	let group_4 = document.getElementById("leaflet-control-layers-group-4");
	const labels = document.querySelectorAll("#leaflet-control-layers-group-4 >label>input");
	labels.forEach((label) =>{
		label.removeAttribute("disabled","true");	
		if(label.checked===false){label.click()};
				
	});
	group_4.style.color=("#333");
};
//---------------------------------------------------------------------------------------------------------


LayerTMCE();
LayerAdministrationEnabled();
LayerOBSAKEnabled();
LayerGEODEZJADisabled();

map.on("zoomend", function (e) {
	let currentzoom = map.getZoom();
	console.log(currentzoom);
	if (currentzoom > 8 && currentzoom<=11) {
		LayerOBSAKEnabled()
		LayerGEODEZJAEnabled();
		}
	else if(currentzoom>11){
		LayerAdministrationDisabled();
		LayerOBSAKEnabled();
		LayerGEODEZJAEnabled();
	}
	else {
		LayerAdministrationEnabled();
		LayerOBSAKDisabled();
		LayerGEODEZJADisabled();
		}
});
// obsługa róznych układów współrzędnych
map.on("mousemove", function (e) {
	const markerPlaceWGS84 = document.querySelector(".wgs84");
	const markerPlacePozostale = document.querySelector(".pozostaleWSP");
	const crs1992proj = "+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
	let crs1992 = proj4(crs1992proj, [e.latlng.lng, e.latlng.lat]);
	const crs2000s6proj = "+proj=tmerc +lat_0=0 +lon_0=18 +k=0.999923 +x_0=6500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
	let crs2000s6 = proj4(crs2000s6proj, [e.latlng.lng, e.latlng.lat]);
	const crs2000s7proj = "+proj=tmerc +lat_0=0 +lon_0=21 +k=0.999923 +x_0=7500000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs";
	let crs2000s7 = proj4(crs2000s7proj, [e.latlng.lng, e.latlng.lat]);
	const crs1965s1proj = "+proj=sterea +lat_0=50.625 +lon_0=21.08333333333333 +k=0.9998 +x_0=4637000 +y_0=5467000 +ellps=krass +towgs84=33.4,-146.6,-76.3,-0.359,-0.053,0.844,-0.84 +units=m +no_defs";
	let crs1965s1 = proj4(crs1965s1proj, [e.latlng.lng, e.latlng.lat]);
	let x = e.latlng.lat;
	let y = e.latlng.lng;
	let selectedUkladEl = document.getElementById("wybierzUklad").value;

	if (selectedUkladEl == 'PUWG1992') {
		markerPlacePozostale.innerHTML = crs1992[0].toFixed(2) + ', ' + crs1992[1].toFixed(2)
	}
	else if (selectedUkladEl == '2000s6') {
		markerPlacePozostale.innerHTML = crs2000s6[0].toFixed(2) + ',  ' + crs2000s6[1].toFixed(2)
	}
	else if (selectedUkladEl == '2000s7') {
		markerPlacePozostale.innerHTML = crs2000s7[0].toFixed(2) + ',  ' + crs2000s7[1].toFixed(2)
	}
	else if (selectedUkladEl == '1965s1') {
		markerPlacePozostale.innerHTML = crs1965s1[0].toFixed(2) + ',  ' + crs1965s1[1].toFixed(2)
	}
	markerPlaceWGS84.innerHTML = '<span style="font-weight:700">WGS 84	</span>' + '<span style="font-weight:700">X: </span>' + x.toFixed(6) + '<span style="font-weight:700"> Y: </span>' + y.toFixed(6)
/*'<span style="font-weight:700">PUWG1992: </span>'+crs1992[0].toFixed(2)+',   '+crs1992[1].toFixed(2);*/	
});

//zwijanie rozwijanie grupy warstw
const labelsPRG=document.querySelectorAll("#leaflet-control-layers-group-2 > label:nth-child(n+2)");
const labelsOBSAK=document.querySelectorAll("#leaflet-control-layers-group-3 > label:nth-child(n+2)");
const labelsGEODEZJA=document.querySelectorAll("#leaflet-control-layers-group-4 > label:nth-child(n+2)");

const buttonPRG=document.createElement("div");
buttonPRG.classList="up down";
const checkBoxPRG=document.querySelector("#leaflet-control-layers-group-2");
checkBoxPRG.before(buttonPRG);

const buttonOBSAK=document.createElement("div");
buttonOBSAK.classList="up down";
const checkBoxOBSAK=document.querySelector("#leaflet-control-layers-group-3");
checkBoxOBSAK.before(buttonOBSAK);

const buttonGEODEZJA=document.createElement("div");
buttonGEODEZJA.classList="up down";
const checkBoxGEODEZJA=document.querySelector("#leaflet-control-layers-group-4");
checkBoxGEODEZJA.before(buttonGEODEZJA);

function zwinLayersGroup(layersGroup){
	layersGroup.forEach(label=>label.style.display="none");
};

function rozwinLayersGroup(layersGroup){
	layersGroup.forEach(label=>label.style.display="block");
};

function toggleLayersGroup(btnLayerGroup,layersGroup){
	btnLayerGroup.classList.toggle("up");
	if (btnLayerGroup.className==="down"){
		zwinLayersGroup(layersGroup);
	}
	else {rozwinLayersGroup(layersGroup);

	}
};

buttonPRG.addEventListener("click", ()=>{toggleLayersGroup(buttonPRG,labelsPRG)});
buttonOBSAK.addEventListener("click", ()=>{toggleLayersGroup(buttonOBSAK,labelsOBSAK)});
buttonGEODEZJA.addEventListener("click", ()=>{toggleLayersGroup(buttonGEODEZJA,labelsGEODEZJA)});



//--------------------------
// kontroler warstw on/off
const buttonPokaz=document.querySelector(".pokaz");
const zawartoscMapy=document.querySelector(".leaflet-control-layers");
buttonPokaz.addEventListener("click", ()=>{
	buttonPokaz.classList.toggle("ukryjLayers");
	zawartoscMapy.classList.toggle("ukryj-leaflet-control");
	if(buttonPokaz.classList.contains("ukryjLayers")){
		buttonPokaz.style.backgroundColor="salmon";
	}else{
		buttonPokaz.style.backgroundColor="sandybrown";
	};
});


/*Api pogoda*/
async function getWeather(){
	const temperatureEl=document.querySelector(".temperatura");
	const zachmurzenieEl=document.querySelector(".weather-icon")
	let urlWeather='https://api.open-meteo.com/v1/forecast?latitude=41.90&longitude=12.45&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m';
	const response= await fetch(urlWeather);
	console.log(response);
	const data= await response.json();
		temperatureEl.innerHTML=data.current_weather.temperature+'°C';
		let weatherCode=data.current_weather.weathercode;
		if(weatherCode=='0' || weatherCode=='1'){
			zachmurzenieEl.src="css/images/clear.png"}
		else if (weatherCode=='2'){
			zachmurzenieEl.src="css/images/mist.png"}
		else if(weatherCode== '3'){
			zachmurzenieEl.src="css/images/cloud.png"}		
		else if(weatherCode>60 && weatherCode<70){
			zachmurzenieEl.src="css/images/rain.png"}
		else if(weatherCode='80'||weatherCode== '81'||weatherCode== '82'||weatherCode== '95'||weatherCode== '96'||weatherCode== '99'){
			zachmurzenieEl.src="css/images/rain.png"}
		else if(weatherCode=='45'||weatherCode=='48'){
			zachmurzenieEl.src="css/images/fog.png"}
		else if(weatherCode='71'||weatherCode== '73'||weatherCode== '75'||weatherCode== '77'||weatherCode== '85'||weatherCode== '86'){
			zachmurzenieEl.src="css/images/snow.png"}
		else if(weatherCode='51'||weatherCode== '53'||weatherCode== '55'||weatherCode== '56'||weatherCode== '57'){
			zachmurzenieEl.src="css/images/rain.png"}	
};
getWeather();
setInterval(getWeather,3600000);	


// Stop "click" na mapie dla contenerów:
const headerEl=document.getElementById("header");
const leftpanelEl=document.getElementById("leftpanel");
const szukajBtnEl=document.getElementById("szukaj");

//-------------------------------------------------------------------------------------
// Adresy
const leftpanelAdres=document.getElementById("leftpanelAdres");
const leftpanelSzukajAdres=document.getElementById("szukaj_adres");
//-------------------------------------------------------------------------------------
// Adresy
const leftpanelAdresAjax=document.getElementById("leftpanelAdres_ajax");
const leftpanelSzukajAdresAjax=document.getElementById("szukaj_adres_ajax");
//-------------------------------------------------------------------------------------

const coordinatesEl=document.getElementById("arek");

L.DomEvent.disableScrollPropagation(zawartoscMapy); 
L.DomEvent.disableClickPropagation(headerEl);
L.DomEvent.disableClickPropagation(leftpanelEl)
L.DomEvent.disableClickPropagation(szukajBtnEl);

//-------------------------------------------------------------------------------------
// Adresy
L.DomEvent.disableClickPropagation(leftpanelAdres)
L.DomEvent.disableClickPropagation(leftpanelSzukajAdres);
L.DomEvent.disableClickPropagation(leftpanelAdresAjax)
L.DomEvent.disableClickPropagation(leftpanelSzukajAdresAjax);
//-------------------------------------------------------------------------------------

L.DomEvent.disableClickPropagation(coordinatesEl);
/*L.DomEvent.on(leftpanel3El, 'click', function (ev) {
    L.DomEvent.stopPropagation(ev);
});*/

//PRG wyszukiwarka przez WFS
const akceptujGminaEl=document.querySelector("div.gmina > button.akceptuj");
const akceptujObrebEl=document.querySelector("div.obreb > button.akceptuj");
akceptujGminaEl.addEventListener("click", getGeometryGmina);
akceptujObrebEl.addEventListener("click", getGeometryObreb);

const selectElObreb=document.querySelector(".js-lista-obreby");

const selectElGmina= document.querySelectorAll(".js-lista-gmin");
selectElGmina.forEach((item)=>{item.addEventListener("change", ()=>{
	(layerGeojson) ? layerGeojson.remove():null;
	selectElObreb.removeAttribute("disabled");
	generateObrebOptionsHtml();
})});

//-------------------------------------------------------------------------------------
// Adresy
// Adresy wyszukiwarka 
const akceptujWojEl=document.querySelector("div.wojewodztwo > button.akceptuj");
akceptujWojEl.addEventListener("click", getGeometryWojewodztwo);

const akceptujWojElAjax=document.querySelector("div.tmp > button.akceptuj");
akceptujWojElAjax.addEventListener("click", getGeometryWojewodztwoAjax);

//const selectElWoj= document.querySelectorAll(".js-lista-wojewodztw");
//console.log ({selectElWoj});

const selectElWojAjax = document.querySelectorAll(".wojewodztwo_ajax select.js-lista-wojewodztw_ajax");
console.log({ selectElWojAjax });


//**********************************************************************
// Użycie google do wyszukania i Routing do trasy 
//**********************************************************************

// Inicjalizacja biblioteki jQuery UI Autocomplete
$(function() {
	var input = $("#punktStartTrasa_google");
	console.log({input});
  
	// Wybór pola, dla którego ma być używane autouzupełnianie
	wyszukajPo3Literach(input,'start_g');
  
	// Dodatkowe nasłuchiwanie zdarzenia wpisywania
	input.on('input', function() {
	  wyszukajPo3Literach(input,'start_g');
	});
  });

// Inicjalizacja biblioteki jQuery UI Autocomplete
$(function() {
	var input = $("#punktEndTrasa_google");
	console.log({input});
  
	// Wybór pola, dla którego ma być używane autouzupełnianie
	wyszukajPo3Literach(input,'end_g');
  
	// Dodatkowe nasłuchiwanie zdarzenia wpisywania
	input.on('input', function() {
	  wyszukajPo3Literach(input,'end_g');
	});
  });
//--------------------------------------------------------------

function wyszukajPo3Literach(input,rodz_mark) {
	//var address = input.value;

	var address = input.val(); // Pobierz aktualną wartość pola
	if (address.length >= 3) {

		var geocoder = new google.maps.Geocoder();

	  	geocoder.geocode({ address: address }, function(results, status) {
			if (status === 'OK') {
				console.log ('status === OK')
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
				
				// Wyświetl nowy znacznik
				//var marker = L.marker([lat, lng]).addTo(map);
				if (rodz_mark === 'start_g'){

					var marker = L.marker([lat, lng], {
						title: 'start_g' // nazwa wyświetlana w popupie
					  }).addTo(map);

					// Ustaw widok mapy na nową lokalizację
					map.setView([lat, lng],17);
					x_start_g = lat;
					y_start_g = lng ;
					
					if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
						console.log("wywolanie wyznacz trase w Start")
						wyznacz_trase_G();
					}
				} 
				else {
					var marker = L.marker([lat, lng], {
						title: 'end_g' // nazwa wyświetlana w popupie
					}).addTo(map);
					// Ustaw widok mapy na nową lokalizację
					map.setView([lat, lng],17);

					x_end_g = lat;
					y_end_g = lng ;
					
					if (x_start_g > 0 &&  x_end_g > 0 &&  y_start_g > 0 &&  y_end_g){
						console.log("wywolanie wyznacz trase w End")
						wyznacz_trase_G();
					}
				}
			}
			else {
				console.error('Błąd wyszukiwania adresu:', status);
			}
	  	});
	}
}
// -----------------modul OPISOWKA------------------------
const btnModulOpisowkaOn=document.getElementById("opisowka");
const btnModulMapaOn=document.getElementById("powrot");
const modulMapa=document.getElementById("map");
const modulOpisowka=document.getElementById("grid");
btnModulOpisowkaOn.addEventListener("click",modulOpisowkaOn);
btnModulMapaOn.addEventListener("click",modulOpisowkaOf)

function modulOpisowkaOn(){
	(layerGeojson) ? layerGeojson.remove():null;
	modulMapa.style.visibility="hidden";
	modulOpisowka.style.display="block";
}
function modulOpisowkaOf(){
	modulMapa.style.visibility="visible";
	modulOpisowka.style.display="none";
}

