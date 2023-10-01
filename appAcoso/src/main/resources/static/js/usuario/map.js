var mostrarMapaButton = document.getElementById('mostrarMapa');
var helpContainer = document.getElementById("help-container");
var helpContainer2 = document.getElementById("help-container2");
var helpContainer3 = document.getElementById("help-container3");
var helpContainer4 = document.getElementById("help-container4");
var volver = document.getElementById("Volver");

var headers = {
    Authorization: "Bearer "+ Cookies.get('token') // Reemplaza 'tuTokenJWT' con tu token real
};
var stompClient = null;
var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(headers, function(frame) {
            console.log(frame);
            stompClient.subscribe('/all/messages', function(result) {
            });
        });

// Función para mostrar u ocultar el mapa
function toggleMap() {
    var mapContainer = document.getElementById('map');

    if (mapContainer.style.display === "none" || mapContainer.style.display === "") {
        // Mostrar mapa
        mapContainer.style.display = "block";
        mostrarMapa();
        helpContainer4.style.width = '8%';
        helpContainer4.style.marginTop = '10%';
        helpContainer4.style.float = 'left';
        volver.style.display ="block";
    } else {
        // Ocultar mapa
        mapContainer.style.display = "none";
    }
}

// Función para mostrar el mapa
function mostrarMapa() {

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
    helpContainer.style.display = "none";
    helpContainer2.style.display = "none";
    helpContainer3.style.display = "none";
}
