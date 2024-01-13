// VARIABLES

let cantidad
let arrayCards = [];
let fails = 1;

let level;




$( document ).ready(function() {
    makeCards();
});

$('#restart').on ('click', function(){location.reload(true);})


// Función que crea array con los números que se ponen en juego
function makeCards() {

    let arrayCantidad = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    cantidad = arrayCantidad[Math.floor(Math.random() * arrayCantidad.length)];

    // Rellenamos array dos veces el mismo núemro para hacer las parejas de núemro
    for (let i = 1; i <= cantidad / 2; i++) {

        arrayCards.push(i)
        arrayCards.push(i)
    }

    addCards(cantidad);


}

// Extrae un número del array aletoriamente
function setNumber() {

    return arrayCards.splice(Math.floor(Math.random() * arrayCards.length), 1)[0]

}

// Genera las cartas
function addCards(cantidad) {

    let num;

    for (let i = 0; i < cantidad; i++) {

        num= setNumber();

        $('#cards').append(
            // '<div class="col card h-100 d-flex align-items-center justify-content-center"><p num='+num+'>' + num + '</p></div>'
            '<div class="col card h-100 d-flex align-items-center justify-content-center"><img src="./img/' + num + '.png" num='+num+'></div>'
            )
        }
    }




// EVENTOS
$('.card').on(

    "click", function () {

        $(this.children)
            .show()
            .addClass("rotated");

        if ($(".rotated").length == 2) {

            if ($(".rotated:first").attr("num") == $(".rotated:last").attr("num")) {

                $('#message').text('Got it!!!');
                $(".rotated").parent()
                    .addClass("ok")
                    .css("pointer-events", "none")
                    .css("color", "#CC0000");
                $(".rotated").toggleClass("rotated");

            } else {

                $('#message').text('you have failed, try again.')

                $(".card").parent().css("pointer-events", "none");



                setTimeout(function () {

                    $(".rotated:first")
                        .hide()
                        .toggleClass("rotated");

                    $(".rotated:last")
                        .hide()
                        .toggleClass("rotated");

                    $('#message').text('')

                    $(".card").parent().css("pointer-events", "auto");


                }, 1000)

                fails++;

                $('#fails').text(fails)





            }

            if ($('.ok').length == cantidad) {


                $('#message').html('Congratulations! You have finished the panel after ' + fails + ' attempts!')


            }



        }


    }



)