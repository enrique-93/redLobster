function  compartir_activar() {

    var url = stage.canvas.toDataURL();

    var fb = {
        "type": "facebook2",
        "app_id": "458625890907115",
        "image": "",
        //"url": "http://localhost/pesquinia",
        "redirect_uri": "http://localhost/cerrar",
        "name": "Logré hacer " + puntos + " en la pesquiña",
        "text": "¿Cuántos podrás hacer tú?",
        "caption": "¡Participa! http://pescaredlobster.com"
    }

    $('#juego').data('social', fb);
    // $('.tw_').data('social',tw);

    $('#juego').off();
    $('#juego').on('click', function() {
       
        console.log($(this).data('social'));
        if (stage.share) {
            if (stage.share == true) {
                $(this).jqSocialSharer();
                stage.share = false;
            }
        }
    });
}


