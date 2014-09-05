var simpleGoogleMapsApiExample = simpleGoogleMapsApiExample || {};

simpleGoogleMapsApiExample.map = function (mapDiv, latitude, longitude, accuracy) {
  "use strict";

  var createMap = function (mapDiv, coordinates) {
    var mapOptions = {
      center: coordinates,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoom: 15
    };

    return new google.maps.Map(mapDiv, mapOptions);
  };

  var addMarker = function (map, coordinates) {
    var markerOptions = {
      clickable: false,
      map: map,
      position: coordinates
    };

    return new google.maps.Marker(markerOptions);
  };

  var addCircle = function (map, coordinates, accuracy) {
    var circleOptions = {
      center: coordinates,
      clickable: false,
      fillColor: "blue",
      fillOpacity: 0.15,
      map: map,
      radius: accuracy,
      strokeColor: "blue",
      strokeOpacity: 0.3,
      strokeWeight: 2
    };

    return new google.maps.Circle(circleOptions);
  };

  var infoWindowVisible = (function () {
    var currentlyVisible = false;

    return function (visible) {
      if (visible !== undefined) {
        currentlyVisible = visible;
      }

      return currentlyVisible;
    };
  }());

  var addInfoWindowListeners = function (map, marker, infoWindow) {
    google.maps.event.addListener(marker, "click", function () {
      if (infoWindowVisible()) {
        infoWindow.close();
        infoWindowVisible(false);
      } else {
        infoWindow.open(map, marker);
        infoWindowVisible(true);
      }
    });

    google.maps.event.addListener(infoWindow, "closeclick", function () {
      infoWindowVisible(false);
    });
  };

  var addInfoWindow = function (map, marker, address) {
    var infoWindowOptions = {
      content: address,
      maxWidth: 200
    };
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    addInfoWindowListeners(map, marker, infoWindow);

    return infoWindow;
  };

  var initialize = function (mapDiv, latitude, longitude, accuracy) {
    var coordinates = new google.maps.LatLng(latitude, longitude);
    var map = createMap(mapDiv, coordinates);
    var marker = addMarker(map, coordinates);
    var geocoder = new google.maps.Geocoder();

    addCircle(map, coordinates, accuracy);

    geocoder.geocode({
      location: coordinates
    }, function (results, status) {
      if (status === google.maps.GeocoderStatus.OK && results[0]) {
        marker.setClickable(true);
        addInfoWindow(map, marker, results[0].formatted_address);
      }
    });
  };

  initialize(mapDiv, latitude, longitude, accuracy);
};

$(document).ready(function () {
  "use strict";

  simpleGoogleMapsApiExample.map($("#map")[0], 30.733315, 76.77941799999999, 70);
});
