$("input").on("keyup", function(){

    
    if(containsOnlyNumbers($('input').val())){

        $('#total').html((+$('#number1').val())+(+$('#number2').val()));
        $('#total').show();
        $(this).next().hide()

    }else{


        
        $(this).next().css('color', 'red')
        $(this).next().show()

    }

}



)

function containsOnlyNumbers(str) {
    return /^\d+$/.test(str);
  }