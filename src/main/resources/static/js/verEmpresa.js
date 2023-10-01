var idEmpresa = 0;

$(document).ready(function(){
    comprobarSuscripcion();
    getInfoEmpresa();
    getPromos();
});

function comprobarSuscripcion(){
    $.ajax({
  		 url:"/api/user/comprobar?valor="+localStorage.email+"&id="+localStorage.id,
         type:"GET",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {

  		    var boton1 = document.getElementById("btnSuscripcion");
            var boton2 = document.getElementById("btnDesuscripcion");

  		    if(rta)
  		    {
                boton1.style.display = "none"; // Oculta el botón
                boton2.style.display = "inline"; // Muestra la etiqueta
            }
            else
            {
                boton2.style.display = "none"; // Oculta el botón
                boton1.style.display = "inline"; // Muestra la etiqueta
            }
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al suscribirse');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function cancelarSuscripcion(){
    $.ajax({
  		 url:"/api/user/cancelarSuscripcion?idEmpresa="+idEmpresa,
         type:"DELETE",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {
  		    if(rta)
  		    {
                var boton1 = document.getElementById("btnSuscripcion");
                var boton2 = document.getElementById("btnDesuscripcion");
                boton2.style.display = "none"; // Oculta el botón
                boton1.style.display = "inline"; // Muestra la etiqueta
            }
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al suscribirse');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function getInfoEmpresa(){
    $.ajax({
  		 url:"/api/lugares/verInfoEmpresa?valor="+localStorage.id,
         type:"GET",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {

             idEmpresa = rta.id;

            //Setear nombre y descripcion de la pagina
  		    var nombre = document.getElementById("txtNombre");
  		    var des = document.getElementById("txtDescripcion");
            nombre.innerHTML = rta.name;
            des.innerHTML = rta.description;

            //Setear imagen al div
            var miDiv = document.getElementById("imagen");
            var imagen = document.createElement("img");
            imagen.src = rta.imagine;
            imagen.style.width = "100%";
            imagen.style.height = "100%";
            miDiv.appendChild(imagen);

            //Setear link al boton
            var boton = document.getElementById("txtLink");
            boton.setAttribute("data-href", rta.link);

            // Agrega un controlador de eventos para abrir la URL cuando se haga clic en el botón
            boton.addEventListener("click", function() {
              var enlace = this.getAttribute("data-href");
              window.open(enlace, "_blank");
            });
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al traer la informacion');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function getPromos(){
    $.ajax({
  		 url:"/api/lugares/verPromosEmpresa?valor="+localStorage.id,
         type:"GET",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {
  		    var contenedor = document.getElementById('contenedorEventos');
            if(rta.length>0)
            {
                for (var promo of rta) {

                     var nuevoRectangulo = document.createElement('div');
                     nuevoRectangulo.style.width = '100%';
                     nuevoRectangulo.style.height = '100px';
                     nuevoRectangulo.style.backgroundColor = 'white';
                     nuevoRectangulo.style.border = '2px solid #ccc';
                     nuevoRectangulo.style.position = 'relative';
                     nuevoRectangulo.style.marginBottom = '10px';

                     var descripcion = document.createElement('span');
                     descripcion.textContent = promo.contenido;
                     descripcion.style.position = 'absolute';
                     descripcion.style.left = '10px';
                     descripcion.style.top = '40px';
                     descripcion.style.fontSize = '14px';

                     var titulo = document.createElement('span');
                     titulo.textContent = promo.titulo;
                     titulo.style.position = 'absolute';
                     titulo.style.left = '10px';
                     titulo.style.top = '10px';
                     titulo.style.fontWeight = 'bold';

                     nuevoRectangulo.appendChild(descripcion);
                     nuevoRectangulo.appendChild(titulo);

                     contenedor.appendChild(nuevoRectangulo);
                }
            }
            else
            {
                var h1Element = document.createElement("h1");
                h1Element.textContent = "No se han generado promociones ni eventos";
                contenedor.appendChild(h1Element);
            }
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al traer promociones');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function suscribirEmpresa(){
    $.ajax({
  		 url:"/api/lugares/suscribirse?valor="+localStorage.id,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {
            var boton = document.getElementById("btnSuscripcion");
            var label = document.getElementById("txtSuscripcion");
            alert('Suscripcion exitosa')
            boton.style.display = "none"; // Oculta el botón
            label.style.display = "inline"; // Muestra la etiqueta
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al suscribirse');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function suscribirUsuario(){
    $.ajax({
  		 url:"/api/user/suscribirse?valor="+localStorage.id,
         type:"POST",
         dataType:"json",
         headers:{
            "Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {
  		    var boton1 = document.getElementById("btnSuscripcion");
            var boton2 = document.getElementById("btnDesuscripcion");
            boton1.style.display = "none"; // Oculta el botón
            boton2.style.display = "inline"; // Muestra la etiqueta
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al suscribirse');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}