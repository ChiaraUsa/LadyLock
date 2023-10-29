var chatPage = document.querySelector('#chat-page');
var formulario = document.querySelector('#cont-formulario')

function enviarSolicitud() {
    chatPage.classList.remove('hidden');
    formulario.classList.add('hidden');

    let emergencia = {};
    emergencia.userName = document.querySelector('#name').value
    emergencia.userEmail = localStorage.email
    emergencia.conductorName = document.querySelector("#nombre").value;
    emergencia.marcaAuto = document.querySelector("#marca").value;
    emergencia.modeloAuto = document.querySelector("#modelo").value;
    emergencia.colorAuto = document.querySelector("#color").value;
    emergencia.descripcion = document.querySelector("#descripcion").value;

    $.ajax({
         url:"/api/admin/newEmergencia",
         type:"POST",
         contentType:"application/json",
         data:JSON.stringify(emergencia),
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