var token = "3aa51d4ff6cf0e0f7699b79560ea97a7c5418964d6e486fa2c69e07179c268f5";
var idtablero = "5d5689038a587b7f0dfedb4c";
var idlist = "5d5689038a587b7f0dfedb4a";
var appkey = "d9694e916f2450d40190e78a5d1b82b4";
// var usuario = "5aabca240fa2e0ee00d049ce";
let spiner = document.getElementById('spiner');
function incidencias() {
    // spiner.style.cssText = 'display:block';
    
    var nombre = document.getElementById('nombre').value;
    var email = document.getElementById('email').value;
    var telefono = document.getElementById('telefono').value;
    var viajeros = document.getElementById('viajeros').value;
    var adultos = document.getElementById('adultos').value;
    var medioc = document.getElementById('medioc').value;
    var mes = document.getElementById('mes').value;
    var dia = document.getElementById('dia').value;
    var anio = document.getElementById('anio').value;
    var comentario = document.getElementById('comentario').value;

    var fecha = new Date();
    var fechaTrello = fecha.getFullYear() + '-' + ("0" + (fecha.getMonth() + 1)).slice(-2) + '-' + ("0" + fecha.getDate()).slice(-2);
    var hora = fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds();

    var desc = 'Fecha ' + fechaTrello + ' a las ' + hora + '\n' + ' nombre: ' + nombre + '\n' + ' email: ' + email + '\n' + ' telefono: ' + telefono + '\n' + ' viajeros: ' + viajeros + '\n' + ' adultos: ' + adultos + '\n' + ' mes: ' + mes + '\n' + ' medioc: ' + medioc + '\n' + ' dia: ' + dia + '\n' + ' anio: ' + anio + '\n' + ' comentario: ' + comentario;
    crearCarta(desc)
}

function crearCarta(desc) {
    if (nombre.value == "" || email.value == "" || telefono.value == "" || viajeros.value == "" || adultos.value == "" || medioc.value == "" || mes.value == "" || dia.value == "" || anio.value == "" || comentario.value == "" ) {
        swal({
            text: "Rellene todos los campos por favor",
            icon: "warning",
            button: "Volver a intentar",
        });
    }

    else {

        var data = null;
        var name = 'Contactar con:';
        var xhr = new XMLHttpRequest();
        var url = "https://api.trello.com/1/cards?name=" + encodeURI(name) + "&desc=" + encodeURI(desc) + "&pos=top&idList=" + idlist + "&keepFromSource=all&key=" + appkey + "&token=" + token;
        url = url.replace(/#/g, '%23');
        xhr.open("POST", url);
        xhr.send(data);
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === this.DONE) {
                //recogemos el id de la carta creada
                var dt = this.responseText;
                h = JSON.parse(dt).id;
                //llamada a las funciones para rellenar la carta
                
                usuarioPredefinido(h, name);
            }
        });



    }
}
function usuarioPredefinido(data, name) {
   
    var arrRQ = [];
    var datas = null;
    var usuRQ1 = new XMLHttpRequest();

    usuRQ1.open("POST", "https://api.trello.com/1/cards/" + data + "/idMembers?value=" + '' + "&key=" + appkey + "&token=" + token);
    usuRQ1.send(datas);

    usuRQ1.addEventListener("readystatechange", function () {

        if (this.readyState === this.DONE) {
            var finalizado = true;
            for (let i = 0; i < arrRQ.length; i++) {
                if (arrRQ[i].readyState !== this.DONE) {
                    finalizado = false;
                }
            }
            if (finalizado == true ) {
                // spiner.style.cssText = 'display:none';
                swal({
                    title: "Completado!",
                    text: 'Gracias ' + nombre.value,
                    icon: "success",
                    button: "Cerrar",
                })
                    .then(function (value) {
                        swal(location.reload());
                    });
            }
        }
    });
}