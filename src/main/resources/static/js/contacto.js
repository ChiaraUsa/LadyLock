var botonUnirse = document.getElementById('comunicar');

function unionGrupo(){
    // Reemplaza 'TU_ENLACE_DE_INVITACIÓN' con el enlace de invitación de tu grupo de WhatsApp
    var enlaceWhatsApp = 'https://chat.whatsapp.com/Ctp0iQVRNXhD3Pi6STCX3y';
    window.location.href = enlaceWhatsApp;
}

botonUnirse.addEventListener('click', unionGrupo);