var stage;

function init() {
    stage = new createjs.Stage('juego');
    createjs.Ticker.addEventListener('tick', function() {
        stage.update();
        fisica();
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

    stage.nube = new createjs.Bitmap(rutas.imagenes.NUBE_PESCA);
    stage.nube.x = 201;
    stage.nube.y = 53;

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
    ;
    stage.barco_sombra.x = 4;
    stage.barco_sombra.y = 419;

    stage.capa_agua = new createjs.Bitmap(rutas.imagenes.CAPA_AGUA);
    stage.capa_agua.y = 363;

    stage.terminos = new createjs.Bitmap(rutas.imagenes.TERMINOS_PESCA);
    stage.terminos.x = 324;
    stage.terminos.y = 777;

    stage.algas = new createjs.Bitmap(rutas.imagenes.ALGAS);
    stage.algas.x = 133;
    stage.algas.y = 557;

    stage.puntero = new createjs.Bitmap(rutas.imagenes.PUNTERO);
    stage.puntero.regX = 33;
    stage.puntero.regY = 45;
    stage.puntero.x = 506;
    stage.puntero.y = 441;
    stage.puntero.scaleX = .5;
    stage.puntero.scaleY = .5;
    stage.puntero.rotation = 52;
    
    stage.carnada = new createjs.Bitmap(rutas.imagenes.CARNADA);
    stage.carnada.regX=6.5;
    stage.carnada.regY=11.5;
    
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
    
    var i={
        x:182,
        y:260
    };
    stage.guia =  new createjs.Shape();
    
    /*
     stage.guia.graphics.s('black').mt(i.x,i.y)
            .qt(i.x-10,i.y-46,i.x-79,i.y-46)
            .qt(i.x-214,i.y,i.x-214,i.x-214,i.y+50);
     */
    
    stage.guia.graphics.s('black').mt(i.x,i.y)
            .qt(i.x-20,i.y-46,i.x-79,i.y-49)
            .qt(i.x-182,i.y-60,i.x-214,i.y+50);
    
    
    
    //stage.juego.addChild(stage.guia);
    stage.juego.addChildAt(stage.fondo_juego, 0);
    stage.juego.addChildAt(stage.orilla, 1);
    //stage.juego.addChild(stage.opaco);
    stage.juego.addChildAt(stage.sol, 2);
    stage.juego.addChildAt(stage.nube, 3);
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
    stage.juego.addChildAt(stage.cania, 8);
    

    stage.pescador = new Pescador({x: 75, y: 299,punta:new createjs.Point(0,0)});
    stage.juego.addChildAt(stage.pescador, 8);
    stage.juego.addChildAt(stage.carnada, 9);

    stage.addChild(stage.juego);

    stage.on('stagemousemove', function(evt) {
        if(evt.stageX>=202)
        stage.puntero.x = evt.stageX;
    });

    stage.on('mousedown', function(evt) {
        stage.pescador.pescar(stage.puntero.x,stage.puntero.y);
    });
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

function fisica(){
    
}