var fullMode = false;
var canvas;

function subir(url) {
    $.post('/subirImagen', {url: url}, function() {
        console.log('imagen actualizada');
    });
}
;

function setFullscreen() {
    var w = window.innerWidth / canvas.width;
    var h = window.innerHeight / canvas.height;
    var scale = Math.min(h, w);

    canvas.style.width = (canvas.width * scale) + 'px';
    canvas.style.height = (canvas.height * scale) + 'px';
    canvas.style.position = 'fixed';
    canvas.style.left = '50%';
    canvas.style.top = '50%';
    canvas.style.marginLeft = -(canvas.width * scale) / 2 + 'px';
    canvas.style.marginTop = -(canvas.height * scale) / 2 + 'px';
    fullMode = true;
}
function unsetFullscreen() {
    canvas.style.width = '';
    canvas.style.height = '';
    canvas.style.position = '';
    canvas.style.left = '';
    canvas.style.top = '';
    canvas.style.marginLeft = '';
    canvas.style.marginTop = '';
    fullMode = false;
}

function launchFullScreen(element) {
    if (element.requestFullScreen) {
        element.requestFullScreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
    }
}

$().ready(function() {
    init();
    canvas = stage.canvas;

    var dispositivo = navigator.userAgent.toLowerCase();
    if (dispositivo.search(/iphone|ipod|ipad|android/) > -1) {
        try {
            stage.puntero.visible = false;
            stage.linea.visible = false;
        }catch(e){
            
        }
    }
    // Lanza en pantalla completa en navegadores que lo soporten
    launchFullScreen(document.documentElement); // la página entera
    setFullscreen();
});

$(window).resize(function(evt) {
    if (fullMode)
        setFullscreen();
    else
        unsetFullScreen();
});