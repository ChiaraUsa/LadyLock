// Call the dataTables jQuery plugin
$(document).ready(function() {
   //on ready
});

function iniciarSesion(){
  let datos = {};

  datos.email = document.querySelector('#txtEmail').value
  datos.password = document.querySelector('#txtContraseña').value

  $.ajax({

  		 url:"/api/auth/authenticate",
  		 type:"POST",
  		 contentType:"application/json",
  		 dataType:"json",

  		 data:JSON.stringify(datos),

  		 success: function(rta) {
  		     localStorage.email = datos.email
  			 Cookies.set('token',rta['token']);
  			 window.location.replace("inicio.html");
  		 },
  		 error: function(xhr, status) {
  			 alert('Usuario no existente');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }

  });
}

 function logout(){
    localStorage.email = ''
	Cookies.remove('token');
	window.location.replace("login.html");
 }

