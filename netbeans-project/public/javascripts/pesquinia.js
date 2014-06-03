var stage;

function init() {
    stage = new createjs.Stage('juego');
    createjs.Ticker.addEventListener('tick', function() {
        stage.update();
    });
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
    stage.lancha.x = 318;
    stage.lancha.y = 368;
    
    stage.ballena = new createjs.Bitmap(rutas.imagenes.BALLENA);
    stage.ballena.x = 1203;
    stage.ballena.y = 366;
    
    stage.logo = new createjs.Bitmap(rutas.imagenes.LOGO_PESCA);
    stage.logo.x = 219;
    
    stage.pts = new createjs.Bitmap(rutas.imagenes.PTS);
    stage.pts.x = 400;
    
    stage.barco_sombra = new createjs.Bitmap(rutas.imagenes.BARCO_SOMBRA);;
    stage.barco_sombra.x = 304;
    stage.barco_sombra.y = 419;
    
    stage.capa_agua = new createjs.Bitmap(rutas.imagenes.CAPA_AGUA);
    stage.capa_agua.y = 363;
    
    stage.terminos = new createjs.Bitmap(rutas.imagenes.TERMINOS_PESCA);
    stage.terminos.x = 324;
    stage.terminos.y = 777;
    
    stage.algas = new createjs.Bitmap(rutas.imagenes.ALGAS);
    stage.algas.x = 133;
    stage.algas.y = 557;
    
    
    stage.juego = new createjs.Container();

    //stage.juego.addChild(stage.guia);
    stage.juego.addChild(stage.fondo_juego);
    stage.juego.addChild(stage.orilla);
    //stage.juego.addChild(stage.opaco);
    stage.juego.addChild(stage.sol);
    stage.juego.addChild(stage.nube);
    stage.juego.addChild(stage.arbustos);
    stage.juego.addChild(stage.faro);
    stage.juego.addChild(stage.lancha);
    stage.juego.addChild(stage.ballena);
    stage.juego.addChild(stage.logo);
    stage.juego.addChild(stage.pts);
    stage.juego.addChild(stage.barco_sombra);
    stage.juego.addChild(stage.algas);
    stage.juego.addChild(stage.capa_agua);
    stage.juego.addChild(stage.terminos);
    

    stage.addChild(stage.juego);
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
        
        if(obj.mask){
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