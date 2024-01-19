
$(document).ready(function () {
    $("textarea").countCharacters();
});


jQuery.fn.countCharacters = function () {


    $(this).each(function () {


        // Adds to data() of the element with a key "counter". Its value is the total number of characters
        $(this).data("counter", $(this).val().length);

        // Add the element after the texarea
        $(this).after('<p>' + $(this).data("counter") + ' characters</p>');



        $(this).on("keyup", function (e) {

            e.preventDefault();

            // Updates the element's data(counter)
            $(this).data("counter", $(this).val().length);

            // Update the next element (<p>) with the new data(counter)
            $(this).next().html('<p>' + $(this).data("counter") + ' characters</p>')

        })

    })
    return this;
}