<!DOCTYPE html>
<html lang="pl">
  <head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
	
		<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css"/>
		<link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
		
		<link rel="stylesheet" href="css/preloader.css">
		<link rel="stylesheet" href="css/L.Control.ZoomBar.css">
		<link rel="stylesheet" href="css/easy-button.css">
		<link rel="stylesheet" href="css/leaflet.groupedlayercontrol.css">
		<link rel="stylesheet" href="css/leaflet-search.css">
		<link rel="stylesheet" href="css/L.Control.SwitchScaleControl.css">
		
		<link rel="stylesheet" href="css/L.TileLayer.BetterWMS_tmce.css">
	    <link href="https://unpkg.com/tabulator-tables@5.5.2/dist/css/tabulator.min.css" rel="stylesheet">
	    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.0/jquery.min.js"></script>
		<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />	
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/leaflet-layer-tree@1.0.0/src/L.LayerTreeControl.min.css" />
		<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
		<link rel="stylesheet" href="css/leaflet.measure.css">
		<link rel="stylesheet" href="/resources/demos/style.css" />
		<link rel="stylesheet" href="css/menu_roz_PB.css">
		

		<link rel="stylesheet" href="css/main.css">
	
    <title>Portal mapowy - Test</title>
    <link rel = "icon" href ="legenda/TMCE_logo_min.png">
  </head>
  <body
<!--loader-->
		<div class="preloader">
			<img src="css\images\logoTMCE.png"/>
			<img src="preloader.gif" alt="preloader">
			Chwila cierpliwości... i jest :)
		</div>
<!--opisowka-->
		<div id="grid">
			<header class="header">
				<div class="left-header">
					<img src="css\images\logoTMCE min.png" alt="logoTMCE">
					<a href="http://tmce.pl" target="_blank">
						<div class="text">
							<p class="top-logo">TUKAJ MAPPING</p>
							<p class="bottom-logo">CENTRAL EUROPE</p>
						</div>
					</a>
				</div>
				<div class="title">Dane opisowe - Geoserver</div>
				<div class="right-header">
					<a href="https://www.vatican.va/" target="_blank">
					<img src="css/images/godlo_papieskie.png" alt="logoTMCE">
					</a>
				</div>
			</header>
			<nav>
				<ul>
						<li id="powrot"title="powrót do mapy">Powrót do mapy</li>
						<!--<li class="dropdown">Eksport<div class="dropdown-content">
														<a href="#">PDF</a>
														<a href="#">CSV</a>
											</div>  
						</li>-->
				</ul>     
			</nav>
			<div class="grid-select-layer">
				<label for="warstwa">Warstwa:     </label>
					<select name="warstwa" id="wybierz-warstwe-opisowka">
						<option value="diecezje">Diecezje</option>                          
						<option value="dekanaty">Dekanaty</option>
						<option value="koscioly_ploly">Kościoły</option>                                                               
					</select>
				<button id="zbliz-do" class="powrot inactive" disabled title="Wskaż na mapie">Wskaż na mapie</button>        
			</div>
			<div id="example-table"></div>
			<div id="wykres" class="wykres-hidden"><canvas id="myChart"></canvas></div>
		</div>
<!--mapa-->
		<div id="map">
				<nav id="header">
						<a href="https://www.tmce.pl" title="tmce.pl">
								<img src="css/images/logoTMCE.png"/>
						</a>               
						<div id="leftbar">
								<div class="pogoda">
									<div class="krakow">Watykan</div>
									<div class="zachmurzenie">
										<img src="css\images\cloudpartly.png" class="weather-icon" alt="">
									</div>
									<div class="temperatura">14°C</div>  
								</div>
								<h3 style = "width: 60%; text-align: center;">PORTAL KATOLIKA</h3> 
								<div class="logo-powiat">
									<a href="https://www.vatican.va/" title="https://www.vatican.va/" target="_blank">
									<img src="css/images/godlo_papieskie.png"/>
									</a>
								</div>             
						</div>
						<!--<button id="opisowka" title="Idź do modułu OPISÓWKA" class="btn-opisowka">OPISÓWKA</button>-->
						<button class="pokaz" title="Zwiń/rozwiń panel warstw"><img src="fonts\layer-group-solid.svg"></img></button> 
				</nav>
				
				<div id = "menu_a_t" class = "menu_a_t">
					
					<img src="legenda/lupa.jpg" alt="Lupa" id="lupa" style="width: 26px; height: 26px; ">
					
					<div id="additionalImages">
						<div style="width: 2px;"></div>
						<div id = "find_polygon" style = "width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" >
							<img src="legenda/polska.png" alt="Obraz A" style = "width: 24px; height: 24px;" id="menu_icona">
						</div>
						<div style="width: 5px;"></div>
						<div id = "find_place" style = "width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;">
							<img src="legenda/punkt.png" alt="Obraz B" style = "width: 24px; height: 24px;" id="menu_icona">
						</div>
						<div style="width: 5px;"></div>
						<div id = "find_round" style="width: 30px; height: 30px; display: flex; justify-content: center; align-items: center;" >
							<img src="legenda/droga.png" alt="Obraz C" style="width: 24px; height: 24px;" id="menu_icona">
						</div>
					</div>
					<div style ="width:200px "></div>
					<div id="okno_dialogowe" style ="margin-left:20px ">
					</div>
				</div>	


				<div id="select-polygon" title="Wyszukaj parafie" style="font-size: small;">
					
					<p>Diecezja:</p>
					<div style="display: flex" class = "Diecezja">
						<select id="Diecezja_sel" style="width:200px" class="js-lista-diecazji">
						</select>
						<div style="width: 10px"></div>
						<img src="legenda/zoom_to.png" style="width: 17px; height: 17px;" id="zoom_to_icon_diecezja">
					</div>
					<div style = "height: 5px;"></div>
					<p>Dekanat:</p>
					<div style="display: flex" class = "Dekanat">
						<select id="Dekanat_sel" style="width:200px" class="js-lista-dekanatow">
						</select>
						<div style="width: 10px"></div>
						<img src="legenda/zoom_to.png" style="width: 17px; height: 17px;" id="zoom_to_icon_dekanat">
					</div>

				</div>				
				
				<div id="search-place" title="Wyszukaj miejscowość" style = "font-size: small;">
					<div style="display: flex; height: 20px; text-align: center;"> 
						<div class = "divGeoSerwer" id = "divGeoSerwer" style ="border: 2px solid lightgray; width: 33%; cursor: default ;">GeoSerwer</div>
						<div class = "divAjax" id = "divAjax" style ="border: 2px solid lightgray; width: 33%; cursor: default ">Ajax</div>
						<div class = "divAGoogle" id = "divAGoogle"" style ="border: 2px solid lightgray; width: 33%; cursor: default ">Google</div>
					</div>
					
					<div style = "height: 10px;"></div>

					<div style="display: flex" class = "Wojewodztwo">
						<p >Województwo:</p>
						<select id="Woj_sel" style="width:200px" class="js-lista-wojewodztw" onchange="nowylayer()">
						</select>
					</div>
				
					<div id="divMiejscowc"> 
						<p style = "padding-top: 5px">Miejscowości:</p>
						<input type="text" id="search-input" style ="width:270px">
					</div>

				</div>

				<div id="search-roud" title="Wyszukaj trase" style = "font-size: small;">
					<div style="display: flex; height: 20px; text-align: center;"> 
						<div class = "divGeoSerwer_roud" id = "divGeoSerwer_roud" style ="border: 2px solid lightgray; width: 32%; cursor: default ;">Ajax/OSRM</div>
						<div class = "divAjax_roud" id = "divAjax_roud" style ="border: 2px solid lightgray; width: 35%; cursor: default ">Google/OSRM</div>
						<div class = "divAGoogle_roud" id = "divAGoogle_roud"" style ="border: 2px solid lightgray; width: 32%; cursor: default ">Google</div>
					</div>
					
					<div style = "height: 15px;"></div>
					
					<div style="display: flex; height: 40px; text-align: center;"> 
                        <div class="div_bike" id="div_bike" style="border: 2px solid lightgray; width: 25px; height: 25px; cursor: default; display: flex; justify-content: center; align-items: center;">
							<i class="material-icons" style="font-size: 25px;">directions_bike</i>
                        </div>
						
						<div style = "width: 10px;"></div>

						<div class="div_walk" id="div_walk" style="border: 2px solid lightgray; width: 25px; height: 25px; cursor: default; display: flex; justify-content: center; align-items: center;">
							<i class="material-icons" style="font-size: 25px;">directions_walk</i>
                        </div>
						
						<div style = "width: 10px;"></div>

						<div class="div_car" id="div_car" style="border: 2px solid lightgray; width: 25px; height: 25px; cursor: default; display: flex; justify-content: center; align-items: center;">
							<i class="material-icons" style="font-size: 25px;">directions_car</i> 
                        </div>
						
						<div style = "width: 10px;"></div>

						<div class="div_publicTransport" id="div_publicTransport" style="border: 2px solid lightgray; width: 25px; height: 25px; cursor: default; display: flex; justify-content: center; align-items: center;">
							<i class="material-icons" style="font-size: 25px;">directions_bus</i>
                        </div>

						<div style = "width: 10px;"></div>

						<div class="div_wheelchair" id="div_wheelchair" style="border: 2px solid lightgray; width: 25px; height: 25px; cursor: default; display: flex; justify-content: center; align-items: center;">
						<i class="material-icons" style="font-size: 25px;">accessible</i>
                        </div>
                    </div>

					<div style="display: flex; justify-content: center; align-items: center; height: 70px;">
						<div>
							<p>Start:</p>
							<input type="text" id="start-roud"  name="start-roud" class=" form-control basicAutoComplete" type="text" autocomplete="off" placeholder="Początek trasy" style="width:240px"> 
							<p>Koniec:</p>
							<input type="text" id="end-roud"  name="end-roud" class=" form-control basicAutoComplete" type="text" autocomplete="off" placeholder="Koniec trasy"  style="width:240px"> 
						</div>
						<div style="padding-left: 10px;	padding-top: 18px;">
							<img src="legenda/swap_25x25.png" alt="Swap" style="width: 20px; height: 20px;" id="menu_ico_swap">					
						</div>
					</div>

				</div>

				<div id="arek" class="marker_position">
					<div class="wgs84">WGS 84 X: 50.300000 Y:19.630000  </div>
					
					<div class="pozostaleUklady">
						<select name="" id="wybierzUklad">
							<option value="PUWG1992">PUWG 1992</option>
							<option value="2000s6">PUWG 2000s6</option>
							<option value="2000s7">PUWG 2000s7</option>
							<option value="1965s1">PUWG 1965s1</option>
						</select>
						<div class="pozostaleWSP">566581.50, 240367.52</div>   
					</div>
				</div>

		<script src="js/preloader.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/perliedman-leaflet-control-geocoder/2.4.0/Control.Geocoder.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js"></script>
		<script src="js/proj4-compressed.js"></script>
		<script src="js/L.Control.SwitchScaleControl.js"></script>
		<script src="js/L.Control.ZoomBar.js"></script>
		<script src="js/L.TileLayer.BetterWMS_tmce.js"></script>
		<script src="js/easy-button.js"></script>
		<script src="js/leaflet.groupedlayercontrol.js"></script>
		<script src="js/leaflet-search.js"></script>
		<script src="js/leaflet.measure.js"></script>
		<script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
		<script type="text/javascript" src="https://unpkg.com/tabulator-tables@5.5.2/dist/js/tabulator.min.js"></script>
		<script src="js/tabulator.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
		<script src="http://code.jquery.com/jquery-1.9.1.js"></script>
		<script src="http://code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=&libraries=places"></script>
		<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
		<script src="js/main.js"></script>
		<script src="js/menu_icon_left.js"></script>
  </body>     
</html>
