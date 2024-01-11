// VARIABLES

let cantidad
let arrayCards = [];


makeCards();
addCards(cantidad);

function makeCards(){

    let arrayCantidad = [2,4,6,8,10,12,14,16,18,20];
    cantidad = arrayCantidad[Math.floor(Math.random()*arrayCantidad.length)];

    for (let i = 1; i <= cantidad/2; i++) {
        
        arrayCards.push(i)
        arrayCards.push(i)
    }

    

    console.log(cantidad);
    console.log(arrayCards);




}
function setNumber(){

    return arrayCards.splice(Math.floor(Math.random()*arrayCards.length),1)[0]

}


function addCards(cantidad){


    for (let i = 0; i < cantidad; i++) {
        
        $('#cards').append(

            '<div class="col card"><p>'+setNumber()+'</p></div>'

        )



    }


}

$('.card').on(

    "click", function (e){

        $(this.children).toggle();


    }



)