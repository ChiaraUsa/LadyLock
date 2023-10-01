const startButton = document.getElementById('startRecord');
const stopButton = document.getElementById('stopRecord');
const audioPlayer = document.getElementById('audioPlayer');
let mediaRecorder;
let audioChunks = [];

// Comprobar si el navegador admite la API de MediaRecorder
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function (stream) {
            mediaRecorder = new MediaRecorder(stream);

            // Evento cuando se comienza a grabar
            mediaRecorder.onstart = function () {
                startButton.disabled = true;
                stopButton.disabled = false;
            };

            // Evento cuando se detiene la grabación
            mediaRecorder.onstop = function () {
                startButton.disabled = false;
                stopButton.disabled = true;
            };

            // Evento cuando se obtiene un fragmento de audio
            mediaRecorder.ondataavailable = function (event) {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };
        })
        .catch(function (error) {
            console.error('Error al acceder al micrófono:', error);
        });

    // Iniciar grabación cuando se haga clic en el botón "Iniciar Grabación"
    startButton.addEventListener('click', function () {
        audioChunks = [];
        mediaRecorder.start();
    });

    // Detener grabación cuando se haga clic en el botón "Detener Grabación"
    stopButton.addEventListener('click', function () {
        mediaRecorder.stop();
    });

    // Reproducir el audio grabado
    audioPlayer.addEventListener('click', function () {
        if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            audioPlayer.src = audioUrl;
        }
    });
} else {
    console.error('El navegador no admite la grabación de audio.');
}
