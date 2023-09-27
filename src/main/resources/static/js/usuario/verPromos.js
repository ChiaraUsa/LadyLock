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
            console.log(rta)
       },
       error: function(xhr, status) {
          alert('Error al traer promociones');
       },
       complete: function(xhr, status) {
          //alert('Petición realizada');
       }
   });
}