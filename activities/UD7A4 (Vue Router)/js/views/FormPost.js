export default {

  data() {
    return {

      form: {
        id: "",
        title: "",
        summary: "",
        content: "",
        image: "",
        author: "",
      },
      editingIndex:"",
    };
  },

  name: "FormPost",

  props: ['posts', 'editing', 'authors'],
  emits: ['save-on-local-storage','notEditing','deletePost', 'editPost', 'confirmDel', 'cancelDel', 'savePost', 'isEditing'],

  template:
    `
    <div class="container bg-dark text-white mt-3 p-3">
        <h2 v-if="editing" class="display-5">Editing</h2>
        <h2 v-else class="display-5">Create</h2>

    <form>
        <label for="title">Title</label>
        <input v-model="form.title" class="form-control" type="text" name="title" id="title" maxlength="10" />
        <label for="summary">Summary</label>
        <input v-model="form.summary" class="form-control" type="text" name="summary" id="summary" />

        <label for="postImage" class="form-label">Image</label><br />
        <img v-if="form.image" class="img-thumbnail mb-3" :src="form.image" />
        <input v-on:change="onFileChange" class="form-control" type="file" id="postImage" ref="fileinput" />
        <label for="content">Content</label>
        <textarea v-model="form.content" class="form-control" id="content" name="content" cols="30"
          rows="10"></textarea>

        <label for="title">Autor</label>
        <select v-model="form.author" class="form-control" name="autor" id="autor">
          <option v-for="author in authors" :value="author.value">
            {{ author.text }}
          </option>
        </select>
        <label for="publicationDate" class="label-control">Publication date</label>
        <input v-model="form.publicationDate" type="date" class="form-control" id="publicationDate" />
        <div class="mt-2 d-grid gap-2 d-md-flex justify-content-md-end">
          <div v-if="editing">
            <button v-on:click="updatePost" type="button" class="btn btn-info me-2">
              Update
            </button>
            </div>
            <div v-else>
            <button @click="savePost" type="button" class="btn btn-info me-2" :disabled="!dataAdded">
            Save
            </button>
            </div>
            <button v-on:click="resetForm" type="button" class="btn btn-danger me-2">
              Cancel
            </button>
        </div>
      </form>
    </div>
    `,
  methods: {

    // Capture the image path 
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (files.length) {
        this.form.image = URL.createObjectURL(files[0]);
      }
    },

    // Saves the post capturing the values entered.
    savePost: function (e) {

      if(this.form.image===''){

        this.form.image = 'img/LogoBloggIn_login.png';

      }
      this.posts.push({
        id: this.posts.length > 0 ? this.posts.slice(-1)[0].id + 1 : 0, // set last id or id=0 if is an empty array
        title: this.form.title,
        summary: this.form.summary,
        content: this.form.content,
        creationDate: this.getToday(),
        publicationDate: this.form.publicationDate,
        image: this.form.image,
        isConfirming: false,
        author: this.form.author,
        status: 'draft',
      });

      this.$emit('save-on-local-storage', this.posts);
      
      this.resetForm(); // Clean!

    },

    // Clears the values entered in the form inputs.
    resetForm: function () {

      this.form.title = '';
      this.form.summary = '';
      this.form.content = '';
      this.form.aurhor = '';
      this.$emit('notEditing');
      this.form.publicationDate = '';
      this.form.image = '';
      this.$refs.fileinput.value = null;

      this.$router.push({ name: 'TablePosts' });

    },
    

    // Update the post data in editing.
    updatePost: function () {

      this.posts[this.editingIndex].title = this.form.title;
      this.posts[this.editingIndex].summary = this.form.summary;
      this.posts[this.editingIndex].content = this.form.content;
      this.posts[this.editingIndex].author = this.form.author;
      this.posts[this.editingIndex].publicationDate = this.form.publicationDate;
      this.posts[this.editingIndex].image = this.form.image;
      
      this.$emit('save-on-local-storage', this.posts);
      
      this.resetForm(); // Clean!
  },
    
    getToday: function () {
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
    
},
    computed: {
      dataAdded: function () {
        return this.form.title && this.form.author;
      }
    },

    mounted(){

      if(this.$route.params.new=='false'){

        const post = JSON.parse(this.$route.params.postobj);
        const index = this.$route.params.index;

        this.form.title = post.title;
        this.form.summary = post.summary;
        this.form.content = post.content;
        this.form.aurhor = post.author;
        this.$emit('isEditing');
        this.editingIndex = index;
        this.form.publicationDate = post.publicationDate;
        
      }
    }
  }