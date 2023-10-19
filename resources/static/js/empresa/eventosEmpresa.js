$(document).ready(function(){
    getPromos();
});

function newPromo(){

  let promocion = {};

  promocion.titulo = document.querySelector('#txtTitulo').value
  promocion.contenido = document.querySelector('#txtDescripcion').value

  if(promocion.titulo==null || promocion.contenido==null)
  {
    alert("No pueden existir eventos/promociones sin contenido")
    return
  }

   $.ajax({
  		 url:"/api/lugares/generatePromocion",
  		 type:"POST",
  		 contentType:"application/json",
  		 dataType:"json",
         headers:{
         	"Authorization": "Bearer "+ Cookies.get('token')
         },
         data:JSON.stringify(promocion),
  		 success: function(rta) {
            location.reload();
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al generar promocion');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

function getPromos(){
    $.ajax({
  		 url:"/api/lugares/getPromosEmpresa",
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

                     var boton = document.createElement('button');
                     boton.textContent = 'Eliminar';
                     boton.style.position = 'absolute';
                     boton.style.bottom = '20px';
                     boton.style.right = '10px';
                     boton.style.backgroundColor = 'rgba(255, 102, 102, 0.7)';

                     nuevoRectangulo.appendChild(descripcion);
                     nuevoRectangulo.appendChild(titulo);
                     nuevoRectangulo.appendChild(boton);

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