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