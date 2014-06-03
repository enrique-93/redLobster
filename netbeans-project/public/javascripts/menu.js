var stage;

function init() {
    stage = new createjs.Stage('juego');
    /*
     stage.nombre = new createjs.Text(user.name, 'bold 36px Arial', 'green');
     stage.addChild(stage.nombre);
     */
    createjs.Ticker.addEventListener('tick', function() {
        stage.update();
    });
    stage.enableMouseOver(100);

    //Fondo-partes
    stage.fondo_menu = new createjs.Bitmap(rutas.imagenes.FONDO_MENU);
    stage.sol = new createjs.Bitmap(rutas.imagenes.SOL);
    stage.sol.x = 689;
    stage.sol.y = -13;
    stage.nube1 = new createjs.Bitmap(rutas.imagenes.NUBE);
    stage.nube1.x = 3;
    stage.nube1.y = 58;
    stage.nube2 = new createjs.Bitmap(rutas.imagenes.NUBE);
    stage.nube2.x = 1327;
    stage.nube2.y = 58;

    //Fondo-conjunto
    stage.menu = new createjs.Container();

    //Letrero-partes
    stage.tabla = new createjs.Bitmap(rutas.imagenes.LETRERO);
    stage.tabla.x = 616;
    stage.tabla.y = 250;
    stage.conn = new createjs.Bitmap(rutas.imagenes.CONECTAR);
    stage.ins = new createjs.Bitmap(rutas.imagenes.INSTRUCCIONES);
    stage.jugar = new createjs.Bitmap(rutas.imagenes.JUGAR);
    stage.conn_o = new createjs.Bitmap(rutas.imagenes.CONECTAR_OVER);
    stage.conn_o.cursor = 'pointer';
    stage.ins_o = new createjs.Bitmap(rutas.imagenes.INSTRUCCIONES_OVER);
    stage.ins_o.cursor = 'pointer';
    stage.jugar_o = new createjs.Bitmap(rutas.imagenes.JUGAR_OVER);
    stage.jugar_o.cursor = 'pointer';
    stage.flecha_usuario = new createjs.Bitmap(rutas.imagenes.FLECHA_USUARIO);
    stage.flecha_usuario.cursor = 'pointer';

    //Header-partes
    stage.bienvenidos = new createjs.Bitmap(rutas.imagenes.BIENVENIDOS);
    stage.bienvenidos.x = 479;
    stage.logo = new createjs.Bitmap(rutas.imagenes.RED_LOBSTER);
    stage.logo.x = 195;

    //Pasto
    stage.pasto = new createjs.Bitmap(rutas.imagenes.PASTO);

    //Pato
    stage.pato = new createjs.Bitmap(rutas.imagenes.PATO);
    stage.pato.x = 1125;
    stage.pato.y = 475;

    //Dialogo
    stage.dialogo = new createjs.Bitmap(rutas.imagenes.DIALOGO);
    stage.dialogo.x = 318;
    stage.dialogo.y = 231;

    //Terminos
    stage.terminos = new createjs.Bitmap(rutas.imagenes.TERMINOS);
    stage.terminos.x = 325;
    stage.terminos.y = 775;

    //Sombra hombre
    stage.sombra_hombre = new createjs.Bitmap(rutas.imagenes.SOMBRA_HOMBRE);
    stage.sombra_hombre.x = 415;
    stage.sombra_hombre.y = 595;

    //Sombra ardilla
    stage.sombra_ardilla = new createjs.Bitmap(rutas.imagenes.SOMBRA_HOMBRE);
    stage.sombra_ardilla.scaleX = 1.6;
    stage.sombra_ardilla.x = 239;
    stage.sombra_ardilla.y = 76;

    //Modal instrucciones-partes
    stage.instrucciones = new createjs.Bitmap(rutas.imagenes.MODAL_INSTRUCCIONES);
    stage.boton_cerrar = new createjs.Bitmap(rutas.imagenes.BOTON_CERRAR);
    stage.boton_cerrar.x = 942;
    stage.boton_cerrar.y = 251;
    stage.boton_cerrar_over = new createjs.Bitmap(rutas.imagenes.BOTON_CERRAR_OVER);
    stage.boton_cerrar_over.x = 942;
    stage.boton_cerrar_over.y = 251;
    stage.boton_cerrar_over.visible = false;
    stage.boton_cerrar_over.cursor = 'pointer';

    //Modal instrucciones-conjunto
    stage.modal_instrucciones = new createjs.Container();
    stage.modal_instrucciones.addChild(stage.instrucciones);

    stage.modal_instrucciones.addChild(stage.boton_cerrar);
    stage.modal_instrucciones.addChild(stage.boton_cerrar_over);
    stage.modal_instrucciones.visible = false;


    //no-visible
    stage.conn_o.visible = false;
    stage.ins_o.visible = false;
    stage.jugar_o.visible = false;
    setPos(stage.conn_o, -2, 2);
    setPos(stage.jugar_o, 2, 0);
    setPos(stage.ins_o, -2, -2);
    stage.usuario_c = new createjs.Container();
    stage.usuario = new createjs.Container();
    stage.usuario_c.addChild(stage.flecha_usuario);
    stage.flecha_usuario.scaleX = 1.3;
    stage.flecha_usuario.scaleY = 1.3;
    stage.flecha_usuario.x = -210;
    stage.flecha_usuario.y = -150;
    stage.usuario_c.addChild(stage.usuario);
    if (user) {
        stage.conn.visible = false;

        stage.nombre = new createjs.Text(user.name, 'bold 30px Arial', '#3c1500');
        stage.nombre.lineWidth = 150;
        stage.nombre.maxWidth = 110;
        stage.nombre.textBaseline = "middle";

        var image = new Image();
        image.crossOrigin = "Anonymous";
        image.src = 'https://graph.facebook.com/' + user.id + '/picture?width=160&height=160&size=normal';

        image.onload = function() {
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0,60,60);
            stage.imagen_usuario = new createjs.Container();
            stage.imagen_usuario.x = 129;
            stage.imagen_usuario.y = -15;
            stage.foto = new createjs.Bitmap(canvas.toDataURL("image/png"));
            stage.cm = new createjs.Shape();
            stage.cm.graphics.beginFill('black').drawCircle(30,30,30).cp();
            stage.foto.mask = stage.cm;
            cambia(stage.foto,60);

            stage.imagen_usuario.addChild(stage.foto);
            stage.imagen_usuario.addChild(stage.recuadro);
            stage.usuario.addChild(stage.imagen_usuario);
        };

        stage.recuadro = new createjs.Shape();
        stage.recuadro.graphics.beginStroke('#3c1500').setStrokeStyle(4).dc(30,30,30).cp();

        stage.usuario.x = 677;
        stage.usuario.y = 480;
        stage.usuario.rotation = 7.3;

        stage.usuario.addChild(stage.nombre);

    } else {
        stage.flecha_usuario.visible = false;
    }

    //letrero-conjunto
    stage.letrero = new createjs.Container();
    stage.letrero.addChild(stage.tabla);
    stage.letrero.addChild(stage.conn);
    stage.letrero.addChild(stage.ins);
    stage.letrero.addChild(stage.jugar);
    stage.letrero.addChild(stage.conn_o);
    stage.letrero.addChild(stage.ins_o);
    stage.letrero.addChild(stage.jugar_o);
    stage.letrero.addChild(stage.usuario_c);

    //header-conjunto
    stage.header = new createjs.Container();
    stage.header.addChild(stage.bienvenidos);
    stage.header.addChild(stage.logo);


    stage.conn.on("mouseover", function(event) {
        stage.conn_o.visible = true;
        stage.conn.visible = false;
    });

    stage.conn_o.on('mouseout', function(event) {
        stage.conn_o.visible = false;
        stage.conn.visible = true;
    });

    stage.conn_o.on('click', function(evt) {
        if (!user) {
            location.href = '/auth/facebook';
        } else {

        }
    });

    stage.jugar.on('mouseover', function(event) {
        stage.jugar_o.visible = true;
        stage.jugar.visible = false;
    });

    stage.jugar_o.on('mouseout', function(event) {
        stage.jugar_o.visible = false;
        stage.jugar.visible = true;
    });

    stage.ins.on('mouseover', function(event) {
        stage.ins_o.visible = true;
        stage.ins.visible = false;
    });

    stage.ins_o.on('mouseout', function(event) {
        stage.ins_o.visible = false;
        stage.ins.visible = true;
    });

    stage.flecha_usuario.on('mouseover', function() {
        stage.usuario_c.x -= 2;
        stage.usuario_c.y += 2;
        stage.nombre.color = "black";
        stage.recuadro.graphics.c().beginStroke('black').setStrokeStyle(4).dc(30, 30, 30).cp();
    });

    stage.flecha_usuario.on('mouseout', function() {
        stage.usuario_c.x += 2;
        stage.usuario_c.y -= 2;
        stage.nombre.color = "#3c1500";
        stage.recuadro.graphics.c().beginStroke('#3c1500').setStrokeStyle(4).dc(30, 30, 30).cp()
    });

    stage.flecha_usuario.on('click', function() {
        window.open('https://www.facebook.com/', '_blank');
    });

    stage.jugar_o.on('click', function() {
        location.href = '/pesquinia';
    });
    
    stage.ins_o.on('click', function() {
        stage.modal_instrucciones.visible = true;
    });

    stage.boton_cerrar.on('mouseover', function() {
        stage.boton_cerrar.visible = false;
        stage.boton_cerrar_over.visible = true;
    });

    stage.boton_cerrar_over.on('mouseout', function() {
        stage.boton_cerrar.visible = true;
        stage.boton_cerrar_over.visible = false;
    });

    stage.boton_cerrar_over.on('click', function() {
        stage.boton_cerrar.visible = true;
        stage.boton_cerrar_over.visible = false;
        stage.modal_instrucciones.visible = false;
    });

    var data = {
        images: [rutas.imagenes.ARDILLA],
        frames: {width: 231, height: 178},
        animations: {saludo: [], regreso: []}
    };
    for (var a = 0; a < 44; a++) {
        data.animations.saludo.push(a);
    }
    data.animations.saludo.push('saludo');

    var spriteSheet = new createjs.SpriteSheet(data);
    ardilla = new createjs.Sprite(spriteSheet);
    ardilla.x = 901;
    ardilla.y = 508;

    var data1 = {
        images: [rutas.imagenes.PESCADOR_HOME],
        frames: {width: 328, height: 334, count: 127},
        animations: {saludo: [], regreso: []}
    };
    for (var a = 0; a < 127; a++) {
        data1.animations.saludo.push(a);
    }
    data1.animations.saludo.push('saludo');

    var spriteSheet1 = new createjs.SpriteSheet(data1);
    pescador = new createjs.Sprite(spriteSheet1);
    pescador.x = 385;
    pescador.y = 304;

    var data2 = {
        images: [rutas.imagenes.PAJARO],
        frames: {width: 58, height: 74, count: 11},
        animations: {saludo: [], regreso: []}
    };
    for (var a = 0; a < 11; a++) {
        data2.animations.saludo.push(a);
    }
    data2.animations.saludo.push('saludo');

    var spriteSheet2 = new createjs.SpriteSheet(data2);
    pajaro = new createjs.Sprite(spriteSheet2);
    pajaro.x = 703;
    pajaro.y = 112;

    stage.menu.addChild(stage.fondo_menu);
    stage.menu.addChild(stage.sol);
    stage.menu.addChild(stage.nube1);
    stage.menu.addChild(stage.nube2);
    stage.menu.addChild(stage.sombra_hombre);
    stage.menu.addChild(stage.pato);
    stage.menu.addChild(stage.dialogo);
    stage.menu.addChild(pescador);
    stage.menu.addChild(stage.letrero);
    stage.menu.addChild(stage.pasto);
    stage.menu.addChild(stage.sombra_ardilla);
    stage.menu.addChild(ardilla);
    stage.menu.addChild(stage.header);
    stage.menu.addChild(pajaro);
    stage.menu.addChild(stage.terminos);
    stage.menu.addChild(stage.modal_instrucciones);

    //ardilla.gotoAndPlay('saludo');
    pescador.gotoAndPlay('saludo');
    pajaro.gotoAndPlay('saludo');
    stage.addChild(stage.menu);
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