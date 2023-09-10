$(document).ready(function() {
  infoUser();
});


function infoUser(){
   $.ajax({
         url : "/api/user/info",
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
}

function eliminarPerfil() {
}

function confirmarEliminacion() {

}