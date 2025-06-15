import Home from "./Home.vue";
import Reader from "./Reader.vue";
import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/:id",
        name: "reader",
        component: Reader,
        props: true,
    },
];

let redirectHandled = false;
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(() => {
    if (redirectHandled) {
        return;
    }

    redirectHandled = true;

    const redirect = localStorage.getItem("static-404-redirect");

    if (!redirect) {
        return;
    }

    localStorage.removeItem("static-404-redirect");

    router.replace(JSON.parse(redirect));
});


export default router;
