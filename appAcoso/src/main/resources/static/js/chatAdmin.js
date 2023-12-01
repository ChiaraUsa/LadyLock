'use strict';

 $(document).ready(function() {
    establecerNombre();
    setIdChat();
    connect();
 });
var chatPage = document.querySelector('#chat-page');
var usernameForm = document.querySelector('#usernameForm');
var messageForm = document.querySelector('#messageForm');
var messageInput = document.querySelector('#message');
var messageArea = document.querySelector('#messageArea');
var connectingElement = document.querySelector('.connecting');

var stompClient = null;
var username = null;
var chatID = 0;

var colors = [
    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
];

async function establecerNombre(){
     $.ajax({
           url : "/api/admin/getInfo",
           type : 'GET',
           headers:{
           	"Authorization": "Bearer "+ Cookies.get('token')
           },
           success : function(rta) {
                 console.log(rta)
     			 username = rta
     			 connect(username)
     	     },
           error : function(xhr, status) {
              alert('ha sucedido un problema');
           },
           complete : function(xhr, status) {
              //  alert('Petición realizada');
           }
     });

 }

 function setIdChat(){
    $.ajax({
        url: "/api/chat/setChatID",
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + Cookies.get('token')
        },
        success: function (rta) {
            chatID = rta
        },
        error: function (xhr, status) {
            alert('ha sucedido un problema con el id del chat');
        },
        complete: function (xhr, status) {
            //  alert('Petición realizada');
        }
    });
 }

function connect(username) {
    if (username) {

        var socket = new SockJS('/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            onConnected(frame);
            loadChatHistory();
        }, onError);
    }
}

function onConnected(frame) {
    // Subscribe to the Public Topic
    stompClient.subscribe('/topic/public', onMessageReceived);

    // Tell your username to the server
    stompClient.send("/app/chat.addUser",
        {},
        JSON.stringify({ sender: username, type: 'JOIN' })
    )

    connectingElement.classList.add('hidden');
}

function onError(error) {
    connectingElement.textContent = 'Could not connect to WebSocket server. Please refresh this page to try again!';
    connectingElement.style.color = 'red';
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();
    if (messageContent && stompClient) {
        var chatMessage = {
            chatId:  chatID,
            sender: username,
            content: messageInput.value,
            type: 'CHAT'
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
        messageInput.value = '';
    }
    event.preventDefault();
}

function onMessageReceived(payload) {
    var message = JSON.parse(payload.body);
    displayMessage(message);
}

function displayMessage(message) {
    var messageElement = document.createElement('li');

    if (message.type === 'JOIN') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' joined!';
    } else if (message.type === 'LEAVE') {
        messageElement.classList.add('event-message');
        message.content = message.sender + ' left!';
    } else {
        messageElement.classList.add('chat-message');

        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]);
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender);

        messageElement.appendChild(avatarElement);

        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement);

    messageArea.appendChild(messageElement);
    messageArea.scrollTop = messageArea.scrollHeight;
}

function loadChatHistory() {
    $.ajax({
        type: 'GET',
        url: '/api/chat/history', // Debes ajustar la ruta de la API según tu configuración del servidor
        success: function (response) {
            // Procesar los mensajes históricos y mostrarlos en la interfaz de usuario
            response.forEach(function (message) {
                displayMessage(message);
            });
        },
        error: function (error) {
            console.error('Error al cargar el historial del chat:', error);
        }
    });
}

function getAvatarColor(messageSender) {
    var hash = 0;
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i);
    }
    var index = Math.abs(hash % colors.length);
    return colors[index];
}

messageForm.addEventListener('submit', sendMessage, true);
