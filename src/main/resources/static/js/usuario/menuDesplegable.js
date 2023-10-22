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

function openChat(){
    window.location.replace("chat.html");
}

function irVerPromos(){
    window.location.replace("verPromos.html");
}
