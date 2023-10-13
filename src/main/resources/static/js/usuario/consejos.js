$(document).ready(function() {
    function mostrarContenido(index) {
        $(".content").eq(index).fadeIn(1500);
        setTimeout(function() {
            $(".content").eq(index).fadeOut(1500, function() {
                if (index < 2) {
                    mostrarContenido(index + 1);
                } else {
                    mostrarContenido(0);
                }
            });
        }, 3000);
    }
    mostrarContenido(0);
});

var miElemento = document.getElementById('consejos'); // Reemplaza 'miElemento' con el ID de tu elemento

// Obtén el objeto de medidas
var medidas = miElemento.getBoundingClientRect();

// Ahora puedes acceder a diferentes propiedades del objeto de medidas
var ancho = medidas.width; // Ancho del elemento
var alto = medidas.height; // Alto del elemento
var top = medidas.top; // Distancia desde la parte superior del viewport
var left = medidas.left; // Distancia desde la parte izquierda del viewport
var right = medidas.right; // Distancia desde la parte derecha del viewport
var bottom = medidas.bottom; // Distancia desde la parte inferior del viewport

// Imprime las medidas en la consola
console.log('Ancho: ' + ancho);
console.log('Alto: ' + alto);
console.log('Top: ' + top);
console.log('Left: ' + left);
console.log('Right: ' + right);
console.log('Bottom: ' + bottom);