const { createApp } = Vue;

let app = createApp({
   data() {
     return {

      form:{

        title:'',
        summary:'',
        content:'',
        autor:'',
        posts: []

        
      }
     }
   },
   methods:{
    savePost: function(e){

      let post = form.title;

      console.log(post);
      
    }
  }



   
 }).mount('#app')