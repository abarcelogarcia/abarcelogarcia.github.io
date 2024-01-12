// VARIABLES

let cantidad
let arrayCards = [];
let fails = 1;


makeCards();
addCards(cantidad);

// Función que crea array con los números que se ponen en juego
function makeCards() {

    let arrayCantidad = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    cantidad = arrayCantidad[Math.floor(Math.random() * arrayCantidad.length)];

    // Rellenamos array dos veces el mismo núemro para hacer las parejas de núemro
    for (let i = 1; i <= cantidad / 2; i++) {

        arrayCards.push(i)
        arrayCards.push(i)
    }

    console.log(cantidad);
    console.log(arrayCards);
}

// Extrae un número del array aletoriamente
function setNumber() {

    return arrayCards.splice(Math.floor(Math.random() * arrayCards.length), 1)[0]

}

// Genera las cartas
function addCards(cantidad) {

    for (let i = 0; i < cantidad; i++) {

        $('#cards').append(
            '<div class="col card h-100 d-flex align-items-center justify-content-center"><p>' + setNumber() + '</p></div>'
            // '<div class="col card h-100 d-flex align-items-center justify-content-center"><img src="./img/' + setNumber() + '.png" alt="img_' + setNumber() + '"></div>'
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

            if ($(".rotated:first").text() == $(".rotated:last").text()) {

                $('#message').text('Got it!!!');
                $(".rotated").parent()
                    .addClass("ok")
                    .css("pointer-events", "none")
                    .css("color", "red");
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



                console.log(fails);


            }

            if ($('.ok').length == cantidad) {


                $('#message').html('Congratulations! <br> You have finished the panel after ' + fails + ' attempts!')


            }


            console.log($(".disponible").length);

        }

        console.log($(".disponible").length);

    }



)