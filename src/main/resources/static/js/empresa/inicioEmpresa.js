$(document).ready(function(){
    newPromo();
});

function newPromo(){

  let promocion = {};

  promocion.titulo = "miTitulo"
  promocion.contenido = "Mi primera Promocion"

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
            console.log(rta);
  		 },
  		 error: function(xhr, status) {
  			 alert('Error al generar promocion');
  		 },
  		 complete: function(xhr, status) {
  			 //alert('Petición realizada');
  		 }
   });
}

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