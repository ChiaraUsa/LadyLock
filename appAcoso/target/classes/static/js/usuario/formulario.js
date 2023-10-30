$(document).ready(function() {
  enviarSolicitud();
});

function enviarSolicitud() {

    $.ajax({
         url:"/api/admin/newEmergencia?userEmail="+localStorage.email,
         type:"POST",
         contentType:"application/json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
             localStorage.idAdmin = rta;
             console.log('Exito al enviar los datos')
         },
         error: function(xhr, status) {
             alert('Error al enviar los datos');
             location.reload();
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });

}