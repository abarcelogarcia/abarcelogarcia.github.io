export default {

  name: "TablePosts",
  props: ['posts', 'editing', 'authors'],
  emits:['delete-post', 'editPost', 'confirm-del', 'cancel-del', 'savePost','saveOnLocalStorage','notEditing', 'isEditing'],
  template: `

  
  <!-- Empty posts list -->
    <div class="container-fluid p-4">
      <div class="row align-items-center">
        <div class="col p-2">
          <h1 v-if="posts.length" class="display-4">List</h1>
          <h1 v-else class="display-3">There are no posts created</h1>
        </div>
        <div class="col-auto me-3 text-end">
          <button class="btn btn-info" @click="newPost"><i class="bi bi-plus-square me-1"></i>New Post</button>
        </div>
      </div>
    </div>


    <table class="table table-striped align-middle">
    <caption>
      List of posts
    </caption>
    <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Title</th>
        <th scope="col">Summary</th>
        <th scope="col">Image</th>
        <th scope="col">Content</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(post, index) in posts">
        <tr>
          <td>{{post.id + 1}}</td>
          <td>{{post.title}}</td>
          <td>{{post.summary}}</td>
          <td><img :src="post.image" style="max-width: 100px" /></td>
          <td>{{post.content}}</td>
          <td class="col-4 col-md-3 text-end">
            <button class="btn btn-warning me-1"
            @click="editPost(post, index)"
            :disabled=editing>
            <i class="bi bi-pencil-square me-1"></i>
            Edit
            </button>
            <button class="btn btn-danger"
            @click="$emit('confirm-del', index)"
            :disabled=editing>
            <i class="bi bi-trash3 me-1"></i>
            Delete
          </button>
          </td>
        </tr>
        <tr>
          <td colspan="6" :confirmid=post.id :class="post.isConfirming ? 'active' : 'noActive'">
            <div class="p-3 bg-danger-subtle rounded">
              <p>
                  You are going to <b>delete </b>selected post. Please note that this process is
                  <b>IRREVERSIBLE</b>. Are you sure about it?
              </p>
              <button type="button" class="btn btn-danger" @click="$emit('delete-post', post)" >
              <i class="bi bi-hand-thumbs-up me-1"></i>
              Yes, I'm sure.
              </button>
              <button type="button" class="btn btn-info ms-2" @click="$emit('cancel-del', index)">
              <i class="bi bi-x-square me-1"></i>
              Cancel
              </button>
            </div>
          </td>
        </tr>
      </template>
    </tbody>
    </table>
    
    `,

    methods:{

      newPost: function(){
        this.$router.push({name:'CreatePost', params:{new: "true"}});
      },

      editPost: function(post, index){

        this.$router.push({
          name:'EditPost', 
          params:{
            index: index,
            postobj: JSON.stringify(post),
            new: "false",
          }
        });

      },

    }

}