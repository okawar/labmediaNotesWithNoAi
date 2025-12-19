import { createRouter, createWebHistory } from 'vue-router';

import Archive from "../views/Archive.vue";
import Notes from "../views/Notes.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Notes
    },
    {
        path: '/archive',
        name: 'Archive',
        component: Archive
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;