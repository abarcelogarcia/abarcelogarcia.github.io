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
          creationDate: today(),
          publishDate: '',
          author: "Toni",
          status: 'draft',
        },
      ],
      // authors: [{text: 'Toni', value: 'Toni'}, {text: 'Pepe', value: 'Pepe'}, {text: 'Maria', value: 'Maria'}, {text: 'Julián', value: 'Julian'}],
      authors: readData(),
      isEditing: false,
      editingIndex: '',
      open: false,
      image: '',
    };
  },
  methods: {
    savePost: function (e) {

      this.posts.push({
        id: this.posts.slice(-1)[0].id + 1,
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        image: this.form.image,
        creationDate: today(),
        creationPub: '',
        image: this.form.image,
        author: this.form.author,
        status: 'draft'
      });

      this.resetForm();

      console.log(this.posts);
    },
    editPost: function (post, index) {

      this.form.title = post.title;
      this.form.summary = post.summary;
      this.form.content = post.content;
      this.form.aurhor = post.author;
      this.isEditing = true;
      this.editingIndex = index;

    },

    updatePost: function () {

      try {

        this.posts[this.editingIndex].title = this.form.title;
        this.posts[this.editingIndex].summary = this.form.summary;
        this.posts[this.editingIndex].content = this.form.content;
        this.posts[this.editingIndex].author = this.form.author;

        this.resetForm(); // reset form values

      } catch (error) {

        console.log('Error');

      }
    },
    deletePost: function () {

      this.posts.splice(this.editingIndex, 1);

      this.isEditing = false;
      this.open = false;


    },

    resetForm: function () {

      // reset form values
      this.form.title = '';
      this.form.summary = '';
      this.form.content = '';
      this.form.aurhor = '';
      this.isEditing = false;
      this.editingIndex = '';

      console.log(this.posts);


    },

    togglePublish: function (post) {

      if (post.status == 'draft') {
        post.status = 'published'
        post.publishDate = today();
      } else {
        post.status = 'draft'
        post.publishDate = '';
      }
      // console.log(post);
    },

    confirmDel: function (index) {

      this.open = true,
        this.isEditing = true,
        console.log(this);
      this.editingIndex = index;

    },
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.form.image = "img/" + files[0].name
      }
    },

  },
  computed: {
    dataAdded: function () {
      return this.form.title && this.form.author;
    }
  }
}).mount("#app");



// Extern App functions

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

// Display users data

function readData() {
  let authorsIDB = [];
  openCreateDb(function (db) {



    var tx = db.transaction(DB_STORE_NAME, "readonly");
    var store = tx.objectStore(DB_STORE_NAME);
    var req = store.openCursor();

    req.onsuccess = function (e) {
      var cursor = this.result;
      if (cursor) {
        authorsIDB.push({ text: cursor.value.name, value: cursor.value.name })
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
  console.log(authorsIDB);
  return authorsIDB;
}


// Read and make users Array
function readUsers(db) {

  let authorsIDB = [];


  var tx = db.transaction(DB_STORE_NAME, "readonly");
  var store = tx.objectStore(DB_STORE_NAME);
  var req = store.openCursor();

  req.onsuccess = function (e) {
    var cursor = this.result;
    if (cursor) {
      authorsIDB.push(cursor.value.name)
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


  console.log(authorsIDB);
  return authorsIDB;
}


