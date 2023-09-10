const botonAyuda = document.getElementById("botonAyuda");

botonAyuda.addEventListener("click", function () {
  alert("Se ha enviado la solicitud de ayuda.");
  window.location.href = "/LadyLock/Vista/index.html#";
});

function enviarMensaje() {
  var mensaje = document.getElementById("mensaje").value;
  var chatMessages = document.getElementById("chat-messages");

  if (mensaje !== "") {
    var mensajeElemento = document.createElement("div");
    mensajeElemento.className = "mensaje";
    mensajeElemento.textContent = mensaje;
    chatMessages.appendChild(mensajeElemento);
    document.getElementById("mensaje").value = "";
  }
}
