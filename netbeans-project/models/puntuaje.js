var puntuajeSchema = mongoose.Schema({
    puntos: String,
    fecha: String,
    marcadorID: String
});

module.exports = mongoose.model('Puntuaje', puntuajeSchema);

