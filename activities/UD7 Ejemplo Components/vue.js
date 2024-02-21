import Number from "./Number.js";

const { createApp } = Vue;
const app = createApp({
    data: function () {
        return {
            num: null,
            numbers: [],
            error: "",
            selectedItem: null
        }
    },
    components: {
        Number
    },
    methods: {
        send: function () {
            this.error = "";
            this.selectedItem = "";
            // console.log('okdix');
            //Eliminar decimals i comprovar si és igual al valor entrat
            // si s'entra en un string o retorna 0
            if (~~this.num === this.num) {
                //Comprovar si existeix aquest nombre a l'array/llistax
                if (this.numbers.indexOf(this.num) < 0) {
                    this.numbers.push(this.num);
                } else {
                    this.error = "You can't repeat numbers."
                }
            } else {
                this.error = "You need top enter a correct value.";
            }
        },
        numberSelected: function (item) {
            console.log(item);
            this.selectedItem = item;
        }
    }

}).mount("#app");