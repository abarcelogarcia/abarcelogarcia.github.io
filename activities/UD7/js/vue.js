const { createApp } = Vue;

let app = createApp({
   data() {
     return {
       message: 'Hello Vue!',
       hola: 'jalou',
       otro: '<span>ddddddddddddd</span>',
       items: [0,1,2,3,4] 
     }
   }



   
 }).mount('#app')