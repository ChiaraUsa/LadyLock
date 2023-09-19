$(document).ready(function(){
    getInfoEmpresa();
});

function getInfoEmpresa(){
    $.ajax({
       url:"/api/lugares/getInfoInicioEmpresa",
       type:"GET",
       dataType:"json",
       headers:{
           "Authorization": "Bearer "+ Cookies.get('token')
       },
       success: function(rta) {
            document.getElementById("txtRol").value = rta.rol
            document.getElementById("txtID").value = rta.id
            document.getElementById("txtNombre").value = rta.name
            document.getElementById("txtCorreo").value = rta.email
            document.getElementById("txtDescripcion").value = rta.description
            document.getElementById("txtLink").value = rta.link

            var miDiv = document.getElementById("imagen");
            var imagen = document.createElement("img");
            imagen.src = rta.imagine;
            imagen.style.width = "100%";
            imagen.style.height = "100%";
            miDiv.appendChild(imagen);
       },
       error: function(xhr, status) {
          alert('Error al traer la informacion');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}

function actualizarFoto(){
    let foto = prompt("Ingrese url de foto:");

    if(foto==null)
    {
        alert('No puede ser vacio')
    }

    $.ajax({
       url:"/api/lugares/newFoto?valor="+foto,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
             alert('Actualizacion exitosa')
             location.reload();
       },
       error: function(xhr, status) {
          alert('Error al actualizar');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}

function actualizarNombre(){
    let nombre = document.querySelector('#txtNombre').value;
    $.ajax({
       url:"/api/lugares/newName?valor="+nombre,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
             alert('Actualizacion exitosa')
             location.reload();
       },
       error: function(xhr, status) {
          alert('Error al actualizar');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}

function actualizarCorreo(){
    let email = document.querySelector('#txtCorreo').value;
    $.ajax({
       url:"/api/lugares/newEmail?valor="+email,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
             alert('Actualizacion exitosa')
             localStorage.email = email;
             Cookies.set('token',rta['token']);
             location.reload();
       },
       error: function(xhr, status) {
          alert('Error al actualizar');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}

function actualizarDescripcion(){
    let des = document.querySelector('#txtDescripcion').value;
    $.ajax({
       url:"/api/lugares/newDescription?valor="+des,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
             alert('Actualizacion exitosa')
             location.reload();
       },
       error: function(xhr, status) {
          alert('Error al actualizar');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}

function actualizarLink(){
    let link = document.querySelector('#txtLink').value;
    $.ajax({
       url:"/api/lugares/newLink?valor="+link,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
       success: function(rta) {
             alert('Actualizacion exitosa')
             location.reload();
       },
       error: function(xhr, status) {
          alert('Error al actualizar');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}