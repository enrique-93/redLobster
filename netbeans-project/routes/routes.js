var request = require('request');
var fs = require('fs');

module.exports = function(app, passport) {

    // route for home page

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/', isLoggedIn, function(req, res) {
        res.render('menu.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/terminos', function(req, res) {
        res.render('terminos.ejs')
    });

    app.get('/privacidad', function(req, res) {
        res.render('privacidad.ejs')
    });

    app.get('/pesquinia', isLoggedIn, function(req, res) {
        req.user.facebook._id = req.user._id;
        var user = JSON.parse(JSON.stringify(req.user));
        res.render('pesquinia.ejs', {
            user: req.user, // get the user out of session and pass to template
            tiempoLimite: tiempoLimite
        });
    });

    app.get('/cerrar', function(req, res) {
        res.render('cerrar.ejs');
    });

    app.post('/subirImagen', isLoggedIn, function(req, res) {
        var data = req.body.url;
        var buffer = new Buffer(data.split(",")[1], 'base64');
        fs.writeFileSync('public/uploads/' + req.user.facebook.id + '.png', buffer);
        res.end();
    });

    app.post('/subirImagen2', isLoggedIn, function(req, res) {
        var data = req.body.url;
        var buffer = new Buffer(data.split(",")[1], 'base64');
        var nombre = req.user.facebook.id + new Date().getTime();
        fs.writeFileSync('public/uploads/' + nombre + '.png', buffer);
        res.end(nombre);
    });

    app.get('/lista', function(req, res) {
        var limite = 0;
        var mars = [];
        User.find({"facebook.baneado": false}, function(err, users) {
            if (err) {
                console.log(err)
                res.end('error');
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
                if (limite == 0)
                    res.render('lista.ejs', {marcadores: mars});
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
                console.log(marcador);
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
                    res.render('lista.ejs', {marcadores: marcadores})
                }
            });
        }
    });
    
    app.get('/listaCompleta', function(req, res) {
        var limite = 0;
        var mars = [];
        User.find({}, function(err, users) {
            if (err) {
                console.log(err)
                res.end('error');
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
                if (limite == 0)
                    res.render('listaCompleta.ejs', {marcadores: mars});
            }
        });

        function buscaMejorMarcador(user) {
            var fI = new Date('2014-06-12 19:20:00');
            var fF = new Date('2014-06-14 20:59:59');
            var userID = user.id;
            Marcador.find({$and: [
                    {userID:userID},
                    {fechaFin: {$gt: fI, $lt: fF}}]
            }, 'puntos bans fechaFin').sort({puntos: '-1'}).limit(1).exec(function(err, marcador) {
                marcador = marcador[0];
                console.log(marcador);
                if(marcador){
                    var trampa = 'no';
                    if(user.baneado == true)
                        trampa='si';
                    mars.push({id: user.id, nombre: user.name, email:user.email,bans:JSON.stringify(marcador.bans),trampa:trampa, puntos: marcador.puntos,fecha:marcador.fechaFin});
                }
                else{
                    mars.push({id: user.id, nombre: user.name, email:user.email,bans:"",trampa:"no", puntos: 0,fecha:"--/--/-- --:--:--"});
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
                    res.render('listaCompleta.ejs', {marcadores: marcadores})
                }
            });
        }
    });
    
   app.get('/listaFinal', function(req, res) {
        var limite = 0;
        var mars = [];
        User.find({"facebook.baneado":false}, function(err, users) {
            if (err) {
                console.log(err)
                res.end('error');
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
                if (limite == 0)
                    res.render('listaFinal.ejs', {marcadores: mars});
            }
        });

        function buscaMejorMarcador(user) {
            var fI = new Date('2014-06-12 19:20:00');
            var fF = new Date('2014-06-14 20:59:59');
            var userID = user.id;
            Marcador.find({$and: [
                    {baneado:false},
                    {userID:userID},
                    {fechaFin: {$gt: fI, $lt: fF}}]
            }, 'puntos bans fechaFin').sort({puntos: '-1'}).limit(1).exec(function(err, marcador) {
                marcador = marcador[0];
                console.log(marcador);
                if(marcador){
                    mars.push({id: user.id, nombre: user.name, email:user.email, puntos: marcador.puntos,fecha:marcador.fechaFin});
                }
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
                    res.render('listaFinal.ejs', {marcadores: marcadores})
                }
            });
        }
    }); 
    
    app.get('/listaFinalPostConcurso', function(req, res) {
        var limite = 0;
        var mars = [];
        User.find({"facebook.baneado":false}, function(err, users) {
            if (err) {
                console.log(err)
                res.end('error');
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
                if (limite == 0)
                    res.render('listaFinal.ejs', {marcadores: mars});
            }
        });

        function buscaMejorMarcador(user) {
            var fI = new Date('2014-06-14 21:00:00');
            var fF = new Date('2014-06-15 23:59:59');
            var userID = user.id;
            Marcador.find({$and: [
                    {baneado:false},
                    {userID:userID},
                    {fechaFin: {$gt: fI, $lt: fF}}]
            }, 'puntos bans fechaFin').sort({puntos: '-1'}).limit(1).exec(function(err, marcador) {
                marcador = marcador[0];
                console.log(marcador);
                if(marcador){
                    mars.push({id: user.id, nombre: user.name, email:user.email, puntos: marcador.puntos,fecha:marcador.fechaFin});
                }
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
                    res.render('listaFinal.ejs', {marcadores: marcadores})
                }
            });
        }
    }); 
    
    app.get('/listaBaneados', function(req, res) {
        var limite = 0;
        var mars = [];
        User.find({"facebook.baneado": true}, function(err, users) {
            if (err) {
                console.log(err)
                res.end('error');
            } else {
                
                limite = users.length;
                for (var a = 0; a < users.length; a++) {
                    buscaMejorMarcador(users[a].facebook);
                }
                if (limite == 0)
                    res.render('listaBaneados.ejs', {marcadores: mars});
            }
        });

        function buscaMejorMarcador(user) {
            var fI = new Date('2014-06-12 19:20:00');
            var fF = new Date('2014-06-14 20:59:59');
            var userID = user.id;
            Marcador.find({$and: [
                    {userID:userID},
                    {baneado:true},
                    {fechaFin: {$gt: fI, $lt: fF}}]
            }, 'puntos bans').sort({puntos: '-1'}).limit(1).exec(function(err, marcador) {
                marcador = marcador[0];
                console.log(marcador);
                if(marcador)
                    mars.push({id: user.id, nombre: user.name, puntos: JSON.stringify(marcador.bans)});
                else{
                    mars.push('sin-marcador');
                }
                if(mars.length==limite){
                    res.render('listaBaneados.ejs', {marcadores: mars})
                }
            });
        }
    });

    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {
                successRedirect: '/',
                failureRedirect: '/'
            }));

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/toBase64', function(req, res) {
        //var dir = req.files.src;
        console.log(req.body, req.files);
        /*request(dir,function(error,response,body){
         console.log(body);
         });*/
        res.end();
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.render('menu.ejs', {user: {'facebook': 'ninguno'}});
}
