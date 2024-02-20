import number from "./number.js"

const { createApp } = Vue;

let app = createApp({

    data(){

        return{

            numbers: [],
            num: null,
            error:'',
            selectedItem: null,
        }


    },
    components:{

        number

    },
    methods:{

        sendNumber: function(){

            console.log(~~this.num);

            // Comprobar si lo que entra es número
            // Elimina decimales y comprueba

            if(~~this.num===this.num){

                // comprobar si existe el núemro en el array

               if(this.numbers.indexOf(this.num)<0){

                this.error = 'Error. El núemro ya existe';

               } 

            }else{

                this.error = 'Error que te cagas';

            }




        },
        // numberSelected:{



        // }


    },
   


}).mount('#app');