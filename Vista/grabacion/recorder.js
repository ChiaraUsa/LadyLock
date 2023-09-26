// Obtén los elementos del DOM
const startRecordButton = document.getElementById("startRecord");
const stopRecordButton = document.getElementById("stopRecord");
const playAudioButton = document.getElementById("playAudio");
const audioElement = document.getElementById("audioElement");

let mediaRecorder;
let audioChunks = [];

// Obtén el acceso al micrófono y crea el objeto MediaRecorder
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        mediaRecorder = new MediaRecorder(stream);

        // Cuando se recibe un nuevo chunk de audio, guárdalo
        mediaRecorder.ondataavailable = event => {
            if (event.data.size > 0) {
                audioChunks.push(event.data);
            }
        };

        // Cuando la grabación se detiene, crea un archivo de audio y habilita los botones
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            audioElement.src = URL.createObjectURL(audioBlob);
            audioElement.controls = true;
            playAudioButton.disabled = false;
        };
    })
    .catch(error => {
        console.error("Error al acceder al micrófono:", error);
    });

// Evento para iniciar la grabación
startRecordButton.addEventListener("click", () => {
    audioChunks = [];
    mediaRecorder.start();
    startRecordButton.disabled = true;
    stopRecordButton.disabled = false;
});

// Evento para detener la grabación
stopRecordButton.addEventListener("click", () => {
    mediaRecorder.stop();
    startRecordButton.disabled = false;
    stopRecordButton.disabled = true;
});

// Evento para reproducir el audio grabado
playAudioButton.addEventListener("click", () => {
    audioElement.play();
});
