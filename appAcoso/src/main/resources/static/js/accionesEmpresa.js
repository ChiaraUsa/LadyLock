
function editarPerfil() {
    alert("Editar perfil");
 }
 
 function irInicio(){
    window.location.replace("inicioEmpresa.html");
 }

 function irPerfilEmpresa(){
   window.location.replace("perfilEmpresa.html");
}

 function irCentroAyuda(){
    window.location.replace("CentroAyudaEmpresa.html");
 }

 function logout(){
   localStorage.email = ''
  Cookies.remove('token');
  window.location.replace("login.html");
}

function guardarPerfil() {
   // Aquí puedes agregar el código para guardar los cambios del perfil
   // Puedes obtener los valores de los campos de entrada y hacer lo necesario
   // Luego, puedes deshabilitar los campos de nuevo y el botón de guardar
   document.getElementById('txtNombre').setAttribute('disabled', 'disabled');
   document.getElementById('txtCorreo').setAttribute('disabled', 'disabled');
   document.getElementById('txtDescripcion').setAttribute('disabled', 'disabled');
}

function eliminarPerfil() {
   // Aquí puedes agregar el código para eliminar el perfil
}

function borrarCuenta() {
   // Aquí puedes agregar el código para borrar la cuenta del usuario
}

function guardarImagen() {
   // Aquí puedes agregar el código para guardar la imagen de perfil
   // Por ejemplo, puedes usar una API para cargar la imagen al servidor
}

function guardarNombre() {
   // Aquí puedes agregar el código para guardar el nombre de la empresa
}

function guardarCorreo() {
   // Aquí puedes agregar el código para guardar el correo de la empresa
}

function guardarDesc() {
   // Aquí puedes agregar el código para guardar la descripción de la empresa
}

function guardarLink() {
   // Aquí puedes agregar el código para guardar el enlace de la empresa
}