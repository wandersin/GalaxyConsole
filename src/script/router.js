import Vue from "vue";
import VueRouter from "vue-router";

import pcLoginPage from "@/components/pc/base/LoginPage";
import pcRegisterPage from "@/components/pc/base/RegisterPage";
import pcIndex from "@/components/pc/base/Index";

Vue.use(VueRouter);

const routes = [
    {path: '/pc', component: pcLoginPage},
    {path: '/pc/login', component: pcLoginPage},
    {path: '/pc/register', component: pcRegisterPage},
    {path: '/pc/index', component: pcIndex},
]

const router = new VueRouter({
    routes: routes
})

export default router;
