import Vue from "vue";
import VueRouter from "vue-router";

import pcLoginPage from "@/components/pc/base/LoginPage";
import pcIndex from "@/components/pc/base/Index";

import mobileIndex from "@/components/mobile/index.vue"
import mobileLoginPage from "@/components/mobile/base/LoginPage.vue"

Vue.use(VueRouter);

const routes = [
    {path: '/pc/login', component: pcLoginPage},
    {path: '/pc/index', component: pcIndex},

    {path: '/mobile/index', component: mobileIndex},
    {path: '/mobile/login', component: mobileLoginPage},
]

const router = new VueRouter({
    routes: routes
})

export default router;
