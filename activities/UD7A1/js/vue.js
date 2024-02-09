const { createApp } = Vue;

let id = 1


let app = createApp({
  data() {
    return {


      form: {
        id:'',
        title: '',
        summary: '',
        content: '',
        content: '',
        autor: ''
      },

      posts: [{
        id:1,
        title: 'My frist Post',
        summary: 'This post is simply a test',
        content: "Lorem ipsum dolor sit, amet consectetur adipisicing elit." +
          "Consectetur laborum unde mollitia libero, a perspiciatis numquam. " +
          "Itaque enim dolores maiores harum optio similique a tempora officia, autem sit nam maxime.",
        date: today()
        // autor: this.form.autor
      }]
    }
  },
  methods: {
    savePost: function (e) {

      let post = {
        id: (this.posts.slice(-1)[0].id)+1,
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        date: today()
        // autor: this.form.autor

      }

      this.posts.push(post);
      console.log(this.posts.slice(-1));
      // id++;
    },
    editPost: function(e){

      console.log(this.posts.slice(-1)[0].id);
  
  
    }
  }

  
}).mount('#app');





function today() {

  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output =

    (day < 10 ? '0' : '') + day + '/' +
    (month < 10 ? '0' : '') + month + '/' +
    d.getFullYear();

  return output;

}