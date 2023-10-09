$(document).ready(function() {
  getPromosUser();
});

function getPromosUser(){
    $.ajax({
       url:"/api/user/getPromosUser",
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