var botonUnirse = document.getElementById('comunicar');
var botonLinea = document.getElementById('lineapurpura');

function unionGrupo(){
    window.open("https://chat.whatsapp.com/Ctp0iQVRNXhD3Pi6STCX3y","_blank");
}

function openLineaPurpura() {
    window.open("https://www.sdmujer.gov.co/nuestros-servicios/servicios-para-las-mujeres/linea-purpura", "_blank");
}

botonUnirse.addEventListener('click', unionGrupo);
botonLinea.addEventListener('click',openLineaPurpura);