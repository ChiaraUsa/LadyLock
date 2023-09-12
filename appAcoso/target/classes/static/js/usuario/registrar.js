// Call the dataTables jQuery plugin
$(document).ready(function() {
  // on ready
});

function registrar(){
  let datos = {}

  datos.firstname = document.querySelector('#txtNombre').value
  datos.email = document.querySelector('#txtEmail').value
  datos.password = document.querySelector('#txtContraseña').value

  rol = document.querySelector('#txtRol').value
  let repiteContraseña = document.querySelector('#txtRepiteContraseña').value

  if(repiteContraseña != datos.password)
  {
     alert('Las CONTRASEÑAS que escribiste son DIFERENTES!')
     return;
  }

  //le indica al controlador quien se esta registrando
  if(rol == 'usuario')
  {
    registrarUsuario('usuario',datos)
  }
  else if(rol ==  'empresa')
  {
    registrarEmpresa('empresa', datos)
  }
  else if(rol ==  'administrador')
    {
      registrarAdministrador('administrador', datos)
    }
  else
  {
    alert('Debe escoger un Rol!')
    return;
  }

}

function registrarUsuario(via, datos){
    $.ajax({
      		 url:"/api/auth/register/"+via,
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

function registrarEmpresa(via, datos){
    alert(via)
    console.log(datos)
}

function registrarAdministrador(via, datos){
    $.ajax({
      		 url:"/api/auth/register/"+via,
      		 type:"POST",
      		 contentType:"application/json",
      		 dataType:"json",

      		 data:JSON.stringify(datos),

      		 success: function(rta) {
      			 alert('ok');
      		 },
      		 error: function(xhr, status) {
      			 alert('Disculpe, existió un problema');
      		 },
      		 complete: function(xhr, status) {
      			 //alert('Petición realizada');
      		 }
    });
}