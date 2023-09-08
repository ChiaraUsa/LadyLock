// Referencias a los elementos HTML
var mostrarMapaButton = document.getElementById('mostrarMapa');
var mapContainer = document.getElementById('map-container');
var helpContainer = document.getElementById("help-container");
var helpContainer2 = document.getElementById("help-container2");
var botonUnirse = document.getElementById('comunicar');

// Función para mostrar el mapa
function mostrarMapa() {
  if (mapContainer.style.display === "none") {
      // Mostrar mapa y ocultar contenedor de ayuda
      mapContainer.style.display = "block";
      helpContainer.style.display = "none";
      helpContainer2.style.display = "none";
  } else {
      // Ocultar ambos contenedores
      helpContainer.style.display = "none";
      helpContainer2.style.display = "none";
  }

  // Crea un mapa en el div con id "map"
  var map = L.map('map').setView([0, 0], 2); // Centrado en latitud 0, longitud 0, y zoom 2

  // Agrega una capa de mapa base
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Obtiene la ubicación del usuario y agrega un marcador en el mapa
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
          var lat = position.coords.latitude;
          var lng = position.coords.longitude;

          // Utiliza el servicio de geocodificación de Nominatim para obtener detalles del lugar
          var apiUrl = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

          fetch(apiUrl)
              .then(response => response.json())
              .then(data => {
                  var locationInfo = data.display_name; // Obtiene la información del lugar
                  var userMarker = L.marker([lat, lng]).addTo(map);
                  userMarker.bindPopup(locationInfo).openPopup();
              }).catch(error => {
                console.error('Error en la geocodificación:', error);
            });

        map.setView([lat, lng], 15); // Cambia la vista del mapa a la ubicación del usuario
    }, function () {
        // Manejo de errores
        alert('No se pudo obtener la ubicación');
    });
} else {
    alert('La geolocalización no es compatible con este navegador.');
}
}

function unionGrupo(){
  // Reemplaza 'TU_ENLACE_DE_INVITACIÓN' con el enlace de invitación de tu grupo de WhatsApp
  var enlaceWhatsApp = 'https://chat.whatsapp.com/Ctp0iQVRNXhD3Pi6STCX3y';
  window.location.href = enlaceWhatsApp;
}
// Escucha el clic del botón para mostrar el mapa
mostrarMapaButton.addEventListener('click', mostrarMapa);
botonUnirse.addEventListener('click', unionGrupo);