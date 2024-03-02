export default {
  name: "Post",
  props: ['post', 'editing'],
  inheritAttrs: false,
  template: `
        <tr>
          <td>{{post.id + 1}}</td>
          <td>{{post.title}}</td>
          <td>{{post.summary}}</td>
          <td><img :src="post.image" style="max-width: 100px" /></td>
          <td>{{post.content}}</td>

          <td class="col-4 col-md-3 text-end">
            <button class="btn btn-warning me-2"
            @click="$emit('edit-post', post)"
            :disabled=editing>
            Edit
            </button>
            
            <button class="btn btn-danger me-2"
            @click="$emit('confirm-del', post)"
            :disabled=editing>
            Delete
          </button>
          </td>

          </tr>
        <tr>
            <td colspan="6"  :confirmid=post.id :class="post.isConfirming ? 'active' : 'noActive'">
                <div class="p-3 bg-danger-subtle rounded">
                    <p>
                        You are going to <b>delete </b>selected post. Please note that this process is
                        <b>IRREVERSIBLE</b>. Are you sure about it?
                    </p>
                    <button type="button" class="btn btn-danger" @click="$emit('delete-post', post)" id="confirmDel">Yes, I'm
                    sure.</button>
                    <button type="button"
                    class="btn btn-info ms-2" id="cancelDel" @click="$emit('cancel-del', post)">Cancel</button>
                </div>
            </td>
        </tr>
    
    `
}
