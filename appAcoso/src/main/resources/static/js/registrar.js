var codigo = 0;
$(document).ready(function() {
  // on ready
});

document.getElementById('txtRol').addEventListener('change', function () {
    var codigoInput = document.getElementById('txtCodigo');
    if (this.value === 'administrador') {
        codigoInput.style.display = 'inline-block';
        pedirCodigo();
    } else {
        codigoInput.style.display = 'none';
    }
});

function pedirCodigo(){
    $.ajax({
         url:"/api/admin/code",
         type:"GET",
         dataType:"json",
         success: function(rta) {
             codigo = rta['code']
         },
         error: function(xhr, status) {
             alert('Fallo al generar codigo de autenticacion');
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}

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
      			 window.location.replace("/html/usuario/inicio.html");
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
    $.ajax({
             url:"/api/auth/register/"+via,
             type:"POST",
             contentType:"application/json",
             dataType:"json",

             data:JSON.stringify(datos),

             success: function(rta) {
                 localStorage.email = datos.email
                 Cookies.set("token",rta['token']);
                 window.location.replace("/html/empresa/inicioEmpresa.html");
             },
             error: function(xhr, status) {
                 alert('Disculpe, existió un problema');
             },
             complete: function(xhr, status) {
                 //alert('Petición realizada');
             }
        });
}

function registrarAdministrador(via, datos){
    let codigoIngresado = document.querySelector('#txtCodigo').value

    if(codigo!=codigoIngresado)
    {
        alert('El codigo de autenticacion es incorrecto')
        return;
    }

    $.ajax({
      		 url:"/api/auth/register/"+via,
      		 type:"POST",
      		 contentType:"application/json",
      		 dataType:"json",

      		 data:JSON.stringify(datos),

      		 success: function(rta) {
      			 localStorage.email = datos.email
                 Cookies.set('token',rta['token']);
                 window.location.replace("/html/admin/inicioAdmin.html");
      		 },
      		 error: function(xhr, status) {
      			 alert('Disculpe, existió un problema');
      		 },
      		 complete: function(xhr, status) {
      			 //alert('Petición realizada');
      		 }
    });
}