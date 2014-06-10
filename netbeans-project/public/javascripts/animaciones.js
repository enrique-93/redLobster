function Tortuga(obj) {
    var tortuga_data = {
        images: [rutas.imagenes.TORTUGA],
        frames: {width: 228, height: 118, count: 21},
        animations: {nadar: [0, 20]}
    };
    var spriteSheet = new createjs.SpriteSheet(tortuga_data);
    var tortuga = new createjs.Sprite(spriteSheet, 'nadar');
    tortuga.regX = 114;
    tortuga.sy = 118;
    tortuga.velocidad = 1327 / 10000;
    if (obj) {
        if (obj.x) {
            tortuga.x = obj.x;
        }
        if (obj.y) {
            tortuga.y = obj.y;
        }
        if (obj.sx) {
            tortuga.scaleX = obj.sx;
        }
        if (obj.sy) {
            tortuga.scaleY = obj.sy;
        }
        if (obj.velocidad) {
            tortuga.velocidad *= obj.velocidad;
        }
    }

    return tortuga;
}

function Langosta(obj) {
    var langosta_data = {
        images: [rutas.imagenes.LANGOSTA],
        frames: {width: 272, height: 243, count: 24},
        animations: {caminar: [0, 23], stop: [0]}
    };
    var spriteSheet = new createjs.SpriteSheet(langosta_data);
    var langosta = new createjs.Sprite(spriteSheet);
    langosta.regX = 136;
    langosta.regY = 121.5;
    langosta.velocidad = 827 / 10000;
    if (obj) {
        if (obj.x) {
            langosta.x = obj.x;
        }
        if (obj.y) {
            langosta.y = obj.y;
        }
        if (obj.sx) {
            langosta.scaleX = obj.sx;
        }
        if (obj.sy) {
            langosta.scaleY = obj.sy;
        }
        if (obj.velocidad) {
            langosta.velocidad *= obj.velocidad;
        }
    }

    langosta.nadar = function() {
        langosta.gotoAndPlay('caminar');
    };

    langosta.detener = function() {
        langosta.gotoAndPlay('stop');
    };

    return langosta;
}

function Pescador(obj) {
    var pescar = [];

    var i = {
        x: 182,
        y: 260
    };

    stage.guia.graphics.s('black').mt(i.x, i.y)
            .qt(i.x - 20, i.y - 46, i.x - 79, i.y - 49)
            .qt(i.x - 182, i.y - 60, i.x - 214, i.y + 50);

    var speed = 3;

    var pescador_data = {
        images: [rutas.imagenes.PESCADOR_BOTE,
            rutas.imagenes.PESCADOR_OJOS,
            rutas.imagenes.PESCADOR_CARNADA],
        frames: getFrames(147, 124, 81, 6, -100, -49, 2, getFrames(124, 124, 51, 16, -100, -49, 1, getFrames(224, 173, 46, 9, 0, 0, 0))),
        animations: {run: [false], pescar: [0, 45, 'stop', speed], stop: [0], saludo: [45, 96, 'stop'], carnada: [96, 118, 'stop', speed]}
    };


    var spriteSheet = new createjs.SpriteSheet(pescador_data);
    var pescador = new createjs.Sprite(spriteSheet, "run");

    pescador.vel = speed;

    pescador.regX = 112;
    pescador.regY = 86.5;
    if (obj) {
        if (obj.x) {
            pescador.x = obj.x;
        }
        if (obj.y) {
            pescador.y = obj.y;
        }
        if (obj.sx) {
            pescador.scaleX = obj.sx;
        }
        if (obj.sy) {
            pescador.scaleY = obj.sy;
        }
        if (obj.punta) {
            stage.cania.p1 = obj.punta;
            stage.cania.p2 = new createjs.Point(148, 343);
            obj.punta.x = i.x;
            obj.punta.y = i.y;
            pescador.punta = obj.punta;
            obj.punta.mover = function(x, y) {
                stage.cania.estado = 'preparando';
                createjs.Tween.get(pescador.punta)
                        .to({guide: {path: [i.x, i.y, i.x - 20, i.y - 46, i.x - 79, i.y - 49, i.x - 182, i.y - 60, i.x - 214, i.y + 50]}}, 530 / pescador.vel)
                        .call(cayendo, [x, y])
                        .wait(730 / pescador.vel)
                        .to({guide: {path: [i.x - 214, i.y + 50, i.x - 182, i.y - 60, i.x - 79, i.y - 49, i.x - 20, i.y - 46, i.x, i.y]}}, 370 / pescador.vel);
            };

            stage.cania.graphics.s('white').mt(i.x, i.y)
                    .qt(stage.cania.p1.x, stage.cania.p2.y, stage.cania.p2.x, stage.cania.p2.y);

            var curva = 0;
            function cayendo(x, y) {
                curva = 0;
                stage.cania.estado = 'cayendo';
                stage.pescando = createjs.Tween.get(stage.cania.p2)
                        .wait(400 / pescador.vel)
                        .to({x: i.x - 214, y: i.y + 150}, 500 / pescador.vel)
                        .call(lanzando, [x, y])
                        .to({guide: {path: [stage.cania.p1.x, stage.cania.p1.y, (stage.cania.p1.x + x) / 2, i.x - ((stage.cania.p1.x + x)) * .5, x, y]}}, 700)
                        .wait(100)
                        .call(pescando)
                        .to({y: 1004}, 5000)
                        .call(regresar);
            }

            function pescando() {
                stage.cania.estado = 'pescando';
            }

            function lanzando(x, y) {
                curva = 0;
                stage.cania.estado = 'lanzando';
            }

            function disminuye(val) {
                if (curva <= val)
                    return val;
                return curva -= .7;
            }

            function aumenta(val) {
                if (curva >= val)
                    return val;
                return curva += .7;
            }

            fisica = function() {
                if (stage.cania.estado == 'preparando') {
                    stage.cania.graphics.c().s('white').mt(stage.cania.p1.x, stage.cania.p1.y)
                            .lt(stage.cania.p2.x, stage.cania.p2.y);
                }
                if (stage.cania.estado == 'cayendo') {
                    stage.cania.graphics.c().s('white').mt(stage.cania.p1.x, stage.cania.p1.y)
                            .qt((stage.cania.p1.x + stage.cania.p2.x) / 2, ((stage.cania.p1.y + stage.cania.p2.y) / 2) + 5 * ++curva, stage.cania.p2.x, stage.cania.p2.y);
                }
                if (stage.cania.estado == 'lanzando') {
                    stage.cania.graphics.c().s('white').mt(stage.cania.p1.x, stage.cania.p1.y)
                            .qt((stage.cania.p1.x + stage.cania.p2.x) / 2, ((stage.cania.p1.y + stage.cania.p2.y) / 2) - 5 * ++curva, stage.cania.p2.x, stage.cania.p2.y);
                }
                if (stage.cania.estado == 'pescando') {
                    stage.cania.graphics.c().s('white').mt(stage.cania.p1.x, stage.cania.p1.y)
                            .qt((stage.cania.p1.x + stage.cania.p2.x) / 2, ((stage.cania.p1.y + stage.cania.p2.y) / 2) - 5 * disminuye(0), stage.cania.p2.x, stage.cania.p2.y);
                }
                if (stage.cania.estado == 'rebobinando') {
                    stage.cania.graphics.c().s('white').mt(stage.cania.p1.x, stage.cania.p1.y)
                            .qt((stage.cania.p1.x + stage.cania.p2.x) / 2, ((stage.cania.p1.y + stage.cania.p2.y) / 2) + 5 * aumenta(3), stage.cania.p2.x, stage.cania.p2.y);
                }
                stage.carnada.x = stage.cania.p2.x;
                stage.carnada.y = stage.cania.p2.y;
            }

        }
    }

    pescador.estado = 'listo';

    function regresar() {
        stage.pescando.setPaused('true')
        stage.cania.estado = 'rebobinando'
        createjs.Tween.get(stage.cania.p2)
                .to({x: 148, y: 343}, 1200)
                .call(listo)
    }

    function carnada() {
        stage.carnada.visible = true;
        pescador.estado = 'listo';
        stage.atrapado = null;
    }
    function anima() {
        pescador.gotoAndPlay('carnada');
    }

    function listo() {
        if (stage.atrapado) {
            createjs.Tween.get(stage.cania.p1)
                    .wait(2000)
                    .call(anima);
            createjs.Tween.get(stage.cania.p1)
                    .wait(2000)
                    .wait(1200 / pescador.vel)
                    .call(carnada);

        } else {
            pescador.estado = 'listo';
        }
    }
    pescador.pescar = function(x, y) {
        if (pescador.estado == 'listo') {
            pescador.estado = 'pescando';
            pescador.gotoAndPlay('pescar');
            if (pescador.punta) {
                pescador.punta.mover(x, y);
            }
        }
        if (stage.cania.estado == 'pescando') {
            regresar();
        }
    };

    pescador.saludar = function() {
        if (pescador.estado == 'listo') {
            pescador.gotoAndPlay('saludo');
        }
    };

    pescador.regresar = function() {
        regresar();
    };

    return pescador;
}

function Ardilla(obj) {
    var ardilla_adata = {
        images: [rutas.imagenes.ARDILLA],
        frames: {width: 231, height: 178},
        animations: {saludo: {frames: [], next: 'stop'}, stop: [false]}
    };
    for (var a = 0; a < 44; a++) {
        ardilla_adata.animations.saludo.frames.push(a);
    }

    var spriteArdilla = new createjs.SpriteSheet(ardilla_adata),
            ardilla = new createjs.Sprite(spriteArdilla);

    if (obj) {
        if (obj.x) {
            ardilla.x = obj.x;
        }
        if (obj.y) {
            ardilla.y = obj.y;
        }
        if (obj.sx) {
            ardilla.scaleX = obj.sx;
        }
        if (obj.sy) {
            ardilla.scaleY = obj.sy;
        }
    }

    ardilla.saludar = function() {
        ardilla.gotoAndPlay('saludo');
    };

    return ardilla;
}

function PescadorHome(obj) {



    var pescadorHome_data = {
        images: [rutas.imagenes.PESCADOR_HOME],
        frames: {width: 328, height: 334, count: 129},
        animations: {invitacion: {frames: [], next: 'stop'}, stop: [false]}
    };
    for (var a = 0; a < pescadorHome_data.frames.count; a++) {
        pescadorHome_data.animations.invitacion.frames.push(a);
    }
    var spritePescadorHome = new createjs.SpriteSheet(pescadorHome_data),
            pescadorHome = new createjs.Sprite(spritePescadorHome);

    if (obj) {
        if (obj.x) {
            pescadorHome.x = obj.x;
        }
        if (obj.y) {
            pescadorHome.y = obj.y;
        }
        if (obj.sx) {
            pescadorHome.scaleX = obj.sx;
        }
        if (obj.sy) {
            pescadorHome.scaleY = obj.sy;
        }

    }

    pescadorHome.invitar = function() {
        pescadorHome.gotoAndPlay('invitacion');
    };

    return pescadorHome;
}

function Carpintero(obj) {
    var carpintero_data = {
        images: [rutas.imagenes.PAJARO],
        frames: {width: 58, height: 74, count: 11},
        animations: {picar: {frames: [0, 1, 2, 3, 4, 5, 6, 7], next: 'stop'}, stop: [false]}
    };

    var spriteCarpintero = new createjs.SpriteSheet(carpintero_data),
            carpintero = new createjs.Sprite(spriteCarpintero);

    if (obj) {
        if (obj.x) {
            carpintero.x = obj.x;
        }
        if (obj.y) {
            carpintero.y = obj.y;
        }
        if (obj.sx) {
            carpintero.scaleX = obj.sx;
        }
        if (obj.sy) {
            carpintero.scaleY = obj.sy;
        }
    }

    carpintero.picar = function() {
        carpintero.gotoAndPlay('picar');
    };

    return carpintero;
}

function NubeHome(obj) {
    var nubeHome = new createjs.Bitmap(rutas.imagenes.NUBE);
    nubeHome.velocidad = 1327 / 7000; //pixeles/ms
    if (obj) {
        if (obj.x) {
            nubeHome.x = obj.x;
        }
        if (obj.y) {
            nubeHome.y = obj.y;
        }
        if (obj.sx) {
            nubeHome.scaleX = obj.sx;
        }
        if (obj.sy) {
            nubeHome.scaleY = obj.sy;
        }
        if (obj.velocidad) {
            nubeHome.velocidad = obj.velocidad;
        }
    }
    nubeHome.rebobinar = function() {
        nubeHome.x = 1327;
    };

    return nubeHome;
}

function NubePesca(obj) {
    var nubePesca = new createjs.Bitmap(rutas.imagenes.NUBE_PESCA);
    nubePesca.velocidad = 680 / 7000; //pixeles/ms
    if (obj) {
        if (obj.x) {
            nubePesca.x = obj.x;
        }
        if (obj.y) {
            nubePesca.y = obj.y;
        }
        if (obj.sx) {
            nubePesca.scaleX = obj.sx;
        }
        if (obj.sy) {
            nubePesca.scaleY = obj.sy;
        }
        if (obj.velocidad) {
            nubePesca.velocidad = obj.velocidad;
        }
    }
    nubePesca.rebobinar = function() {
        nubePesca.x = 1327;
    };

    return nubePesca;
}

function Garza(obj) {

    var garza_data = {
        images: [rutas.imagenes.GARZA],
        frames: {width: 124, height: 181, count: 28},
        animations: {cabeza: {frames: [], next: 'stop'}, stop: [false]}
    };
    for (var a = 0; a < garza_data.frames.count; a++) {
        garza_data.animations.cabeza.frames.push(a);
    }

    var spriteGarza = new createjs.SpriteSheet(garza_data),
            garza = new createjs.Sprite(spriteGarza);

    if (obj) {
        if (obj.x) {
            garza.x = obj.x;
        }
        if (obj.y) {
            garza.y = obj.y;
        }
        if (obj.sx) {
            garza.scaleX = obj.sx;
        }
        if (obj.sy) {
            garza.scaleY = obj.sy;
        }
    }

    garza.moverCabeza = function() {
        garza.gotoAndPlay('cabeza');
    };

    return garza;
}

function getFrames(ancho, alto, numero, columnas, regX, regY, index, framesP) {
    var frames = [];
    if (framesP)
        frames = framesP;
    var cX = 0;
    var cY = 0;
    for (var a = 0; a < numero; a++) {
        if (a % columnas == 0 && a > 0) {
            cX = 0;
            cY += alto;
        }
        frames.push([cX, cY, ancho, alto, index, regX, regY]);
        cX += ancho;
    }
    return frames;
}



