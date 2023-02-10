import Vue from "vue";
import VueRouter from "vue-router";

import pcLoginPage from "@/components/pc/base/LoginPage";
import pcRegisterPage from "@/components/pc/base/RegisterPage";
import pcIndex from "@/components/pc/base/Index";

import mobileIndex from "@/components/mobile/index.vue"

Vue.use(VueRouter);

const routes = [
    {path: '/pc/login', component: pcLoginPage},
    {path: '/pc/register', component: pcRegisterPage},
    {path: '/pc/index', component: pcIndex},

    {path: '/mobile/index', component: mobileIndex},
    {path: '/mobile/login', component: mobileIndex},
    {path: '/mobile/register', component: mobileIndex},
]

const router = new VueRouter({
    routes: routes
})

export default router;
