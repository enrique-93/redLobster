var stage;
var tiempoLimite;//segundos

function init() {
    stage = new createjs.Stage('juego');
    stage.funciones = [];
    createjs.Ticker.addEventListener('tick', function() {
        stage.update();
        fisica();
        for (var a = 0; a < stage.funciones.length; a++) {
            stage.funciones[a](a);
        }
    });
    createjs.MotionGuidePlugin.install(createjs.Tween);
    stage.enableMouseOver(100);

    //Fondo-partes
    stage.guia = new createjs.Bitmap(rutas.imagenes.GUIA);
    stage.fondo_juego = new createjs.Bitmap(rutas.imagenes.FONDO_JUEGO);

    stage.orilla = new createjs.Bitmap(rutas.imagenes.ORILLA);
    stage.orilla.y = 348;

    stage.arbustos = new createjs.Bitmap(rutas.imagenes.ARBUSTOS);
    stage.arbustos.y = 138;

    stage.opaco = new createjs.Bitmap(rutas.imagenes.OPACO);

    stage.sol = new createjs.Bitmap(rutas.imagenes.SOL_PESCA);
    stage.sol.x = 710;

    stage.nube1 = new NubePesca({x: 201, y: 53});

    stage.nube2 = new NubePesca({x: 1527, y: 53});

    stage.faro = new createjs.Bitmap(rutas.imagenes.FARO);
    stage.faro.x = 875;
    stage.faro.y = 42;

    stage.lancha = new createjs.Bitmap(rutas.imagenes.LANCHA);
    stage.lancha.x = 18;
    stage.lancha.y = 368;

    stage.ballena = new createjs.Bitmap(rutas.imagenes.BALLENA);
    stage.ballena.x = 1203;
    stage.ballena.y = 366;

    stage.logo = new createjs.Bitmap(rutas.imagenes.LOGO_PESCA);
    stage.logo.x = 219;

    stage.pts = new createjs.Bitmap(rutas.imagenes.PTS);
    stage.pts.x = 400;

    stage.barco_sombra = new createjs.Bitmap(rutas.imagenes.BARCO_SOMBRA);
    stage.barco_sombra.x = 4;
    stage.barco_sombra.y = 419;

    stage.capa_agua = new createjs.Bitmap(rutas.imagenes.CAPA_AGUA);
    stage.capa_agua.y = 363;

    stage.terminos = new createjs.Bitmap(rutas.imagenes.TERMINOS_PESCA);
    stage.terminos.x = 324;
    stage.terminos.y = 777;
    stage.terminos.visible = false;

    stage.algas = new createjs.Bitmap(rutas.imagenes.ALGAS);
    stage.algas.x = 133;
    stage.algas.y = 557;

    stage.puntero = new createjs.Bitmap(rutas.imagenes.PUNTERO);
    stage.puntero.regX = 70;
    stage.puntero.regY = 35;
    stage.puntero.x = 506;
    stage.puntero.y = 441;
    stage.puntero.scaleX = .5;
    stage.puntero.scaleY = .5;
    stage.puntero.rotation = 52;



    stage.linea = new createjs.Bitmap(rutas.imagenes.LINEA);
    stage.linea.scaleX = .25;
    stage.linea.scaleY = 1.1;
    stage.linea.x = 500;
    stage.linea.y = 390;

    stage.carnada = new createjs.Bitmap(rutas.imagenes.CARNADA);
    stage.carnada.regX = 6.5;
    stage.carnada.regY = 11.5;

    stage.puntos = new createjs.Text('00000', 'bold 24px Arial', '#3c1500');
    stage.puntos.scaleY = 2;
    stage.puntos.x = 412;
    stage.puntos.y = 21;

    stage.incremento = new createjs.Text('1', 'bold 48px Arial', createjs.Graphics.getRGB(150, 255, 150));
    stage.incremento.alpha = 0;

    stage.tiempo_c = new createjs.Container();
    stage.tiempo_c.x = 1078;
    stage.tiempo_tabla = new createjs.Bitmap(rutas.imagenes.TIEMPO);
    stage.fondo_barra = new createjs.Shape();
    stage.fondo_barra.graphics.f('white').dr(0, 0, 156, 30)
    stage.fondo_barra.x = 13;
    stage.fondo_barra.y = 31;
    stage.fondo_barra.alpha = .6;
    stage.barra = new createjs.Shape();
    stage.barra.graphics.f('#3c1500').dr(0, 0, 156, 30)
    stage.barra.x = 13;
    stage.barra.y = 31;
    stage.minutos = new createjs.Text(Math.floor(tiempoLimite / 60), 'bold 24px Arial', '#3c1500');
    stage.minutos.scaleY = 2;
    stage.minutos.x = 177;
    stage.minutos.y = 15;
    stage.segundos = new createjs.Text(':' + to(tiempoLimite % 60, 2), 'bold 24px Arial', '#3c1500');
    stage.segundos.scaleY = 2;
    stage.segundos.x = 190;
    stage.segundos.y = 15;

    stage.hazClick = new createjs.Text('¡Haz click para iniciar!', 'bold 70px Arial', '#3c1500');
    stage.hazClick.x = 429;
    stage.hazClick.y = 592;

    stage.tiempo_c.addChild(stage.tiempo_tabla);
    stage.tiempo_c.addChild(stage.fondo_barra);
    stage.tiempo_c.addChild(stage.barra);
    stage.tiempo_c.addChild(stage.minutos);
    stage.tiempo_c.addChild(stage.segundos);

    stage.marcador_c = new createjs.Container();
    stage.marcador_c.y = 450;
    stage.marcador = new createjs.Bitmap(rutas.imagenes.RED);
    stage.marcador.x = 242;
    stage.marcador.y = -47;
    stage.marcador.scaleX = -.8;
    stage.marcador.scaleY = .8;
    /*stage.marcador = new createjs.Shape();
     stage.marcador.graphics.f(createjs.Graphics.getRGB(191, 129, 45))
     .dr(0, 0, 300, 554);*/
    stage.marcador.alpha = .9;

    stage.marcador_c.addChild(stage.marcador);
    
    stage.marcador_c.sonidos={
        marcar: sonidos.SCORE
    }

    stage.cania = new createjs.Shape();

    var data = {
        images: [rutas.imagenes.TORTUGA],
        frames: {width: 228, height: 118},
        animations: {saludo: [], regreso: []}
    };
    for (var a = 0; a < 10; a++) {
        data.animations.saludo.push(a);
    }
    data.animations.saludo.push('saludo');

    stage.juego = new createjs.Container();

    var i = {
        x: 182,
        y: 260
    };
    stage.guia = new createjs.Shape();

    /*
     stage.guia.graphics.s('black').mt(i.x,i.y)
     .qt(i.x-10,i.y-46,i.x-79,i.y-46)
     .qt(i.x-214,i.y,i.x-214,i.x-214,i.y+50);
     */

    stage.guia.graphics.s('black').mt(i.x, i.y)
            .qt(i.x - 20, i.y - 46, i.x - 79, i.y - 49)
            .qt(i.x - 182, i.y - 60, i.x - 214, i.y + 50);



    //stage.juego.addChild(stage.guia);
    stage.juego.addChildAt(stage.fondo_juego, 0);
    stage.juego.addChildAt(stage.orilla, 1);
    stage.juego.addChild(stage.opaco);
    stage.juego.addChildAt(stage.sol, 2);
    stage.juego.addChildAt(stage.nube1, 3);
    stage.juego.addChildAt(stage.nube2, 3);
    stage.juego.addChildAt(stage.arbustos, 4);
    stage.juego.addChildAt(stage.faro, 5);
    stage.juego.addChildAt(stage.ballena, 6);
    stage.juego.addChildAt(stage.logo, 7);
    stage.juego.addChildAt(stage.pts, 8);
    stage.juego.addChildAt(stage.lancha, 9);
    stage.juego.addChildAt(stage.barco_sombra, 10);
    stage.juego.addChildAt(stage.algas, 11);
    stage.juego.addChildAt(stage.capa_agua, 12);
    stage.juego.addChildAt(stage.terminos, 13);
    stage.juego.addChildAt(stage.puntero, 14);
    stage.juego.addChildAt(stage.linea, stage.juego.getChildIndex(stage.capa_agua));
    stage.juego.addChildAt(stage.cania, 11);


    stage.pescador = new Pescador({x: 75, y: 299, punta: new createjs.Point(0, 0)});
    stage.pescador.sonidos={
      voz: sonidos.VOZ,
      pescar: sonidos.BRINCO,
      splash: sonidos.SPLASH,
      rebobinar : sonidos.REBOBINAR
    };
    
    stage.juego.addChildAt(stage.pescador, 8);
    stage.juego.addChildAt(stage.carnada, 12);
    stage.juego.addChild(stage.puntos);
    stage.juego.addChild(stage.marcador_c);
    stage.juego.addChild(stage.tiempo_c);
    stage.juego.addChild(stage.hazClick);
    stage.juego.addChild(stage.incremento);

    stage.addChild(stage.juego);


    generarTortugas(10);

    generarLangostas(Math.random() * 40 + 30);
    generarPeces(Math.random() * 30 + 30, 1);
    generarPeces(Math.random() * 30 + 30, 2);
    generarPeces(Math.random() * 30 + 30, 3);

    socket.emit('getPuntuajes')

    stage.on('stagemousemove', function(evt) {
        if (evt.stageX >= 310) {
            stage.linea.x += (evt.stageX - stage.puntero.x);
            stage.puntero.x = evt.stageX;
        }
    });

    stage.on('mousedown', function(evt) {
        if (!stage.iniciado) {
            if (!stage.dec) {
                stage.dec = true;
                socket.on('jugar', function(punto) {

                    (function() {
                        var _fbq = window._fbq || (window._fbq = []);
                        if (!_fbq.loaded) {
                            var fbds = document.createElement('script');
                            fbds.async = true;
                            fbds.src = '//connect.facebook.net/en_US/fbds.js';
                            var s = document.getElementsByTagName('script')[0];
                            s.parentNode.insertBefore(fbds, s);
                            _fbq.loaded = true;
                        }
                    })();
                    window._fbq = window._fbq || [];
                    window._fbq.push(['track', '6014983128135', {'value': '0.01', 'currency': 'USD'}]);

                    stage.iniciado = new Date().getTime();
                    stage.jugando = true;
                    createjs.Tween.get(stage.hazClick)
                            .to({alpha: 0}, 1000);
                    createjs.Tween.get(stage.barra, {loop: true})
                            .wait(100)
                            .call(delta);
                    stage.pescador.pescar(punto.x, punto.y);
                });
            }
            var langostasO = [],
                    pecesO = [];
            for (var a = 0; a < langostas.length; a++) {
                langostasO.push({puntuaje: langostas[a].puntuaje, muerto: false});
                if (langostas[a].muerto)
                    langostasO[a].muerto = true;
            }
            for (var a = 0; a < peces.length; a++) {
                pecesO.push({puntuaje: peces[a].puntuaje, muerto: false});
                if (peces[a].muerto)
                    pecesO[a].muerto = true;
            }
            socket.emit('iniciarJuego', user, {x: stage.puntero.x, y: stage.puntero.y}, langostasO, pecesO);
        }
        function delta() {
            var ti = stage.iniciado;
            var tf = new Date().getTime();
            var t = tf - ti;
            var ts = Math.round(t / 1000);
            var r = tiempoLimite - ts;
            var seg = to(r % 60, 2);
            var min = Math.floor(r / 60);
            stage.minutos.text = min;
            stage.segundos.text = ':' + seg;
            stage.barra.scaleX = (tiempoLimite * 1000 - t) / (tiempoLimite * 1000);
            if (r <= 10) {
                stage.hazClick.text = r;
            }
            if (r == Math.round(tiempoLimite / 2))
                stage.barra.graphics.c().f(createjs.Graphics.getRGB(255, 201, 14)).dr(0, 0, 156, 30)
            if (r == Math.round(tiempoLimite / 12))
                stage.barra.graphics.c().f(createjs.Graphics.getRGB(237, 28, 36)).dr(0, 0, 156, 30)
            if (r == 10) {

                stage.hazClick.x = 780;
                stage.hazClick.y = 927;
                stage.hazClick.text = r;
                createjs.Tween.get(stage.hazClick)
                        .to({alpha: 1}, 1500);
            }
            if (r <= 0) {
                var langostasO = [],
                        pecesO = [];
                for (var a = 0; a < langostas.length; a++) {
                    langostasO.push({puntuaje: langostas[a].puntuaje, muerto: false});
                    if (langostas[a].muerto)
                        langostasO[a].muerto = true;
                }
                for (var a = 0; a < peces.length; a++) {
                    pecesO.push({puntuaje: peces[a].puntuaje, muerto: false});
                    if (peces[a].muerto)
                        pecesO[a].muerto = true;
                }
                socket.emit('finalizarJuego', langostasO, pecesO);
                if (user.email != 'no-registrado')
                    deNuevo();
                stage.pescador.regresar();
                stage.jugando = false;
                createjs.Tween.get(stage.barra, {loop: false, override: true});
            }
        }
        if (stage.jugando == true) {
            stage.pescador.pescar(stage.puntero.x, stage.puntero.y);
        }
    });


    //Animaciones
    createjs.Tween.get(stage.pescador, {loop: true})
            .wait(3000)
            .call(stage.pescador.saludar)
            .wait(6000);

    createjs.Tween.get(stage.nube1, {loop: false})
            .to({x: -1327}, 1327 / stage.nube1.velocidad)
            .wait(399).call(animaNube, [stage.nube1]);

    createjs.Tween.get(stage.nube2, {loop: false})
            .call(animaNube, [stage.nube2]);

    createjs.Tween.get(stage.nube2, {loop: false})
            .call(animaNube, [stage.nube2]);


    function animaNube(obj) {
        createjs.Tween.get(obj, {loop: true})
                .to({x: 1527}, 0)
                .wait(1)
                .to({x: -1327}, 2654 / obj.velocidad)
                .wait(399);
    }
    
    sonidos.MAR.play();
}

function setPos(obj, x, y) {
    obj.x = x;
    obj.y = y;
}

function drag(obj) {
    obj.on('mousedown', function(evt) {
        obj.dx = evt.stageX - obj.x;
        obj.dy = evt.stageY - obj.y;
        obj.cursor = 'pointer';
    });
    obj.on('pressmove', function(evto) {
        var dx = evto.stageX - obj.x;
        var dy = evto.stageY - obj.y;
        obj.x += (dx - obj.dx);
        obj.y += (dy - obj.dy);

        if (obj.mask) {
            obj.mask.x += (dx - obj.dx);
            obj.mask.y += (dy - obj.dy);
        }
    });
    obj.on('pressup', function(evt) {
        obj.cursor = 'default';
    });
}

var tortugas = [];
function generarTortugas(num) {
    for (var a = 0; a < num; a++) {
        var x = Math.random() * 3981;
        var y = Math.random() * (500) + 441;
        var sx = Math.random() * .5 - .25;



        if (sx == 0)
            sx += .1;

        if (sx > 0)
            sx += .5;
        if (sx < 0)
            sx -= .5;

        var tortuga = new Tortuga({
            x: x,
            y: y,
            sx: sx,
            sy: Math.abs(sx),
            velocidad: ((Math.random() * .5 + .5))
        });
        var reinicio = -1327;
        var to = 2654;
        if (sx < 0) {
            reinicio = to;
            to = -1327;
        }
        createjs.Tween.get(tortuga, {loop: false})
                .call(camina, [tortuga, to, reinicio])

        stage.juego.addChildAt(tortuga, 8);
        tortugas.push(tortuga);
    }
}
;

var langostas = [];
var peces = [];

function generarPeces(num, tipo) {
    for (var a = 0; a < num; a++) {
        var x = Math.random() * 3981,
                y = Math.random() * 414 + 441,
                sx = Math.random() * .25 - .125;

        if (sx == 0)
            sx += .1;

        if (sx > 0)
            sx += .5;
        if (sx < 0)
            sx -= .5;

        var vel = ((Math.random() * .5 + .5));
        var obj = {
            x: x,
            y: y,
            sx: sx,
            sy: Math.abs(sx),
            velocidad: vel
        };

        peces.push(new Pez(obj, tipo));
        
        peces[peces.length - 1].sonidos = {
            capturar: sonidos.COIN
        }
        
        stage.juego.addChildAt(peces[peces.length - 1], stage.juego.getChildIndex(stage.capa_agua));
    }
}

function generarLangostas(num) {
    for (var a = 0; a < num; a++) {
        var x = Math.random() * 3981;
        var y = Math.random() * 30 + 954;
        var sx = Math.random() * .5 - .25;

        if (sx == 0)
            sx += .1;

        if (sx > 0)
            sx += .5;
        if (sx < 0)
            sx -= .5;


        var vel = ((Math.random() * .5 + .5));
        var puntuaje = Math.abs(Math.round(1000 * sx * 2 * vel));

        if (Math.round(Math.random() * 40) != 10) {
            sx *= .4;
        } else {
            puntuaje /= .4;
            puntuaje = Math.round(puntuaje)
        }

        var langosta_c = new createjs.Container();
        langosta_c.x = x;
        langosta_c.y = y;
        langosta_c.scaleX = sx;
        langosta_c.scaleY = Math.abs(sx);
        langosta_c.rotation = 23;
        langosta_c.puntuaje = puntuaje;

        var langosta = new Langosta({
            velocidad: vel,
            puntuaje: puntuaje
        });
        
        langosta_c.sonidos = {
            capturar: sonidos.COIN2
        }
        
        var zona_pescable = new createjs.Shape();
        zona_pescable.graphics.f('black').dc(0, 0, 80);
        zona_pescable.regX = 25;
        zona_pescable.regY = 25;
        zona_pescable.x = -32;
        zona_pescable.y = 25;
        zona_pescable.visible = false;


        langosta_c.addChild(zona_pescable);
        langosta_c.addChild(langosta);

        langosta_c.zona = zona_pescable;
        langosta_c.langosta = langosta;
        langosta_c.velocidad = langosta.velocidad;

        var reinicio = 2654;
        var to = -1327;
        //langosta.rotation = 23;
        if (sx < 0) {
            reinicio = to;
            to = 2654;
            langosta_c.rotation = -23;
        }


        langosta.caminando = createjs.Tween.get(langosta_c, {loop: false})
                .call(iniciaO, [langosta])
                .call(camina, [langosta_c, to, reinicio]);



        stage.juego.addChildAt(langosta_c, stage.juego.getChildIndex(stage.capa_agua));
        langostas.push(langosta_c);
        var funcion = function(i) {
            var punta = stage.cania.p2;
            var pt = langostas[i].zona.globalToLocal(punta.x, punta.y)
            if (langostas[i].zona.hitTest(pt.x, pt.y)) {
                if (stage.cania.estado == 'pescando') {
                    stage.atrapado = langostas[i];
                    var ant = puntos;
                    puntos += stage.atrapado.puntuaje;
                    stage.atrapado.muerto = true;
                    socket.emit('pescado', 'langosta', stage.atrapado.puntuaje);
                    stage.incremento.text = '+' + stage.atrapado.puntuaje;
                    stage.incremento.x = stage.cania.p2.x - 10;
                    stage.incremento.y = stage.cania.p2.y - 30;
                    createjs.Tween.get(stage.incremento)
                            .call(function(){
                                stage.pescador.sonidos.voz.play({delay:200})
                                langostas[i].sonidos.capturar.play()
                            })
                            .to({alpha: 1}, 1000)
                            .wait(100)
                            .to({alpha: .25, x: stage.puntos.x, y: stage.puntos.y}, 1500)
                            .to({alpha: 0}, 300);
                    cuentaPuntos(ant, puntos);
                    stage.pescador.regresar();
                    langostas[i].langosta.gotoAndPlay('stop');
                    createjs.Tween.get(langostas[i], {override: true})
                            .to({x: stage.carnada.x, y: stage.carnada.y}, 0)
                            .to({x: 148, y: 343}, 1200)
                            .to({alpha: 0}, 2000);
                    stage.carnada.visible = false;
                }
            }
        };
        stage.funciones.push(funcion);
    }
}
;

var puntos = 0;

function to(text, l) {
    text = '' + text;
    while (text.length < l) {
        text = '0' + text;
    }
    return text;
}

function cuentaPuntos(ant, fin, salto) {
    var s = salto;
    if (!salto)
        s = Math.round((fin - ant) / 35);
    stage.puntos.text = to(ant, 5);
    if (ant < fin)
        createjs.Tween.get(stage.puntos, {loop: false})
                .call(function(){
                    stage.marcador_c.sonidos.marcar.play({delay:300,duration:300,volume:.4})
                })
                .wait(1)
                .call(cuentaPuntos, [ant + s, fin, s]);
    else
        stage.puntos.text = to(fin, 5);
}

function camina(obj, x, r) {
    var tiempo = (Math.abs(obj.x - x)) / obj.velocidad;
    return createjs.Tween.get(obj, {loop: false})
            .to({x: x}, tiempo)
            .call(reinicia, [obj, x, r]);
}

function reinicia(obj, x, r) {
    return createjs.Tween.get(obj, {loop: false})
            .wait(100)
            .to({x: r}, 0)
            .call(camina, [obj, x, r]);
}

function cambia(obj, nivel) {
    nivel = nivel || 100;
    nivel /= 100;
    var filtro = new createjs.ColorMatrixFilter(new createjs.ColorMatrix(10, 30, -30));
    var sepiaFilter = new createjs.ColorMatrixFilter([
        1 - (0.607 * nivel), 0.769 * nivel, 0.189 * nivel, 0, 0, // red component
        0.349 * nivel, 1 - (0.314 * nivel), 0.168 * nivel, 0, 0, // green component
        0.272 * nivel, 0.534 * nivel, 1 - (0.869 * nivel), 0, 0, // blue component
        0, 0, 0, 1, 0  // alpha
    ]);
    obj.filters = [filtro, sepiaFilter];
    obj.cache(0, 0, obj.image.width, obj.image.height);
    obj.updateCache();
}

function addFilterColor(obj, color) {
    nivel = nivel || 100;
    nivel /= 100;
    var filtro = new createjs.ColorMatrixFilter(new createjs.ColorMatrix(10, 30, -30));
    obj.filters = [filtro, sepiaFilter];
    obj.cache(0, 0, obj.image.width, obj.image.height);
    obj.updateCache();
}

function fisica() {

}

function iniciaO(obj) {
    var t = Math.random() * 1000;
    createjs.Tween.get(obj, {loop: false})
            .wait(t)
            .call(iniciaE, [obj]);
}

function iniciaE(o) {
    o.gotoAndPlay('caminar');
}