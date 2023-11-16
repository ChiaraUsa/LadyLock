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
             console.log(rta)
         },
         error: function(xhr, status) {
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}