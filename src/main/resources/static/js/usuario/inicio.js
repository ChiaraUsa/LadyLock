$(document).ready(function() {
  cargarLista();
});

function cargarLista(){

   $.ajax({
  		 url:"/api/lugares/all",
  		 type:"GET",
  		 dataType:"json",
         headers:{
         	"Authorization": "Bearer "+ Cookies.get('token')
         },
  		 success: function(rta) {

  		     var contenedor = document.getElementById('contenedorRectangulos');

                for (var lugar of rta) {
                    var tarjeta3 = document.createElement('div');
                      tarjeta3.style.display = 'block';
                      tarjeta3.style.top = '0px';
                      tarjeta3.style.position = 'relative';
                      tarjeta3.style.maxWidth = '1000px';
                      tarjeta3.style.maxHeight = '150px';
                      tarjeta3.style.backgroundColor = '#8c52ff';
                      tarjeta3.style.borderRadius = '4px';
                      tarjeta3.style.padding = '32px 24px';
                      tarjeta3.style.margin = '12px';
                      tarjeta3.style.textDecoration = 'none';
                      tarjeta3.style.overflow = 'hidden';
                      tarjeta3.style.border = '1px solid #f2f8f9';

                      // Crea la imagen
                      var imagen = document.createElement('img');
                      imagen.src = lugar.imagine;
                      imagen.alt = 'Imagen';
                      imagen.style.position = 'absolute';
                      imagen.style.left = '10px';
                      imagen.style.top = '10px';
                      imagen.style.maxWidth = '130px';
                      imagen.style.maxHeight = '130px';

                      // Crea la descripción
                      var descripcion = document.createElement('span');
                      descripcion.textContent = lugar.description;
                      descripcion.style.position = 'absolute';
                      descripcion.style.left = '150px';
                      descripcion.style.top = '40px';
                      descripcion.style.fontSize = '14px';
                      descripcion.style.color = '#ffffff'; // Cambia el color del título al hacer hover

                      // Crea el título
                      var titulo = document.createElement('span');
                      titulo.textContent = lugar.name;
                      titulo.style.position = 'absolute';
                      titulo.style.left = '150px';
                      titulo.style.top = '10px';
                      titulo.style.fontWeight = 'bold';
                      titulo.style.color = '#ffffff'; // Cambia el color del título al hacer hover

                      // Crea el botón
                      var boton = document.createElement('button');
                      boton.textContent = 'Ir al sitio web 🌐';
                      boton.style.position = 'absolute';
                      boton.style.bottom = '20px';
                      boton.style.right = '10px';
                      boton.classList.add('button-opt');

                      // Crea el enlace
                      var enlace = document.createElement('a');
                      enlace.href = lugar.link;
                      enlace.target = '_blank';

                      // Agrega el botón al enlace
                      enlace.appendChild(boton);

                      // Agrega los elementos a la tarjeta
                      tarjeta3.appendChild(imagen);
                      tarjeta3.appendChild(descripcion);
                      tarjeta3.appendChild(titulo);
                      tarjeta3.appendChild(enlace);

                      // Agrega la tarjeta al contenedor
                      contenedor.appendChild(tarjeta3);
                    }
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al traer lugares');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}