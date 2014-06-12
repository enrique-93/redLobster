var marcadorSchema = mongoose.Schema({
    fechaInicio: Date,
    fechaFin: Date,
    tiempoJuego: Number,
    langostasPescadas: Number,
    pecesPescados: Number,
    puntuajes: Array,
    puntos: Number,
    tiempoMaximo: Number,
    baneado: Boolean,
    bans: Array,
    userID: String,
    _id: String
});

module.exports = mongoose.model('Marcador', marcadorSchema);


