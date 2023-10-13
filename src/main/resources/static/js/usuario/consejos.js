$(document).ready(function() {
    function mostrarContenido(index) {
        $(".content").eq(index).fadeIn(1500);
        setTimeout(function() {
            $(".content").eq(index).fadeOut(1500, function() {
                if (index < 3) {
                    mostrarContenido(index + 1);
                } else {
                    mostrarContenido(0);
                }
            });
        }, 3000);
    }
    mostrarContenido(0);
});