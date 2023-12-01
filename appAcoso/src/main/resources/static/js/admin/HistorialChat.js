var misChats = {}

$(document).ready(function() {
    nombresUsuarios();
});

function nombresUsuarios(){
    $.ajax({
         url:"/api/admin/misUsuarios",
         type:"GET",
         headers:{
             "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
             var usuariosDropdown = document.getElementById("usuarioDropdown");
             // Agregamos las nuevas opciones
             for (var i = 0; i < rta.length; i++) {
                 var opcion = document.createElement("option");
                 opcion.value = rta[i];
                 opcion.text = rta[i];
                 usuariosDropdown.add(opcion);
             }
         },
         error: function(xhr, status) {
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}

function filtrar(){
    misChats = {}
    var labelsDiv = document.getElementById('Chats');
    labelsDiv.innerHTML = "";

    var usuarioDropdown = document.getElementById("usuarioDropdown");
    var otroDropdown = document.getElementById("TiempoDropdown");
    var usuarioSeleccionado = usuarioDropdown.value;
    var TiempoSeleccionado = TiempoDropdown.value;

    $.ajax({
         url:"/api/chat/getHistorialChats?userEmail="+usuarioSeleccionado+"&tiempo="+TiempoSeleccionado,
         type:"GET",
         headers:{
             "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
            rta.forEach(function (lista) {
                var p1 = lista[0].sender;
                var p2;
                var p3;
                lista.forEach(function (objeto) {
                    p2 = objeto.sender;
                    if(p1!=p2)
                    {
                        p3 = objeto.sender;
                    }
                });
                misChats[lista[0].chatId] = lista;
                crearCuadros(p1,p3,lista[0].chatId)
            });
         },
         error: function(xhr, status) {
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}

function crearCuadros(p1,p2,chatId){
    var labelsDiv = document.getElementById('Chats');

    var rectangulo = document.createElement('div');
    rectangulo.className = 'rectangulo';

    // Contenido del rectángulo
        rectangulo.innerHTML = `
            <label class="etiqueta">ID chat</label>
            <label class="etiqueta">Participante 1</label>
            <label class="etiqueta">Participante 2</label>
            <label class="etiqueta">${chatId}</label>
            <label class="etiqueta">${p1}</label>
            <label class="etiqueta">${p2}</label>
            <button class="boton" onclick="verChat('${chatId}')">Ver chat</button>
        `;

        labelsDiv.appendChild(rectangulo);
}

function verChat(chatId){
    var mensajes = document.getElementById('mensajes');
    mensajes.innerHTML = "";

    listaMensaje = misChats[chatId];
    var p1 = listaMensaje[0].sender;

    listaMensaje.forEach(function (objeto) {
    // Crear un nuevo elemento div
        var rectangulo = document.createElement("div");
        var p2 = objeto.sender;

        // Establecer estilos y contenido
        rectangulo.style.border = "1px solid #ccc";
        rectangulo.style.padding = "10px";
        rectangulo.style.marginBottom = "10px";

        if(p2!=p1)
        {
            rectangulo.style.textAlign = "right";
            rectangulo.textContent = objeto.content+" :P2";
            rectangulo.style.backgroundColor = "#ffb6c1";
        }else
        {
            rectangulo.style.textAlign = "left";
            rectangulo.textContent = "P1: "+objeto.content;
            rectangulo.style.backgroundColor = "#add8e6";
        }

        // Agregar el nuevo rectángulo al contenedor de mensajes
        mensajes.appendChild(rectangulo);
    });
}