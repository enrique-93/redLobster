$().ready(function() {
    var tf = new Date('2014-06-14 21:00:00').getTime();
    cuenta();
    function cuenta() {
        var ti = new Date().getTime();
        if (ti <= tf) {
            var t = Math.floor((tf - ti) / 1000);
            var s = t % 60;
            var m = Math.floor((t % 3600) / 60)
            var h = Math.floor(t / 3600)
            $('#tiempo').text(to('' + h, 2) + ':' + to('' + m, 2) + ':' + to('' + s, 2));
            setTimeout(cuenta,500);
        }else{
            $('#tiempo').text('El concurso ha acabado');
        }
    }
    function to(s, l) {
        while (s.length < l) {
            s = '0' + s;
        }
        return s;
    }
});