$(document).ready(function() {
    emergencia();
});

function emergencia(){
    $.ajax({
         url:"/api/admin/emergencia",
         type:"GET",
         headers:{
             "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
             var boton = document.getElementById('botonChat');
             if(rta)
             {
                window.open('/html/admin/userInfo.html')
                boton.disabled = false;
             }
             else
             {
                boton.disabled = true;
             }
         },
         error: function(xhr, status) {
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}

