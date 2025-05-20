import { createRouter, createWebHistory, } from 'vue-router'
import NotesList from '@/components/NotesList.vue'

const routes = [
    {
        path: '/notes', component: NotesList
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;