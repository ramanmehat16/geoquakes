// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

var earthQuakeData;
$(document).on("ready", function() {

  // map init
var map = new google.maps.Map(document.getElementById('map'), {
  center: { lat: 37.78, lng: -122.44},
  zoom: 8
});


//ajax and template
var source = $('#features_tmpl').html();

$.ajax({
  type: 'GET',
  url: 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson',
  dataType: 'json',
  success: function(data) {
  	var earthQuakeData = data;

  	features = earthQuakeData['features'];
  	//console.log(features)
     
     //creating template
     var template =Handlebars.compile(source);
     var compiled = template({location : features});
     $('#info').append(compiled);
      
      var coor={lat:0 , lng:0};
       features.forEach(function(point){
    	coor.lat=point.geometry.coordinates[0];
    	coor.lng=point.geometry.coordinates[1];

    	var marker= new google.maps.Marker({
    		position:coor,
    		map:map
    	})
    });
    //celebrate!
  }
});

});