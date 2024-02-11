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
        author: "",
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
          author: "Toni",
        },
      ],
      authors: [{text: 'Toni', value: 'Toni'}, {text: 'Pepe', value: 'Pepe'}, {text: 'Maria', value: 'Maria'}, {text: 'Julián', value: 'Julian'}],
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
        image: this.form.image,
        author: this.form.author
      });

      console.log(this.posts);
    },
    editPost: function (post, index) {
      
      this.form.title = post.title;
      this.form.summary = post.summary;
      this.form.content = post.content;
      this.form.aurhor = post.author;
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
      this.posts[this.editingIndex].author = this.form.author;
      this.isEditing = false;
      this.editingIndex = '';
      console.log(this.posts);
      
    },

    deletePost: function(index){

      console.log(this.posts[index].title);


      this.posts.splice(index, 1);


    },

    getAuthors: function readData() {
      
      openCreateDb(function (db) {
      
        var tx = db.transaction(DB_STORE_NAME, "readonly");
        var store = tx.objectStore(DB_STORE_NAME);
        var req = store.openCursor();

        req.onsuccess = function (e) {
          var cursor = this.result;
          if (cursor) { 
            this.authors.push({name: cursor.value.name, value:cursor.value.name})
            cursor.continue();
          }
        }

        req.onerror = function (e) {
        console.error("Read Users: error reading data:", e.target.errorCode);
        
        };

        tx.oncomplete = function () {
        console.log("Read Users: tx completed");
        db.close();
        opened = false;
        
        };
      });
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

