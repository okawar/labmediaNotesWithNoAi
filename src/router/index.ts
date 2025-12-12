import { createRouter, createWebHistory } from 'vue-router';

import Archive from "../components/Archive.vue";
import ListNotes from "../components/ListNotes.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ListNotes
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