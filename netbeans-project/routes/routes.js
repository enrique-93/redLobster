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

    app.get('/lista', isLoggedIn, function(req, res) {
        var fI = new Date('2014-06-12 19:20:00');
        var fF = new Date('2014-06-14 20:59:59');
        Marcador.find({
            baneado: false,
            fechaFin: {$gt: fI, $lt: fF}
        }, 'puntos userID').sort({puntos: '-1'}).exec(function(err, marcadores) {
            var l = 0;
            var mars = [];
            var seguir = true;
            function marcar(marcador, val) {
                User.findOne({'facebook.id': marcador.userID}, function(err, user) {
                    if (user.facebook.baneado == false && seguir == true) {
                        if (l < 100) {
                            mars[val] = ({id: user.facebook.id, nombre: user.facebook.name, puntos: marcador.puntos});
                            if (l+1 == 100 || l+1 == marcadores.length) {
                                console.log(mars);
                                res.render('lista.ejs',{marcadores:mars});
                            };
                        }
                        l++;
                    }
                });
            }
            ;
            for (var a = 0; a < marcadores.length; a++) {
                var marcador = marcadores[a];
                marcar(marcador, a);
            }
        });
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