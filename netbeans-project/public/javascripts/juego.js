var stage;

function setCursor(cursor) {
    cursor = cursor || '';
    $('#juego').css('cursor', cursor);
}

function init() {
    stage = new createjs.Stage('juego');
    /*
     stage.nombre = new createjs.Text(user.name, 'bold 36px Arial', 'green');
     stage.addChild(stage.nombre);
     */
    createjs.Ticker.addListener(stage);
    stage.enableMouseOver(100);

    //Fondo-partes
    stage.fondo_menu = new createjs.Bitmap(rutas.imagenes.FONDO_MENU);
    stage.sol = new createjs.Bitmap(rutas.imagenes.SOL);
    stage.nube1 = new createjs.Bitmap(rutas.imagenes.NUBE);
    stage.nube2 = new createjs.Bitmap(rutas.imagenes.NUBE);

    //Fondo-conjunto
    stage.menu = new createjs.Container();

    //Letrero-partes
    stage.tabla = new createjs.Bitmap(rutas.imagenes.LETRERO);
    stage.conn = new createjs.Bitmap(rutas.imagenes.CONECTAR);
    stage.ins = new createjs.Bitmap(rutas.imagenes.INSTRUCCIONES);
    stage.jugar = new createjs.Bitmap(rutas.imagenes.JUGAR);
    stage.conn_o = new createjs.Bitmap(rutas.imagenes.CONECTAR_OVER);
    stage.ins_o = new createjs.Bitmap(rutas.imagenes.INSTRUCCIONES_OVER);
    stage.jugar_o = new createjs.Bitmap(rutas.imagenes.JUGAR_OVER);
    stage.flecha_usuario = new createjs.Bitmap(rutas.imagenes.FLECHA_USUARIO);

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
        stage.nombre.textBaseline = "middle"

        stage.imagen_usuario = new createjs.Bitmap('http://graph.facebook.com/' + user.id + '/picture?width=78&height=78&size=normal');
        stage.imagen_usuario.x = 116;
        stage.imagen_usuario.y = -31;
        stage.recuadro = new createjs.Shape();
        stage.recuadro.graphics.beginStroke('#3c1500').setStrokeStyle(4).dr(0, 0, 78, 78).cp();
        stage.recuadro.x = 116;
        stage.recuadro.y = -31;

        stage.usuario.x = 677;
        stage.usuario.y = 480;
        stage.usuario.rotation = 7.3;

        stage.usuario.addChild(stage.nombre);
        stage.usuario.addChild(stage.imagen_usuario);
        stage.usuario.addChild(stage.recuadro)
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


    stage.conn.onMouseOver = function(event) {
        stage.conn_o.visible = true;
        stage.conn.visible = false;
        setCursor('pointer');
    };

    stage.conn_o.onMouseOut = function(event) {
        stage.conn_o.visible = false;
        stage.conn.visible = true;
        setCursor();
    };

    stage.conn_o.onPress = function(evt) {
        if (!user) {
            location.href = '/auth/facebook';
        } else {

        }
    };

    stage.jugar.onMouseOver = function(event) {
        stage.jugar_o.visible = true;
        stage.jugar.visible = false;
        setCursor('pointer');
    };

    stage.jugar_o.onMouseOut = function(event) {
        stage.jugar_o.visible = false;
        stage.jugar.visible = true;
        setCursor();
    };

    stage.ins.onMouseOver = function(event) {
        stage.ins_o.visible = true;
        stage.ins.visible = false;
        setCursor('pointer');
    };

    stage.ins_o.onMouseOut = function(event) {
        stage.ins_o.visible = false;
        stage.ins.visible = true;
        setCursor();
    };

    stage.flecha_usuario.onMouseOver = function() {
        stage.usuario_c.x-=2;
        stage.usuario_c.y+=2;
        stage.nombre.color="black";
        stage.recuadro.graphics.c().beginStroke('black').setStrokeStyle(4).dr(0, 0, 78, 78).cp();
        setCursor('pointer');
    }
    
    stage.flecha_usuario.onMouseOut = function() {
        stage.usuario_c.x+=2;
        stage.usuario_c.y-=2;
        stage.nombre.color="#3c1500";
        stage.recuadro.graphics.c().beginStroke('#3c1500').setStrokeStyle(4).dr(0, 0, 78, 78).cp()
        setCursor();
    }
    
    stage.flecha_usuario.onPress = function() {
        window.open('https://www.facebook.com/', '_blank');
    }

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
    animation = new createjs.BitmapAnimation(spriteSheet);
    animation.x = 901;
    animation.y = 508;

    stage.menu.addChild(stage.fondo_menu);
    stage.menu.addChild(stage.letrero);
    stage.menu.addChild(stage.sol);
    stage.menu.addChild(stage.nube1);
    stage.menu.addChild(animation);

    animation.gotoAndPlay('saludo');
    stage.addChild(stage.menu);
}

function setPos(obj, x, y) {
    obj.x = x;
    obj.y = y;
}

function drag(obj) {
    obj.onPress = function(evt) {
        obj.dx = evt.stageX - obj.x;
        obj.dy = evt.stageY - obj.y;
        evt.onMouseMove = function(evto) {
            var dx = evto.stageX - obj.x;
            var dy = evto.stageY - obj.y;
            obj.x += (dx - obj.dx);
            obj.y += (dy - obj.dy);
        };
    };
}

//Ejemplo
/*
 * stage.enableMouseOver(20);
 circleMask = new createjs.Shape();
 bitmap = new createjs.Bitmap("images/paisaje.jpg");
 bitmap.mask = circleMask;
 bitmap.x = 100;
 bitmap.y = 100;
 dibujarMascara();
 function dibujarMascara() {
 try {
 circleMask.graphics.c();
 } catch (exc) {
 }
 circleMask.graphics.beginFill("red")
 .mt(x, y)
 .qt(x + 20, y - 20, x + 40, y)
 .qt(x + 60, y + 20, x + 80, y)
 .qt(x + 100, y - 20, x + 120, y)
 .lt(800, 200)
 .lt(800, 600)
 .lt(0, 600)
 .lt(0, 200)
 .lt(x, y)
 .cp();
 }
 bitmap.cursor = 'pointer';
 var dirX = 1;
 var dirY = 1;
 move = function() {
 x += 1;
 //*
 * circleMask.y += (60 * dirY);
 if (circleMask.x >= stage.canvas.width || circleMask.x <= 0) {
 dirX *= -1;
 }
 if (circleMask.y >= stage.canvas.height || circleMask.y <= 0)
 dirY *= -1;
 ///
 x++;
 if (x >= 800)
 x = 0;
 dibujarMascara();
 setTimeout(move, 1);
 }
 move();
 bitmap.onPress = function(evt) {
 bitmap.mask.dix = evt.stageX - bitmap.mask.x;
 bitmap.mask.diy = evt.stageY - bitmap.mask.y;
 evt.onMouseMove = moverMascara;
 }
 function moverMascara(evt) {
 var dx = evt.stageX - bitmap.mask.x;
 var dy = evt.stageY - bitmap.mask.y;
 bitmap.mask.x += (dx - bitmap.mask.dix);
 bitmap.mask.y += (dy - bitmap.mask.diy);
 }
 stage.addChild(bitmap);
 //stage.update();
 */