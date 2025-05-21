import { createRouter, createWebHistory, } from 'vue-router'
import NotesList from '@/components/NotesList.vue'
import About from '@/components/About.vue'
import Settings from '@/components/Settings.vue';
import Logout from '@/components/Logout.vue';

const routes = [
    {
        path: '/notes', 
        component: NotesList
    },
    {
        path: '/about', 
        component: About
    },
    {
        path: '/settings',
        component: Settings
    },
     {
        path: '/logout',
        component: Logout
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;