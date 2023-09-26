function enviarSolicitud() {
    var nombre = document.getElementById("nombre").value;
    var marca = document.getElementById("marca").value;
    var modelo = document.getElementById("modelo").value;
    var color = document.getElementById("color").value;
    var descripcion = document.getElementById("descripcion").value;

    // Aquí puedes realizar la lógica para enviar los datos a la plataforma externa
    // Puedes utilizar la función fetch o una biblioteca como Axios para realizar la solicitud AJAX

    // Ejemplo usando fetch:
    fetch('https://api.externa.com/solicitud-vehiculo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: nombre,
            marca: marca,
            modelo: modelo,
            color: color,
            descripcion: descripcion
        })
    })
    .then(response => response.json())
    .then(data => {
        // Aquí puedes manejar la respuesta de la plataforma externa
        console.log(data);
    })
    .catch(error => {
        console.error('Error al enviar la solicitud:', error);
    });
}