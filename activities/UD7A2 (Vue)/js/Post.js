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

    
    
    `



}