// VARIABLES

let quantity;
let arrayCards = [];
let failsP1, level, failsP2, turn;




// START THE GAME
    // Function that creates an array with the numbers that are put into play
    function makeCards() {

        // Setup default values
        level = $(":radio:checked").val();
        failsP1 = 0;
        failsP2 = 0;
        turn = 'Player 1';
        $('#failsP1').text(failsP1);
        $('#failsP2').text(failsP2);
        $('#player').text(turn);
        $('#message')
        .text('')
        .css("background-color", "white");


        let arrayQty = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20];
        quantity = arrayQty[Math.floor(Math.random() * arrayQty.length)];

        // We fill the array with the same number twice to make the pairs.
        for (let i = 1; i <= quantity / 2; i++) {

            arrayCards.push(i)
            arrayCards.push(i)
        }

        // Cards and their events are added.
        addCards(quantity, level);

    }

    // Generates cards according to quantity and level
    function addCards(quantity, level) {


        let num, card;

        $('#cards').children().remove(); //Clean. Game or level has been restarted

        for (let i = 0; i < quantity; i++) {

            number = setNumber(); // Extracted from array
            num = level + '_' + number; // For num attribute and/or image path

            // Card selection according to level
            if (level == 1) {
                card = '<div class="col card h-100 d-flex align-items-center justify-content-center"><p num=' + num + '>' + number + '</p></div>';
            } else if (level == 2) {
                card = '<div class="col card h-100 d-flex align-items-center justify-content-center flip-card-front"><img src="./img/' + num + '.png" num=' + num + '></div>';
            } else if (level == 3) {
                card = '<div class="col card h-100 d-flex align-items-center justify-content-center flip-card-front"><img src="./img/' + num + '.png" num=' + num + '></div>';
            };

            $('#cards').append(card);// Add cart to hmtl
        }

        // Event by clicking on a card
        $('.card').on(

            "click", function () {

                // Animation imitating the flipping of the card.
                $(this).css({
                    "animation": "flip 0.5s 1",
                    // "animation": "vibrate 0.3s 1",
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



                    // Different cards
                    } else {

                        $('#message')
                        .text('You have failed, try again.')
                        .css("background-color", "rgb(248, 174, 174)")
                        $(".card").parent().css("pointer-events", "none");// No permite cliclar sobre ninguna carta


                        // Delay the process so that the values are clearly visible.
                        setTimeout(function () {

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
                            "background-image": "url(img/LogoBloggIn_login.png)",
                            "animation": "none"
                            })


                        }, 1000)


                        // Change the player's turn
                        turn == 'Player 1'
                            ? (failsP1++, turn = 'Player 2')
                            : (failsP2++, turn = 'Player 1');

                        // Update bookmarks
                        $('#failsP1').text(failsP1)
                        $('#failsP2').text(failsP2)
                        $('#player').text(turn)

                        
                    }

                    setTimeout(function(){$('#message')
                        .text('')
                        .css("background-color", "white")}, 1000)
                    
                    // All pairs of cards have been matched. End the game by showing the winner
                    if ($('.ok').length == quantity) {

                        setWinner();

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

        let winner, fails;

        if (failsP1 < failsP2) {// Player 1 wins

            winner = 'Player 1';
            fails = failsP1;

        } else if (failsP1 == failsP2) {// Tie. The player who finished the panel wins.

            winner = turn;
            fails = failsP1;

        } else { // Player 2 wins

            winner = 'Player 2';
            fails = failsP2;

        }


        setTimeout(function(){$('#message')
            .html('Congratulations <b>' + winner + '</b>! You win the panel with <b>' + fails + ' </b>fails!')
            .css("background-color", "rgb(176, 248, 176)")}, 1000);

    }


// GENERAL EVENTS
    $(function () {makeCards()})// Starts the game on page load
    $('#logo').on('click', function () { location.reload(true); }) // Restart de game
    $(':radio').on('click', makeCards); // Difficulty change


