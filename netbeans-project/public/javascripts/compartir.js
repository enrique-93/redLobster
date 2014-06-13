var nombreImagen;
var dir = "http://pescaredlobster.com";
function  compartir_activar() {


    // $('.tw_').data('social',tw);

    $('#juego').off();
    $('#juego').on('click', function() {
        if (stage.share) {
            if (stage.share == true) {
                var fb = {
                    "type": "facebook2",
                    "app_id": "646551288753807",
                    "image": dir+"/uploads/"+nombreImagen+".png",
                    "url": dir+"/pesquinia",
                    "redirect_uri": dir+"/cerrar",
                    "name": "Logré hacer " + puntos + " puntos en la pesquiña",
                    "text": "¿Cuántos podrás hacer tú?",
                    "caption": "¡Participa! http://pescaredlobster.com"
                }

                $('#juego').data('social', fb);
                $(this).jqSocialSharer();
                stage.share = false;

            }
        }
    });
}


