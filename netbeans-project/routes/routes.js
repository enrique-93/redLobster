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
    
    app.get('/terminos',function(req,res){
        res.render('terminos.ejs')
    });
    
    app.get('/privacidad',function(req,res){
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
    
    app.post('/subirImagen', isLoggedIn, function(req, res) {
        var data = req.body.url;
        var buffer = new Buffer(data.split(",")[1], 'base64');
        fs.writeFileSync('public/uploads/'+req.user.facebook.id+'.png',buffer);
        res.end();
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
    
    app.post('/toBase64',function(req,res){
        //var dir = req.files.src;
        console.log(req.body,req.files);
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

    res.render('menu.ejs', {user: {'facebook':'ninguno'}});
}