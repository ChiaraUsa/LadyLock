var headers = {
    Authorization: "Bearer "+ Cookies.get('token') // Reemplaza 'tuTokenJWT' con tu token real
};
var stompClient = null;
var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);
        stompClient.connect(headers, function(frame) {
            console.log(frame);
            stompClient.subscribe('/all/messages', function(result) {
                show(JSON.parse(result.body));
            });
        });

function show(message) {
                var response = document.getElementById('notificaciones');
                var p = document.createElement('p');
                p.innerHTML= "message: "  + message.text;
                response.appendChild(p);
            }

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

function irNotificaciones(){
    window.location.replace("notificaciones.html");
}

function irChat(){
    window.location.replace("../../html/usuario/chat.html");
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