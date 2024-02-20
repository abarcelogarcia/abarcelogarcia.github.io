export default{

    name: 'number',
    props: 'numProps',
    methods:{

        clickNumber: function(){

            this.$emit


        }



    },
    template: '<div><input type="button" :value="numProps" @click="clickNumber(numProps)"></div>'




}