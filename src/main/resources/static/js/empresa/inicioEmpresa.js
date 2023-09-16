$(document).ready(function(){
    newPromo();
});

function newPromo(){

  let promocion = {};

  promocion.titulo = "miTitulo"
  promocion.cotenido = "Mi primera Promocion"

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