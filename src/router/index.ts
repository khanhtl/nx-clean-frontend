import NxWelcome from 'src/app/NxWelcome.vue';
import { createRouter,type RouteRecordRaw, createWebHistory } from 'vue-router';

const routes: RouteRecordRaw[]=[
    {
        path: '/',
        component: NxWelcome
    }
];

const router=createRouter({
    history: createWebHistory(),
    routes
});

export { router };