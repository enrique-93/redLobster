function Sonido(soundID,options) {
    this.options = options;
    this.id = soundID;
    this.ready=false;
    this.registered=createjs.Sound.registerSound(rutas.sonidos[soundID], soundID);
    
    this.play=function playSound(options) {
        options || (options=this.options);
        function play(){
            this.instancia=createjs.Sound.play(soundID,options);
        }
        if(createjs.sounds[soundID])
           play();
       else{
           createjs.pendingSounds[soundID] || (createjs.pendingSounds[soundID]=[]);
           createjs.pendingSounds[soundID].push(play);
        }
    }
}

createjs.sounds={};
createjs.pendingSounds={}
createjs.Sound.addEventListener("fileload", handleFileLoad);
function handleFileLoad(event) {
    var id = event.id;
    createjs.sounds[id] = true;
    if(!createjs.pendingSounds[id])
        return;
    for(var p in createjs.pendingSounds[id]){
        createjs.pendingSounds[id][p]();
    }
    delete createjs.pendingSounds[id];
}

var sonidos = {
    VOZ: new Sonido('VOZ'),
    JUEGO_DISPARO: new Sonido('JUEGO_DISPARO'),
    AVE: new Sonido('AVE'),
    DISPARO: new Sonido('DISPARO'),
    BRINCO: new Sonido('BRINCO'),
    LASER: new Sonido('LASER'),
    TRANSPORTE: new Sonido('TRANSPORTE'),
    TRUENO: new Sonido('TRUENO'),
    DAMAGE: new Sonido('DAMAGE'),
    MAR: new Sonido('MAR',{loop:-1}),
    SPLASH: new Sonido('SPLASH'),
    SCORE: new Sonido('SCORE'),
    REBOBINAR: new Sonido('REBOBINAR'),
    COIN: new Sonido('COIN'),
    COIN2: new Sonido('COIN2')
};

