const { createApp } = Vue;

let app = createApp({
  data() {
    return {
      form: {
        id: "",
        title: "",
        summary: "",
        content: "",
        isEditing: false,
        autor: "",
      },

      posts: [
        {
          id: 1,
          title: "My frist Post",
          summary: "This post is simply a test",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit." +
            "Consectetur laborum unde mollitia libero, a perspiciatis numquam. " +
            "Itaque enim dolores maiores harum optio similique a tempora officia, autem sit nam maxime.",
          date: today(),
          isEditing: false
          // autor: this.form.autor
        },
      ],
    };
  },
  methods: {
    savePost: function (e) {

      console.log();


        let post = {
        id: this.posts.slice(-1)[0].id + 1,
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        date: today(),
        isEditing: false
        // autor: this.form.autor
      };

      this.posts.push(post);
      console.log();
    },
    editPost: function (post) {
      
      this.form.title = post.title;
      this.form.summary = post.summary;
      this.form.content = post.content;
      this.form.date = today();
      post.isEditing = true;

      console.log(post);
    },

    updatePost: function (post) {

      console.log(post);

      post.title = this.form.title;
      post.summary = this.form.summary;
      post.content = this.form.content;
      post.date = this.form.date;
      post.isEditing = false;
      
    }
  },
}).mount("#app");

function today() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    d.getFullYear();

  return output;
}
