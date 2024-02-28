import HeaderBlog from "./HeaderBlog.js";
import FooterBlog from "./FooterBlog.js";
import router from "./router.js";


const { createApp } = Vue;


let app = createApp({
  data() {
    return {

      posts: [
        {
          id: 0,
          title: "My frist Post",
          summary: "This post is simply a test",
          content:
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit." +
            "Consectetur laborum unde mollitia libero, a perspiciatis numquam. " +
            "Itaque enim dolores maiores harum optio similique a tempora officia, autem sit nam maxime.",
          creationDate: today(),
          publicationDate: '2024-02-22',
          author: "Toni",
          status: 'draft',
          isConfirming: false,
          image: 'img/tech2.png',
        },
      ],
      authors: readData(),
      editing: false,
      editingIndex: '',

    };
  },
  components: {

    HeaderBlog,
    FooterBlog,

  },
  methods: {

    // Switch between published and draft
    togglePublish: function (post) {

      if (post.status == 'draft') {
        post.status = 'published'
      } else {
        post.status = 'draft'
      }
    },


    saveOnLocalStorage: function(posts){

      localStorage.setItem('posts', JSON.stringify(posts));

      console.log(this.editing);
  
  
  
    },

  },

 

  // Ensures that title and author fields have values

  mounted() {

    if (localStorage.getItem('posts')) {
      try {
        // Get localstorage data and update posts array
        this.posts = JSON.parse(localStorage.getItem('posts'));
      } catch (e) {
        localStorage.removeItem('posts');
      }
    } else {

      // if LocalStorage posts value not exists, save post array in LocalStorage
      localStorage.setItem('posts', JSON.stringify(this.posts));

    }

    this.$router.push({name:'ListPosts'});


  }
}).use(router).mount("#app");



// Extern App functions

// Gets today's date in yyyy/mm/dd format.
function today() {
  var d = new Date();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  var output =
    d.getFullYear() +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    (day < 10 ? "0" : "") +
    day;

  return output;
}

// Gets the users in the indexed dB database for the authors.
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
  return authorsIDB;
}

// Verify that the user is logged in
function setUser() {

  openCreateDb(function (db) {

    var tx = db.transaction(DB_STORE_LOGIN, "readonly");
    var store = tx.objectStore(DB_STORE_LOGIN);
    var req = store.openCursor();

    req.onsuccess = function (e) {

      var cursor = this.result;

      if (cursor) {

        if (cursor.value.theme == 1) {
          document.getElementById("theme").href = "css/bootstrap_custom_dark.css";
        }

        document.getElementById("img-profile").src = cursor.value.avatar;
        document.getElementById("img-profile").hidden = false;
        document.getElementById("btn_login").removeAttribute("data-bs-toggle");
        document.getElementById("btn_login").removeAttribute("data-bs-target");
        document.getElementById("btn_login").setAttribute("onclick", "setLogout()");
        document.getElementById("btn_login").textContent = "Logout";
        document.getElementById("user_name_figcaption").innerText = cursor.value.name;

      } else {
        // window.location.href = "index.html";
         // If there is not login data, redirect to homepage
      }


    }
    req.onerror = function (e) {
      console.error("Set User error: can not verify the user", this.error);
    };

    tx.oncomplete = function () {
      console.log("Set User: transaction completed");
      db.close();
      opened = false;
    };

  });





}





// LISTENNERS

// Check whether the user is logged in or not.
window.addEventListener('load', () => {
  setUser();
});