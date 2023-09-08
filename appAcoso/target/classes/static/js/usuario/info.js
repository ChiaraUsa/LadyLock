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
             console.log(rta)
   			 //document.getElementById("txt-Nombre").outerHTML = rta.firstname
   			 //document.getElementById("txt-Email").outerHTML = rta.email
   			 //document.getElementById("txt-Contraseña").outerHTML = "Es secreta! -_-     actualizala si la olvidaste"
   	     },
         error : function(xhr, status) {
            alert('ha sucedido un problema');
         },
         complete : function(xhr, status) {
            //  alert('Petición realizada');
         }
   });
}