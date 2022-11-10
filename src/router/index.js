import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/components/base/Login";
import Welcome from "@/components/base/Welcome";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: Login},
    {path: '/login', component: Login},
    {path: '/index', component: Welcome}
]

const router = new VueRouter({
    routes: routes
})

export default router;
