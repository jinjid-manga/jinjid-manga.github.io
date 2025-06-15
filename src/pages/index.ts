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

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
