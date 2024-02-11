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
      // authors: [{text: 'Toni', value: 'Toni'}, {text: 'Pepe', value: 'Pepe'}, {text: 'Maria', value: 'Maria'}, {text: 'Julián', value: 'Julian'}],
      authors: readData(),
      isEditing: false,
      editingIndex:'',
      open: false,
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
      this.isEditing = true;
      this.editingIndex = index;

      let hola = readData();

      console.log(today());
    },

    updatePost: function () {

      try {
        
        this.posts[this.editingIndex].title = this.form.title;
        this.posts[this.editingIndex].summary = this.form.summary;
        this.posts[this.editingIndex].content = this.form.content;
        this.posts[this.editingIndex].date = today();
        this.posts[this.editingIndex].author = this.form.author;
        
        this.resetForm(); // reset form values
       

        
      } catch (error) {

        console.log('Error');
        
      }
    },
    deletePost: function(){

      this.posts.splice(this.editingIndex, 1);

      this.isEditing = false;
      this.open = false;


    },

    resetForm: function(){

    // reset form values
    this.form.title = '';
    this.form.summary = '';
    this.form.content = '';
    this.form.aurhor = '';
    this.isEditing = false;
    this.editingIndex = '';
    
    console.log(this.posts);


    },

    getAuthors: function(){

      



    },

    confirmDel: function(index){

      this.open=true,
      this.isEditing=true,
      console.log(this);
      this.editingIndex = index;

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
  openCreateDb(function (db) {
    readUsers(db);
  });
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


