export default {

    name: "FormPost",

    props: ['posts', 'form', 'editing', 'authors'],

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
            <button v-on:click="resetForm" type="button" class="btn btn-danger me-2">
              Cancel
            </button>
          </div>
          <div v-else>
            <button @click="$emit('save-post')" type="button" class="btn btn-info me-2" :disabled="!dataAdded">
              Save
            </button>
          </div>
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


    },
    computed: {
        dataAdded: function () {
            return this.form.title && this.form.author;
        }
    },







}