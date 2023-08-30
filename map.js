// Crea un mapa en el div con id "map"
var map = L.map('map').setView([0, 0], 2); // Centrado en latitud 0, longitud 0, y zoom 2

// Agrega una capa de mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Obtiene la ubicación del usuario y agrega un marcador en el mapa
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    var userMarker = L.marker([lat, lng]).addTo(map);
    userMarker.bindPopup("Tu ubicación").openPopup();

    map.setView([lat, lng], 15); // Cambia la vista del mapa a la ubicación del usuario
  }, function() {
    // Manejo de errores
    alert('No se pudo obtener la ubicación');
  });
} else {
  alert('La geolocalización no es compatible con este navegador.');
}
