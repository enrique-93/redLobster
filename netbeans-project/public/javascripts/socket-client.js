var socket = io.connect();

socket.on('connect', function() {

    socket.on('jugando', function() {
        alert('Ya has iniciado un juego en otro dispositivo');
    });

    socket.on('puntos', function(data) {
        if (stage.marcas) {
            stage.marcas.removeAllChildren();
        } else {
            stage.marcas = new createjs.Container();
            var tabla = new createjs.Text('Tabla de posiciones', '18px Arial', '#3c1500');
            tabla.maxWidth = 200
            tabla.x = 26
            tabla.y = 560
            stage.marcas.addChild(tabla)
            stage.addChild(stage.marcas);
        }
        for (var a = 0; a < data.length; a++) {
            var marcador = data[a];
            var mar = new Marcador(marcador.nombre, marcador.id, marcador.puntos, {
                x: 21,
                y: 600 + 70 * a,
                lugar: a + 1
            })
            stage.marcas.addChild(mar);
        }
    });

    socket.on('pedirMail', function() {
        var r = '';
        r = prompt('Para que tu puntuación participe, necesitas introducir tu mail');
        if (r != null) {
            if (r.trim() != '') {
                socket.emit('mail', r);
            }
        }
        deNuevo();
    });

});

function deNuevo() {
    if (stage.marcas)
        stage.marcas.visible = false;
    var menu = new createjs.Bitmap(rutas.imagenes.MODAL_MENU)
    var bm = new createjs.Bitmap(rutas.imagenes.BOTON_MENU)
    bm.x = 479;
    bm.y = 450;

    var bj = new createjs.Bitmap(rutas.imagenes.BOTON_JUGAR)
    bj.x = 790;
    bj.y = 445;

    var tusPuntos = new createjs.Text(to(puntos, 5), 'bold 70px Arial', '#3c1500');
    tusPuntos.x = 580;
    tusPuntos.y = 356;

    var sh = new createjs.Bitmap(rutas.imagenes.SHARE);
    sh.rotation = 5;
    sh.x = 636;
    sh.y = 436;

    bj.cursor = 'pointer';
    bm.cursor = 'pointer';
    sh.cursor = 'pointer';

    bj.on('mouseover', function() {
        bj.rotation = 5;
    })
    bm.on('mouseover', function() {
        bm.rotation = -5;
    });
    sh.on('mouseover', function() {
        sh.rotation = 0;
    })

    bj.on('mouseout', function() {
        bj.rotation = 0;
    })
    bm.on('mouseout', function() {
        bm.rotation = 0;
    });
    sh.on('mouseout', function() {
        sh.rotation = 5;
    })

    bj.on('mousedown', function() {
        location.reload();
    })
    bm.on('mousedown', function() {
        window.open('http://www.redlobster.com.mx');
    });
    sh.on('mousedown', function() {
        stage.share = true;
    })

    compartir_activar();

    stage.juego.addChild(menu);
    stage.juego.addChild(bm);
    stage.juego.addChild(bj);
    stage.addChild(tusPuntos);
    stage.addChild(sh);

    sh.visible = false;
    bm.visible = !bm.visible;
    bj.visible = !bj.visible;
    setTimeout(function() {
        var url = stage.canvas.toDataURL();
        bm.visible = !bm.visible;
        bj.visible = !bj.visible;
        subir(url, 'subirImagen2', function(nombre) {
            console.log(nombre)
            nombreImagen = nombre;
            sh.visible = true;
        });
    }, 1000)
}
var Marcador = function(nombre, id, puntos, obj) {
    var marcador = new createjs.Container();
    var nombreT = new createjs.Text(obj.lugar + '. ' + nombre, 'bold 22px Arial', '#3c1500');
    nombreT.maxWidth = 270;
    var puntosT = new createjs.Text(puntos + ' puntos', 'bold 24px Arial', '#3c1500');
    puntosT.y = 21;
    puntosT.y = 35;

    var imagen = new createjs.Container();
    var imagenC = new createjs.Bitmap('uploads/' + id + '.png');
    var mascara = new createjs.Shape();
    var borde = new createjs.Shape();
    imagen.addChild(borde);
    borde.graphics.f('#3c1500').dc(0, 0, 30);
    borde.x = 27;
    borde.y = 27;
    imagen.addChild(imagenC);
    mascara.graphics.f('black').dc(0, 0, 27);
    imagenC.mask = mascara;
    mascara.x = 27;
    mascara.y = 27;


    imagen.x = 216;
    imagen.visible = false;

    marcador.addChild(nombreT, imagen, puntosT);

    marcador.imagen = imagen;
    marcador.nombre = nombreT;
    marcador.puntos = puntosT;

    marcador.scaleX = .7;
    marcador.scaleY = .7;
    marcador.x = obj.x;
    marcador.y = obj.y;
    return marcador;
};
