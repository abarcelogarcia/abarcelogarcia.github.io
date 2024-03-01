import FormPost from "./FormPost.js";
import TablePosts from "./TablePosts.js";


let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        { path: '/', name: "TablePosts", component: TablePosts },
        { path: '/create', name: "CreatePost", component: FormPost },
        { path: '/edit', name: "EditPost", component: FormPost, props: true },
    ]
});

export default router