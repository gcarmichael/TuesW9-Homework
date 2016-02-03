var Map = function(latLng, zoomLevel){
  this.googleMap = new google.maps.Map(document.getElementById("map"), {
    center: latLng,
    zoom: zoomLevel
  }),
  this.addMarker = function (latLng, content) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.googleMap,
      content: content
    });
    return marker;
  },
  this.addInfoWindow = function(latLng, content){
    var marker = this.addMarker(latLng, content);
    marker.addListener('click', function(){
      var infoWindow = new google.maps.InfoWindow({
        content: this.content
      });
      infoWindow.open(this.map, marker);
    });
  }
}