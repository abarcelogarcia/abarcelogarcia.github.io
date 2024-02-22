export default{

    name: "post",

    props:['post', 'isEditing'],

    template:`

                <tr>
                  <td>{{post.id + 1}}</td>
                  <td>{{post.title}}</td>
                  <td>{{post.summary}}</td>
                  <td><img :src="post.image" style="max-width: 100px" /></td>
                  <td>{{post.content}}</td>
                  <td class="col-4 col-md-3 text-end">
                    <button
                      class="btn btn-warning me-2"
                      
                      :disabled="isEditing"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-danger me-2"
                     
                      :disabled="isEditing"
                    >
                      Delete
                    </button>
                    
                  </td>
                </tr>
                <td colspan="6">
                  <div v-if="posts[index].isConfirming" class="p-3 bg-danger-subtle rounded" :id="index">
                    <p>You are going to <b>delete </b>selected post. Please note that this process is
                      <b>IRREVERSIBLE</b>. Are
                      you
                      sure about it?
                    </p>
                    <button type="button" @click="deletePost()" class="btn btn-danger" id="confirmDel">Yes, I'm
                      sure.</button>
                    <button @click="posts[index].isConfirming = false, isEditing = false" type="button"
                      class="btn btn-info ms-2" id="cancelDel">Cancel</button>
                  </div>
                </td>
               

    
    
    `



}