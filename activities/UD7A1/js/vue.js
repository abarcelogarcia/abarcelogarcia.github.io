const { createApp } = Vue;

let app = createApp({
  data() {
    return {

      form: {
        title: '',
        summary: '',
        content: '',
        content: '',
        autor: ''
      },

      posts: [{
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

        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        date: today()
        // autor: this.form.autor

      }

      this.posts.push(post);
      console.log(this.posts);
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