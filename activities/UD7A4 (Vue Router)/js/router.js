import TablePosts from "./TablePosts.js";


let router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes: [
        { path: '/', component: TablePosts },
    ]
});

export default router