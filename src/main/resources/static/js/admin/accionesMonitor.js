var headers = {
    Authorization: "Bearer "+ Cookies.get('token') // Reemplaza 'tuTokenJWT' con tu token real
};
var stompClient = null;
var socket = new SockJS('/ws');
stompClient = Stomp.over(socket);
stompClient.connect(headers, function (frame) {
    console.log(frame);
    stompClient.subscribe('/all/messages', function (result) {
        try {
                show(JSON.parse(result.body));
            } catch (error) {
                console.error("Error al procesar el mensaje:", error);
            }
    });
});

// Crea un mapa en el div con id "map"
var map = L.map('map').setView([0, 0], 2); // Centrado en latitud 0, longitud 0, y zoom 2
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var userMarker = null;

function show(message) {
    var locationInfo = message.text;
    var latLng = parseLocationInfo(locationInfo); // Parsea la ubicación

    if (latLng) {
        if (userMarker) {
            map.removeLayer(userMarker); // Elimina el marcador anterior
        }
    
        userMarker = L.marker(latLng).addTo(map);
        userMarker.bindPopup(locationInfo).openPopup();
        map.setView(latLng, 15);
    
        // Mostrar en formato de texto
        var response = document.getElementById('notificaciones');
        var p = document.createElement('p');
        p.innerHTML = "Ubicación: " + locationInfo;
        response.appendChild(p);
    }
}

function parseLocationInfo(locationInfo) {
    // Implementa lógica para analizar la ubicación desde locationInfo
    // Ejemplo: locationInfo tiene el formato "Lat: 123.456, Lng: 78.910"
    var matches = locationInfo.match(/Lat: ([-+]?\d*\.\d+|\d+), Lng: ([-+]?\d*\.\d+|\d+)/);

    if (matches && matches.length >= 3) {
        var lat = parseFloat(matches[1]);
        var lng = parseFloat(matches[2]);
        return [lat, lng];
    }

    return null;
}
