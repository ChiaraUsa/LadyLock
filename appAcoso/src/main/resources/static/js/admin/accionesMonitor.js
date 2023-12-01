var headers = {
    Authorization: "Bearer " + Cookies.get('token')
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

var map = L.map('map').setView([0, 0], 2); // Aquí se mantiene 'map' como el ID del div del mapa

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


var userMarker = null; // Variable para mantener una referencia al marcador del usuario

function show(message) {
    var locationInfo = message.text; // Accede a la propiedad 'text'
    var lat = message.latitude; // Accede a la posición 1 del array numérico
    var lng = message.longitude; // Accede a la posición 2 del array numérico


    // Verifica si lat y lng están definidas
    if (lat !== undefined && lng !== undefined) {
        var latLng = [lat, lng];

        // Mostrar en el mapa
        if (userMarker) {
            map.removeLayer(userMarker); // Elimina el marcador anterior
        }

        userMarker = L.marker(latLng).addTo(map);
        userMarker.bindPopup(locationInfo).openPopup();
        map.setView(latLng, 15);
    }
}

