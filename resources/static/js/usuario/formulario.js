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

//por si cierra la ventana
window.addEventListener('beforeunload', function (e) {
    $.ajax({
         url:"/api/admin/cierraUsuario?idAdmin="+localStorage.idAdmin,
         type:"POST",
         contentType:"application/json",
         success: function(rta) {
             localStorage.idAdmin = -1;
             window.location.replace("CentroAyuda.html");
         },
         error: function(xhr, status) {
             alert('Admin no existente');
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
});

//por si cambia la ventana
window.addEventListener('popstate', function(event) {

  alert("Se cerrara el chat");

  $.ajax({
       url:"/api/admin/cierraUsuario?idAdmin="+localStorage.idAdmin,
       type:"POST",
       contentType:"application/json",
       success: function(rta) {
           localStorage.idAdmin = -1;
           window.location.replace("CentroAyuda.html");
       },
       error: function(xhr, status) {
           alert('Admin no existente');
       },
       complete: function(xhr, status) {
           //alert('Petición realizada');
       }
    });
});
