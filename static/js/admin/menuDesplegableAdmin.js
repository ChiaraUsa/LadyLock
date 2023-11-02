$(document).ready(function() {
    establecerCorreo();
});

function logout(){
    localStorage.email = ''
    Cookies.remove('token');
    window.location.replace("/html/login.html");
}

function establecerCorreo(){
    document.getElementById("userButton").textContent = localStorage.email+" ▼"
}

function irAtenciones(){
    window.location.replace("atenciones.html");
}

function irChat(){
    window.location.replace("chatAdmin.html");
}

function irInicio(){
    window.location.replace("inicioAdmin.html");
}

function irNotificaciones(){
    window.location.replace("notificaciones.html");
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

function irInicioYcerrarChat(){
    var cerrar = window.confirm("¿Seguro quiere cerrar el chat?")

    if(!cerrar)
    {
        return;
    }

    $.ajax({
         url:"/api/admin/cierraAdmin",
         type:"POST",
         contentType:"application/json",
         headers:{
             "Authorization": "Bearer "+ Cookies.get('token')
         },
         success: function(rta) {
             window.location.replace("inicioAdmin.html");
         },
         error: function(xhr, status) {
             alert('Admin no existente');
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}


