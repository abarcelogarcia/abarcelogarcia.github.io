import FormPost from "./views/FormPost.js";
import TablePosts from "./views/TablePosts.js";


let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        { path: '/', name: "TablePosts", component: TablePosts },
        { path: '/create', name: "CreatePost", component: FormPost },
        { path: '/edit', name: "EditPost", component: FormPost },
    ]
});

export default router