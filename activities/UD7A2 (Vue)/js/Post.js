export default{

    name: "post",

    props:['post', 'isEditing'],

    inheritAttrs:false,

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
                      
                      @click="$emit('edit-post', post)"
                      :disabled=isEditing
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-danger me-2"
                     @click="confirmdel"
                      :disabled=isEditing
                    >
                      Delete
                    </button>
                    
                    </td>
                </tr>
                <tr>
                    <td colspan="6"  :confirmid=post.id hidden>
                        <div class="p-3 bg-danger-subtle rounded">
                            <p>
                                You are going to <b>delete </b>selected post. Please note that this process is
                                <b>IRREVERSIBLE</b>. Are you sure about it?
                            </p>
                            <button type="button" class="btn btn-danger" @click="$emit('delete-post', post)" id="confirmDel">Yes, I'm
                            sure.</button>
                            <button type="button"
                            class="btn btn-info ms-2" id="cancelDel">Cancel</button>
                        </div>
                    </td>
              </tr>


    
    
    `,

    methods:{

        confirmdel: function(){

            var postId = this.post.id;

            console.log("[id="+postId+"]");

            $("[confirmid="+postId+"]").show();




        }



    },




}
