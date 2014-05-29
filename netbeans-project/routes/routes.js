var request = require('request');

module.exports = function(app, passport) {

    // route for home page

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/', isLoggedIn, function(req, res) {
        res.render('pesca.ejs', {
            user: req.user // get the user out of session and pass to template
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

    res.render('pesca.ejs', {user: {'facebook':'ninguno'}});
}