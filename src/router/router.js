import Vue from "vue";
import VueRouter from "vue-router";

import LoginPage from "@/components/base/LoginPage";
import RegisterPage from "@/components/base/RegisterPage";
import Index from "@/components/base/Index";

Vue.use(VueRouter);

const routes = [
    {path: '/', component: LoginPage},
    {path: '/login', component: LoginPage},
    {path: '/register', component: RegisterPage},
    {path: '/index', component: Index}
]

const router = new VueRouter({
    routes: routes
})

export default router;
