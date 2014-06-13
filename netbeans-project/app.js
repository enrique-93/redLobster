tiempoLimite = 180;

mongoose = require('mongoose');
User = require('./models/user');
Marcador = require('./models/marcador');
Puntuaje = require('./models/puntuaje');


var express = require('express'),
        app = express(),
        port = process.env.PORT || 3456,
        passport = require('passport'),
        flash = require('connect-flash'),
        path = require('path'),
        http = require('http'),
        server = http.createServer(app),
        socket = require('socket.io');

io = socket.listen(server);

require('./modulos/socket');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

    // set up our express application
    app.use(express.logger('dev')); // log every request to the console

    app.use(express.cookieParser())

    app.set('view engine', 'ejs');
    app.use(express.session({secret: 'wiiiiii'})); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    app.use(express.static(path.join('', 'public')));
    app.use(express.bodyParser());
});

// routes ======================================================================
require('./routes/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
server.listen(port);
console.log('The magic happens on port ' + port);

