// Call the dataTables jQuery plugin
$(document).ready(function() {
   //on ready
});

function iniciarSesion(){
  let datos = {};

  datos.email = document.querySelector('#txtEmail').value
  datos.password = document.querySelector('#txtContraseña').value

  rol = document.querySelector('#txtRol').value

  if(rol == 'usuario')
  {
    inicioUsuario('usuario',datos)
  }
  else if(rol ==  'empresa')
  {
    inicioEmpresa('empresa', datos)
  }
  else if(rol ==  'administrador')
  {
    inicioAdmin('administrador', datos)
  }
  else
  {
    alert('Debe escoger un Rol!')
    return;
  }

}

function inicioUsuario(via, datos){
  $.ajax({

  		 url:"/api/auth/authenticate/"+via,
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

function inicioEmpresa(via, datos){
  $.ajax({
         url:"/api/auth/authenticate/"+via,
         type:"POST",
         contentType:"application/json",
         dataType:"json",

         data:JSON.stringify(datos),

         success: function(rta) {
             localStorage.email = datos.email
             Cookies.set('token',rta['token']);
             window.location.replace("inicioEmpresa.html");
         },
         error: function(xhr, status) {
             alert('Usuario no existente');
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }

    });
}

function inicioAdmin(via, datos){
  $.ajax({

  		 url:"/api/auth/authenticate/"+via,
  		 type:"POST",
  		 contentType:"application/json",
  		 dataType:"json",

  		 data:JSON.stringify(datos),

  		 success: function(rta) {
  		     localStorage.email = datos.email
             Cookies.set('token',rta['token']);
             window.location.replace("inicioAdmin.html");
  		 },
  		 error: function(xhr, status) {
  			 alert('Usuario no existente');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }

  });
}

