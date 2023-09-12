$(document).ready(function() {
  establecerCorreo();
  cargarLista();
});

async function establecerCorreo(){
   document.getElementById("userButton").textContent = localStorage.email+" ▼"
}

function toggleMenu() {
   const menu = document.getElementById('menu');
   if (menu.style.left === '0px') {
      menu.style.left = '-250px';
   } else {
      menu.style.left = '0px';
   }
}

function closeMenu() {
   const menu = document.getElementById('menu');
   menu.style.left = '-250px';
}

function toggleUserMenu() {
   const userMenu = document.getElementById('userMenu');
   if (userMenu.style.display === 'block') {
      userMenu.style.display = 'none';
   }else {
      userMenu.style.display = 'block';
   }
}

function editarPerfil() {
   alert("Editar perfil");
}

function irInicio(){
   window.location.replace("inicio.html");
}

function openUberLink() {
   window.open("https://m.uber.com/go/pickup?effect=&marketing_vistor_id=fc40b7fa-51d6-4ea9-bbb1-d5397bef16c5&uclick_id=7886bca6-83ea-4ef8-b488-8bc0c53e71ec", "_blank");
}

function irCentroAyuda(){
   window.location.replace("CentroAyuda.html");
}

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

                     var nuevoRectangulo = document.createElement('div');
                     nuevoRectangulo.style.width = '100%';
                     nuevoRectangulo.style.height = '100px';
                     nuevoRectangulo.style.backgroundColor = 'white';
                     nuevoRectangulo.style.border = '2px solid #ccc';
                     nuevoRectangulo.style.position = 'relative';
                     nuevoRectangulo.style.marginBottom = '10px'; // Espacios entre rectangulos

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

                     // Crea el título
                     var titulo = document.createElement('span');
                     titulo.textContent = lugar.name;
                     titulo.style.position = 'absolute';
                     titulo.style.left = '150px';
                     titulo.style.top = '10px';
                     titulo.style.fontWeight = 'bold';

                     // Crea el botón
                     var boton = document.createElement('button');
                     boton.textContent = 'Ir al sitio web 🌐';
                     boton.style.position = 'absolute';
                     boton.style.bottom = '20px';
                     boton.style.right = '10px';

                     var enlace = document.createElement('a');
                     enlace.href = lugar.link;
                     enlace.target = '_blank';

                     // Agregar el boton al enlace
                     enlace.appendChild(boton);

                     // Agrega los elementos al rectángulo
                     nuevoRectangulo.appendChild(imagen);
                     nuevoRectangulo.appendChild(descripcion);
                     nuevoRectangulo.appendChild(titulo);
                     nuevoRectangulo.appendChild(enlace);

                     // Agrega el rectángulo al contenedor
                     contenedor.appendChild(nuevoRectangulo);
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