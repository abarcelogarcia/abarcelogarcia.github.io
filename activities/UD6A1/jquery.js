// VARIABLES

console.log($("#number1").is(':empty'));
console.log($("#number2").is(':empty'));
$("input").on("keyup", function(){
    let num1 = $("#number1").val();
    let num2 = $("#number2").val();
    
    console.log(!$("#number1").is(':empty'));
    console.log(num2);
    
if($("#number1").is(':empty') && $("#number2").is(':empty')){

console.log('Hola');
    $('#total').html('88');
    $('#total').show();

}



}



)