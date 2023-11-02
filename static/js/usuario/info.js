$(document).ready(function() {
  infoUser();
});


function infoUser(){
   $.ajax({
         url : "/api/user/getInfo",
         type : 'GET',
         dataType : 'json',
         headers:{
         	"Authorization": "Bearer "+ Cookies.get('token')
         },
         success : function(rta) {
   			 document.getElementById("txtNombre").value = rta.firstname
   			 document.getElementById("txtID").value = rta.id
   			 document.getElementById("txtRol").value = rta.role
   			 document.getElementById("txtCorreo").value = rta.email
   	     },
         error : function(xhr, status) {
            alert('ha sucedido un problema');
         },
         complete : function(xhr, status) {
            //  alert('Petición realizada');
         }
   });
}

function editarPerfil() {
   var inputs = document.querySelectorAll(".profile-input");
   document.getElementById("txtNombre").removeAttribute("disabled");
   document.getElementById("txtCorreo").removeAttribute("disabled");

   document.querySelector(".save-button").removeAttribute("disabled");
}

function guardarPerfil() {
   var inputs = document.querySelectorAll(".profile-input");
   for (var i = 0; i < inputs.length; i++) {
      inputs[i].setAttribute("disabled", "true");
   }
   document.querySelector(".save-button").setAttribute("disabled", "true");

   let datos = {};

   datos.name = document.querySelector('#txtNombre').value
   datos.email = document.querySelector('#txtCorreo').value


   $.ajax({
         url:"/api/user/setInfo",
         type:"POST",
         dataType:"json",
         contentType:"application/json",
         data:JSON.stringify(datos),
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
            alert("Actualizacion exitosa")
            localStorage.email = datos.email
            Cookies.set('token',rta['token']);
            location.reload();
         },
         error: function(xhr, status) {
            alert("Error al cargar los datos, verifique los datos")
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
   });
}

function eliminarPerfil() {

    const borrar = window.prompt("¿De verdad quiere borrar su cuenta?\n"+
                     "Este cambio no se podra deshacer\n"+
                     "Escriba ELIMINAR para confirmar solicitud")

    if(borrar!='ELIMINAR')
    {
        alert('Solicitud cancelada')
        return;
    }

    $.ajax({
             url:"/api/user/eliminarCuenta",
             type:"DELETE",
             headers:{
                "Authorization": "Bearer "+ Cookies.get('token')
             },
             success: function(rta) {
                alert('Usuario eliminado')
                localStorage.email = ''
                Cookies.remove('token');
                window.location.replace("/html/login.html");
             },
             error: function(xhr, status) {
                alert("Error al eliminar")
             },
             complete: function(xhr, status) {
                 //alert('Petición realizada');
             }
    });

}
