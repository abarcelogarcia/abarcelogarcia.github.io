
$(document).ready(function(){
    $("textarea").countCharacters();
    });


jQuery.fn.countCharacters = function(){

    // let text = $(this).text();

    $(this).each(function(){

        text = $(this);
        console.log(text.text().length);
        counter = text.text().length;
        text.data("counter", counter);
        data = '<p>'+ counter + ' characters</p>';
        newParagraph = $(data);
        text.after(newParagraph);
        
        
        
        text.on("keyup", function(e){
        
            e.preventDefault();


            


            
        })






    })
return this;
}