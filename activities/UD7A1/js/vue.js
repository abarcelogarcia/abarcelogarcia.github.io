const { createApp } = Vue;

let app = createApp({
  data() {
    return {
      form: {
        id: "",
        title: "",
        summary: "",
        content: "",
        image: '',
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
          // isEditing: false
          // autor: this.form.autor
        },
      ],
      isEditing: false,
      editingIndex:'',
    };
  },
  methods: {
    savePost: function (e) {

      this.posts.push({
        id: this.posts.slice(-1)[0].id + 1,
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        date: today(),
        image: this.form.image
        // autor: this.form.autor
      });

      console.log(this.posts);
    },
    editPost: function (post, index) {
      
      this.form.title = post.title;
      this.form.summary = post.summary;
      this.form.content = post.content;
      this.form.date = today();
      this.isEditing = true;
      this.editingIndex = index;

      console.log(post.id);
    },

    updatePost: function () {

      this.posts[this.editingIndex].title = this.form.title;
      this.posts[this.editingIndex].summary = this.form.summary;
      this.posts[this.editingIndex].content = this.form.content;
      this.posts[this.editingIndex].date = this.form.date;
      this.isEditing = false;
      this.editingIndex = '';
      
    },

    deletePost: function(index){

      console.log(this.posts[index].title);


      this.posts.splice(index, 1);


    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
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
