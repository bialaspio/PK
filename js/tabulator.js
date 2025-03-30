let buttonElDel=document.querySelector(".delete");
let selectedEl=document.getElementById("wybierz-warstwe-opisowka");
let buttonRaportEl=document.querySelector(".raport");
let buttonZblizEl=document.getElementById("zbliz-do");
selectedEl.addEventListener("change",generujRaport);
buttonZblizEl.addEventListener("click", GetSelectedData);
//let JEWykres=['121203_2','121204_2','121205_5','121206_2'];

function generujRaport(){
    if(selectedEl.value=='dekanaty'){
        renderObreby();}
  else if(selectedEl.value=='koscioly_ploly'){
        renderDzialki();}
 
  else if(selectedEl.value=='diecezje'){renderGminy();}
 
  
  };

//define data array
var tabledata = [
{"name": "Diecezja rzeszowska", "denominati": "roman_catholic", "website": "https://diecezja.rzeszow.pl"},
{"name": "Archidiecezja przemyska", "denominati": "roman_catholic", "website": "https://przemyska.pl"},
{"name": "Diecezja zamojsko-lubaczowska", "denominati": "roman_catholic", "website": ""},
];

var table = new Tabulator("#example-table", {
    data:tabledata,           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that don't fit on the table
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"true",       //paginate the data
    locale:"pl",
    langs:{
        "pl":{
            "pagination":{
            	"page_size":"Rozmiar:", //label for the page size select element
                "page_title":"Show Page",//tooltip text for the numeric page button, appears in front of the page number (eg. "Show Page" will result in a tool tip of "Show Page 1" on the page 1 button)
                "first":"Pierwszy", //text for the first page button
                "first_title":"Pierwsza strona", //tooltip text for the first page button
                "last":"Ostatni",
                "last_title":"Ostatnia strona",
                "prev":"Poprzedni",
                "prev_title":"Poprzednia strona",
                "next":"Następny",
                "next_title":"Następna strona",
                "all":"All",
                "counter":{
                    "showing": "Wyświetlono",
                    "of": "z",
                    "rows": "wierszy",
                    "pages": "pages",
                }
            },           
            }   
    },
    
    paginationSize:15,
	paginationSizeSelector:[15, 25,50, 75, 100],         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    movableColumns:true,      //allow column order to be changed
    selectable:true,
    initialSort:[             //set the initial sort order of the data
        {column:"name", dir:"asc"},
    ],
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"NAZWA", field:"name", headerFilter:"input"},
        {title:"RELIGIA", field:"denominati",  headerFilter:"input"},
        {title:"WWW", field:"website",  headerFilter:"input"}
    ],
});


function renderGminy(){
    columnsGminy=[{title:"NAZWA", field:"name", headerFilter:"input"},
    {title:"RELIGIA", field:"denominati",  headerFilter:"input"},
    {title:"WWW", field:"website", headerFilter:"input"}
    ];
    table.setColumns(columnsGminy);
    table.setData(tabledata)
}

async function renderObreby(){
    preloader.style.zIndex= "12010";
    const url='http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=2.0.0&request=GetFeature&typeName=PG_Portal_katolika%3Adekanaty&outputFormat=application%2Fjson&srsName=epsg:4326';
    const response=await fetch(url);
    const obreby=await response.json();
    console.log(obreby);
    let obrebyGeoserver=obreby.features.map(feature=>feature.properties);
    
    console.log(obrebyGeoserver);
    
    const columnsObreby=[
        {title:"DEKANAT", field:"name",headerFilter:"input"},
        {title:"DIECEZJA", field:"diocese",headerFilter:"input"}
            ];
    preloader.style.zIndex= "-2";
    table.setColumns(columnsObreby);
    table.setData(obrebyGeoserver);
    table.setLocale("pl");

    //wykres
   /* let filterObrebyGeoserver=[...obrebyGeoserver];
    console.log(filterObrebyGeoserver); 
    let newdataWykres=[];
    for(const i of JEWykres ){
        console.log(`'${i}'`);
   let ileObiektow=filterObrebyGeoserver.filter(el=>el.TERYT.substring(0,8)==i).length;
   newdataWykres.push(ileObiektow);
   chart.data.datasets[0].data=newdataWykres;
   chart.data.datasets[0].label='ilość obrębów';
   chart.update();
   }*/
};

async function renderDzialki() {
    preloader.style.zIndex = "12010";
    const url = 'http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/wfs?service=wfs&version=2.0.0&request=GetFeature&typeName=PG_Portal_katolika%3Akoscioly_poin&outputFormat=application%2Fjson&srsName=epsg:4326';
    const response = await fetch(url);
    console.log(response);
    const dzialki = await response.json();
    const dzialkiGeoserver = dzialki.features.map(feature => feature.properties);
    const columnsObreby = [
        { title: "ID", field: "lokalnyid", headerFilter: "input" },
        { title: "Nazwa BDOT", field: "info_dodat", headerFilter: "input" },
        { title: "Nazwa OSM", field: "osm_name", headerFilter: "input" },
        { title: "Diecezja", field: "osm_diocese", headerFilter: "input" },
        { title: "Dekanat", field: "osm_deanery", headerFilter: "input" }  
    ];
    preloader.style.zIndex = "-2";
    table.setColumns(columnsObreby);
    table.setData(dzialkiGeoserver);
    //wykres
    /*let filterDzialkiGeoserver = [...dzialkiGeoserver];
    console.log(filterDzialkiGeoserver);
    let newdataWykres = [];
    for (const i of JEWykres) {
        console.log(`'${i}'`);
        let ileObiektow = filterDzialkiGeoserver.filter(el => el.ID_DZIALKI.substring(0, 8) == i).length;
        newdataWykres.push(ileObiektow);
        chart.data.datasets[0].data = newdataWykres;
        chart.data.datasets[0].label = 'ilość działek';
        chart.update();
    }*/
};


function GetSelectedData(){ 
    let selectedLayerGrid=document.getElementById("wybierz-warstwe-opisowka").value;
    console.log(selectedLayerGrid);
    let cqlFilter='';
    let selectedData = table.getSelectedData();
    preloader.style.zIndex= "12010";
    console.log(preloader);
    console.log(selectedData);
    let str='';
    
    for (const element of selectedData){
        if(selectedLayerGrid==='diecezje'){
            str+=`'${element.name}',`;
        }
        else if(selectedLayerGrid==='dekanaty'){
            str+=`'${element.name}',`;
         console.log(str);}  
         else if(selectedLayerGrid==='koscioly_ploly'){
            str+=`'${element.lokalnyid}',`;
         console.log(str);
         }     
    } 
    let idSelected='('+str.slice(0,-1)+')';
    console.log(idSelected);
    if(selectedLayerGrid==='diecezje'){
        cqlFilter=`name%20in%20${idSelected}`
    }
    else if(selectedLayerGrid==='dekanaty'){
        cqlFilter=`name%20in%20${idSelected}`
    }
    else if(selectedLayerGrid==='koscioly_ploly'){
        cqlFilter=`lokalnyid%20in%20${idSelected}`
    }
   
    let urlWFSObreb=`http://geoportal.tmce.pl:8080/geoserver/PG_Portal_katolika/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=${cqlFilter}&typeName=PG_Portal_katolika%3A${selectedLayerGrid}&maxFeatures=20&outputFormat=application%2Fjson&srsName=epsg:4326`;
    console.log(urlWFSObreb);
    http://geoportal.tmce.pl:8080/geoserver/Krakow_Arek/ows?service=WFS&version=1.0.0&request=GetFeature&CQL_FILTER=JPT_KOD_JE='${selectELGmina}'&typeName=Krakow_Arek%3Agminy&maxFeatures=10&outputFormat=application%2Fjson&srsName=epsg:4326

    $.getJSON(urlWFSObreb).then((res)=>{
        preloader.style.zIndex= "-2";
        console.log(preloader);
        console.log(res.features[0].id);
        layerGeojson=L.geoJson(res,{
            style: {color: "#f4a460"}
        }).bindPopup("<h4>Nie pamiętasz co zaznaczyłeś w opisówce?<br> To tam wróć<h4><center><img style='width:50px' src='./css/images/emotikon.svg'/><center>").addTo(map);}).then(()=>{
            map.fitBounds(layerGeojson.getBounds());
            modulOpisowkaOf()})};



table.on("rowSelectionChanged", function(data, rows, selected, deselected){
    console.log(rows.length);
    if(rows.length>0){
        console.log("jest");
        buttonZblizEl.removeAttribute("disabled", "true");
    buttonZblizEl.classList.remove("inactive");
    }
    else{ buttonZblizEl.setAttribute("disabled", "true");
    buttonZblizEl.classList.add("inactive");
    }
});

/*wykres pokaz/ukryj
const buttonWykres=document.querySelector(".statystyka")
buttonWykres.addEventListener("click",wykresToggle);
function wykresToggle(){
    let wykresEl=document.querySelector("#wykres");
    wykresEl.classList.toggle("wykres-hidden");
    if(wykresEl.classList.contains("wykres-hidden")){buttonWykres.style.backgroundColor="salmon"}
    else{buttonWykres.style.backgroundColor="#007bb2"}
}*/

