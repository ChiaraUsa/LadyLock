// Call the dataTables jQuery plugin
$(document).ready(function() {
  // on ready
});

function registrarUsuario(){
  let datos = {}

  datos.firstname = document.querySelector('#txtNombre').value
  datos.email = document.querySelector('#txtEmail').value
  datos.password = document.querySelector('#txtContraseña').value

  let repiteContraseña = document.querySelector('#txtRepiteContraseña').value

  if(repiteContraseña != datos.password)
  {
     alert('Las CONTRASEÑAS que escribiste son DIFERENTES!')
     return;
  }

   $.ajax({
  		 url:"/api/auth/register",
  		 type:"POST",
  		 contentType:"application/json",
  		 dataType:"json",

  		 data:JSON.stringify(datos),

  		 success: function(rta) {
  			 localStorage.email = datos.email
  			 Cookies.set("token",rta['token']);
  			 window.location.replace("inicio.html");
  		 },
  		 error: function(xhr, status) {
  			 alert('Disculpe, existió un problema');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
  	 });
}
