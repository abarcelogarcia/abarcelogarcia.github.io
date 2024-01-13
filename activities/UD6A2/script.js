// VARIABLES

let cantidad;
let arrayCards = [];
let failsP1,level, failsP2;


makeCards();


// Función que crea array con los números que se ponen en juego
function makeCards() {

    level = $(":radio:checked").val();
    failsP1 = 0;
    $('#failsP1').text(failsP1);


    let arrayCantidad = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
    cantidad = arrayCantidad[Math.floor(Math.random() * arrayCantidad.length)];

    // Rellenamos array dos veces el mismo núemro para hacer las parejas de núemro
    for (let i = 1; i <= cantidad / 2; i++) {

        arrayCards.push(i)
        arrayCards.push(i)
    }

    addCards(cantidad, level);

}

// Extrae un número del array aletoriamente
function setNumber() {

    return arrayCards.splice(Math.floor(Math.random() * arrayCards.length), 1)[0]

}

// Genera las cartas
function addCards(cantidad, level) {

    let num, card;

    $('#cards').children().remove();

    

    for (let i = 0; i < cantidad; i++) {

        number = setNumber();
        num = level + '_' + number;

        if (level == 1) {
            card = '<div class="col card h-100 d-flex align-items-center justify-content-center"><p num=' + num + '>' + number + '</p></div>';
        } else if(level == 2){
            card = '<div class="col card h-100 d-flex align-items-center justify-content-center"><img src="./img/' + num + '.png" num=' + num + '></div>';
        } else if(level == 3){
            card = '<div class="col card h-100 d-flex align-items-center justify-content-center"><img src="./img/' + num + '.png" num=' + num + '></div>';
        };

        


        $('#cards').append(card);
    }

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
                        .css({"pointer-events": "none", "color": "#CC0000", "opacity": "0.5"});
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
    
                    failsP1++;
    
                    $('#failsP1').text(failsP1)
                }
    
                if ($('.ok').length == cantidad) {
    
                    $('#message').html('Congratulations! You have finished the panel after ' + failsP1 + ' fails!')
    
                }
            }
        }
    )


}


// EVENTOS
$('#restart').on('click', function () { location.reload(true); })
$(':radio').on('click', makeCards);


