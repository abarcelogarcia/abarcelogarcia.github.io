// VARIABLES

let quantity;
let arrayCards = [];
let hitsP1, level, hitsP2, turn, game, fails;
let minCards = 1;
let maxCards = 20;

// Description
// -----------------------------------
// LEVEL //
// Easy: 1
// Normal: 2
// Hard: 3
// -----------------------------------
// GAME //
// Battle: 1
// Strategy: 2
// Alone: 3




// START THE GAME
// Function that creates an array with the numbers that are put into play
function makeCards() {

    // Setup default values
    level = $("input[name*='level_radio']:checked").val();
    game = $("input[name*='game_radio']:checked").val();
    hitsP1 = 0;
    hitsP2 = 0;
    fails = 0;
    turn = 'Player 1';
    $('#hitsP1').text(hitsP1);
    $('#hitsP2').text(hitsP2);
    $('#fails').text(fails);
    $('#player').text(turn);
    $('#message')
        .text('')
        .css("background-color", "white");

    // Show or not hits & fails panel
    showPanels(game);

    // Get an even number
    quantity = Math.floor((Math.random() * (maxCards/2)) + minCards)*2;

    // We fill the array with the same number twice to make the pairs.
    for (let i = 1; i <= quantity / 2; i++) {

        arrayCards.push(i)
        arrayCards.push(i)
    }

    // Cards and their events are added.
    addCards(quantity, level, game);

}

// Generates cards according to quantity and level
function addCards(quantity, level, game) {


    let num, card;

    $('#cards').children().remove(); //Clean. Game or level has been restarted

    for (let i = 0; i < quantity; i++) {

        number = setNumber(); // Extracted from arrayCards
        num = level + '_' + number; // For num attribute and/or image path

        // Card selection according to level
        if (level == 1) {
            card = 
            '<div class="col card h-100 d-flex align-items-center justify-content-center">'+
                '<p num=' + num + '>' + number + '</p>'+
            '</div>';

        } else if (level == 2) {
            card = 
            '<div class="col card h-100 d-flex align-items-center justify-content-center flip-card-front">'+
                '<img src="./img/' + num + '.png" num=' + num + '>'+
            '</div>';
        
        } else if (level == 3) {
            card = 
            '<div class="col card h-100 d-flex align-items-center justify-content-center flip-card-front">'+
                '<img src="./img/' + num + '.png" num=' + num + '>'+
            '</div>';
        };

        $('#cards').append(card);// Add cart to hmtl
    }

    // Event by clicking on a card
    $('.card').on(

        "click", function () {

            // Animation imitating the flipping of the card.
            $(this).css({
                "animation": "vibrate 0.3s 1",
                "background-image": "none"
            });

            // Displays the value and sets it as rotated by means of a class ("rotated")
             $(this.children)
                .show()
                .addClass("rotated");


            // Turn over two cards. Compare the values and act accordingly.
            if ($(".rotated").length == 2) {

                // Matching cards
                if ($(".rotated:first").attr("num") == $(".rotated:last").attr("num")) {

                    $('#message')
                        .text('Got it!!!')
                        .css("background-color", "rgb(176, 248, 176)");

                    $(".rotated").parent()
                        .addClass("ok")
                        .css({ "pointer-events": "none", "color": "#CC0000", "opacity": "0.5" });
                    $(".rotated").toggleClass("rotated");

                    // Update hits panel
                    turn == 'Player 1'
                        ? (hitsP1++,
                            $('#hitsP1')
                                .css("animation", "vibrate 0.3s 1")
                                .text(hitsP1) // Update bookmarks
                        )

                        : (hitsP2++,
                            $('#hitsP2')
                                .css("animation", "vibrate 0.3s 1")
                                .text(hitsP2) // Update bookmarks
                        );




                    // Different cards
                } else {

                    $('#message')
                        .text('You have failed, try again.')
                        .css("background-color", "rgb(248, 174, 174)")
                    $(".card").parent().css("pointer-events", "none");// No permite cliclar sobre ninguna carta

                    $('#panel').css("animation", "vibratePanelError 0.1s 1");

                    
                    
                    // Delay the process so that the values are clearly visible.
                    setTimeout(function () {

                        $(".rotated:first").parent().css("animation", "unflip 0.75s 1")
                        $(".rotated:last").parent().css("animation", "unflip 0.75s 1")

                        setTimeout(function(){


                        // Value is hidden again and toggle to unturned
                        $(".rotated:first")
                        .hide()
                        .toggleClass("rotated");
                        
                        

                        $(".rotated:last")
                            .hide()
                            .toggleClass("rotated");

                        $('#message')
                            .text('')
                            .css("background-color", "white")

                        // Resets card values
                        $(".card").parent().css("pointer-events", "auto");// Click on the cards again


                        // Displays logo and resets animation
                        $('.card:not(.ok)').css({
                            "background-image": "url(img/LogoBloggIn_bgcards.png)",
                            // "animation": "none"
                        })
                        $('#hitsP1').css("animation", "none")
                        $('#hitsP2').css("animation", "none")
                        $('#fails').css("animation", "none")
                    $('#panel').css("animation", "none");


                        }, 100)



                    }, 1000)

                    // Alone Game
                    fails++;
                    $('#fails')
                        .css("animation", "vibrate 0.3s 1")
                        .text(fails)

                    // Change the player's turn
                    turn == 'Player 1'
                        ? (turn = 'Player 2')
                        : (turn = 'Player 1');

                    $('#player').text(turn) // Print player turn



                }

                setTimeout(function () {
                    $('#message')
                        .text('')
                        .css("background-color", "white")
                }, 1000)

                // All pairs of cards have been matched. End the game by showing the winner
                if ($('.ok').length == quantity) {

                    setWinner(game);

                }
            }
        }
    )
}

// TOOLS

// Randomly extracts a number from the array
function setNumber() {

    return arrayCards.splice(Math.floor(Math.random() * arrayCards.length), 1)[0]

}

// Function that determines the winner and displays the message at the end of the game.
function setWinner() {

    let winner, hits;

    if (game == 2) {

        if (hitsP1 > hitsP2) {// Player 1 wins

            winner = 'Player 1';
            hits = hitsP1;

        } else if (hitsP1 == hitsP2) {// Tie. The player who finished the panel wins.

            winner = turn;
            hits = hitsP1;

        } else { // Player 2 wins

            winner = 'Player 2';
            hits = hitsP2;

        }

        setTimeout(function () {
            $('#message')
                .html('Congratulations <b>' + winner + '</b>! You win the game with <b>' + hits + ' </b>hits!')
                .css("background-color", "rgb(176, 248, 176)")
        }, 1000);

    } else if (game == 1) {

        winner = turn;

        setTimeout(function () {
            $('#message')
                .html('Congratulations <b>' + winner + '</b>! You win the game')
                .css("background-color", "rgb(176, 248, 176)")
        }, 1000);

    } else {

        setTimeout(function () {
            $('#message')
                .html('Congratulations! You have finished the game with <b>' + fails + '</b> fails')
                .css("background-color", "rgb(176, 248, 176)")
        }, 1000);


    }

}

function showPanels(game) {

    if (game == 1) {

        $('#hitsPanel').css('visibility', 'hidden');
        $('#failsPanel').css('visibility', 'hidden');

    } else if (game == 2) {

        $('#hitsPanel').css('visibility', 'visible');
        $('#failsPanel').css('visibility', 'hidden');

    } else {

        $('#failsPanel').css('visibility', 'visible');
        $('#hitsPanel').css('visibility', 'hidden');


    }





}


// GENERAL EVENTS
$(function () { makeCards() })// Starts the game on page load
$('#logo').on('click', function () { location.reload(true); }) // Restart de game
$(':radio').on('click', makeCards); // Difficulty change


