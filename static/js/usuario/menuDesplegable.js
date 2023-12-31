 // Call the dataTables jQuery plugin
 $(document).ready(function() {
    establecerCorreo();
 });


 function logout(){
    localStorage.email = ''
	Cookies.remove('token');
	window.location.replace("/html/login.html");
 }

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

 function openUberLink() {
    window.open("https://m.uber.com/go/pickup?effect=&marketing_vistor_id=fc40b7fa-51d6-4ea9-bbb1-d5397bef16c5&uclick_id=7886bca6-83ea-4ef8-b488-8bc0c53e71ec", "_blank");
 }

 function irCentroAyuda(){
    window.location.replace("CentroAyuda.html");
 }

 function irInfoUser(){
    window.location.replace("info.html");
 }

 function irInicio(){
   window.location.replace("inicio.html");
}

function unionGrupo(){
    window.open("https://chat.whatsapp.com/Ctp0iQVRNXhD3Pi6STCX3y","_blank");
}

function openLineaPurpura() {
    window.open("https://www.sdmujer.gov.co/nuestros-servicios/servicios-para-las-mujeres/linea-purpura", "_blank");
}

function openChat(){
    window.location.replace("chat.html");
}

function irVerPromos(){
    window.location.replace("verPromos.html");
}

function irCalendario(){
   window.location.replace("Calendario.html");
}

function irForo(){
   window.location.replace("foro.html");
}

function irCentroAyudaYcerrarChat(){

    var cerrar = window.confirm("¿Seguro quiere cerrar el chat?")

    if(!cerrar)
    {
        return;
    }

    $.ajax({
         url:"/api/admin/cierraUsuario?idAdmin="+localStorage.idAdmin,
         type:"POST",
         contentType:"application/json",
         success: function(rta) {
             localStorage.idAdmin = -1;
             window.location.replace("CentroAyuda.html");
         },
         error: function(xhr, status) {
             alert('Admin no existente');
         },
         complete: function(xhr, status) {
             //alert('Petición realizada');
         }
    });
}
