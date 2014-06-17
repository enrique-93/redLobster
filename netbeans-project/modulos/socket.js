var usuarios = {};
var events = require('events');
var ee = new events.EventEmitter();

io.sockets.on('connection', function(socket) {

    socket.on('iniciarJuego', function(user, punto, langostas, peces) {
        if (usuarios[user.id]) {
            socket.emit('jugando');
        } else {
            socket.emit('jugar', punto);
            usuarios[user.id] = user;
            socket.user = user;
            socket.langostas = langostas;
            socket.peces = peces;
            var fecha = new Date();
            socket.marcador = {
                _id: fecha.getTime(),
                fechaInicio: fecha,
                fechaFin: fecha,
                tiempoJuego: 0,
                langostasPescadas: 0,
                pecesPescados: 0,
                puntuajes: [],
                baneado: false,
                bans: [],
                puntos: 0,
                tiempoMaximo: tiempoLimite
            };

            if (langostas.length < 30 || langostas.length > 70) {
                socket.marcador.bans.push('No hay entre 30 y 70 langostas en el juego');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
            if (peces.length < 90 || peces.length > 180) {
                socket.marcador.bans.push('No hay entre 90 y 180 peces en el juego');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
        }
    });

    socket.on('pescado', function(tipo, puntos) {
        console.log('pesca',tipo,puntos);
        if (!socket.fin && socket.marcador) {

            function agregar() {
                socket.marcador.puntuajes.push({
                    puntos: puntos,
                    fecha: new Date()
                });
                socket.marcador.puntos += puntos;
                if (socket.marcador.puntuajes.length > 1) {
                    var l = socket.marcador.puntuajes.length;
                    var dt = socket.marcador.puntuajes[l - 1].fecha.getTime()
                            - socket.marcador.puntuajes[l - 2].fecha.getTime();
                    if (dt < 2300) {
                        socket.marcador.bans.push('Tiempo de ' + dt + 'ms entre pesca y pesca');
                        socket.marcador.baneado = true;
                        socket.user.baneado = true;
                    }
                }
            }
            if (tipo == 'pez') {
                if (puntos == 50) {
                    agregar();
                    socket.marcador.pecesPescados++;
                } else {
                    socket.marcador.bans.push('Pez diferente a 50 puntos');
                    socket.marcador.baneado = true;
                    socket.user.baneado = true;
                }
            } else {
                if (tipo == 'langosta') {
                    if (puntos < 6000) {
                        agregar();
                        socket.marcador.langostasPescadas++;
                    } else {
                        socket.marcador.bans.push('Langosta con demasiados puntos');
                        socket.marcador.baneado = true;
                        socket.user.baneado = true;
                    }
                } else {
                    socket.marcador.bans.push('Pesco pez inexistente');
                    socket.marcador.baneado = true;
                    socket.user.baneado = true;
                }
            }
        }
    });

    socket.on('finalizarJuego', function(langostas, peces) {

        if (!socket.fin && socket.marcador) {
            socket.fin = true;
            var fecha = new Date();
            socket.marcador.fechaFin = fecha;
            socket.marcador.tiempoJuego = Math.round((socket.marcador.fechaFin - socket.marcador.fechaInicio) / 1000);
            if (langostas.length != socket.langostas.length) {
                socket.marcador.bans.push('Diferente numero de langostas al inicio y al final del juego');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
            if (peces.length != socket.peces.length) {
                socket.marcador.bans.push('Diferente numero de peces al inicio y al final del juego');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
            var langostasPescadas = 0;
            var pecesPescados = 0;
            var puntos = 0;
            for (var a = 0; a < langostas.length; a++) {
                if (langostas[a].muerto == true) {
                    langostasPescadas++;
                    puntos += langostas[a].puntuaje;
                }
            }
            for (var a = 0; a < peces.length; a++) {
                if (peces[a].muerto == true) {
                    pecesPescados++;
                    puntos += peces[a].puntuaje;
                }
            }
            if (langostasPescadas != socket.marcador.langostasPescadas) {
                socket.marcador.bans.push('El numero de langostas capturadas no coincide');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
            if (pecesPescados != socket.marcador.pecesPescados) {
                socket.marcador.bans.push('El numero de peces capturados no coincide');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
            if (puntos != socket.marcador.puntos) {
                socket.marcador.bans.push('El numero de puntos no coincide');
                socket.marcador.baneado = true;
                socket.user.baneado = true;
            }
        }

	if(!socket.hasOwnProperty('user')) { console.log("sinUser"); return false;}

        if (socket.user.email != 'no-registrado') {
            guardar(socket);
        } else {
            socket.on('mail', function(mail) {
                console.log('pidiendo mail', mail)
                socket.user.email = mail;
                guardar(socket);
            });
            socket.emit('pedirMail');
        }
    });

    socket.on('getPuntuajes', function() {
        var limite = 0;
        var mars = [];
        User.find({"facebook.baneado": false}, function(err, users) {
            if (err) {
                console.log(err)
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
            }
        });

        function buscaMejorMarcador(user) {
            var fI = new Date('2014-06-12 19:20:00');
            var fF = new Date('2014-06-14 20:59:59');
            var userID = user.id;
            Marcador.find({$and: [
                    {userID:userID},
                    {baneado:false},
                    {fechaFin: {$gt: fI, $lt: fF}}]
            }, 'puntos bans').sort({puntos: '-1'}).limit(1).exec(function(err, marcador) {
                marcador = marcador[0];
                if(marcador)
                    mars.push({id: user.id, nombre: user.name, puntos: marcador.puntos});
                else{
                    mars.push('sin-marcador');
                }
                if(mars.length==limite){
                    function sort(a,b){
                        return b.puntos-a.puntos;
                    }
                    var marcadores = [];
                    for(var a =0;a<mars.length;a++){
                        if(mars[a]=='sin-marcador'){
                            mars.splice(a,1);
                            a--;
                        }else{
                            marcadores.push(mars[a])
                        }
                    }
                    marcadores.sort(sort);
                    marcadores.splice(3);
                    socket.emit('puntos',marcadores)
                }
            });
        }
    });

    socket.on('disconnect', function() {
        if (socket.user) {
            delete usuarios[socket.user.id];
        }
    });

});

function guardar(s) {
    var user = s.user,
            marcador = s.marcador,
            puntuajes = marcador.puntuajes;
    marcador.userID = user.id;
    marcador._id = user.id + '_' + new Date().getTime();
    for (var a = 0; a < puntuajes.length; a++) {
        var puntuaje = puntuajes[a];
        puntuaje.marcadorID = marcador._id;
        var pun = new Puntuaje(puntuaje);
        pun.save(function(err) {
            if (err)
                throw err;
        });
    }
    var mar = new Marcador(marcador);
    mar.save(function(err) {
        if (err)
            console.log(err)
    });

    User.findOne({'facebook.id': user.id}, function(err, userE) {

        // if there is an error, stop everything and return that
        // ie an error connecting to the database

        // if the user is found, then log them in
        if (!userE) {

        } else {
            var nuevo = new User({facebook: user});
            var upsertData = nuevo.toObject();
            delete upsertData._id;
            User.update({_id: userE.id}, upsertData, function(err) {
                if (err)
                    console.log(err);
            });
        }

    });
}


