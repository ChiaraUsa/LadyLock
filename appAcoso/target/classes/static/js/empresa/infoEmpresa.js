
function editarPerfil() {
    alert("Editar perfil");
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

function seleccionarImagen() {
   document.getElementById('file-input').click();
}

// Función para cargar una nueva imagen
document.getElementById('file-input').addEventListener('change', function (e) {
   var file = e.target.files[0];
   var img = document.getElementById('profile-img');

   if (file) {
       var reader = new FileReader();

       reader.onload = function (e) {
           img.src = e.target.result;
           document.querySelector('.save-button').removeAttribute('disabled');
       };

       reader.readAsDataURL(file);
   }
});