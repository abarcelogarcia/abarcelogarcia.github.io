
$(document).ready(function(){
    $("textarea").countCharacters();
    });


jQuery.fn.countCharacters = function(){

    // let text = $(this).text();

    $(this).each(function(){

        text = $(this);
        // console.log(text.text().length);
        
        text.data("counter", text.val().length);

        data = '<p>'+ text.data("counter") + ' characters</p>';
        newParagraph = $(data);
        text.after(newParagraph);

        console.log(text.data());
        
        
        
        text.on("keyup", function(e){
        
            e.preventDefault();

            $(this).data("counter", $(this).val().length);

            console.log($(this).data("counter"))

            $(this).text($(this).val().length);

            
            






            
            
            


            


            
        })






    })
return this;
}